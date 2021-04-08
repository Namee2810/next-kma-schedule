import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang="vi">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Cotent-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="Thời khóa biểu trực tuyến dành cho sinh viên Học viện Kỹ thuật Mật mã (KMA)" />
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