import styles from './InviteCasual.module.css'

export default function InviteCasual({t, name, introMessage}) {
  return (<>
    <section className={styles.layout}>
      <div className='content'>
        <img src="/images/invitecontent.svg" className={styles.inviteMessage}/>
      </div>
      <div className='image'>
        <img src="/images/coupleartwork.png" className={styles.invitePicture}/>
      </div>
    </section>
  </>)
}
