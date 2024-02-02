import styles from './Header.module.css'
import clsx from 'clsx'

export default function Header({code, selected}) {
  return (
    <div className={styles.header}> 
      <div className={styles.headerDiv}>
        <img src="/images/SapphireWeddingBanner.png" alt="Sapphire Wedding" className={styles.headerPicture} />
      </div>
      <div className={styles.navlinks}>
        <a href={`/${code}`} className={clsx(selected === 'home' && styles.selected)}>Home</a>
        <a href={`/${code}/rsvp`} className={clsx(styles.rsvp, selected === 'rsvp' && styles.selected)}>RSVP</a>
        <a href={`/${code}/music`} className={clsx(selected === 'music' && styles.selected)}>Music</a>
        <a href={`/${code}/travel`} className={clsx(selected === 'travel' && styles.selected)}>Getting There</a>
        <a href={`/${code}/gifts`} className={clsx(selected === 'gifts' && styles.selected)}>Gifts</a>
      </div>
    </div>
  )
}
