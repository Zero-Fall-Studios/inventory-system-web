/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { possibleColumnTypes, type ColumnData } from "~/types/database.types";
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
  const { onChangePossibleValues, selectedTable, database } = useDatabase();
  const table = database?.tables[selectedTable];
  const schema = table?.schema ?? {};
  const column = (schema[columnName] ?? {}) as ColumnData;
  const [value, setValue] = useState<string[]>(column?.possible_values ?? []);
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

type ObjectShapeInputProps = {
  columnName: string;
};

const ObjectShapeInput: React.FC<ObjectShapeInputProps> = ({ columnName }) => {
  const { onChangePossibleValues, selectedTable, database } = useDatabase();
  const table = database?.tables[selectedTable];
  const schema = table?.schema ?? {};
  const column = (schema[columnName] ?? {}) as ColumnData;
  const [value, setValue] = useState(column?.possible_values ?? {});
  return (
    <JSONInput
      defaultValue={value}
      onChange={(newValue) => {
        setValue(newValue);
        onChangePossibleValues(columnName, newValue);
      }}
    />
  );
};

type DefaultValueInputProps = {
  columnName: string;
};

const DefaultValueInput: React.FC<DefaultValueInputProps> = ({
  columnName,
}) => {
  const { onChangeDefaultValues, selectedTable, database } = useDatabase();
  const table = database?.tables[selectedTable];
  const schema = table?.schema ?? {};
  const column = (schema[columnName] ?? {}) as ColumnData;
  const [value, setValue] = useState<string>(column?.default_values?.[0] ?? "");
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChangeDefaultValues(columnName, [newValue]);
      }}
      className="w-full"
      placeholder="Default Value"
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
        {type === "object" && <ObjectShapeInput columnName={columnName} />}
        {type !== "select" && type !== "object" && (
          <DefaultValueInput columnName={columnName} />
        )}
      </div>
      <button className="btn-error" onClick={() => deleteColumn(columnName)}>
        X
      </button>
    </div>
  );
};

export const Schema: React.FC = () => {
  const { selectedTable, schema } = useDatabase();
  return (
    <div className="flex flex-grow flex-col justify-between gap-2">
      <h3 className="p-2 text-white">Table: {selectedTable}</h3>
      <div className="h-0 flex-grow overflow-auto bg-slate-300">
        {Object.keys(schema).map((columnName, index) => {
          const column = schema[columnName]!;
          return <Column key={index} column={column} columnName={columnName} />;
        })}
      </div>
      <div>
        <AddColumn />
      </div>
    </div>
  );
};
