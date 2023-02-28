import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { IWallet } from "mongoose/models/Wallet";
import FluidContainer from "components/Layout/FluidContainer";
import { Fragment } from "react";
import { SessionType } from "utils/auth/authTypes";
import { Socket } from "socket.io-client";

export type PageWithError<T extends unknown> = T & {
  error?: any; //@TODO error obj for FE
};

interface IProps {
  showHeader?: boolean;
  showFooter?: boolean;

  useFluidContainer?: boolean;

  pageClassName?: string;

  useInvertedFooter?: boolean;

  session: SessionType;
  wallet?: IWallet;

  socket?: Socket;

  children: React.ReactNode;
}

const BasicLayout = (props: IProps) => {
  const {
    showHeader = true,
    showFooter = true,
    useFluidContainer = true,
    pageClassName = null,
    session,
    wallet,
    children,
    useInvertedFooter,
    socket,
  } = props;

  console.log("LAYOUT:: socket", socket);

  const WrapperComponent = useFluidContainer ? FluidContainer : Fragment;

  return (
    <div className={`page${pageClassName ? ` ${pageClassName}` : ""}`}>
      {showHeader && (
        <Header session={session} wallet={wallet} socket={socket} />
      )}
      <main className="main">
        <WrapperComponent>{children}</WrapperComponent>
      </main>
      {showFooter && <Footer inverted={useInvertedFooter} />}
    </div>
  );
};

export default BasicLayout;
