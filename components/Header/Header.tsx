import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import { useEffect, useState } from "react";
import { resolve } from "node:path/win32";
import { IWallet } from "mongoose/models/Wallet";
import { IResponseWalletMeGet } from "pages/api/wallet";
import Link from "next/link";

interface IProps {
  session?: Session | null;
}

const Header = (props: IProps) => {
  const { data: session } = useSession();
  const [wallet, setWallet] = useState<IWallet>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet`).then(
      async (e: Response) => {
        const jsonValue: IResponseWalletMeGet = await e.json();
        const value = jsonValue?.data;
        setWallet(value);
      }
    );
  }, []);

  const isLoggedIn = session;

  // console.log("session", session);

  const loggedInContent = (
    <>
      <Link href="/" className="nickname">
        {session?.user?.name}
      </Link>
      <Link href="/" className="currency">
        <span>{wallet?.currency?.toLocaleString()} $</span>
      </Link>
      <Link href="/" onClick={() => signOut()}>
        Log out
      </Link>
    </>
  );
  const loggedOutContent = (
    <>
      <Link
        href="/"
        onClick={(e) => {
          e.preventDefault();
          signIn("google", {
            callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
          });
        }}
      >
        Log in
      </Link>
    </>
  );

  return (
    <header className="header-main">
      <div className="con-fluid">
        <div className="h-l">
          <Link href="#" className="logo">
            Pelikan LAB
          </Link>
        </div>
        <div className="h-r">
          {isLoggedIn ? loggedInContent : loggedOutContent}
        </div>
      </div>
    </header>
  );
};

export default Header;
