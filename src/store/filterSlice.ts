import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  q: string
  begin_date: string
  end_date: string
  page: number
  fq: string
}

const initialFilterState: FilterState = {
  q: '',
  begin_date: '20220202',
  end_date: '20220202',
  page: 0,
  fq: '',
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
      state.fq = action.payload.fq
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
