/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ColumnType,
  possibleColumnTypes,
  type ColumnData,
} from "~/types/database.types";
import { AddColumn } from "./AddColumn";
import { useDatabase } from "./DatabaseProvider";
import { JSONInput } from "./JSONInput";
import { useState } from "react";

type SelectPossibleValuesInputProps = {
  columnName: string;
};

const SelectPossibleValuesInput: React.FC<SelectPossibleValuesInputProps> = ({
  columnName,
}) => {
  const { onChangePossibleValues } = useDatabase();
  const [value, setValue] = useState<string[]>([]);
  return (
    <JSONInput
      defaultValue={value}
      onChange={(newValue: string[]) => {
        setValue(newValue);
        onChangePossibleValues(columnName, newValue);
      }}
    />
  );
};

type ColumnProps = {
  column: ColumnData;
  columnName: string;
};

const Column: React.FC<ColumnProps> = ({ column, columnName }) => {
  const { deleteColumn, onChangeType } = useDatabase();
  const type = column?.type ?? "string";
  return (
    <div className="flex gap-2 border-b border-gray-400 p-2">
      <div className="flex-grow">{columnName}</div>
      <div className="flex gap-2">
        <select
          value={type}
          onChange={(e) => onChangeType(columnName, e.target.value)}
        >
          {possibleColumnTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {type === "select" && (
          <SelectPossibleValuesInput columnName={columnName} />
        )}
      </div>
      <button className="btn-primary" onClick={() => deleteColumn(columnName)}>
        Delete
      </button>
    </div>
  );
};

export const Schema: React.FC = () => {
  const { selectedTable, schema } = useDatabase();
  return (
    <div>
      <h3 className="p-2 dark:text-white">Table {selectedTable}</h3>
      <div>
        <div className="flex flex-col gap-2">
          <div className="bg-slate-200">
            <div className="flex gap-2 border-b border-gray-400 p-2">
              <div className="flex-grow">
                <label>Column Name: </label>
              </div>
            </div>
            {Object.keys(schema).map((columnName, index) => {
              const column = schema[columnName]!;
              return (
                <Column key={index} column={column} columnName={columnName} />
              );
            })}
          </div>
          <div>
            <AddColumn />
          </div>
        </div>
      </div>
    </div>
  );
};
