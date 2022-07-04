import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Doc } from 'types/response'

const initialArticleState: Doc[] = []

const articleSlice = createSlice({
  name: 'article',
  initialState: initialArticleState,
  reducers: {
    addArticle(state, action: PayloadAction<Doc[]>) {
      return [...state, ...action.payload]
    },
    resetArticle() {
      return initialArticleState
    },
  },
})

export const { addArticle, resetArticle } = articleSlice.actions
export default articleSlice.reducer
