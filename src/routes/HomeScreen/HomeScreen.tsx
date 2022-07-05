import { useCallback, useEffect, useRef } from 'react'

import Article from 'components/Article/Article'
import HeadFilter from 'components/HeadFilter/HeadFilter'

import { useAppDispatch, useAppSelector } from 'hooks/reduxhook'

import { pageNationFilter } from 'store/filterSlice'

import styles from './homeScreen.module.scss'
import { fetchArticleByFilter } from 'store/articleSlice'

const HomeScreen = () => {
  const loader = useRef(null)
  const filter = useAppSelector((state) => state.filter)
  const articleState = useAppSelector((state) => state.article)
  const dispatch = useAppDispatch()

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting && articleState.loading === 'idle') {
        dispatch(pageNationFilter())
        dispatch(fetchArticleByFilter(filter))
      }
    },
    [articleState.loading, dispatch, filter]
  )

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  }, [handleObserver])

  return (
    <div>
      <HeadFilter />
      <div className={styles.articles}>
        <ul>
          {articleState.entities.map((article) => (
            <li key={`article-${article._id}`}>
              <Article article={article} />
            </li>
          ))}
          {articleState.loading === 'pending' && <li>로딩중...</li>}
          {articleState.loading === 'idle' && !articleState.error && <li ref={loader} className={styles.loader} />}
        </ul>
      </div>
    </div>
  )
}
export default HomeScreen
