import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Types

function InputSearch() {
  const [artistName, setArtistName] = useState('')

  const navigate = useNavigate()

  const handleSearch = async () => {
    if (artistName.length > 0) {
      navigate(`/search/${artistName}`)
    }
  }

  return (
    <form className="md:min-w-[500px]" onSubmit={(e) => e.preventDefault()}>
      <div className="flex">
        <div className="relative w-full">
          <input
            onChange={(e) => setArtistName(e.target.value)}
            type="text"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 bg-[#242424] text-sm border border-[#242424] text-white rounded-lg focus:bg-[#3a3a3a]"
            placeholder="Search an artist"
            required
          />
          <button
            onClick={handleSearch}
            value={artistName}
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-[#1DB954] rounded-r-lg border border-[#1DB954] lg:hover:bg-[#55d181] lg:active:bg-[#1c8340] active:bg-[#1c8340] ease-in-out duration-200"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}

export default InputSearch
