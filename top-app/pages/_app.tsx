import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import '../styles/globals.css';
// import ym from "react-yandex-metrika";
// import { YMInitializer } from "react-yandex-metrika";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  // router.events.on('routeChangeComplete', (url: string) => {
  //   // проверка на серевере рендериться страничка или уже на клиенте находимся
  //   // нам нужно знать что мы на клиенте
  //   // if (typeof window !== 'undefined') {
  //   //   // при изменении страницы сообщаем метрике
  //   //   ym('hit', url);
  //   // }
  // });

  return (
    <>
      {/* заголовки мета подключаются на каждой странице при ренедере */}
      <Head>
        <title>MyTop</title>
        <link key={1} rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* добавление яндекс метрики */}
        {/* <link rel="preconnect" href="https://mc.yandex.ru" /> */}
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      {/* инициализируем метрику */}
      {/* <YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version="2" /> */}
      {/* для каждой страницы по роуту мы определили компонент */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
