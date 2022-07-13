import Document, { Html, Head, Main, NextScript } from "next/document";

// this will customize the entire document of Html of the web application.
// every thing added here will be added to the entire Html of the web application.
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
