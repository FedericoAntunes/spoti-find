import { Outlet } from 'react-router-dom'

// Components
import Header from './Header'
import PreviousPage from './PreviousPage'

function Layout() {
  return (
    <div id="top">
      <div className="mb-[4.1rem]">
        <Header />
      </div>
      <div className="">
        <PreviousPage />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
