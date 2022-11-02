import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import { useEffect, useState } from "react";
import { resolve } from "node:path/win32";
import { IWallet } from "mongoose/models/Wallet";
import { IResponseWalletMeGet } from "pages/api/wallet";

interface IProps {
  session?: Session | null;
}

const Header = (props: IProps) => {
  const { data: session } = useSession();
  const [wallet, setWallet] = useState<IWallet>();

  useEffect(() => {
    fetch("http://localhost:3000/api/wallet").then(async (e: Response) => {
      const jsonValue: IResponseWalletMeGet = await e.json();
      const value = jsonValue?.data;
      setWallet(value);
    });
  }, []);

  const isLoggedIn = session;

  // console.log("session", session);

  const loggedInContent = (
    <>
      <a href="/" className="nickname">
        {session?.user?.name}
      </a>
      <a href="/" className="currency">
        <span>{wallet?.currency?.toLocaleString()} $</span>
      </a>
      <a href="/" onClick={() => signOut()}>
        Log out
      </a>
    </>
  );
  const loggedOutContent = (
    <>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          signIn("google");
        }}
      >
        Log in
      </a>
    </>
  );

  return (
    <header className="header-main">
      <div className="con-fluid">
        <div className="h-l">
          <a href="#" className="logo">
            Pelikan LAB
          </a>
        </div>
        <div className="h-r">
          {isLoggedIn ? loggedInContent : loggedOutContent}
        </div>
      </div>
    </header>
  );
};

export default Header;
