import { Data } from "./Data";
import { useDatabase } from "./DatabaseProvider";
import { Schema } from "./Schema";

export const View: React.FC = () => {
  const { selectedTable, selectedView } = useDatabase();
  if (!selectedTable) return <></>;
  if (selectedView === "schema") {
    return <Schema />;
  }
  return <Data />;
};
