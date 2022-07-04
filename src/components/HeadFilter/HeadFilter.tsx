import { MagnifierIcon, CalenderIcon } from 'assets/svgs'

import { useAppDispatch, useAppSelector } from 'hooks/reduxhook'
import { openModal } from 'store/modalSlice'
import styles from './headFilter.module.scss'
import cx from 'classnames'

const HeadFilter = () => {
  const filter = useAppSelector((state) => state.filter)
  const headlineActive = !!filter.q
  const datepickerActive = !!filter.begin_date
  const dispatch = useAppDispatch()
  const onClickFilter = () => {
    dispatch(openModal())
  }
  return (
    <div className={styles.container}>
      <ul className={styles.filters}>
        <li>
          <button type='button' onClick={onClickFilter} className={cx({ [styles.filterActive]: headlineActive })}>
            <MagnifierIcon className={styles.filterIcon} />
            <span>{headlineActive ? `${filter.q}` : '전체 헤드라인'}</span>
          </button>
        </li>
        <li>
          <button type='button' onClick={onClickFilter} className={cx({ [styles.filterActive]: datepickerActive })}>
            <CalenderIcon className={styles.filterIcon} />
            <span>{datepickerActive ? `${filter.begin_date}` : '전체 날짜'}</span>
          </button>
        </li>
        <li>
          <button type='button' onClick={onClickFilter} className={cx({ [styles.filterActive]: datepickerActive })}>
            <span>전체 국가</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
export default HeadFilter
