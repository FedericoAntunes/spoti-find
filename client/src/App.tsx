import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// Components
import Landing from './components/Landing/Landing'
import Search from './components/Search/Search'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import ProtectedRoute from './components/utilities/ProtectedRoute'
import ExploreArtists from './components/ExploreArtists/ExploreArtists'
import ExploreSongs from './components/ExploreSongs/ExploreSongs'
import Album from './components/Album/Album'
import ScrollToTop from './components/utilities/ScrollToTop'
import Error404 from './components/Error404/Error404'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer position="bottom-right" limit={1} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute redirectPath={'/'} />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/artists" element={<ExploreArtists />} />
            <Route path="/songs" element={<ExploreSongs />} />
            <Route path="/albums/:id" element={<Album />} />
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
