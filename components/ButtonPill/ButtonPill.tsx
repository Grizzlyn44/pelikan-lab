interface IProps {
  text: string;
  onClick?: () => void;
}

const ButtonPill = (props: IProps) => {
  const { text, onClick } = props;

  return (
    <div onClick={onClick && onClick} className="btn-pill">
      {text}
    </div>
  );
};

export default ButtonPill;
