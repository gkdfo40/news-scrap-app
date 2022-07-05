import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Nation {
  nation: string
  name: string
  checked: boolean
}
export interface GlocationState {
  checkNation: Nation[]
}

const initialGlocationState: GlocationState = {
  checkNation: [
    { nation: 'KOREA', name: '대한민국', checked: false },
    { nation: 'CHINA', name: '중국', checked: false },
    { nation: 'JAPAN', name: '일본', checked: false },
    { nation: 'USA', name: '미국', checked: false },
    { nation: 'NORTH KOREA', name: '북한', checked: false },
    { nation: 'RUSSIA', name: '러시아', checked: false },
    { nation: 'FRANCE', name: '프랑스', checked: false },
    { nation: 'UK', name: '영국', checked: false },
  ],
}

const glocationSlice = createSlice({
  name: 'glocation',
  initialState: initialGlocationState,
  reducers: {
    setNation(state, action: PayloadAction<Nation[]>) {
      state.checkNation = [...action.payload]
    },
  },
})
export const { setNation } = glocationSlice.actions
export default glocationSlice.reducer
