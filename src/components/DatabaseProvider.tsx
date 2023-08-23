import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Database, Schema } from "~/types/database.types";

export type DatabaseContextProps = {
  database: Database;
  setDatabaseName: (name: string) => void;
  addTable: (tableName: string) => void;
  viewSchema: (tableName: string) => void;
  viewData: (tableName: string) => void;
  selectedTable: string;
  selectedView: string;
  schema: Schema;
  addColumn: (columnName: string) => void;
  deleteColumn: (columnName: string) => void;
  onChangeType: (columnName: string, value: string) => void;
  addRow: (data: any) => void;
};

const DatabaseContext = createContext<DatabaseContextProps | null>(null);

type ProviderProps = {
  children?: React.ReactNode;
};

const DatabaseProvider: React.FC<ProviderProps> = ({ children }) => {
  const [database, setDatabase] = useLocalStorage<Database>("database", {
    name: "",
    tables: {},
  });
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedView, setSelectedView] = useState<"schema" | "data">("schema");

  const setDatabaseName = (name: string) => {
    const dbCopy = { ...database };
    dbCopy.name = name;
    setDatabase(dbCopy);
  };

  const addTable = (tableName: string) => {
    if (!database.tables[tableName]) {
      const dbCopy = { ...database };
      dbCopy.tables = {
        ...dbCopy.tables,
        [tableName]: { schema: {}, data: [] },
      };
      setDatabase(dbCopy);
    } else {
      alert("Table already exists");
    }
  };

  const [schema, setSchema] = useState<Schema>({});

  const addColumn = (columnName: string) => {
    if (!schema[columnName]) {
      const newSchema = { ...schema };
      newSchema[columnName] = { type: "string" };
      setSchema(newSchema);

      if (selectedTable) {
        const dbCopy = { ...database };
        dbCopy.tables = {
          ...dbCopy.tables,
          [selectedTable]: { schema: newSchema, data: [] },
        };
        setDatabase(dbCopy);
      }
    }
  };

  const deleteColumn = (columnName: string) => {
    if (schema[columnName]) {
      const newSchema = { ...schema };
      delete newSchema[columnName];
      setSchema(newSchema);
      if (selectedTable) {
        const dbCopy = { ...database };
        dbCopy.tables = {
          ...dbCopy.tables,
          [selectedTable]: { schema: newSchema, data: [] },
        };
        setDatabase(dbCopy);
      }
    }
  };

  const onChangeType = (columnName: string, value: string) => {
    if (schema[columnName]) {
      const newSchema = { ...schema };
      newSchema[columnName] = { type: value };
      setSchema(newSchema);
      if (selectedTable) {
        const dbCopy = { ...database };
        dbCopy.tables = {
          ...dbCopy.tables,
          [selectedTable]: { schema: newSchema, data: [] },
        };
        setDatabase(dbCopy);
      }
    }
  };

  const viewSchema = (tableName: string) => {
    setSelectedTable(tableName);
    setSelectedView("schema");
    if (database.tables[tableName]?.schema) {
      setSchema(database.tables[tableName]?.schema || {});
    }
  };
  const viewData = (tableName: string) => {
    setSelectedView("data");
    setSelectedTable(tableName);
  };

  const addRow = (data: any) => {
    if (selectedTable) {
      const schema = database.tables[selectedTable]?.schema || {};
      const prevData = database.tables[selectedTable]?.data || [];
      const dbCopy = { ...database };
      dbCopy.tables = {
        ...dbCopy.tables,
        [selectedTable]: { schema, data: [...prevData, data] },
      };
      setDatabase(dbCopy);
    }
  };

  return (
    <DatabaseContext.Provider
      value={{
        database,
        setDatabaseName,
        addTable,
        viewSchema,
        viewData,
        selectedTable,
        selectedView,
        schema,
        addColumn,
        deleteColumn,
        onChangeType,
        addRow,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  return useContext(DatabaseContext) as DatabaseContextProps;
};

export { DatabaseContext, DatabaseProvider };
