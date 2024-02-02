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

    <Header domain={domain} code={code} selected="schedule" />

    <h2 className="eventDate" dangerouslySetInnerHTML={{__html: "11<sup>th</sup> May, 2024"}} />
    <h3 className="eventLocation">Courtyard Garden</h3>

    <div className="event">
      <div className="eventName">
        <p className="eventType">Ceremony</p>
        <p className="eventTime">3:30PM</p>
      </div>
      <div className="eventDetails">
        Details
      </div>
    </div>

    <h3 className="eventLocation">Rosewood Room</h3>

    <div className="event">
      <div className="eventName">
        <p className="eventType">Dinner</p>
        <p className="eventTime">6:00PM</p>
      </div>
      <div className="eventDetails">
        Details
      </div>
    </div>

    <h3 className="eventLocation lastEvent">Library Bar</h3>

    <div className="event">
      <div className="eventName lastEvent">
        <p className="eventType">Reception</p>
        <p className="eventTime">8:00PM</p>
      </div>
      <div className="eventDetails lastEvent">
        Details
      </div>
    </div>

    <p className="note">All times are in local Brisbane time (AEST).</p>
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
