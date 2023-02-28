interface IProps {
  children: React.ReactNode;
  className?: string;
}

const FluidContainer = (props: IProps) => {
  const { children, className } = props;

  const classNameToUse = `con-fluid${className ? ` ${className}` : ""}`;

  return <div className={classNameToUse}>{children}</div>;
};

export default FluidContainer;
