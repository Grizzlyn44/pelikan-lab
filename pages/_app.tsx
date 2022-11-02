import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "styles/main.scss";

interface IProps extends AppProps {
  session?: any;
}

export default function App({ Component, pageProps, session }: IProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
