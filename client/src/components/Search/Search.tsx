import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ServerCalls } from '../../axios_calls/serverCalls'

// Types
import { AlbumsResponse } from '../../types/albumsResponse'
import { useParams } from 'react-router-dom'
import AlbumCard from './AlbumCard'

function Search() {
  const [serverResponseAlbums, setServerResponseAlbums] =
    useState<AlbumsResponse>()

  const token = useSelector((state: RootState) => state.token.access_token)

  const { query } = useParams()

  useEffect(() => {
    const handleSearch = async () => {
      if (token && query) {
        try {
          const getAlbums = await ServerCalls.getAlbums({
            artist_name: query,
            token,
          })
          setServerResponseAlbums(getAlbums)
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('invalid token')
      }
    }
    handleSearch()
  }, [query])

  return (
    <div className="py-6 md:py-24 bg-gradient-to-t from-black from-85% to-gray-800 to-100%">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-around">
        {serverResponseAlbums ? (
          <AlbumCard serverResponseAlbums={serverResponseAlbums} />
        ) : (
          'loading'
        )}
      </div>
    </div>
  )
}

export default Search
