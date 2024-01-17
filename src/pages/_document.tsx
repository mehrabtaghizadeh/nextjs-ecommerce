import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fa-IR" dir='rtl'>
      <Head>
        <title>شاپلند</title>
       <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
