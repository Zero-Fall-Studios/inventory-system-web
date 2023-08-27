import { useEffect, useState } from "react";
import { AddTable } from "~/components/AddTable";
import { DatabaseName } from "~/components/DatabaseName";
import { DatabaseProvider } from "~/components/DatabaseProvider";
import JSONTextarea from "~/components/JSONTextArea";
import { Tables } from "~/components/Tables";
import { View } from "~/components/View";

export default function Page() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return <></>;

  return (
    <>
      <DatabaseProvider>
        <div className="flex h-screen flex-col">
          <header className="bg-primary p-2">
            <DatabaseName />
          </header>
          <main className="bg-secondary flex flex-grow gap-2">
            <div className="w-1/4  p-2">
              <Tables />
              <div className="py-2">
                <hr />
              </div>
              <AddTable />
            </div>
            <section className="bg-content flex-grow">
              <View />
            </section>
            <aside className="w-52  p-2">
              <JSONTextarea />
            </aside>
          </main>
        </div>
      </DatabaseProvider>
    </>
  );
}
