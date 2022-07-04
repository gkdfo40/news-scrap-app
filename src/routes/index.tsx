import { Routes, Route } from 'react-router-dom'

import HomeScreen from './HomeScreen/HomeScreen'
import ScrapScreen from './ScrapScreen/ScrapScreen'
import GNB from './GNB/GNB'

import styles from './Routes.module.scss'
import FilterModal from 'components/FilterModal/FilterModal'

const App = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='scrap' element={<ScrapScreen />} />
      </Routes>
      <FilterModal />
      <GNB />
    </div>
  )
}

export default App
