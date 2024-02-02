import {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import styles from './Music.module.css'

export default function Music({name, invite}) {
  const [song, setSong] = useState('')
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [sent, setSent] = useState(false)

  const changeSong = e => {
    setSong(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setSent(true)
    let output = {}
    output.code = invite
    output.name = name
    output.song = song
    let outcome
    sendRSVP(output).then(res => {
      outcome = res
      setLoading(false)
      if (!outcome) {
        setFailed(true)
      }
      setSent(true)
      return false
    }).catch(rej => {
      outcome = false
      setLoading(false)
      setFailed(true)
      setSent(false)
      return false
    })
  }

  if (sent) {
    if (loading) {
      return <p style={{textAlign: 'center'}}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', display: 'block', backgroundPosition: 'initial initial', backgroundRepeat: 'initial initial'}} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path fill="none" stroke="#7B61FF" strokeWidth="8" strokeDasharray="177.0463604736328 79.54256774902345" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{transform:'scale(0.79)', transformOrigin:'50px 50px'}}>
            <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0;256.58892822265625"></animate>
          </path>
        </svg> Assessing jam level of suggestion...
      </p>
    } else if (failed) {
      return <div className={styles.rsvp}>
        <h1>
          <span role="img" aria-label="dead">😵</span>
          Uh oh, something went wrong!
        </h1>
        <p><a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>Please let us know what happened.</a></p>
      </div>
    } else {
      return <div className={styles.rsvp}>
        <h1>
          <span role="img" aria-label="party">🎉</span>
          Song received!
        </h1>
        <h2>
          Thanks for sharing
        </h2>
      </div>
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p>
      As we prepare to say "I do," we're curating the soundtrack to our special day, and we want YOUR input! We believe music is the heartbeat of any celebration, and we'd love your help in creating the perfect playlist.
      <br /><br />
      Whether it's a song that makes you want to hit the dance floor or a tune that holds a special place in your heart, we want to hear your suggestions. Share your favorite songs, the ones that make you smile, reminisce, or maybe even shed a tear.
      </p>
      <label><p><strong>What song would you like to suggest?</strong></p>
        <TextareaAutosize className={styles.text}
          minRows={2}
          maxRows={10}
          value={song}
          onChange={changeSong} />
      </label>
      <input type="submit" value="Send suggestion &rarr;" className={styles.submit} />
    </form>
  )
}

export async function sendRSVP(payload){
  // Send RSVP object
  const res = await fetch(`https://astrid.service-now.com/api/x_688586_wedding/handle_song_suggestion`,{
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

