import { useDatabase } from "./DatabaseProvider";

export const Tables: React.FC = () => {
  const { database, viewSchema, viewData, selectedTable, exportData } =
    useDatabase();
  return (
    <div>
      <h2 className="dark:text-white">Tables</h2>
      <hr />
      {Object.keys(database.tables).map((tableName) => (
        <div
          key={tableName}
          className={`flex justify-between gap-2 p-1 ${
            selectedTable === tableName ? "bg-gray-300 " : ""
          }`}
        >
          <h3
            className={` ${
              selectedTable === tableName ? "text-black" : "dark:text-white"
            }`}
          >
            {tableName}
          </h3>
          <div className="flex justify-between gap-2">
            <button
              className="btn-primary"
              onClick={() => viewSchema(tableName)}
            >
              View Schema
            </button>
            <button className="btn-primary" onClick={() => viewData(tableName)}>
              View Data
            </button>
            <button
              className="btn-primary"
              onClick={() => exportData(tableName)}
            >
              Export
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
