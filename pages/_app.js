import 'antd/dist/antd.css';
import { useEffect } from 'react';
import "../styles/calendar.css";
import '../styles/globals.css';
import "../styles/styles.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          (err) => {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
