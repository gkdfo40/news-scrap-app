import { Link } from 'react-router-dom'
import moment from 'moment'
import cx from 'classnames'

import { SubtracteIcon } from 'assets/svgs'
import { Doc } from 'types/response'
import { addScrap, deleteScrap } from 'store/scrapSlice'
import { useAppDispatch, useAppSelector } from 'hooks/reduxhook'

import styles from './article.module.scss'

interface ArticleProps {
  article: Doc
}

const Article = ({ article }: ArticleProps) => {
  const scrapList = useAppSelector((state) => state.scrap)
  const scrapFlag = !!scrapList.find((scrap) => article._id === scrap._id)
  const dispatch = useAppDispatch()
  const onClickScrap = () => {
    scrapFlag ? dispatch(deleteScrap(article)) : dispatch(addScrap(article))
  }

  return (
    <article className={styles.container}>
      <div className={styles.header}>
        <h1>
          <Link to={`${article.web_url.replace('https://', '//')}`}>{article.headline.main}</Link>
        </h1>
        <SubtracteIcon className={cx(styles.scrapIcon, { [styles.scrap]: scrapFlag })} onClick={onClickScrap} />
      </div>
      <div className={styles.info}>
        <span>{article.source}</span>
        <span>{article.byline.original?.split(' ')[1]}</span>
        <span>{`${moment(article.pub_date).format('YYYY.MM.DD')}.(${moment(article.pub_date).isoWeekday()})`}</span>
      </div>
    </article>
  )
}
export default Article
