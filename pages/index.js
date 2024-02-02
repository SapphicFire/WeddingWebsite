import Head from 'next/head'
import InviteCode from 'components/InviteCode'

export default function Home() {
  return (
    <main>
      <Head>
        <title>Izzy & Astrid</title>
        <meta name="description" content="We're getting married and we look forward to sharing this special moment with you." />
        <meta property="og:site_name" content="Izzy & Astrid" />
        <meta property="og:title" content="We're getting married!" />
        <meta property="og:description" content="We're getting married and we look forward to sharing this special moment with you." />
        <meta property="og:image" content="/images/coupleartwork_background.png" />
      </Head>
      <InviteCode autoFocus />
    </main>
  )
}
