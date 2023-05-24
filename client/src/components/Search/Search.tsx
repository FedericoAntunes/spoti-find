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
import InfiniteScroll from 'react-infinite-scroll-component'

function Search() {
  const [serverResponseAlbums, setServerResponseAlbums] =
    useState<AlbumsResponse | null>()
  const [offset, setOffset] = useState<number>(0)
  const [totalAlbums, setTotalAlbums] = useState<number>(0)

  const token = useSelector((state: RootState) => state.token)

  const { query } = useParams()

  useEffect(() => {
    setOffset(0)
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
          setOffset(getAlbums.returned_albums.length)
          setTotalAlbums(getAlbums.returned_albums.length)
          setServerResponseAlbums(getAlbums)
        } catch (error) {
          console.log(error)
        }
      }
    }
    handleSearch()
  }, [query])

  const handleGetMoreAlbums = async () => {
    if (token) {
      try {
        const getMoreAlbums = await ServerCalls.getAlbums({
          artist_name: query,
          token,
          offset,
        })
        setTotalAlbums(totalAlbums + getMoreAlbums.returned_albums.length)
        setOffset(offset + getMoreAlbums.returned_albums.length)
        if (serverResponseAlbums) {
          const allAlbums = [
            ...serverResponseAlbums.returned_albums,
            ...getMoreAlbums.returned_albums,
          ]
          getMoreAlbums.returned_albums = allAlbums
          setServerResponseAlbums(getMoreAlbums)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleClickScroll = () => {
    const element = document.getElementById('top')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return serverResponseAlbums ? (
    <div className="p-4  sm:px-5 lg:px-8 xl:px-14 md:py-6 bg-gradient-to-t from-[#121212] from-85% to-[#252A2F] to-100% min-h-[calc(100vh-4rem)]">
      <div className="text-gray-200 mb-6 pt-12">
        Albums results for search:{' '}
        <span className="font-semibold">{query}</span>
      </div>
      {serverResponseAlbums.returned_albums ? (
        <InfiniteScroll
          dataLength={totalAlbums}
          next={handleGetMoreAlbums}
          hasMore={false}
          loader={
            <img
              className="mx-auto w-16 mt-6"
              src="https://digital-business-schweiz.ch/wp-content/uploads/2020/02/global_loader.gif"
              alt="Loading"
            />
          }
          endMessage={
            <p className="text-center mt-8 text-gray-200">
              <b>
                You have seen it all, want to{' '}
                <span
                  className="text-[#1DB954] lg:hover:text-[#55d181] active:text-[#1c8340] lg:active:text-[#1c8340] ease-in-out duration-200 cursor-pointer"
                  onClick={handleClickScroll}
                >
                  {' '}
                  go back to top?
                </span>
              </b>
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-around">
            <AlbumCard serverResponseAlbums={serverResponseAlbums} />
          </div>
        </InfiniteScroll>
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
