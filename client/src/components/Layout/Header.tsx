import { Link } from 'react-router-dom'
import InputSearch from './InputSearch'

function Header() {
  return (
    <header className="fixed flex items-center bg-[#121212] bg-opacity-90 w-full h-16 z-50 top-0">
      <div className="text-[#1DB954] text-2xl ml-3 font-semibold">
        <Link to={'/home'}> Spotifind </Link>
      </div>
      <div className="mx-auto">
        <InputSearch />
      </div>
    </header>
  )
}

export default Header
