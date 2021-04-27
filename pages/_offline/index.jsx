import Head from "next/head";
import React from 'react';
import styles from "./styles.module.scss";

function OfflinePage(props) {
  return (
    <div className={styles.OfflinePage}>
      <Head>
        <title>Không có kết nối 😭</title>
      </Head>
      <div>
        <div>Ôi không !!!</div>
        <div>Bạn mất kết nối rồi 😥</div>
        <a href="/">
          <button>Thử truy cập trang chủ</button>
        </a>
      </div>

    </div>
  );
}

export default OfflinePage;