import BrandNameCompare from "components/BrandNameCompare/BrandNameCompare";

export interface IBrandData {
  name: string;
}

const brandData: Array<IBrandData> = [
  { name: "LIVEE" },
  { name: "PLAY.BACK" },
  { name: "NOISE" },
  { name: "SHOW TIME" },
  { name: "LIVE ROOM" },
  { name: "NIGHT STAGE" },
  { name: "STAGE" },
  { name: "STAGE TUNE" },
  { name: "LIVE STAGE" },
  { name: "STAGE LIVE" },
  { name: "STAGE LINE" },
  { name: "STAGE ROOM" },
  { name: "ROOM STAGE" },
  { name: "ON MIC" },
  { name: "STAGE ON" },
  { name: "ON STAGE" },
  { name: "OFF STAGE" },
  { name: "OF STAGE" },
  { name: "BACKSTAGE" },
  { name: "BROADSTAGE" },
  { name: "LIVESTAGE" },
  { name: "NOISE ROOM" },
  { name: "LIVE STAGE" },
];

export default function BrandNameComparer() {
  return (
    <div className="App">
      <div className="compare-section">
        <BrandNameCompare brandData={brandData} />
      </div>
    </div>
  );
}
