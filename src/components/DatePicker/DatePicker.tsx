import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateProps {
  startDate: Date
  endDate: Date
  onChangeDateHandle: (dates: [Date, Date]) => void
}
const DatePicker = ({ startDate, endDate, onChangeDateHandle }: DateProps) => {
  return (
    <ReactDatePicker
      maxDate={new Date()}
      startDate={startDate}
      endDate={endDate}
      onChange={onChangeDateHandle}
      disabledKeyboardNavigation
      selectsRange
      inline
    />
  )
}

export default DatePicker
