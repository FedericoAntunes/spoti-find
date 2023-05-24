import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// Calls
import { ServerCalls } from '../../axios_calls/serverCalls'
import { IpCall } from '../../axios_calls/ipCall'

// Types
import { AlbumsResponse } from '../../types/album'
import { RootState } from '../../redux/store'

// Components
import AlbumCard from './AlbumCard'
import Loader from '../Loader/Loader'

function Search() {
  const [serverResponseAlbums, setServerResponseAlbums] =
    useState<AlbumsResponse | null>()

  const token = useSelector((state: RootState) => state.token)

  const { query } = useParams()

  useEffect(() => {
    setServerResponseAlbums(null)
    const handleSearch = async () => {
      if (token && query) {
        try {
          const ipResponse = await IpCall.getIp()
          const getAlbums = await ServerCalls.getAlbums({
            artist_name: query,
            token: token,
            ip: ipResponse.ip,
          })
          setServerResponseAlbums(getAlbums)
        } catch (error) {
          console.log(error)
        }
      }
    }
    handleSearch()
  }, [query])

  return serverResponseAlbums ? (
    <div className="p-4  sm:px-5 lg:px-8 xl:px-14 md:py-6 bg-gradient-to-t from-[#121212] from-85% to-[#252A2F] to-100% min-h-[calc(100vh-4rem)]">
      <div className="text-gray-200 mb-6 pt-12">
        Albums results for search:{' '}
        <span className="font-semibold">{query}</span>
      </div>
      {serverResponseAlbums.returned_albums?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-around">
          <AlbumCard serverResponseAlbums={serverResponseAlbums} />
        </div>
      ) : (
        <p className="text-gray-200 text-center">
          Sorry! no results where found.
        </p>
      )}
    </div>
  ) : (
    <Loader />
  )
}

export default Search
