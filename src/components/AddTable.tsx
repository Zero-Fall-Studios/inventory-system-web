import { useState, type KeyboardEvent } from "react";
import { useDatabase } from "./DatabaseProvider";

export const AddTable: React.FC = () => {
  const { addTable } = useDatabase();
  const [tableName, setTableName] = useState("");
  const handleSubmit = () => {
    addTable(tableName);
    setTableName("");
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex justify-between gap-2">
      <input
        className="flex-grow"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        placeholder="New Table Name"
        onKeyPress={handleKeyPress}
      />
      <button className="btn-secondary" onClick={handleSubmit}>
        +
      </button>
    </div>
  );
};
