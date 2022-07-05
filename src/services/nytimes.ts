import axios from 'axios'
import ResponseArticleData from 'types/response'

export interface Params {
  begin_date: string
  end_date: string
  page: number
  q: string
  fq: string
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
          ...params,
        },
      }
    )
    const { docs } = res.data.response
    if (docs.length === 0) throw new Error('docs is empty')
    return docs
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
