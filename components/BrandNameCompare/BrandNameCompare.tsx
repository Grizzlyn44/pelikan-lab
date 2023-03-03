import ButtonPill from "components/ButtonPill/ButtonPill";
import { IBrandData } from "pages/brand-name";
import { useEffect, useState } from "react";

interface IProps {
  brandData: Array<IBrandData>;
}

type CompareItemType = IBrandData | null;

const BrandNameCompare = (props: IProps) => {
  //   const [bestBrandName, setBestBrandName] = React.useState<string | null>(null);
  const [brandDataCopy, setBrandDataCopy] = useState<any>([...props.brandData]);

  const [compareItems, setCompareItems] = useState<Array<CompareItemType>>([
    null,
    null,
  ]);

  const { brandData } = props;

  //   const brandDataCopy = [...brandData];

  useEffect(() => {
    console.log("first", brandDataCopy);

    const newCompare = [brandDataCopy[0], brandDataCopy[1]];
    const newBrandDataCopy = [...brandDataCopy];

    newBrandDataCopy.shift();
    newBrandDataCopy.shift();

    setCompareItems(newCompare);
    setBrandDataCopy(newBrandDataCopy);
  }, []);

  const handleCompareSelect = (index: number) => {
    console.log("selected: ", index);
    if (index === 0) {
      const newCompare = [compareItems[0], brandDataCopy[0]];
      const newBrandDataCopy = [...brandDataCopy];

      newBrandDataCopy.shift();

      setCompareItems(newCompare);
      setBrandDataCopy(newBrandDataCopy);
    } else {
      const newCompare = [brandDataCopy[0], compareItems[1]];
      const newBrandDataCopy = [...brandDataCopy];

      newBrandDataCopy.shift();

      setCompareItems(newCompare);
      setBrandDataCopy(newBrandDataCopy);
    }

    console.log("newBrandDataCopy", brandDataCopy);
  };

  return (
    <>
      {compareItems
        ?.filter((e) => !!e)
        .map((item, index) => {
          const { name } = item!;
          return (
            <ButtonPill
              key={`btn-pill-compare-${index}`}
              text={name}
              onClick={() => handleCompareSelect(index)}
            />
          );
        })}
    </>
  );
};

export default BrandNameCompare;
