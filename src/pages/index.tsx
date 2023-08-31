import { useEffect, useState } from "react";
import { AddTable } from "~/components/AddTable";
import { DatabaseName } from "~/components/DatabaseName";
import { DatabaseProvider } from "~/components/DatabaseProvider";
import JSONTextarea from "~/components/JSONTextArea";
import { Tables } from "~/components/Tables";
import { View } from "~/components/View";

const LeftColumn = () => {
  return (
    <>
      <Tables />
      <AddTable />
      <JSONTextarea />
    </>
  );
};

const RightColumn = () => {
  return (
    <>
      <View />
    </>
  );
};

export default function Page() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return <></>;

  return (
    <>
      <DatabaseProvider>
        <div className="flex min-h-screen flex-col">
          <header className="bg-primary p-2">
            <DatabaseName />
          </header>
          <main className="bg-content flex flex-grow flex-col md:flex-row">
            <section className="w-screen-sm flex flex-col space-y-2 overflow-auto p-2">
              <LeftColumn />
            </section>
            <section className="flex-grow overflow-auto">
              <RightColumn />
            </section>
          </main>
        </div>
      </DatabaseProvider>
    </>
  );
}
