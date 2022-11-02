import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { IWallet } from "mongoose/models/Wallet";
import Link from "next/link";

interface IProps {
  session: Session | null;
  wallet: IWallet | null;
}

const Header = (props: IProps) => {
  const { session, wallet } = props;

  if (!session || !wallet) return null;

  // useEffect(() => {
  //   if (sessionData?.status === "authenticated" && false) {
  //     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet`).then(
  //       async (e: Response) => {
  //         const jsonValue: IResponseWalletMeGet = await e.json();
  //         const value = jsonValue?.data;
  //         setWallet(value);
  //       }
  //     );
  //   }
  // }, [session]);

  const isLoggedIn = session;

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
