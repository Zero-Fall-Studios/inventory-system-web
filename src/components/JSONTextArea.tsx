/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React, { useState } from "react";
import { useDatabase } from "./DatabaseProvider";
import { Toast } from "./Toast";

const JSONTextarea: React.FC = () => {
  const { database, setDatabaseFromString } = useDatabase();
  const copyTextToClipboard = () => {
    navigator.clipboard
      .writeText(JSON.stringify(database))
      .then(() => {
        setMessage("Text successfully copied to clipboard");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Unable to copy text to clipboard");
      });
  };
  const [message, setMessage] = useState("");
  const [dbStr, setDbStr] = useState("");
  const handleDatabaseChange = (e: any) => {
    setDbStr(e.target.value);
  };
  const handleSaveDbFromStr = () => {
    setDatabaseFromString(dbStr);
  };
  return (
    <div className="flex h-full flex-col gap-2">
      <textarea
        value={JSON.stringify(database, null, 2)}
        className="hidden w-full grow md:block"
        onChange={handleDatabaseChange}
      />
      <div className="flex w-full gap-2">
        <button className="btn-primary w-full" onClick={handleSaveDbFromStr}>
          Set DB From Str
        </button>
        <button className="btn-primary w-full" onClick={copyTextToClipboard}>
          Copy to Clipboard
        </button>
      </div>
      {message && (
        <Toast
          message={message}
          onTimeout={() => setMessage("")}
          duration={1000}
        />
      )}
    </div>
  );
};

export default JSONTextarea;
