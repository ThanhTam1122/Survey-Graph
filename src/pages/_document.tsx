// Next.js 12.0.5 でのエラー回避で next/document からでなくこのインポート
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/dist/pages/_document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
