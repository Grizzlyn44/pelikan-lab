import Link from "next/link";
import Image from "next/image";
import FluidContainer from "components/Layout/FluidContainer";

interface IProps {
  inverted?: boolean;
}

const Footer = (props: IProps) => {
  const { inverted } = props;

  const className = `footer-main${inverted ? " inverted" : ""}`;

  return (
    <footer className={className}>
      <FluidContainer>
        <Link href="/" rel="noopener noreferrer" className="powered-by">
          <span>Powered by </span>
          <span className="logo">
            <Image
              src="/favicon.ico"
              alt="Vercel Logo"
              width={24}
              height={24}
            />
          </span>
        </Link>
        <div className="disclaimer">
          <span className="heading">Disclaimer</span>
          <p>
            The version of this site is only a closed beta version. No real
            currency flow even tho you can <Link href="/">donate</Link> me. For
            scientific purposes only.
          </p>
        </div>
      </FluidContainer>
    </footer>
  );
};

export default Footer;
