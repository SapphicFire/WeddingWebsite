import {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Confetti from 'components/Confetti'

import styles from './Rsvp.module.css'

const throwConfetti = () => {
  const event = new Event('confetti')
  const c = document.getElementById("confetti")
  if (c) c.dispatchEvent(event)
}

export default function Rsvp({name, invite, rsvp, seatNames = [], rsvped = [], t}) {
  const [rsvpd, setRsvpd] = useState(rsvp === false || rsvp)
  const [names, setNames] = useState(seatNames)
  const [rsvpStatus, setRsvped] = useState(rsvped)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [justSubmitted, setSubmitted] = useState(false)
  const [coming, setComing] = useState(false)

  useEffect(() => {
    // load values from local storage if available
    const r = localStorage.getItem('rsvpd2')
    if (r !== null) setRsvpd(r === 'true')
    const c = localStorage.getItem('comment')
    if (c !== null) setComment(c)
    const a = localStorage.getItem('attend')
    if (a !== null) setComing(a)
  }, [])

  const changeRsvped = (e, idx) => {
    let newRsvpState = [...rsvpStatus]
    if (idx != undefined) {
      newRsvpState[idx] = e.target.checked
    }
    setRsvped(newRsvpState)
  }

  const changeComment = e => {
    setComment(e.target.value)
    localStorage.setItem('comment', e.target.value)
  }

  const changeRsvp = e => {
    e.preventDefault()
    setRsvpd(false)
    localStorage.setItem('rsvpd2',false)
    let clearRsvpState = [...rsvpStatus]
    for(let j in clearRsvpState){
      clearRsvpState[j] = false
    }
    setRsvped(clearRsvpState)
    return false
  }

  const isAttendingWedding  = true

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setRsvpd(true)
    let output = {}
    output.code = invite
    output.name = name
    output.comment = comment
    output.people = []
    for(let i in names){
      let attendee = {}
      attendee.name = names[i]
      attendee.status = rsvpStatus[i]
      output.people.push(attendee)
    }
    // Managing coming status *snort*
    if(rsvpStatus.indexOf(true) > -1) {
      setComing(true)
      localStorage.setItem('attend', true)
    } else {
      setComing(false)
      localStorage.setItem('attend', false)
    }
    let outcome
    sendRSVP(output).then(res => {
      outcome = res
      setLoading(false)
      if (!outcome) {
        setFailed(true)
      } else {
        localStorage.setItem('rsvpd2', true)
      }
      setRsvpd(true)
      setSubmitted(true)
      return false
    }).catch(rej => {
      outcome = false
      setLoading(false)
      setFailed(true)
      setRsvpd(false)
      setSubmitted(false)
      return false
    })
  }

  if (rsvpd) {
    if (loading) {
      return <p style={{textAlign: 'center'}}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', display: 'block', backgroundPosition: 'initial initial', backgroundRepeat: 'initial initial'}} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path fill="none" stroke="#7B61FF" strokeWidth="8" strokeDasharray="177.0463604736328 79.54256774902345" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{transform:'scale(0.79)', transformOrigin:'50px 50px'}}>
            <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0;256.58892822265625"></animate>
          </path>
        </svg> Carefully framing your response on our wall...
      </p>
    } else if (failed) {
      return <div className={styles.rsvp}>
        <h1>
          <span role="img" aria-label="dead">😵</span>
          Uh oh, something went wrong!
        </h1>
        <p><a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>Please let us know what happened.</a></p>
      </div>
    } else if (coming) {
      return <div className={styles.rsvp}>
        <h1>
          <span role="img" aria-label="party" onClick={throwConfetti}>🎉</span>
          The party just got even better!
        </h1>
        <p className={styles.addCalendar}><a className="ctaBtn primary" href={`/api/ics/${invite}`}>Add to calendar</a> <a href="#" className="ctaBtn secondary" onClick={changeRsvp}>Change RSVP</a></p>
        {justSubmitted && <Confetti />}
      </div>
    } else {
      return <div className={styles.rsvp}>
        <h1>
          <span role="img" aria-label="sad">😭</span>
          Aww, we will miss you!
        </h1>
        <p className={styles.addCalendar}><a href="#" className="ctaBtn secondary" onClick={changeRsvp}>Change RSVP</a></p>
      </div>
    }
  }

  const nameInputs = names.map((name, idx) => <li key={idx}><label><span>{name}</span><input type="checkbox" value={name} className={styles.attendingName} onChange={(e) => changeRsvped(e, idx)} /></label></li>)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p>We're excited to share this moment with you!</p>
      {!!isAttendingWedding && (<>
        <p><strong>Please confirm who will be attending:</strong></p>
        <ul className={styles.nameList}>{nameInputs}</ul>
      </>)}
      <label><p><strong>Do you have any dietary requirements?</strong></p>
        <TextareaAutosize className={styles.text}
          minRows={2}
          maxRows={10}
          value={comment}
          onChange={changeComment} />
      </label>
      <input type="submit" value="RSVP &rarr;" className={styles.submit} />
    </form>
  )
}

export async function sendRSVP(payload){
  // Send RSVP object
  const res = await fetch(`https://astrid.service-now.com/api/x_688586_wedding/handle_rsvp`,{
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

