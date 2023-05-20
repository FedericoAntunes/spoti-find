import { Routes, Route } from 'react-router-dom'

// Components
import Landing from './components/Landing'
import Search from './components/Search/Search'
import Layout from './components/Layout/Layout'
import Home from './components/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
      </Route>
    </Routes>
  )
}

export default App
