import ButtonPill from "components/ButtonPill/ButtonPill";
import { IBrandData } from "pages/brand-name";
import { useEffect, useState } from "react";

interface IProps {
  brandData: Array<IBrandData>;
}

const VOTE_RECORD_BRAND_NAME_TYPE = "VOTE_RECORD_BRAND_NAME";

type VoteRecordType = typeof VOTE_RECORD_BRAND_NAME_TYPE;

interface IVoteBrandNameDataRecord {
  stepIdleTime: number;
  preferedBrandName: string;
  toBrandName: string;
  selected: string;
  isInitialSelection: boolean;
}

interface IVoteBrandNameRecord {
  type: VoteRecordType;
  data: Array<IVoteBrandNameDataRecord>;
}

type VoteRecordSingletonType = IVoteBrandNameRecord;

interface IVoteRecord {
  records: VoteRecordSingletonType;
  totalTime: number;
}

const shuffle = (array: Array<any>) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const BrandNameCompare = (props: IProps) => {
  const newBrandData = shuffle([...props.brandData]);

  const [winner, setWinner] = useState<IBrandData>();

  const [isSending, setIsSending] = useState<boolean>(false);

  const [startDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();
  const [lastActionClick, setLastActionClick] = useState<Date>();

  const [brandData, setBrandData] = useState<Array<IBrandData>>([
    ...newBrandData,
  ]);

  const [compareItems, setCompareItems] = useState<Array<IBrandData | null>>([
    null,
    null,
  ]);

  const [brandNameVoteRecods, setBrandNameVoteRecods] = useState<
    Array<IVoteBrandNameDataRecord>
  >([]);

  useEffect(() => {
    const newCompare = [brandData[0], brandData[1]];
    const newBrandData = [...brandData];

    newBrandData.shift();
    newBrandData.shift();

    setCompareItems(newCompare);
    setBrandData(newBrandData);
  }, []);

  useEffect(() => {
    if (!!endDate) {
      setIsSending(true);
      const final: IVoteRecord = {
        records: {
          type: VOTE_RECORD_BRAND_NAME_TYPE,
          data: brandNameVoteRecods,
        },
        totalTime: (endDate.getTime() - startDate.getTime()) / 1000,
      };

      console.log("end ... wrap", final);
    }
  }, [endDate]);

  const addVoteBrandNameRecord = (selectedBrandName: IBrandData) => {
    const isInitialSelection = lastActionClick === undefined;

    const actualDate = new Date();

    const newBrandNameVoteRecods = [...brandNameVoteRecods];

    const stepIdleTime = isInitialSelection
      ? (actualDate.getTime() - startDate?.getTime()) / 1000
      : (actualDate.getTime() - lastActionClick?.getTime()) / 1000;

    let preferedBrandName = null;
    let toBrandName = null;

    if (isInitialSelection) {
      preferedBrandName = compareItems[0]?.name;
      toBrandName = compareItems[1]?.name;
    } else {
      const lastAddedBrandName =
        newBrandNameVoteRecods[newBrandNameVoteRecods?.length - 1].selected;

      preferedBrandName = compareItems?.find(
        (e) => e?.name === lastAddedBrandName
      )?.name;

      toBrandName = compareItems?.find(
        (e) => e?.name !== lastAddedBrandName
      )?.name;
    }

    const newVoteRecord: IVoteBrandNameDataRecord = {
      stepIdleTime,
      preferedBrandName: preferedBrandName as string,
      toBrandName: toBrandName as string,
      selected: selectedBrandName.name,
      isInitialSelection,
    };

    newBrandNameVoteRecods.push(newVoteRecord);

    setBrandNameVoteRecods(newBrandNameVoteRecods);

    setLastActionClick(actualDate);
  };

  const handleCompareSelect = (index: number) => {
    if (!compareItems[0] || !compareItems[1]) return;

    const upcomingBrandName = brandData[0];

    const selectedBrandName = compareItems[index];

    const newCompare =
      index === 0
        ? [selectedBrandName, upcomingBrandName]
        : [upcomingBrandName, selectedBrandName];
    const newBrandData = [...brandData];

    newBrandData.shift();

    addVoteBrandNameRecord(selectedBrandName as IBrandData);
    setCompareItems(newCompare);
    setBrandData(newBrandData);

    if (upcomingBrandName === undefined) {
      setWinner(compareItems[index] as IBrandData);
      setEndDate(new Date());
    }
  };

  return (
    <div>
      <div className="compare-section-inner">
        {compareItems
          ?.filter((e) => !!e)
          .map((item, index) => {
            const { name } = item!;
            return (
              <ButtonPill
                key={`btn-pill-compare-${index}`}
                text={name}
                onMouseOver={(e) => e.target.classList.add("active")}
                onMouseOut={(e) => e.target.classList.remove("active")}
                onClick={(e) => {
                  handleCompareSelect(index);
                  e.target.blur();
                  e.preventDefault();
                  e.stopPropagation();
                  e.target.classList.remove("active");
                }}
              />
            );
          })}
      </div>
      <div className={`thanks-section ${!!endDate ? "visible" : ""}`}>
        <div>
          <p>
            <span>Thank you</span> for taking the time to help us. Your
            assistance has been invaluable and we are truly grateful for your
            efforts. Your willingness to lend a helping hand has not only made a
            difference in our current situation, but it has also inspired us to
            pay it forward and help others in need.
          </p>
        </div>
        <div className={`loading-info ${isSending ? "visible" : ""} `}>
          <span className="loader"></span>
        </div>

        {/* <div className="winner-section">
          <i>Sending data ...</i>
        </div> */}
      </div>
    </div>
  );
};

export default BrandNameCompare;
