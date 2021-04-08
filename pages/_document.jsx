import { Head, Html, Main, NextScript } from "next/document";
import React from 'react';

function MyDocument(props) {
  return (
    <Html lang="vi">
      <Head>
        <meta name="description" content="thoi khoa bieu kma, kma schedule, kma" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;