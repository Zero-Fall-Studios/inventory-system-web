import { useState, type KeyboardEvent } from "react";
import { useDatabase } from "./DatabaseProvider";

export const AddColumn: React.FC = () => {
  const { addColumn } = useDatabase();
  const [columnName, setColumnName] = useState("");
  const handleSubmit = () => {
    addColumn(columnName);
    setColumnName("");
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex justify-between gap-2 bg-stone-400 p-2">
      <input
        className="flex-grow"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        placeholder="New Column Name"
        onKeyPress={handleKeyPress}
      />
      <button
        className="btn-secondary"
        onClick={handleSubmit}
        disabled={!columnName.length}
      >
        +
      </button>
    </div>
  );
};
