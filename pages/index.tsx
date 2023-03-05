import Waves from "components/Waves/Waves";
import ShineCard from "components/ShineCard/ShineCard";
import { GetServerSideProps } from "next/types";
import { IWallet } from "mongoose/models/Wallet";
import { getSessionServerSide } from "utils/auth/authLoader";
import BasicLayout, { PageWithError } from "components/Layout/BasicLayout";
import FluidContainer from "components/Layout/FluidContainer";
import { SessionType } from "utils/auth/authTypes";
import { loadMyWallet } from "utils/wallet/walletLoader";
import { customErrorCodes } from "utils/error/customErrorCodes";
import { CustomError, ICustomErrorObject } from "utils/error/CustomError";
import _, { Dictionary } from "lodash";
import { prepareProps } from "utils/basePage/basePage";
import ErrorModal from "components/Modal/ErrorModal";
import ioClient from "socket.io-client";
import { useEffect, useState } from "react";
import notification, { NotificationPlacement } from "antd/lib/notification";
import { Socket } from "socket.io-client";

const cards = [
  {
    cover:
      "https://images.genius.com/29fea474b787594489eb68442aae7db2.1000x1000x1.jpg",
  },
  {
    cover:
      "https://images.genius.com/6f06d8e78543c9c7489607698f58bdaa.1000x1000x1.jpg",
  },
  {
    cover:
      "https://www.zrce.cz/wp-content/uploads/2021/12/viktor-sheen-1920x1050.jpg",
  },
  // {
  //   cover: "https://c3.primacdn.cz/sites/default/files/2/1/5771855-kajumi2.jpg"
  // }
  // {
  //   cover: "https://i.ytimg.com/vi/paMmSPQ7Atk/maxresdefault.jpg",
  // },
  // {
  //   cover: "https://www.hiphopstage.cz/wp-content/uploads/yzomandias.jpg"
  // },
];

// const ioTest = ioClient("http://localhost:3001", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd",
//   },
//   transports: ["websocket"],
// });

const generateCards = () => {
  return cards?.map((card, index) => (
    <ShineCard key={`card-${index}`} cover={card.cover} />
  ));
};

interface IProps {
  session: SessionType;
  wallet?: IWallet;
  error?: ICustomErrorObject;
}

export default function Home(props: PageWithError<IProps>) {
  const { session, wallet, error } = props;
  const [socket, setSocket] = useState<Socket>();
  const [notifications, setNotifications] = useState([]);

  console.log("INDEX:: socket", socket);

  const openNotification = (data: any) => {
    const text = data.data;

    notification.info({
      message: `Notification`,
      description: text,
      placement: "bottomRight",
    });
  };

  useEffect(() => {
    if (!!socket) return;
    const io = ioClient("http://localhost:3001", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
      transports: ["websocket"],
    });

    console.log("socket", io);

    setSocket(io);

    io.on("connect", () => {
      console.log("we are here");
    });

    // io.on("notification", (data) => {
    //   console.log("notification data", data);
    //   openNotification(data);
    // });

    return () => {
      io.disconnect();
    };
  }, [socket]);

  return (
    <>
      <ErrorModal isOpen={error} />
      <BasicLayout
        session={session}
        wallet={wallet}
        useFluidContainer={false}
        pageClassName="p-home"
        socket={socket}
      >
        <FluidContainer className="content">
          <h1 className="title">Pelikan LAB</h1>
          <p className="description">
            Definitely not <code className="code">NFT</code>
          </p>

          <div className="cards-grid">{generateCards()}</div>

          <div className="show-more-btn">
            <div className="button-27 show-more">Show more</div>
          </div>
        </FluidContainer>
        <Waves />
      </BasicLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<{ props: PageWithError<IProps> }> => {
  let error: ICustomErrorObject | undefined = undefined;

  const session = await getSessionServerSide(req);
  const wallet = await loadMyWallet(session, req.headers.cookie).catch((e) => {
    if (e.code !== CustomError.codes.UNAUTHORIZED) {
      error = CustomError.createCustomErrorObj(e);
    }
    return undefined;
  });

  return {
    props: prepareProps({ session, wallet, error }),
  };
};
