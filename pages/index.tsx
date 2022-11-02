import Head from "next/head";
import Image from "next/image";
import Waves from "components/Waves/Waves";

import styles from "../styles/Home.module.css";

import ShineCard from "components/ShineCard/ShineCard";
import { signIn, useSession } from "next-auth/react";
import Header from "components/Header/Header";
import Link from "next/link";

const cards = [
  {
    cover:
      "https://images.genius.com/29fea474b787594489eb68442aae7db2.1000x1000x1.jpg",
  },
  {
    cover:
      "https://images.genius.com/6f06d8e78543c9c7489607698f58bdaa.1000x1000x1.jpg",
  },
  {
    cover:
      "https://www.zrce.cz/wp-content/uploads/2021/12/viktor-sheen-1920x1050.jpg",
  },
  // {
  //   cover: "https://i.ytimg.com/vi/paMmSPQ7Atk/maxresdefault.jpg",
  // },
  // {
  //   cover: "https://www.hiphopstage.cz/wp-content/uploads/yzomandias.jpg"
  // },
];

const generateCards = () => {
  return cards?.map((card, index) => (
    <ShineCard key={`card-${index}`} cover={card.cover} />
  ));
};

export default function Home() {
  // const { data: session } = useSession();

  return (
    <div className="p-home">
      <Head>
        <title>Pelikan LAB</title>
        <meta name="description" content="Pelikan LAB - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header /*session={session} */ />

      <main className="main">
        <div className="con-fluid">
          <h1 className={styles.title}>Pelikan LAB</h1>

          <p className={styles.description}>
            Definitely not <code className={styles.code}>NFT</code>
          </p>
          <div className="cards-grid">{generateCards()}</div>
        </div>
        <div className="show-more-btn">
          <div className="button-27 show-more">Show more</div>
        </div>
        <Waves />
      </main>

      <footer className={styles.footer}>
        <div className="con-fluid">
          <Link href="/" rel="noopener noreferrer">
            <span>Powered by </span>
            <span className={styles.logo}>
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
              currency flow even tho you can <Link href="/">donate</Link> me.
              For scientific purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
