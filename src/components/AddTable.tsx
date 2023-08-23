import { useState } from "react";
import { useDatabase } from "./DatabaseProvider";

export const AddTable: React.FC = () => {
  const { addTable } = useDatabase();
  const [tableName, setTableName] = useState("");
  const handleSubmit = () => {
    addTable(tableName);
    setTableName("");
  };
  return (
    <div className="flex justify-between gap-2">
      <input
        className="flex-grow"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        placeholder="Table Name"
      />
      <button className="btn-primary" onClick={handleSubmit}>
        Add Table
      </button>
    </div>
  );
};
