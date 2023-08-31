import { useDatabase } from "./DatabaseProvider";

export const Tables: React.FC = () => {
  const { database, viewSchema, viewData, selectedTable, exportData } =
    useDatabase();
  return (
    <div>
      {Object.keys(database.tables).map((tableName) => (
        <div
          key={tableName}
          className={`flex justify-between gap-2 p-2 sm:flex-col ${
            selectedTable === tableName ? "bg-slate-300 " : ""
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
              Schema
            </button>
            <button className="btn-primary" onClick={() => viewData(tableName)}>
              Data
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
