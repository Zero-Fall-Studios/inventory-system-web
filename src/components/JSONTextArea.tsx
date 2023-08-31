import React from "react";
import { useDatabase } from "./DatabaseProvider";

const JSONTextarea: React.FC = () => {
  const { database } = useDatabase();
  return (
    <textarea
      readOnly
      value={JSON.stringify(database, null, 2)}
      className="hidden h-full w-full md:block"
    />
  );
};

export default JSONTextarea;
