import Head from 'next/head'
import Header from 'components/Header'
import invites from 'invites'

const Invite = ({code, domain, lang}) => {

  return (<>
    <Head>
      <title>Izzy & Astrid</title>
      <meta name="description" content="We're getting married and we look forward to sharing this special moment with you." />
      <meta property="og:site_name" content="Izzy & Astrid" />
      <meta property="og:title" content="We're getting married!" />
      <meta property="og:description" content="We're getting married and we look forward to sharing this special moment with you." />
      <meta property="og:image" content="/images/coupleartwork_background.png" />
    </Head>

    <Header domain={domain} code={code} selected="faq" />

    <div className="section">
      <h2>Frequently Asked Questions</h2>

      <p className="question">What should I wear?</p>
      <p className="answer">We don't have a dress code and welcome you to wear whatever you're most comfortable in.</p>

      <p className="question">What more should I know?</p>
      <p className="answer">Information, likely.</p>
    </div>
  </>)
}

export async function getStaticProps(context) {
  const props = invites[context.params.invite]
  props.code = context.params.invite
  props.domain = process.env.NAMESPACE
  return {props}
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(invites).map(i => ({params: {invite: i}})),
    fallback: false
  };
}

export default Invite
