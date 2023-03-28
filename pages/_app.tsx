import Script from "next/script";
import "../src/app/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="/js/fontawesome.js" />
      <Component {...pageProps} />
    </>
  );
}
