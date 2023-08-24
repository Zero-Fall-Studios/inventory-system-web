/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */

import type { ColumnData } from "~/types/database.types";
import { useDatabase } from "./DatabaseProvider";
import { JSONInput } from "./JSONInput";
import { useState } from "react";

const getDefaultValue = ({ column }: { column: ColumnData }) => {
  if (column?.type === "string") {
    return "";
  }
  if (column?.type === "number") {
    return 0;
  }
  if (column?.type === "boolean") {
    return false;
  }
  if (column?.type === "null") {
    return null;
  }
  if (column?.type === "array") {
    return [];
  }
  if (column?.type === "object") {
    return {};
  }
};

const ColumnInput = ({
  column,
  columnName,
  rowIndex,
}: {
  column: ColumnData;
  columnName: string;
  rowIndex: number;
}) => {
  const { onColumnValueChange, getCurrentValue } = useDatabase();
  const currentValue = getCurrentValue(rowIndex, columnName);
  const [value, setValue] = useState(
    currentValue ?? getDefaultValue({ column })
  );
  return (
    <JSONInput
      value={value}
      onChange={(newValue: any) => {
        setValue(newValue);
        onColumnValueChange(rowIndex, columnName, newValue);
      }}
    />
  );
};

export const Data: React.FC = () => {
  const { selectedTable, database, schema, addRow } = useDatabase();
  if (!selectedTable) return <></>;
  const table = database.tables[selectedTable];
  const columnNames = Object.keys(schema);
  const data = table?.data ?? [];
  const handleAddNewRow = () => {
    const newRow: any = {};
    columnNames.forEach((columnName) => {
      const column = table?.schema[columnName];
      let field = null;
      if (column?.type === "string") {
        field = "";
      }
      if (column?.type === "number") {
        field = 0;
      }
      if (column?.type === "boolean") {
        field = false;
      }
      if (column?.type === "null") {
        field = null;
      }
      if (column?.type === "array") {
        field = [];
      }
      if (column?.type === "object") {
        field = {};
      }
      newRow[columnName] = field;
    });
    addRow(newRow);
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full ">
        <thead className="bg-primary dark:text-white">
          <tr>
            {columnNames.map((columnName) => (
              <th key={columnName} className="px-6 py-3">
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <tr
              key={rowIndex}
              className="border-b bg-white dark:border-gray-700 "
            >
              {columnNames.map((columnName) => {
                const column = table?.schema[columnName];
                if (!column)
                  return <td key={columnName} className="border p-2"></td>;
                return (
                  <td key={columnName} className="border p-2">
                    <ColumnInput
                      column={column}
                      columnName={columnName}
                      rowIndex={rowIndex}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-secondary w-full" onClick={handleAddNewRow}>
        Add Row
      </button>
    </div>
  );
};
