import { IWallet } from "mongoose/models/Wallet";
import { GetServerSideProps } from "next/types";
import { loadMyWallet } from "utils/wallet/walletLoader";
import BasicLayout from "components/Layout/BasicLayout";
import { getSessionServerSide } from "utils/auth/authLoader";
import { SessionType } from "utils/auth/authTypes";
import { CustomError } from "utils/error/CustomError";
import { Button, Input, Switch, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import ShineCard from "components/ShineCard/ShineCard";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";

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
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const isUrl = (url: string) => {
    const stringIsUrl =
      url.includes("www.") ||
      url.includes("http://") ||
      url.includes("https://");

    const isCorrect = !url.includes(" ");

    return stringIsUrl && isCorrect;
  };

  const mintable = url && isUrl(url) && name && description;

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
                  status={url ? (!isUrl(url) ? "error" : "") : ""}
                  prefix={
                    url ? (
                      !isUrl(url) ? (
                        <Tooltip title="Example: https://www.web.com/placeholder.png">
                          <ClockCircleOutlined />
                        </Tooltip>
                      ) : null
                    ) : null
                  }
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
            <div>
              <div className="css-175z8cs">
                <div className="css-1h3rtzg css-f7ay7b css-5p9vjy css-zjik7">
                  <div className="css-1h3rtzg css-f7ay7b css-ln7vnr css-zjik7">
                    <div
                      className="css-1l1io5o"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderWidth: "3px",
                      }}
                    ></div>
                  </div>
                  <div
                    className="css-joi6zj"
                    style={{ background: "rgb(17, 17, 17)", boxShadow: "none" }}
                  ></div>
                  <div className="css-1vs2kf0">
                    <div style={{ transform: "scale(1)" }}>
                      <svg
                        width="245.99999999999997"
                        height="63.014778325123146"
                        viewBox="0 0 406 104"
                        className="css-1j8o68f"
                      >
                        <defs id="SvgjsDefs7556">
                          <linearGradient id="SvgjsLinearGradient7565">
                            <stop
                              id="SvgjsStop7566"
                              stop-color="#8f5e25"
                              offset="0"
                            ></stop>
                            <stop
                              id="SvgjsStop7567"
                              stop-color="#fbf4a1"
                              offset="0.5"
                            ></stop>
                            <stop
                              id="SvgjsStop7568"
                              stop-color="#8f5e25"
                              offset="1"
                            ></stop>
                          </linearGradient>
                          <linearGradient id="SvgjsLinearGradient7569">
                            <stop
                              id="SvgjsStop7570"
                              stop-color="#8f5e25"
                              offset="0"
                            ></stop>
                            <stop
                              id="SvgjsStop7571"
                              stop-color="#fbf4a1"
                              offset="0.5"
                            ></stop>
                            <stop
                              id="SvgjsStop7572"
                              stop-color="#8f5e25"
                              offset="1"
                            ></stop>
                          </linearGradient>
                          <linearGradient id="SvgjsLinearGradient7573">
                            <stop
                              id="SvgjsStop7574"
                              stop-color="#8f5e25"
                              offset="0"
                            ></stop>
                            <stop
                              id="SvgjsStop7575"
                              stop-color="#fbf4a1"
                              offset="0.5"
                            ></stop>
                            <stop
                              id="SvgjsStop7576"
                              stop-color="#8f5e25"
                              offset="1"
                            ></stop>
                          </linearGradient>
                          <linearGradient id="SvgjsLinearGradient7577">
                            <stop
                              id="SvgjsStop7578"
                              stop-color="#8f5e25"
                              offset="0"
                            ></stop>
                            <stop
                              id="SvgjsStop7579"
                              stop-color="#fbf4a1"
                              offset="0.5"
                            ></stop>
                            <stop
                              id="SvgjsStop7580"
                              stop-color="#8f5e25"
                              offset="1"
                            ></stop>
                          </linearGradient>
                        </defs>
                        <g
                          id="SvgjsG7557"
                          transform="matrix(1.8535682234780595,0,0,1.8535682234780595,-42.67841117390297,-40.13761491113275)"
                          fill="url(#SvgjsLinearGradient7565)"
                        >
                          <path
                            xmlns="http://www.w3.org/2000/svg"
                            d="M54.9,45.1c2.699,2.7,2.699,7.2,0,9.9c-2.7,2.7-7.2,2.7-9.9,0s-2.7-7.2,0-9.9C47.8,42.3,52.2,42.3,54.9,45.1z M62,38  c-1.863-1.863-4.663,0.937-2.8,2.8c2.5,2.5,3.8,5.7,3.8,9.2s-1.4,6.7-3.8,9.2c-1.875,1.875,0.948,4.651,2.8,2.8c3.2-3.2,5-7.5,5-12  S65.2,41.2,62,38z M38,38c-3.2,3.2-5,7.5-5,12s1.8,8.8,5,12c1.847,1.85,4.68-0.92,2.8-2.8C38.4,56.7,37,53.5,37,50s1.4-6.7,3.8-9.2  C42.663,38.938,39.864,36.136,38,38z M33.7,33.7c1.863-1.864-0.937-4.663-2.8-2.8c-10.5,10.5-10.5,27.7,0,38.2  c1.85,1.853,4.676-0.924,2.8-2.8C24.8,57.3,24.8,42.7,33.7,33.7z M69.1,30.9c-1.863-1.863-4.663,0.936-2.8,2.8c9,9,9,23.6,0,32.5  c-1.88,1.88,0.955,4.649,2.8,2.8C79.6,58.6,79.6,41.4,69.1,30.9z"
                          ></path>
                        </g>
                        <g
                          id="SvgjsG7558"
                          transform="matrix(1,0,0,1,405,0)"
                          fill="url(#SvgjsLinearGradient7569)"
                        >
                          <rect
                            xmlns="http://www.w3.org/2000/svg"
                            y="0"
                            height="1"
                            width="1"
                            opacity="0"
                          ></rect>
                          <rect
                            xmlns="http://www.w3.org/2000/svg"
                            y="0"
                            x="-285"
                            width="5"
                            height="104"
                          ></rect>
                        </g>
                        <g
                          id="SvgjsG7559"
                          transform="matrix(2.2486058581919406,0,0,2.2486058581919406,135.3016733990572,13.048034031024695)"
                          fill="url(#SvgjsLinearGradient7573)"
                        >
                          <path d="M4.12 17.32 l5.5 0 l0 2.68 l-8.42 0 l0 -14 l2.92 0 l0 11.32 z M14.54 6 l0 14 l-2.92 0 l0 -14 l2.92 0 z M28.12 6 l3.12 0 l-6.24 14 l-2.64 0 l-6.22 -14 l3.1 0 l4.44 10.42 z M35.76 17.32 l5.92 0 l0 2.68 l-6.32 0 l-2.52 0 l0 -14 l2.92 0 l5.74 0 l0 2.68 l-5.74 0 l0 2.96 l4.34 0 l0 2.64 l-4.34 0 l0 3.04 z M54.36 5.76 c2.46 0 4.02 1.54 4.76 2.9 l-2.16 1.28 c-0.76 -1.06 -1.5 -1.6 -2.6 -1.6 c-0.98 0 -1.7 0.58 -1.7 1.38 s0.46 1.22 1.56 1.62 l0.96 0.34 c3.1 1.1 4.32 2.48 4.32 4.4 c0 2.82 -2.68 4.22 -5.06 4.22 c-2.52 0 -4.48 -1.5 -5.16 -3.46 l2.24 -1.18 c0.5 1.02 1.34 2 2.92 2 c1.14 0 2.02 -0.5 2.02 -1.54 c0 -1 -0.6 -1.44 -2.12 -2.02 l-0.86 -0.3 c-2.06 -0.74 -3.72 -1.76 -3.72 -4.2 c0 -2.24 2.1 -3.84 4.6 -3.84 z M70.3 6 l0 2.68 l-3.48 0 l0 11.32 l-2.92 0 l0 -11.32 l-3.5 0 l0 -2.68 l9.9 0 z M83.47999999999999 20 l-1.06 -2.5 l-6.76 0 l-1.06 2.5 l-3.1 0 l6.22 -14 l2.64 0 l6.24 14 l-3.12 0 z M76.67999999999999 15.120000000000001 l4.72 0 l-2.36 -5.54 z M101.38 12.559999999999999 c0.62 4.7 -2.44 7.64 -6.22 7.64 c-3.98 0 -7.26 -2.94 -7.26 -7.2 s3.36 -7.2 7.26 -7.2 c1.86 0 3.5 0.6 4.7 1.66 l-1.76 1.98 c-0.74 -0.52 -1.74 -0.9 -2.76 -0.9 c-2.54 0 -4.4 1.86 -4.4 4.46 s1.8 4.46 4.22 4.46 c1.84 0 3.12 -0.66 3.52 -2.42 l-3.3 0 l0 -2.48 l6 0 z M106.46000000000001 17.32 l5.92 0 l0 2.68 l-6.32 0 l-2.52 0 l0 -14 l2.92 0 l5.74 0 l0 2.68 l-5.74 0 l0 2.96 l4.34 0 l0 2.64 l-4.34 0 l0 3.04 z"></path>
                        </g>
                        <g
                          id="SvgjsG7560"
                          transform="matrix(0.5636660725764793,0,0,0.5636660725764793,137.43633379303506,66.38459084238733)"
                          fill="url(#SvgjsLinearGradient7577)"
                        >
                          <path d="M13.8 15.46 q0 1.46 -0.88 2.6 q-0.86 1.08 -2.37 1.68 t-3.41 0.6 q-1.74 0 -3.38 -0.81 t-2.76 -2.25 l1.56 -1.46 q1.94 2.34 4.58 2.34 q1.16 0 2.12 -0.28 q1.06 -0.32 1.64 -0.9 q0.66 -0.64 0.66 -1.52 q0 -1.06 -0.66 -1.6 q-0.56 -0.46 -1.66 -0.6 q-0.64 -0.08 -2.1 -0.08 q-2.68 0 -4.09 -0.98 t-1.41 -2.88 q0 -1.2 0.71 -2.28 t1.95 -1.72 q1.28 -0.68 2.84 -0.68 q1.76 0 3.18 0.54 q1.52 0.58 2.82 1.82 l-1.36 1.6 q-1.22 -0.98 -2.22 -1.37 t-2.42 -0.39 q-0.82 0 -1.53 0.34 t-1.13 0.91 t-0.42 1.21 q0 1.72 3.18 1.72 q2.54 0 4.02 0.52 q1.4 0.5 2 1.52 q0.54 0.9 0.54 2.4 z M21.66 6.66 l-0.82 -1.84 l2.4 0 l7.18 15.18 l-2.44 0 l-0.98 -2.18 l-4.54 0 q-1.28 0 -2.3 0.24 q-0.9 0.22 -1.5 0.58 q-0.54 0.32 -0.72 0.66 l-0.38 0.7 l-2.36 0 z M23.26 15.620000000000001 l2.76 0 l-3.26 -6.3 l-3.3 7.14 q0.44 -0.38 1.34 -0.6 q1.02 -0.24 2.46 -0.24 z M45.96 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M55.12 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M85.97999999999999 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M99.46 20.34 q-2.1 0 -3.61 -0.73 t-2.3 -2.11 t-0.79 -3.3 l0 -9.12 l2.16 0 l0 9.12 q0 1.92 1.18 2.94 t3.36 1.02 t3.36 -1.02 t1.18 -2.94 l0 -9.12 l2.16 0 l0 9.12 q0 1.92 -0.79 3.3 t-2.3 2.11 t-3.61 0.73 z M121.96 15.46 q0 1.46 -0.88 2.6 q-0.86 1.08 -2.37 1.68 t-3.41 0.6 q-1.74 0 -3.38 -0.81 t-2.76 -2.25 l1.56 -1.46 q1.94 2.34 4.58 2.34 q1.16 0 2.12 -0.28 q1.06 -0.32 1.64 -0.9 q0.66 -0.64 0.66 -1.52 q0 -1.06 -0.66 -1.6 q-0.56 -0.46 -1.66 -0.6 q-0.64 -0.08 -2.1 -0.08 q-2.68 0 -4.09 -0.98 t-1.41 -2.88 q0 -1.2 0.71 -2.28 t1.95 -1.72 q1.28 -0.68 2.84 -0.68 q1.76 0 3.18 0.54 q1.52 0.58 2.82 1.82 l-1.36 1.6 q-1.22 -0.98 -2.22 -1.37 t-2.42 -0.39 q-0.82 0 -1.53 0.34 t-1.13 0.91 t-0.42 1.21 q0 1.72 3.18 1.72 q2.54 0 4.02 0.52 q1.4 0.5 2 1.52 q0.54 0.9 0.54 2.4 z M127.3 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M144.48 7 l-1.4 1.64 q-0.82 -0.84 -1.96 -1.32 t-2.4 -0.48 q-1.64 0 -2.99 0.74 t-2.11 2.02 q-0.78 1.34 -0.78 2.98 q0 1.56 0.84 2.88 q0.8 1.24 2.15 1.97 t2.91 0.73 q1.44 0 2.68 -0.62 t2.06 -1.72 l1.34 1.82 q-1.14 1.28 -2.73 1.99 t-3.37 0.71 q-2.22 0 -4.08 -1.08 q-1.82 -1.04 -2.86 -2.86 q-1.08 -1.86 -1.08 -4.08 q0 -2.14 1.14 -3.94 q1.08 -1.72 2.93 -2.73 t3.97 -1.01 q1.66 0 3.16 0.64 q1.46 0.6 2.58 1.72 z M161.93999999999997 13.58 l-9.5 0 l0 -1.86 l9.5 0 l0 1.86 z M173.73999999999998 7.279999999999999 l0 10.54 l3.38 0 q1.4 0 2.52 -0.72 q1.06 -0.7 1.66 -1.88 t0.6 -2.58 q0 -1.46 -0.57 -2.68 t-1.63 -1.94 q-1.14 -0.74 -2.62 -0.74 l-3.34 0 z M170.42 7.279999999999999 l-0.96 -2.2 l7.6 0 q1.98 0 3.62 1.02 q1.58 0.98 2.5 2.68 t0.92 3.7 q0 1.5 -0.59 2.97 t-1.63 2.57 q-1 1.08 -2.14 1.54 q-1.1 0.44 -2.62 0.44 l-5.52 0 l0 -12.72 l-1.18 0 z M189.64 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M196.21999999999997 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M210.11999999999998 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M224.01999999999998 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M238.89999999999998 7.26 l0 4.96 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l2.84 0 q1.18 0 1.84 -0.54 q0.7 -0.58 0.7 -1.74 q0 -1.1 -0.74 -1.64 q-0.64 -0.46 -1.8 -0.46 l-5.66 0 z M245.27999999999997 17.64 l-1.82 -3.82 l-1.74 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 l0 5.6 l-2.18 0 l0 -14.92 l7.84 0 q1.38 0 2.44 0.52 t1.64 1.48 q0.62 1.02 0.62 2.4 q0 1.68 -0.9 2.76 t-2.54 1.5 l1.16 2.38 q0.5 0.74 0.78 1.04 q0.34 0.38 0.65 0.51 t0.81 0.13 l0.22 0 l0.48 -0.02 l0 2.22 q-1.16 0 -1.72 -0.08 q-0.94 -0.16 -1.6 -0.62 q-0.78 -0.56 -1.32 -1.66 z M255.7 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M268.84 7.18 l-1.74 -2.1 l2.82 0 l9.58 11.4 l0 -11.4 l2.2 0 l0 14.92 l-2.16 0 l-8.56 -10.26 l0 10.26 l-2.14 0 l0 -12.82 z M297.2 7.279999999999999 l-5.26 0 l0 12.72 l-2.12 0 l0 -12.72 l-5.32 0 l0 -2.2 l12.7 0 l0 2.2 z M318.82 5.08 l-6.26 14.92 l-2.58 0 l-6.16 -14.92 l2.36 0 l5.1 12.48 l5.14 -12.48 l2.4 0 z M323.75999999999993 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M330.32 7.279999999999999 l0 4.56 q0.62 -0.36 1.4 -0.5 q0.58 -0.1 1.44 -0.1 l2.56 0 q1.04 0 1.63 -0.52 t0.59 -1.54 q0 -1.9 -2.22 -1.9 l-5.4 0 z M330.32 14.059999999999999 l0 3.76 l5.62 0 q0.66 0 1.26 -0.24 q0.66 -0.24 1.04 -0.7 q0.44 -0.54 0.44 -1.24 q0 -1.2 -0.94 -1.74 q-0.74 -0.44 -2.02 -0.44 l-2.56 0 q-1.72 0 -2.84 0.6 z M340.84 15.92 q0 1.4 -0.78 2.38 q-0.68 0.86 -1.92 1.3 q-1.1 0.4 -2.42 0.4 l-7.56 0 l0 -14.92 l7.56 0 q1.28 0 2.27 0.48 t1.55 1.38 q0.58 0.94 0.58 2.22 q0 0.98 -0.35 1.75 t-0.99 1.19 q0.86 0.4 1.42 1.32 q0.64 1.06 0.64 2.5 z M346.62 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
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
            <Button
              type="primary"
              loading={isMinting}
              onClick={() => setIsMinting(true)}
              disabled={!mintable}
            >
              {isMinting ? "Minting..." : "Mint"}
            </Button>
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
