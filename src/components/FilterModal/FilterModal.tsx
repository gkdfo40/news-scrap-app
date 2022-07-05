import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { closeModal } from 'store/modalSlice'
import { modifyFilter } from 'store/filterSlice'
import { useAppDispatch, useAppSelector } from 'hooks/reduxhook'
import useOnClickOutside from 'hooks/useOnClickOutside'

import { CalenderIcon } from 'assets/svgs'
import styles from './filterModal.module.scss'
import DatePicker from 'components/DatePicker/DatePicker'
import moment from 'moment'
import { resetArticle } from 'store/articleSlice'
import { setNation } from 'store/glocationSlice'

const FilterModal = () => {
  const [headlineText, setHeadlineText] = useState('')
  const [isDatePickerOpen, setDatePicker] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const containerRef = useRef<HTMLFormElement>(null)

  const isModalOpen = useAppSelector((state) => state.modal.isOpenModal)
  const filterState = useAppSelector((state) => state.filter)
  const glocation = useAppSelector((state) => state.glocation)
  const [checkNation, setCheckNation] = useState(glocation.checkNation)
  const headlineFlag = !!filterState.q
  const beginDateFlag = !!filterState.begin_date
  const endDateFlag = !!filterState.end_date

  const dispatch = useAppDispatch()

  const onChangeHeadline = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value
    setHeadlineText(text)
  }
  const onClickDataPicker = () => setDatePicker((prev) => !prev)
  const onSubmitFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(resetArticle())
    dispatch(setNation(checkNation))
    dispatch(
      modifyFilter({
        ...filterState,
        q: headlineText,
        begin_date: moment(startDate).format('YYYYMMDD'),
        end_date: moment(startDate).format('YYYYMMDD'),
      })
    )
    dispatch(closeModal())
  }
  const onChangeDateHandle = (dates: [Date, Date]) => {
    const [start, end] = dates
    setStartDate(() => start)
    setEndDate(() => end)
    if (start && end) {
      setDatePicker((prev) => !prev)
    }
  }
  const onChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const targetNation = event.currentTarget.id
    const findIndex = checkNation.findIndex((element) => element.nation === targetNation)
    const copyChekNation = [...checkNation]
    copyChekNation[findIndex] = { ...copyChekNation[findIndex], checked: !copyChekNation[findIndex].checked }

    setCheckNation(() => copyChekNation)
  }

  useOnClickOutside(containerRef, () => dispatch(closeModal()))

  const element = document.getElementById('modal')
  const modal = (
    <div className={styles.wrapper}>
      <form ref={containerRef} className={styles.container} onSubmit={onSubmitFilter}>
        <p>헤드라인</p>
        <input
          className={styles.filter}
          value={headlineText}
          type='text'
          placeholder={headlineFlag ? filterState.q : '검색하실 헤드라인을 입력해주세요.'}
          onChange={onChangeHeadline}
        />
        <p>날짜</p>
        <button className={styles.filter} type='button' onClick={onClickDataPicker}>
          <span>
            {beginDateFlag && endDateFlag
              ? `${filterState.begin_date}~${filterState.end_date}`
              : '날짜를 입력해 주세요.'}
          </span>
          <CalenderIcon />
        </button>
        {isDatePickerOpen && (
          <div className={styles.datePicker}>
            <DatePicker startDate={startDate} endDate={endDate} onChangeDateHandle={onChangeDateHandle} />
          </div>
        )}
        <p>국가</p>
        <ul className={styles.checkboxs}>
          {checkNation.map((nation) => (
            <li key={`nation-${nation.nation}`}>
              <input
                type='checkbox'
                name='nation'
                id={nation.nation}
                checked={nation.checked}
                onChange={onChangeCheckBox}
              />
              <label htmlFor={nation.nation}>{nation.name}</label>
            </li>
          ))}
        </ul>
        <button className={styles.submitBtn} type='submit'>
          필터 적용하기
        </button>
      </form>
    </div>
  )
  return isModalOpen ? ReactDOM.createPortal(modal, element as Element) : null
}
export default FilterModal
