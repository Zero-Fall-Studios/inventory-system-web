import { AddColumn } from "./AddColumn";
import { useDatabase } from "./DatabaseProvider";

type ColumnProps = {
  name: string;
  type: string;
  onDelete: () => void;
  onChangeType: (value: string) => void;
};

const Column: React.FC<ColumnProps> = ({
  name,
  type,
  onDelete,
  onChangeType,
}) => {
  return (
    <div className="flex gap-2 border-b border-gray-400 p-2">
      <div className="flex-grow">{name}</div>
      <div>
        <select value={type} onChange={(e) => onChangeType(e.target.value)}>
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
          <option value="null">null</option>
          <option value="array">array</option>
          <option value="object">object</option>
        </select>
      </div>
      <button className="btn-primary" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export const Schema: React.FC = () => {
  const { selectedTable, schema, deleteColumn, onChangeType } = useDatabase();
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
              const column = schema[columnName];
              return (
                <Column
                  key={index}
                  name={columnName}
                  type={column?.type || "string"}
                  onChangeType={(value) => {
                    onChangeType(columnName, value);
                  }}
                  onDelete={() => deleteColumn(columnName)}
                />
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
