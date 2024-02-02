import Head from 'next/head'
import Header from 'components/Header'
import invites from 'invites'

const Invite = ({code}) => {

  return (<>
    <Head>
      <title>Izzy & Astrid</title>
      <meta name="description" content="We're getting married and we look forward to sharing this special moment with you." />
      <meta property="og:site_name" content="Izzy & Astrid" />
      <meta property="og:title" content="We're getting married!" />
      <meta property="og:description" content="We're getting married and we look forward to sharing this special moment with you." />
      <meta property="og:image" content="/images/coupleartwork_background.png" />
    </Head>

    <Header code={code} selected="gifts" />

    <div className="section">
      <h2>Gifts</h2>
      <p className="centered">
        Gifts are not an expectation, but if you would like to get us something, please see below<br/>
        <br/>
        Gift suggestions coming soon.
      </p>
    </div>
  </>)
}

export async function getStaticProps(context) {
  const props = invites[context.params.invite]
  props.code = context.params.invite
  return {props}
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(invites).map(i => ({params: {invite: i}})),
    fallback: false
  };
}

export default Invite
