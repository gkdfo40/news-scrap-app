import { MagnifierIcon, CalenderIcon } from 'assets/svgs'

import { useAppDispatch } from 'hooks/reduxhook'
import { openModal } from 'store/modalSlice'
import styles from './headFilter.module.scss'

const HeadFilter = () => {
  const dispatch = useAppDispatch()
  const onClickFilter = () => {
    dispatch(openModal())
  }
  return (
    <div className={styles.container}>
      <ul className={styles.filters}>
        <li>
          <button type='button' onClick={onClickFilter}>
            <MagnifierIcon className={styles.filterIcon} />
            <span>전체 헤드라인</span>
          </button>
        </li>
        <li>
          <button type='button' onClick={onClickFilter}>
            <CalenderIcon className={styles.filterIcon} />
            <span>전체 날짜</span>
          </button>
        </li>
        <li>
          <button type='button' onClick={onClickFilter}>
            <span>전체 국가</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
export default HeadFilter
