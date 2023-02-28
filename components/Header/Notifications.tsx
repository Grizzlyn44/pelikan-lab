import {
  MinusOutlined,
  PlusOutlined,
  QuestionOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Switch,
  Dropdown,
  MenuProps,
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const ButtonGroup = Button.Group;

enum NotificationEventType {
  Ping = 0,
  IncomingMoney,
  IncomingBuy,
  IncomingOffer,
  IncomingItem,
}

interface INotification {
  from: string;
  to: string;
  eventType: NotificationEventType;
  time: any; //@TODO time
}

interface IProps {
  socket?: Socket;
}

export const notificationDropdownMenu: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/">Test notification 1</Link>,
  },
  {
    key: "2",
    label: <Link href="/">Test notification 2</Link>,
  },
  {
    key: "3",
    label: <Link href="/">Test notification 3</Link>,
  },
];

const Notifications = (props: IProps) => {
  const { socket } = props;

  const [count, setCount] = useState(5);
  const [show, setShow] = useState(true);

  console.log("NOTIFICATION:: SOCKET", socket);

  const increase = () => {
    setCount(count + 1);
  };

  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };

  const random = () => {
    const newCount = Math.floor(Math.random() * 100);
    setCount(newCount);
  };

  const onChange = (checked: boolean) => {
    setShow(checked);
  };

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        console.log("notification data", data);
      });
    }
  }, [socket]);

  return (
    <div className="notification">
      {/* <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}> */}
      <Badge count={count}>
        <NotificationOutlined />
      </Badge>
      {/* </Dropdown> */}
    </div>
  );
};

export default Notifications;
