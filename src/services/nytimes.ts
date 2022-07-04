import axios from 'axios'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ResponseArticleData from 'types/response'
import { FilterState } from 'store/filterSlice'

interface Params {
  begin_date: string
  end_date: string
  page: number
  q: string
}

export const getNytimesArticle = async (params: Params) => {
  try {
    const res = await axios.get<ResponseArticleData>(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=KAinT3FvXZq1yk4RImXmVAgQgUp0oWSL`,
      {
        params: {
          facet_fields: 'news_desk',
          facet_filter: true,
          sort: 'relevance',
          params,
        },
      }
    )
    const { docs } = res.data.response
    return docs
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const searchArticleApi = createApi({
  reducerPath: 'searchArticleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.nytimes.com/svc/search/v2`,
  }),
  endpoints: (builder) => ({
    getAticleByFilter: builder.query<ResponseArticleData, FilterState>({
      query: (params) => {
        return {
          url: '/articlesearch.json?api-key=KAinT3FvXZq1yk4RImXmVAgQgUp0oWSL&facet_fields=news_desk&sort=relevance',
          params,
        }
      },
    }),
  }),
})

export const { useGetAticleByFilterQuery } = searchArticleApi
