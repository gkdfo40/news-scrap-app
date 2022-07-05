import cx from 'classnames'
import { useCallback } from 'react'

import { openModal } from 'store/modalSlice'
import { Nation } from 'store/glocationSlice'
import { MagnifierIcon, CalenderIcon } from 'assets/svgs'
import { useAppDispatch, useAppSelector } from 'hooks/reduxhook'

import styles from './headFilter.module.scss'

const HeadFilter = () => {
  const filter = useAppSelector((state) => state.filter)
  const glocation = useAppSelector((state) => state.glocation)

  const headlineActive = !!filter.q
  const datepickerActive = !!filter.begin_date
  const countGlocation = glocation.checkNation.filter((glo) => glo.checked === true)
  const glocationActive = !!countGlocation.length
  const dispatch = useAppDispatch()
  const onClickFilter = () => {
    dispatch(openModal())
  }

  const syntaxGlocation = useCallback((data: Nation[]) => {
    if (data.length > 1) {
      return `${data[0].name} 외 ${data.length - 1}개`
    }
    return data[0].name
  }, [])

  return (
    <div className={styles.container}>
      <ul className={styles.filters}>
        <li>
          <button type='button' onClick={onClickFilter} className={cx({ [styles.filterActive]: headlineActive })}>
            <MagnifierIcon className={styles.filterIcon} />
            <span>{headlineActive ? `${`${filter.q.substring(0, 7)}...`}` : '전체 헤드라인'}</span>
          </button>
        </li>
        <li>
          <button type='button' onClick={onClickFilter} className={cx({ [styles.filterActive]: datepickerActive })}>
            <CalenderIcon className={styles.filterIcon} />
            <span>{datepickerActive ? `${filter.begin_date}` : '전체 날짜'}</span>
          </button>
        </li>
        <li>
          <button type='button' onClick={onClickFilter} className={cx({ [styles.filterActive]: glocationActive })}>
            <span>{glocationActive ? syntaxGlocation(countGlocation) : '전체 국가'}</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
export default HeadFilter
