import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang="vi">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="Cotent-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="Thời khóa biểu trực tuyến dành cho sinh viên Học viện Kỹ thuật Mật mã (KMA)" />
          <meta name='keywords' content="kma, kma schedule, thoi khoa bieu, thoi khoa bieu kma, mat ma, ki thuat mat ma, hoc vien ki thuat mat ma" />
          <meta name="theme-color" content="#fff" />

          <meta property="og:url" content="https://kma.namee.site" key="ogurl" />
          <meta property="og:image" content="https://kma.namee.site/images/vercel.png" key="ogimage" />
          <meta property="og:title" content="Thời khóa biểu KMA" key="ogtitle" />
          <meta property="og:description" content="Thời khóa biểu trực tuyến dành cho sinh viên Học viện Kỹ thuật Mật mã (KMA)" key="ogdesc" />

          <link rel="icon" href="/favicon.ico" />
          <link rel='apple-touch-icon' sizes='192x19' href='/icons/icon-192x192.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument