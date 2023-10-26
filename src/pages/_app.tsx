import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return <Component {...pageProps} />;
}
