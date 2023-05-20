import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
  return (
    <div>
      <div className="mb-16">
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
