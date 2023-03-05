import { IVoteRecord } from "components/BrandNameCompare/BrandNameCompare";
import { useEffect, useState } from "react";
import { getBrandTracking } from "utils/brand/brandTrackingLoader";

// import { Column } from "@ant-design/plots";
import { ColumnConfig } from "@ant-design/charts";
import dynamic, { DynamicOptions } from "next/dynamic";

let DynamicColumn: any;

import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    country: "AD",
    "hot dog": 4,
    "hot dogColor": "hsl(208, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 54,
    "hot dogColor": "hsl(5, 70%, 50%)",
  },
];

export default function BrandNameReport() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [brandData, setBrandData] = useState<Array<IVoteRecord>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadAntdCharts = () => {
    DynamicColumn = dynamic(
      () => import("@ant-design/charts").then((mod) => mod.Column),
      {
        ssr: false,
        loading: () => <div>Loading...</div>,
      }
    );
  };

  useEffect(() => {
    if (brandData.length > 0 || isMounted) return;
    setIsLoading(true);

    // loadAntdCharts();

    getBrandTracking()
      .then((res) => {
        setBrandData(res?.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
    setIsMounted(true);
  }, [brandData]);

  console.log("brandData", brandData);

  //   const data = [
  //     {
  //       type: "1",
  //       sales: 38,
  //     },
  //     {
  //       type: "2",
  //       sales: 52,
  //     },
  //   ];

  //   const config: ColumnConfig = {
  //     data,
  //     xField: "type",
  //     yField: "sales",
  //     label: {
  //       // label
  //       position: "middle",
  //       // 'top', 'bottom', 'middle',
  //       style: {
  //         fill: "#FFFFFF",
  //         opacity: 0.6,
  //       },
  //     },
  //     xAxis: {
  //       label: {
  //         autoHide: true,
  //         autoRotate: false,
  //       },
  //     },
  //     meta: {
  //       type: {
  //         alias: "Alias One",
  //       },
  //       sales: {
  //         alias: "Alias Two",
  //       },
  //     },
  //   };

  if (!isMounted) return null;

  const renderSummaryChart = () => {
    // const realData = [
    //   {
    //     country: "LIVEE",
    //     value: 2,
    //     valueColor: "hsl(326, 70%, 50%)",
    //   },
    //   {
    //     country: "HD",
    //     value: 5,
    //     valueColor: "hsl(333, 70%, 50%)",
    //   },
    // ];

    const keyRef: any = [];

    const allKeys = brandData?.map((e: any) => {
      const records = e?.records?.find(
        (o: any) => o.type === "VOTE_RECORD_BRAND_NAME"
      )?.data;

      const lastRecord = records[records.length - 1];

      const winnerBrandName = lastRecord?.selected;

      let foundIndex = 0;

      if (
        keyRef?.find((o: any, index: number) => {
          if (o.brandName === winnerBrandName) {
            foundIndex = index;
            return true;
          }
          return false;
        })
      ) {
        keyRef[foundIndex].count += 1;
      } else {
        const newKey = {
          brandName: winnerBrandName,
          count: 1,
        };

        keyRef.push(newKey);
      }

      return winnerBrandName;
    });

    const dataX = [
      { month: "january", payments: 333823 },
      { month: "february", payments: 289877 },
      { month: "march", payments: 207712 },
      { month: "april", payments: 21550 },
      { month: "may", payments: 60084 },
    ];

    const realData = keyRef.map((e: any) => {
      return {
        name: e.brandName,
        count: e.count,
      };
    });

    return (
      <ResponsiveBar
        data={realData}
        motionConfig={{
          mass: 1,
          tension: 500,
          friction: 17,
          clamp: false,
          precision: 0.01,
          velocity: 0,
        }}
        // keys={["value", "PLAY:BACK"]}
        keys={["count"]}
        // indexBy="country"
        indexBy="name"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={8}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    );
  };

  const renderDeviceChart = () => {
    const iphoneUsers = brandData.filter(
      (item) => item?.userBrowserInfo?.platform === "iPhone"
    );

    const androidUsers = brandData.filter(
      (item) => item?.userBrowserInfo?.userAgentData?.platform === "Android"
    );

    const desktopUsers = brandData.filter(
      (item) => item?.userBrowserInfo?.platform === "Win32"
    );

    const otherDeviceUsers = brandData.filter(
      (item) =>
        item?.userBrowserInfo?.userAgentData?.platform !== "Android" &&
        item?.userBrowserInfo?.platform !== "iPhone" &&
        item?.userBrowserInfo?.platform !== "Win32" &&
        item?.userBrowserInfo !== undefined
    );

    const undefinedUsers = brandData.filter(
      (item) => item?.userBrowserInfo === undefined
    );

    const tempData = [
      {
        id: "desktop-win",
        label: "Desktop (Windows)",
        value: desktopUsers?.length,
        color: "hsl(66, 70%, 50%)",
      },
      {
        id: "android",
        label: "Android",
        value: androidUsers?.length,
        color: "hsl(151, 70%, 50%)",
      },
      {
        id: "iphone",
        label: "iPhone",
        value: iphoneUsers?.length,
        color: "hsl(242, 70%, 50%)",
      },
      {
        id: "other",
        label: "Other",
        value: otherDeviceUsers?.length,
        color: "hsl(238, 70%, 50%)",
      },
      {
        id: "undefined",
        label: "Undefined",
        value: undefinedUsers?.length,
        color: "hsl(147, 70%, 50%)",
      },
    ];

    const realData = tempData
      ?.map((e) => {
        return e?.value > 0 ? e : null;
      })
      ?.filter((e) => e !== null);

    return (
      <ResponsivePie
        data={realData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.3}
        padAngle={2}
        cornerRadius={0.1}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        motionConfig={{
          mass: 1,
          tension: 500,
          friction: 17,
          clamp: false,
          precision: 0.01,
          velocity: 0,
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#fff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 16,
            itemWidth: 200,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
      />
    );
  };

  return (
    <div className="App">
      <div className="p-report">
        <div className="report-header">Report summary</div>
        {isLoading && (
          <div className="ld-s">
            <span className="loader"></span>
          </div>
        )}
        {!isLoading && (
          <div className="report-body">
            <div className="total-reports">
              <span className="label">Total reports</span>
              <span className="value">{brandData?.length}</span>
            </div>
            <div className="summary">
              <div style={{ height: "20rem", color: "var(--black)" }}>
                {renderSummaryChart()}
              </div>
              <div style={{ height: "20rem", color: "var(--black)" }}>
                {renderDeviceChart()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
