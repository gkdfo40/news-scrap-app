import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Doc } from 'types/response'
import { getNytimesArticle, Params } from 'services/nytimes'

export const fetchArticleByFilter = createAsyncThunk('article/fetchArticleByFilter', async (filter: Params) => {
  const response = await getNytimesArticle(filter)
  return response
})

interface ArticleState {
  entities: Doc[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: any
}

const newinitialArticleState: ArticleState = {
  entities: [],
  loading: 'idle',
  error: null,
}
const articleSlice = createSlice({
  name: 'article',
  initialState: newinitialArticleState,
  reducers: {
    resetArticle() {
      return newinitialArticleState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleByFilter.pending, (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    })
    builder.addCase(fetchArticleByFilter.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.entities = [...state.entities, ...action.payload]
        state.loading = 'idle'
      }
    })
    builder.addCase(fetchArticleByFilter.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    })
  },
})

export const { resetArticle } = articleSlice.actions
export default articleSlice.reducer
