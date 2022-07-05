import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import { HomeIcon, ScrapIcon } from 'assets/svgs'

import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <HomeIcon className={styles.navIcon} />
            <span>홈</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='scrap' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <ScrapIcon className={styles.navIcon} />
            <span>스크랩</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default GNB
