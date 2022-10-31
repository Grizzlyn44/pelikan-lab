import { CSSProperties, useRef, useState } from "react";

// const onMouseOutHandler = () => { //mouseout touchend touchcancel
//     // remove css, apply custom animation on end
//     var $card = $(this);
//     $style.html("");
//     $card.removeAttr("style");
//     x = setTimeout(function () {
//       $card.addClass("animated");
//     }, 2500);
// }

const onMouseMoveHandler = (e: any, setRotate: any, cardRef: any) => {
  console.log("cardRef", cardRef?.current);
  const card = cardRef?.current;
  const cardRec = card?.getBoundingClientRect();

  // normalise touch/mouse
  var pos = [cardRec.offsetX, card.offsetY];
  console.log("pos", pos);
  e.preventDefault();
  if (e.type === "touchmove") {
    pos = [e.touches[0].clientX, e.touches[0].clientY];
  }
  var $card = cardRec; //$(this);
  // math for mouse position
  var l = pos[0];
  var t = pos[1];
  var h = $card.height;
  var w = $card.width;
  var px = Math.abs(Math.floor((100 / w) * l) - 100);
  var py = Math.abs(Math.floor((100 / h) * t) - 100);
  var pa = 50 - px + (50 - py);
  // math for gradient / background positions
  var lp = 50 + (px - 50) / 1.5;
  var tp = 50 + (py - 50) / 1.5;
  var px_spark = 50 + (px - 50) / 7;
  var py_spark = 50 + (py - 50) / 7;
  var p_opc = 20 + Math.abs(pa) * 1.5;
  var ty = ((tp - 50) / 2) * -1;
  var tx = ((lp - 50) / 1.5) * 0.5;
  // css to apply for active card
  var grad_pos = `background-position: ${lp}% ${tp}%;`;
  var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
  var opc = `opacity: ${p_opc / 100};`;
  var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;

  setRotate(`rotateX(${ty}deg) rotateY(${tx}deg)`);
  //   card.style = {
  //     ...card.style,
  //     transform: `rotateX(${ty}deg) rotateY(${tx}deg)`,
  //   };
  //   card.style = card.style + tf;
  // need to use a <style> tag for psuedo elements
  var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `;
  // set / apply css class and style
  // $cards.removeClass("active");
  //   $card.removeClass("animated");
  //   $card.attr("style", tf);
  // $style.html(style);
  if (e.type === "touchmove") {
    return false;
  }
  // clearTimeout(x);
};

const ShineCard = () => {
  const [rotate, setRotate] = useState<any>(null);
  const cardRef = useRef(null);

  const cover = "http://freshspace.cz/wp-content/uploads/2015/04/LOGIC.jpg";

  const styles: CSSProperties | any = {
    backgroundImage: `url(${cover})`,
    "--color1": "rgba(0, 231, 255, .25)",
    "--color2": "rgba(255, 0, 231, .25)",
    transform: rotate,
  };

  return (
    <div
      className="card animated"
      style={styles}
      //   ref={cardRef}
      //   onMouseMove={(e) => onMouseMoveHandler(e, setRotate, cardRef)}
      //   onTouchMove={(e) => onMouseMoveHandler(e, setRotate, cardRef)}
      //   onClick={() => {
      //     console.log("cardRef", cardRef);
      //   }}
    ></div>
  );
};

export default ShineCard;
