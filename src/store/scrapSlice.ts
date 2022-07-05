import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Doc } from 'types/response'

const initialScrapState: Doc[] = []

const scrapSlice = createSlice({
  name: 'scrap',
  initialState: initialScrapState,
  reducers: {
    addScrap(state, action: PayloadAction<Doc>) {
      return [...state, action.payload]
      // state.concat(action.payload)
    },
    deleteScrap(state, action: PayloadAction<Doc>) {
      return state.filter((scrap) => action.payload._id !== scrap._id)
    },
  },
})

export const { addScrap, deleteScrap } = scrapSlice.actions
export default scrapSlice.reducer
