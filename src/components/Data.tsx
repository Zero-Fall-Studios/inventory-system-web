/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type { ColumnData, Row } from "~/types/database.types";
import { useDatabase } from "./DatabaseProvider";
import { JSONInput } from "./JSONInput";
import { useEffect, useRef, useState } from "react";
import { createId } from "@paralleldrive/cuid2";

type SelectPossibleValuesInputProps = {
  rowIndex: number;
  column: ColumnData;
  columnName: string;
};

const SelectPossibleValuesInput: React.FC<SelectPossibleValuesInputProps> = ({
  rowIndex,
  column,
  columnName,
}) => {
  const { onColumnValueChange, getCurrentValue } = useDatabase();
  const currentValue = getCurrentValue(rowIndex, columnName);
  const [value, setValue] = useState<string>(
    currentValue ?? getDefaultValue({ column }) ?? ""
  );
  const handleOnChange = (e: any) => {
    const newValue = e.target.value;
    setValue(newValue);
    onColumnValueChange(rowIndex, columnName, newValue);
  };
  return (
    <select value={value} onChange={handleOnChange}>
      {column?.possible_values?.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

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
  if (column.type === "select") {
    return (
      <SelectPossibleValuesInput
        rowIndex={rowIndex}
        column={column}
        columnName={columnName}
      />
    );
  }
  return (
    <JSONInput
      defaultValue={value}
      onChange={(newValue: any) => {
        setValue(newValue);
        onColumnValueChange(rowIndex, columnName, newValue);
      }}
    />
  );
};

export const Data: React.FC = () => {
  const { selectedTable, database, schema, addRow, deleteRow } = useDatabase();

  const table = database.tables[selectedTable];
  const columnNames = Object.keys(schema);
  const data = table?.data ?? [];
  const handleAddNewRow = () => {
    const newRow: Row = {
      id: createId(),
    };
    columnNames.forEach((columnName) => {
      if (columnName === "id") return;
      const column = table?.schema[columnName];
      let field = null;
      if (column?.type === "string") {
        field = column?.default_values?.[0] ?? "";
      }
      if (column?.type === "number") {
        field = column?.default_values?.[0] ?? 0;
      }
      if (column?.type === "boolean") {
        field = Boolean(column?.default_values?.[0] === "true") ?? false;
      }
      if (column?.type === "null") {
        field = column?.default_values?.[0] ?? null;
      }
      if (column?.type === "array") {
        field = column?.possible_values ?? [];
      }
      if (column?.type === "object") {
        field = column?.possible_values ?? {};
      }
      newRow[columnName] = field;
    });
    addRow(newRow);
  };
  const handleDeleteRow = (index: number) => {
    deleteRow(index);
  };

  const [width, setWidth] = useState(100);
  const demoRef = useRef<any>();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      setWidth((event?.[0]?.contentBoxSize?.[0]?.inlineSize ?? 0) - 10);
    });
    resizeObserver.observe(demoRef?.current);
  }, [demoRef]);

  if (!selectedTable) return <></>;

  return (
    <div
      ref={demoRef}
      className="flex flex-grow flex-col justify-between gap-2"
    >
      <div className="flex justify-between gap-2 p-2">
        <h3 className="text-white">Table: {selectedTable}</h3>
        <button className="btn-secondary" onClick={handleAddNewRow}>
          Add Row
        </button>
      </div>
      <div
        className="h-0 flex-grow overflow-auto bg-slate-300"
        style={{ width }}
      >
        <table>
          <thead className="bg-primary dark:text-white">
            <tr>
              {columnNames.map((columnName) => (
                <th key={columnName} className="px-6 py-3">
                  {columnName}
                </th>
              ))}
              <th className="px-6 py-3">actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: Row, rowIndex: number) => (
              <tr
                key={row.id}
                className="border-b bg-slate-300 dark:border-gray-700 "
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
                <td className="border p-2">
                  <button
                    className="btn-error"
                    onClick={() => handleDeleteRow(rowIndex)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
