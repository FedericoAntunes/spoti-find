import { Link } from 'react-router-dom'

// Components
import InputSearch from './InputSearch'

function Header() {
  return (
    <header className="fixed flex items-center bg-[#121212] px-4 sm:px-5 lg:px-8 xl:px-14 justify-between bg-opacity-90 w-full h-16 z-50 top-0">
      <div className="text-[#1DB954] text-xl sm:text-2xl md:text-4xl mr-2 font-bold">
        <Link to={'/home'}> SpotiFind </Link>
      </div>
      <div className="">
        <InputSearch />
      </div>
    </header>
  )
}

export default Header
