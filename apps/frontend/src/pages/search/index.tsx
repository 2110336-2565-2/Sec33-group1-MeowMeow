import DashBoard from "@/components/Dashboard/DashBoard";
import SearchPage from "@/components/SearchPage";
import Head from "next/head";
import { Fragment } from "react";

export default function Search() {
  return (
    <Fragment>
      <Head>
        <title>Guide Post</title>
      </Head>
      <DashBoard>
        <SearchPage />
      </DashBoard>
    </Fragment>
  );
}
