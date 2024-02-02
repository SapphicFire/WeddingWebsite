import {useState, useCallback, useEffect} from 'react'
import styles from './InviteCasual.module.css'

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);
  
  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change",updateTarget);

    if(media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change",updateTarget);
  }, []);

  return targetReached;
}

export default function InviteCasual({t, name, introMessage}) {
  const isBreakpoint = useMediaQuery(768)
  return (<>
    { isBreakpoint ? (
      <section className={styles.mobilelayout}>
        <div className='image'>
          <img src="/images/coupleartwork.png" className={styles.invitePicture}/>
        </div>
        <div className='content'>
          <img src="/images/invitecontent.svg" className={styles.inviteMessage}/>
        </div>
      </section>
    ) : (
      <section className={styles.layout}>
        <div className='content'>
          <img src="/images/invitecontent.svg" className={styles.inviteMessage}/>
        </div>
        <div className='image'>
          <img src="/images/coupleartwork.png" className={styles.invitePicture}/>
        </div>
      </section>
    )}
  </>)
}
