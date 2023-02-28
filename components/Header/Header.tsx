import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { IWallet } from "mongoose/models/Wallet";
import Link from "next/link";
import FluidContainer from "components/Layout/FluidContainer";
// import AnimatedCounter from "components/AnimatedCounter/AnimtedCounter";
import { SessionType } from "utils/auth/authTypes";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Notifications, { notificationDropdownMenu } from "./Notifications";
import { Socket } from "socket.io-client";

interface IProps {
  session: SessionType;
  wallet?: IWallet;
  socket?: Socket;
}

const items: MenuProps["items"] = [
  {
    key: "profile",
    label: <Link href="/profile">My profile</Link>,
  },
  {
    key: "my-collection",
    label: <Link href="/my-collection">My collection</Link>,
  },
  {
    key: "mint",
    label: <Link href="/mint">Create card</Link>,
  },
  {
    key: "settings",
    label: <Link href="/settings">Settings</Link>,
  },
  {
    key: "logout",
    label: (
      <Link
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
        href="/logout"
      >
        Log out
      </Link>
    ),
  },
];

const Header = (props: IProps) => {
  const { session, wallet, socket } = props;

  console.log("HEADER:: socket", socket);

  const isLoggedIn = session;

  const loggedInContent = (
    <>
      <Dropdown
        menu={{ items: notificationDropdownMenu }}
        placement="bottom"
        trigger={["click"]}
        className="notification-dropdown"
        overlayClassName="notification-dropdown__inner"
      >
        <Link href="/" onClick={(e) => e.preventDefault}>
          <Notifications socket={socket} />
        </Link>
      </Dropdown>
      {wallet && (
        <Link href="/wallet" className="currency">
          <span>
            {/* <AnimatedCounter number={wallet.currency} />$<div>My Wallet</div> */}
            {wallet?.amount?.toLocaleString()} $<div>My Wallet</div>
          </span>
        </Link>
      )}
      <Dropdown menu={{ items }} placement="bottom">
        <Link href="/" className="nickname">
          {session?.user?.name}
        </Link>
      </Dropdown>
      {/* <Link href="/" onClick={() => signOut()}>
        Log out
      </Link> */}
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
      <FluidContainer>
        <div className="h-l">
          <Link href="/" className="logo">
            Pelikan LAB
          </Link>
        </div>
        <div className="h-r">
          {isLoggedIn ? loggedInContent : loggedOutContent}
        </div>
      </FluidContainer>
    </header>
  );
};

export default Header;
