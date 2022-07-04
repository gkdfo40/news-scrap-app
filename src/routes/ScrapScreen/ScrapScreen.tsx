import { NavLink } from 'react-router-dom'

import { useAppSelector } from 'hooks/reduxhook'

import HeadFilter from 'components/HeadFilter/HeadFilter'
import Article from 'components/Article/Article'
import { NoScrapIcon } from 'assets/svgs'

import styles from './scrapScreen.module.scss'

const ScrapScreen = () => {
  const scrapList = useAppSelector((state) => state.scrap)

  return (
    <div className={styles.container}>
      {scrapList.length === 0 ? (
        <div className={styles.noScrapContainer}>
          <NoScrapIcon className={styles.noScrapIcon} />
          <p>저장된 스크랩이 없습니다.</p>
          <NavLink to='/'>스크랩 하러 가기</NavLink>
        </div>
      ) : (
        <>
          <HeadFilter />
          <div className={styles.scrapContainer}>
            <ul>
              {scrapList.map((article) => (
                <li key={`scrap-${article._id}`}>
                  <Article article={article} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
export default ScrapScreen
