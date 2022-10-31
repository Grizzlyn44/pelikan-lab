import Head from "next/head";
import Image from "next/image";
import Waves from "components/Waves/Waves";

import styles from "../styles/Home.module.css";
import ShineCard from "components/ShineCard/ShineCard";

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
];

const generateCards = () => {
  return cards?.map((card) => <ShineCard cover={card.cover} />);
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pelikan LAB</title>
        <meta name="description" content="Pelikan LAB - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="con-fluid">
          <h1 className={styles.title}>Pelikan LAB</h1>

          <p className={styles.description}>
            Definetly not <code className={styles.code}>tech</code>
          </p>
          <div className="cards-grid">{generateCards()}</div>
        </div>
        <Waves />
      </main>

      <footer className={styles.footer}>
        <div className="con-fluid">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <span>Powered by </span>
            <span className={styles.logo}>
              <Image
                src="/favicon.ico"
                alt="Vercel Logo"
                width={24}
                height={24}
              />
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
