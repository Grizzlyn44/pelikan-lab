import { useEffect, useState } from "react";

interface IProps {
  number: number;
  calcTime?: number;
  tickTime?: number;
}

const AnimatedCounter = (props: IProps) => {
  let counterInterval: any;

  const { number, calcTime = 350, tickTime = 10 } = props;

  const targetNumber = number;
  // const calcTime = props.number || 350;
  // const tickTime = 10;

  const [numberOutput, setNumberOutput] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);

  const calc = (actualNumber: number) => {
    const i = calcTime / tickTime;
    const d = targetNumber / i;

    if (actualNumber + d > targetNumber) return targetNumber - actualNumber;

    return d;
  };

  const numberCounter = () => {
    setNumberOutput((n) => {
      if (n >= targetNumber) {
        clearInterval(counterInterval);
        return n;
      }
      const addNumber = calc(n);
      return n + addNumber;
    });
  };

  useEffect(() => {
    if (!!counterInterval) return;

    setMounted(true);
    return () => clearInterval(counterInterval);
  }, [counterInterval]);

  useEffect(() => {
    if (mounted) {
      counterInterval = setInterval(() => {
        numberCounter();
      }, tickTime);
    }
  }, [mounted]);

  const numberForView = numberOutput.toFixed(0);

  return <span>{numberForView}</span>;
};

export default AnimatedCounter;
