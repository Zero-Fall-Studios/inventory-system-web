import Head from "next/head";
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
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <DatabaseProvider>
        <div className="flex min-h-screen flex-col">
          <header className="bg-primary p-2">
            <DatabaseName />
          </header>
          <main className="flex flex-grow flex-col md:flex-row">
            <section className="w-screen-sm flex flex-col space-y-2 bg-slate-700 p-2">
              <LeftColumn />
            </section>
            <section className="bg-content flex flex-grow items-stretch">
              <RightColumn />
            </section>
          </main>
        </div>
      </DatabaseProvider>
    </>
  );
}
