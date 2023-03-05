interface IProps {
  text: string;
  onClick?: (e: any) => void;
  onMouseOver?: (e: any) => void;
  onMouseOut?: (e: any) => void;
}

const ButtonPill = (props: IProps) => {
  const { text, onClick, onMouseOver, onMouseOut } = props;

  return (
    <div
      onClick={onClick && onClick}
      onMouseOver={onMouseOver && onMouseOver}
      onMouseOut={onMouseOut && onMouseOut}
      // onTouchEnd={(e: any) => e.target.blur()}
      className="btn-pill"
    >
      {text}
    </div>
  );
};

export default ButtonPill;
