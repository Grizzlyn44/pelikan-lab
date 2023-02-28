import { IWallet } from "mongoose/models/Wallet";
import { GetServerSideProps } from "next/types";
import { loadMyWallet } from "utils/wallet/walletLoader";
import BasicLayout from "components/Layout/BasicLayout";
import { getSessionServerSide } from "utils/auth/authLoader";
import { SessionType } from "utils/auth/authTypes";
import { CustomError } from "utils/error/CustomError";
import { Input, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import ShineCard from "components/ShineCard/ShineCard";

interface IProps {
  session: SessionType;
  wallet?: IWallet;
}

const Wallet = (props: IProps) => {
  const { session, wallet } = props;

  const [sourceFromUrl, setSourceFromUrl] = useState(true);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <BasicLayout
      session={session}
      wallet={wallet}
      pageClassName="p-mint"
      useInvertedFooter
    >
      <div className="mint-view">
        <h2>Mint new card</h2>
        <div className="outter">
          <div className="card-container">
            <ShineCard cover={url} />
          </div>
          <div className="container">
            <div className="input-source">
              <div className="inner-container__left">
                <Input
                  placeholder="URL"
                  className="input"
                  value={url}
                  onChange={(e) => setUrl(e?.target?.value)}
                />
              </div>
              <div className="inner-container__right">
                <Switch
                  checkedChildren="From URL"
                  unCheckedChildren="From file"
                  checked={sourceFromUrl}
                  onChange={(e) => setSourceFromUrl(!sourceFromUrl)}
                />
              </div>
            </div>
            <Input
              placeholder="Name"
              className="input"
              value={name}
              onChange={(e) => setName(e?.target?.value)}
            />
            <TextArea
              className="input"
              showCount
              maxLength={100}
              style={{ height: 120, resize: "none" }}
              value={description}
              onChange={(e) => setDescription(e?.target?.value)}
              placeholder="Decription"
            />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Wallet;

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<{ props: IProps }> => {
  let error = undefined;
  const session = await getSessionServerSide(req);
  // const wallet = await loadMyWallet(session, req.headers.cookie);
  const wallet = await loadMyWallet(session, req.headers.cookie).catch((e) => {
    error = CustomError.createCustomErrorObj(e);
    return undefined;
  });

  return {
    props: { session, wallet },
  };
};
