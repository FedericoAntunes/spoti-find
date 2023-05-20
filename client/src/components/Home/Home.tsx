import { useEffect, useState } from 'react'
import { NewAlbumsResponse } from '../../types/albumsResponse'
import { useSelector } from 'react-redux'
import { ServerCalls } from '../../axios_calls/serverCalls'
import { RootState } from '../../redux/store'
import NewAlbumCard from './NewAlbumCard'

function Home() {
  const [serverResponseAlbums, setServerResponseAlbums] =
    useState<NewAlbumsResponse>()

  const token = useSelector((state: RootState) => state.token.access_token)

  useEffect(() => {
    const handleSearch = async () => {
      if (token) {
        try {
          const getAlbums = await ServerCalls.getNewAlbums({
            token,
          })
          console.log(getAlbums)

          setServerResponseAlbums(getAlbums)
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('invalid token')
      }
    }
    handleSearch()
  }, [])

  return (
    <div className="py-6 md:py-12 bg-gradient-to-t from-black from-85% to-gray-800 to-100% min-h-[calc(100vh-4rem)]">
      <div className="flex mb-12 justify-center">
        <h2 className="text-white text-2xl font-semibold">
          Discover new albums
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-around">
        {serverResponseAlbums ? (
          <NewAlbumCard serverResponseAlbums={serverResponseAlbums} />
        ) : (
          'loading'
        )}
      </div>
    </div>
  )
}

export default Home
