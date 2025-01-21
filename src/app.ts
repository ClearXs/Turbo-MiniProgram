import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";

import "./app.scss";

import "./router";
import { useApp } from "taro-hooks";
import Config from "./types/config";

function App({ children }: PropsWithChildren<any>) {
  const { setGlobalData } = useApp<Config>();

  useLaunch(() => {
    setGlobalData("http", { url: "http://localhost:8000" });
  });

  return children;
}

export default App;
