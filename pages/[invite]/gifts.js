import Head from 'next/head'
import Header from 'components/Header'
import invites from 'invites'
import {useState} from 'react'

const Invite = ({code, list}) => {
  let blankList = list.map(() => {
    return false
  })
  const [showMess,setShowMess] = useState('hidden')
  const [selectedList,setSelectedList] = useState(blankList)

  const convertToHTMLList = (list) => {
    let gifts = list.map((item,idx) => <li key={idx}><label><span>{item.name}</span><input type="checkbox" value={item.code} className="attendingName" onChange={(e) => changeList(e, idx)} /></label></li>);
  
    list.forEach((item,idx) => {
      item.selected ? gifts[idx] = <li key={idx}><label><span><s>{item.name}</s></span><input type="checkbox" value={item.code} className="attendingName" disabled/></label></li> : false;
    });
  
    return gifts;
  }

  const changeList = (e, idx) => {
    let currentList = selectedList
    let newList = [...currentList]
    if (idx != undefined) {
      newList[idx] = !selectedList[idx]
    }
    setSelectedList(newList)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(selectedList)
    let output = list.map((item,idx) => {
      let object = {}
      object.code = item.code
      object.value = selectedList[idx]
      return object
    })
    let x = await submitUpdatedList(output)
    setTimeout(() => {
      window.location.reload()
    }, 5000);
  }

  let parsedList = convertToHTMLList(list)
  let thankYouMessage = <p><b>Thank you so much!</b> Your response has been stored anonymously. If you change your mind, please feel free to reach out to one of us and we can undo the reserved value.<br/><br/>This page will reload in 5 seconds to reflect your changes.</p>

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
        We are incredibly grateful for your presence at our wedding, and your love and support mean the world to us. We do not expect gifts from you, as you are the greatest gift we could ask for!<br/><br/>
        However, for those who have expressed that you wish to get us a gift, we have made this list to help you out.<br/>
        We adore handmade or personal gifts, so please do not think of this list as a requirement - rather, it is just a guide to help you out if you want to get us things but are struggling for ideas.<br/><br/>
      </p>
      <hr />
      <h3 className="centered">If you do choose to get us something from this list, please check it off so we can avoid double-ups: </h3>
      <form className="giftForm" onSubmit={handleSubmit}>
        <ul className="nameList">
          {parsedList}
        </ul>
        <input type="submit" value="Take this off the list &rarr;" className="submit" onClick={() => { setShowMess('visible') }} />
      </form>
      <div style={{visibility: showMess}}>
        {thankYouMessage}
      </div>
      <hr />
      <p className="centered">
        As you likely know, following the wedding we will be relocating to Sydney. If you would prefer to send something to our new house over bringing it on the day, please reach out to one of us as we can share the address.
      </p>
    </div>
  </>)
}

export async function getGiftList() {
  const res = await fetch('https://astrid.service-now.com/api/x_688586_wedding/gifts');
  return res.json();
}

export async function submitUpdatedList(payload) {
  // Send RSVP object
  const res = await fetch(`https://astrid.service-now.com/api/x_688586_wedding/handle_gift_update`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify(payload)
  })
  const data = res.status
  if(data != 200 && data != 202){
    return false
  }
  return true
}


export async function getStaticProps(context) {
  const props = invites[context.params.invite]
  props.code = context.params.invite
  props.list = (await getGiftList()).result
  return {props}
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(invites).map(i => ({params: {invite: i}})),
    fallback: false
  };
}

export default Invite
