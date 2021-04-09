import 'antd/dist/antd.css';
import Head from 'next/head';
import "../styles/calendar.css";
import '../styles/globals.css';
import "../styles/styles.scss";

function MyApp({ Component, pageProps }) {
  < Head >
    <link
      rel="preload"
      href="./images/auth_bg.webp"
      as="image"
    />
  </Head >
  return <Component {...pageProps} />
}

export default MyApp
