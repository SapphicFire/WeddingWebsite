import Head from 'next/head'
import Header from 'components/Header'
import invites from 'invites'

const Invite = ({code, domain}) => {

  return (<>
    <Head>
      <title>Izzy & Astrid</title>
      <meta name="description" content="We're getting married and we look forward to sharing this special moment with you." />
      <meta property="og:site_name" content="Izzy & Astrid" />
      <meta property="og:title" content="We're getting married!" />
      <meta property="og:description" content="We're getting married and we look forward to sharing this special moment with you." />
      <meta property="og:image" content="/images/coupleartwork_background.png" />
    </Head>

    <Header domain={domain} code={code} selected="travel" />

    <div className="section">
      <h2>Venue</h2>

      <p className="centered" dangerouslySetInnerHTML={{__html: "The wedding will take place at <strong>Hillstone</strong> in St Lucia, Brisbane."}} />
      <p className="centered">
        Golf Links, Carrawa Street<br/>
        Saint Lucia QLD 4067<br/>
        Australia
      </p>

      <p className="centered marginBelow"><a className="primary ctaBtn" href="https://www.google.com/maps/dir/Current+Location/Golf+Links+Carrawa+Street+St+Lucia+QLD+4067+Australia" target="_blank">View map</a></p>
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
