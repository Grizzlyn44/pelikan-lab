// import { useRouter } from "next/router";
import BasicLayout from "components/Layout/BasicLayout";
import ShineCard from "components/ShineCard/ShineCard";
import { IWallet } from "mongoose/models/Wallet";
import Link from "next/link";
import { GetServerSideProps } from "next/types";
import { getSessionServerSide } from "utils/auth/authLoader";
import { SessionType } from "utils/auth/authTypes";
import { CustomError } from "utils/error/CustomError";
import { loadMyWallet } from "utils/wallet/walletLoader";

const cardDetails = {
  // url: "https://c.tenor.com/mcVBjnsVjG4AAAAC/yzo-yzomandias.gif",
  url: "https://images.genius.com/6f06d8e78543c9c7489607698f58bdaa.1000x1000x1.jpg",
  name: "Yzomandias",
  description:
    "OG type shit YZOMANDIAS. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam recusandae commodi tempora consequuntur quae blanditiis aut expedita ratione neque doloremque iusto ad, nihil quasi facilis illum rem sunt ex quis!",
  price: 1500,
  currency: "$",
  mintedBy: "PelikanLAB",
  owner: "grizzlyn88",
};

interface IProps {
  session: SessionType;
  wallet?: IWallet;
}

const CardDetail = (props: IProps) => {
  const { session, wallet } = props;
  // console.log("props", props);

  // const router = useRouter();
  // const id = router.query.id as string;

  // console.log("id", id);

  return (
    <BasicLayout
      session={session}
      wallet={wallet}
      pageClassName="p-card-detail"
      useInvertedFooter
    >
      <div className="container">
        <div className="card-con">
          <ShineCard cover={cardDetails.url} />
        </div>
        <div className="info-con">
          <h1 className="title">{cardDetails.name}</h1>
          <div className="description">{cardDetails.description}</div>
          <div className="info-table">
            <div className="info-row">
              <div className="label">Minted by</div>
              <div className="value">
                <Link href="#">{cardDetails.mintedBy}</Link>
              </div>
            </div>
            <div className="info-row">
              <div className="label">Owned by</div>
              <div className="value">
                <Link href="#">{cardDetails.owner}</Link>
              </div>
            </div>
            <div className="info-row">
              <div className="label">Deal state</div>
              <div className="value">Not selling</div>
            </div>
            <div className="info-row">
              <div className="label">Price</div>
              <div className="value">{cardDetails.price} $</div>
            </div>
          </div>
          <div className="btn-buy">
            <span className="text">Buy</span>{" "}
            <span className="price">({cardDetails.price} $)</span>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default CardDetail;

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<{ props: IProps }> => {
  const req = ctx.req;

  let error = undefined;
  const session = await getSessionServerSide(req);
  const wallet = await loadMyWallet(session, req.headers.cookie).catch((e) => {
    error = CustomError.createCustomErrorObj(e);
    return undefined;
  });

  return {
    props: { session, wallet },
  };
};
