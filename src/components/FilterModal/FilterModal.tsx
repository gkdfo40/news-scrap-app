import moment from 'moment'
import ReactDOM from 'react-dom'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { CalenderIcon } from 'assets/svgs'
import DatePicker from 'components/DatePicker/DatePicker'

import { closeModal } from 'store/modalSlice'
import { setNation } from 'store/glocationSlice'
import { modifyFilter } from 'store/filterSlice'
import { resetArticle } from 'store/articleSlice'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { useAppDispatch, useAppSelector } from 'hooks/reduxhook'

import styles from './filterModal.module.scss'

const FilterModal = () => {
  const [isDatePickerOpen, setDatePicker] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const containerRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<string>('')

  const isModalOpen = useAppSelector((state) => state.modal.isOpenModal)
  const filterState = useAppSelector((state) => state.filter)
  const glocation = useAppSelector((state) => state.glocation)
  const [checkNation, setCheckNation] = useState(glocation.checkNation)
  const headlineFlag = !!filterState.q
  const beginDateFlag = !!filterState.begin_date
  const endDateFlag = !!filterState.end_date

  const dispatch = useAppDispatch()

  const onChangeHeadline = (e: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.currentTarget.value
  }
  const onClickDataPicker = () => setDatePicker((prev) => !prev)
  const onSubmitFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const countNation = checkNation.reduce((acc, cur) => (cur.checked ? acc + 1 : acc), 0)
    const glocationQuery = `glocation(${checkNation.reduce(
      (prev, curr) => (curr.checked ? prev.concat(`${curr.nation} `) : prev),
      ''
    )})`
    dispatch(resetArticle())
    dispatch(setNation(checkNation))
    dispatch(
      modifyFilter({
        page: 0,
        q: inputRef.current,
        begin_date: moment(startDate).format('YYYYMMDD'),
        end_date: moment(startDate).format('YYYYMMDD'),
        fq: countNation ? glocationQuery : '',
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
