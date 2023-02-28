import { Session } from "next-auth/core/types";

import { IWallet } from "mongoose/models/Wallet";

import Head from "next/head";
import Header from "components/Header/Header";
import { GetServerSideProps } from "next/types";
import { getSession } from "next-auth/react";
import { loadMyWallet } from "utils/wallet/walletLoader";
import BasicLayout from "components/Layout/BasicLayout";
import { getSessionServerSide } from "utils/auth/authLoader";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import AnimatedCounter from "components/AnimatedCounter/AnimtedCounter";
import TransactionRow from "components/TransactionRow/TransactionRow";
import { SessionType } from "utils/auth/authTypes";
import { CustomError } from "utils/error/CustomError";
const Apex = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IProps {
  session: SessionType;
  wallet?: IWallet;
}

const Wallet = (props: IProps) => {
  const { session, wallet } = props;

  //   console.log("props", props);

  //   const monthDataSeries1 = {
  //     prices: [0, 5000, 5000],
  //     dates: ["01 Nov 2022", "02 Nov 2022", "03 Nov 2022"],
  //   };

  //   const options: ApexCharts.ApexOptions = {
  //     chart: {
  //       height: 350,
  //       zoom: {
  //         enabled: false,
  //       },
  //     },
  //     fill: {
  //       type: "gradient",
  //       colors: ["#fff", "transparent"],
  //       gradient: {
  //         shadeIntensity: 1,
  //         opacityFrom: 1,
  //         opacityTo: 0,
  //         stops: [0, 90, 100],
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //       width: 2,
  //       colors: ["#fff"],
  //     },
  //     // labels: monthDataSeries1.dates,
  //     xaxis: {
  //       //   type: "datetime",
  //       categories: ["01 Jan X", "02 Jan", "03 Jan"],
  //     },
  //     yaxis: {
  //       opposite: true,
  //     },
  //     series: [
  //       {
  //         name: "STOCK ABC",
  //         data: monthDataSeries1.prices,
  //       },
  //     ],
  //     legend: {
  //       horizontalAlign: "right",
  //     },
  //   };

  //   const apexData = {
  //     series: [
  //       {
  //         name: "STOCK ABC",
  //         data: monthDataSeries1.prices,
  //       },
  //     ],
  //     options,
  //   };

  const transactions = [
    {
      id: "0",
      date: "02/11/2022",

      fromWallet: "xxx",
      fromUser: "yyy",
      toWallet: "xxx",
      toUser: "yyy",

      currency: "$",
      ammount: 5000,
      direction: 1,

      type: 1,
    },
  ];

  if (!wallet) return null;

  return (
    <BasicLayout
      session={session}
      wallet={wallet}
      pageClassName="p-wallet"
      useInvertedFooter
    >
      <div className="balance-view">
        <h2>Your balance</h2>
        {/* <div className="title">Your balance</div> */}
        <div className="money">
          {/* <span className="value">{wallet?.currency?.toLocaleString()}</span> */}
          <span className="value">
            <AnimatedCounter number={wallet.amount} calcTime={1000} />
          </span>
          <span className="currency">$</span>
        </div>
      </div>

      <div className="transactions">
        <h2>Transactions</h2>
        <div className="no-transactions">No transactions yet</div>
        {/* <TransactionRow /> */}
      </div>

      {/* <div className="balance-view">
        <div className="top">
          <div className="title">Your balance</div>
          <div className="money">
            <span className="value">{wallet?.currency?.toLocaleString()}</span>
            <span className="currency">$</span>
          </div>
          <div>
            <div id="chart">
              <Apex
                options={apexData.options}
                series={apexData.options.series}
                type="area"
                width="500"
              />
            </div>
          </div>
        </div>
      </div> */}
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
