import Head from "next/head";
import Image from "next/image";
import Waves from "components/Waves/Waves";

import styles from "../styles/Home.module.css";
import ShineCard from "components/ShineCard/ShineCard";

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

          <ShineCard />
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
