import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pelikan LAB</title>
        <meta name="description" content="Pelikan LAB - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Pelikan LAB</h1>

        <p className={styles.description}>
          Definetly not <code className={styles.code}>tech</code>
        </p>
      </main>

      <footer className={styles.footer}>
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
      </footer>
    </div>
  );
}
