import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Calls
import { ServerCalls } from '../../axios_calls/serverCalls'

// Types
import { NewAlbumsResponse, SimplifiedAlbumObject } from '../../types/album'
import { RootState } from '../../redux/store'

// Components
import NewAlbumCard from './NewAlbumCard'
import Loader from '../Loader/Loader'
import NewAlbumsCarousel from './NewAlbumsCarousel'

function Home() {
  const [serverResponseAlbums, setServerResponseAlbums] =
    useState<NewAlbumsResponse>()
  const [trendingAlbums, setTrendingAlbums] =
    useState<SimplifiedAlbumObject[]>()

  const token = useSelector((state: RootState) => state.token)

  useEffect(() => {
    const handleSearch = async () => {
      if (token) {
        try {
          const getAlbums = await ServerCalls.getNewAlbums({
            token,
          })
          setTrendingAlbums([
            getAlbums.albums.items[0],
            getAlbums.albums.items[1],
            getAlbums.albums.items[2],
          ])
          setServerResponseAlbums(getAlbums)
        } catch (error) {
          console.log(error)
        }
      }
    }
    handleSearch()
  }, [])

  return serverResponseAlbums && trendingAlbums ? (
    <div className="bg-gradient-to-t from-[#121212] pb-6 from-85% to-[#252A2F] to-100% min-h-[calc(100vh-4rem)]">
      <NewAlbumsCarousel albums={trendingAlbums} />
      <div className="text-center mt-12 space-y-3 px-4 sm:px-5 lg:px-12">
        <p className="text-white font-bold">Welcome to Spotifind!</p>
        <p className="text-white">
          You can search artists, explore songs, find artist by genre or keep
          scrolling to discover new albums.
        </p>
      </div>
      <div>
        <div className="flex mx-auto justify-around my-6 max-w-[300px] text-white">
          <Link
            to={'/songs'}
            className="font-bold text-[#1DB954] lg:hover:text-[#55d181] active:text-[#1c8340] lg:active:text-[#1c8340] ease-in-out duration-200"
          >
            Explore songs
          </Link>
          or
          <Link
            to={'/artists'}
            className="font-bold text-[#1DB954] lg:hover:text-[#55d181] active:text-[#1c8340] lg:active:text-[#1c8340] ease-in-out duration-200"
          >
            Search by genre
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 px-4 lg:px-8 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-around">
        <NewAlbumCard serverResponseAlbums={serverResponseAlbums} />
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default Home
