import Head from 'next/head'
import Header from 'components/Header'
import InviteCasual from 'components/InviteCasual'
import invites from 'invites'

const Invite = ({code, name, introMessage}) => {

  return (<>
    <Head>
      <title>Izzy & Astrid</title>
      <meta name="description" content="We're getting married and we look forward to sharing this special moment with you." />
      <meta property="og:site_name" content="Izzy & Astrid" />
      <meta property="og:title" content="We're getting married!" />
      <meta name="robots" content="noindex" />
      <meta property="og:description" content="We're getting married and we look forward to sharing this special moment with you." />
      <meta property="og:image" content="/images/coupleartwork_background.png" />
    </Head>

    <Header code={code} selected="home" />

    <InviteCasual introMessage={introMessage} name={name} />
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
