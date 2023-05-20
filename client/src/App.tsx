import { Routes, Route } from 'react-router-dom'

// Components
import Landing from './components/Landing/Landing'
import Search from './components/Search/Search'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route element={<ProtectedRoute redirectPath="/landing" />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<Search />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
