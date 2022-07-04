import { useCallback, useEffect, useRef } from 'react'

import Article from 'components/Article/Article'
import HeadFilter from 'components/HeadFilter/HeadFilter'

import { useAppDispatch, useAppSelector } from 'hooks/reduxhook'
import { useGetAticleByFilterQuery } from 'services/nytimes'
import { pageNationFilter } from 'store/filterSlice'

import styles from './homeScreen.module.scss'
import { addArticle } from 'store/articleSlice'

const HomeScreen = () => {
  const loader = useRef(null)
  const filter = useAppSelector((state) => state.filter)
  const articleList = useAppSelector((state) => state.article)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetAticleByFilterQuery(filter)
  useEffect(() => {
    if (data) {
      dispatch(addArticle(data.response.docs))
    }
  }, [data, dispatch])

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting && !isLoading) {
        dispatch(pageNationFilter())
      }
    },
    [dispatch, isLoading]
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
          {articleList.map((article) => (
            <li key={`article-${article._id}`}>
              <Article article={article} />
            </li>
          ))}
          {isLoading && <li>로딩중...</li>}
          <li ref={loader} className={styles.loader} />
        </ul>
      </div>
    </div>
  )
}
export default HomeScreen
