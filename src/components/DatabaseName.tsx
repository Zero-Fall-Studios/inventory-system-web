import { useDatabase } from "./DatabaseProvider";

export const DatabaseName: React.FC = () => {
  const { database, setDatabaseName } = useDatabase();
  return (
    <div className="flex gap-2">
      <label htmlFor="dbName" className="dark:text-white">
        Database Name:
      </label>
      <input
        type="text"
        id="dbName"
        value={database.name}
        onChange={(e) => setDatabaseName(e.target.value)}
      />
    </div>
  );
};
