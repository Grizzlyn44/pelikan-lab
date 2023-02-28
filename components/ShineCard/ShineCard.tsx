import { CSSProperties, useRef, useState } from "react";
import Image from "next/image";

interface IProps {
  cover: string;
}

interface ICoordinates {
  x: number;
  y: number;
}

const ShineCard = (props: IProps) => {
  const { cover } = props;
  const [rotate, setRotate] = useState<ICoordinates>({ x: 0, y: 0 });
  const [gradientPosition, setGradientPosition] = useState<ICoordinates>({
    x: 0,
    y: 0,
  });
  const [sparkPosition, setSparkPosition] = useState<ICoordinates>({
    x: 0,
    y: 0,
  });
  const [opacity, setOpacity] = useState<number>(1);
  const cardRef = useRef(null);

  const styleVariables = {
    "--transformVar": `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
    "--gradientPositionVar": `${gradientPosition.x}% ${gradientPosition.y}%`,
    "--sparkPositionVar": `${sparkPosition.x}% ${sparkPosition.y}%`,
    "--opacityVar": opacity,
  };

  let x: any;

  const styles: CSSProperties | any = {
    backgroundImage: `url(${cover})`,
    // "--color1": "rgba(0, 231, 255, 1)",
    // "--color2": "rgba(255, 0, 231, 1)",
    "--color1": "#fac",
    "--color2": "#ddccaa",
    "--colorShadow1": "rgba(102, 255, 222, .55)",
    "--colorShadow2": "rgba(102, 255, 222, .55)",
    ...styleVariables,
  };

  const onMouseMoveHandler = (e: any) => {
    var pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    e.preventDefault();
    if (e.type === "touchmove") {
      pos = [e.touches[0].clientX, e.touches[0].clientY];
    }

    const card: any = cardRef?.current;

    // math for mouse position
    var l = pos[0];
    var t = pos[1];
    var h = card?.clientHeight;
    var w = card?.clientWidth;
    var px = Math.abs(Math.floor((100 / w) * l) - 100);
    var py = Math.abs(Math.floor((100 / h) * t) - 100);
    var pa = 50 - px + (50 - py);

    // math for gradient / background positions
    var lp = 50 + (px - 50) / 1.5;
    var tp = 50 + (py - 50) / 1.5;
    var ty = ((tp - 50) / 2) * -1;
    var tx = ((lp - 50) / 1.5) * 0.5;
    setRotate({
      x: ty,
      y: tx,
    });

    var px_spark = 50 + (px - 50) / 7;
    var py_spark = 50 + (py - 50) / 7;
    var p_opc = 20 + Math.abs(pa) * 1.5;

    setGradientPosition({ x: lp, y: tp });
    setSparkPosition({ x: px_spark, y: py_spark });
    setOpacity(p_opc / 100);

    // card.classList.add("active");
    card.classList.remove("animated");
    if (e.type === "touchmove") {
      return false;
    }
    clearTimeout(x);
  };

  const onMouseOutHandler = (e: any) => {
    // remove css, apply custom animation on end
    const card = e.target;

    // $style.html("");
    // card.style = ""
    setRotate({ x: 0, y: 0 });
    x = setTimeout(() => {
      card.classList.add("animated");
    }, 2500);
  };

  return (
    <>
      <div
        className="card animated"
        style={styles}
        ref={cardRef}
        onMouseMove={(e) => onMouseMoveHandler(e)}
        onTouchMove={(e) => onMouseMoveHandler(e)}
        onMouseOut={(e) => onMouseOutHandler(e)}
      />
    </>
  );
};

export default ShineCard;
