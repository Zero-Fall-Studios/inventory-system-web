import { useEffect, useState } from "react";
import { AddTable } from "~/components/AddTable";
import { DatabaseName } from "~/components/DatabaseName";
import { DatabaseProvider } from "~/components/DatabaseProvider";
import JSONTextarea from "~/components/JSONTextArea";
import { ScreenSize } from "~/components/ScreenSize";
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
          <main className="bg-secondary flex flex-grow gap-1">
            <div className="flex w-52 flex-col gap-2 p-2">
              <Tables />
              <AddTable />
              <aside className="flex-grow">
                <JSONTextarea />
              </aside>
            </div>
            <section className="bg-content flex-grow">
              <View />
            </section>
          </main>
          <ScreenSize />
        </div>
      </DatabaseProvider>
    </>
  );
}
