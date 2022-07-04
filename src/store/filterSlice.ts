import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

export interface FilterState {
  q: string
  begin_date: string
  end_date: string
  page: number
}

const initialFilterState: FilterState = {
  q: '',
  begin_date: moment().format('YYYYMMDD'),
  end_date: moment().format('YYYYMMDD'),
  page: 0,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    modifyFilter(state, action: PayloadAction<FilterState>) {
      state.q = action.payload.q
      state.begin_date = action.payload.begin_date
      state.end_date = action.payload.end_date
      state.page = 0
    },
    resetFilter(state) {
      Object.assign(state, initialFilterState)
    },
    pageNationFilter(state) {
      state.page += 1
    },
  },
})

export const { modifyFilter, resetFilter, pageNationFilter } = filterSlice.actions
export default filterSlice.reducer
