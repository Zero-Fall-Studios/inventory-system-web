import { useDatabase } from "./DatabaseProvider";
import { JSONInput } from "./JSONInput";

export const Data: React.FC = () => {
  const { selectedTable, database, schema, addRow } = useDatabase();
  if (!selectedTable) return <></>;
  const table = database.tables[selectedTable];
  const columnNames = Object.keys(schema);
  const data = table?.data || [];
  const handleAddNewRow = () => {
    const newRow: any = {};
    columnNames.forEach((columnName) => {
      const column = table?.schema[columnName];
      let field = null;
      if (column?.type === "string") {
        field = "";
      }
      if (column?.type === "number") {
        field = 0;
      }
      if (column?.type === "boolean") {
        field = false;
      }
      if (column?.type === "null") {
        field = null;
      }
      if (column?.type === "array") {
        field = [];
      }
      if (column?.type === "object") {
        field = {};
      }
      newRow[columnName] = field;
    });
    addRow(newRow);
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full ">
        <thead className="bg-primary dark:text-white">
          <tr>
            {columnNames.map((columnName) => (
              <th key={columnName} className="px-6 py-3">
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <tr
              key={rowIndex}
              className="border-b bg-white dark:border-gray-700 "
            >
              {columnNames.map((columnName) => (
                <td key={columnName} className="border px-6 py-4">
                  {(row[columnName] || "").toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            {columnNames.map((columnName) => {
              const column = table?.schema[columnName];

              let field = <></>;
              if (column?.type === "string") {
                field = <JSONInput value={""} onChange={() => {}} />;
              }
              if (column?.type === "number") {
                field = <JSONInput value={0} onChange={() => {}} />;
              }
              if (column?.type === "boolean") {
                field = <JSONInput value={false} onChange={() => {}} />;
              }
              if (column?.type === "null") {
                field = <JSONInput value={null} onChange={() => {}} />;
              }
              if (column?.type === "array") {
                field = <JSONInput value={[]} onChange={() => {}} />;
              }
              if (column?.type === "object") {
                field = <JSONInput value={{}} onChange={() => {}} />;
              }

              return (
                <td
                  key={columnName}
                  className="border-b border-r bg-white p-2 dark:border-gray-700"
                >
                  {field}
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
      <button className="btn-secondary w-full" onClick={handleAddNewRow}>
        Add Row
      </button>
    </div>
  );
};
