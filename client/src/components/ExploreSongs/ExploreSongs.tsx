import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// Calls
import { ServerCalls } from '../../axios_calls/serverCalls'

// Types
import { RawTracksResponse } from '../../types/track'
import { RootState } from '../../redux/store'

// Components
import SongCard from './SongCard'
import Loader from '../Loader/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import SongCardLoader from './SongCardLoader'

function ExploreSongs() {
  const [receivedTracks, setReceivedTracks] = useState<RawTracksResponse>()
  const [yearRange, setYearRange] = useState<string | null>(null)
  const [activePeriod, setActivePeriod] = useState<number | null>(null)
  const [offset, setOffset] = useState<number>(0)
  const [totalTracks, setTotalTracks] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const token = useSelector((state: RootState) => state.token)

  useEffect(() => {
    async function getTracks() {
      if (token) {
        try {
          const getTracks = await ServerCalls.getTracks(
            '/tracks/initial_tracks',
            {
              token,
            }
          )
          setTotalTracks(totalTracks + getTracks.tracks.items.length)
          setOffset(offset + getTracks.tracks.items.length)
          setReceivedTracks(getTracks)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getTracks()
  }, [])

  useEffect(() => {
    async function getFilteredTracks() {
      setLoading(true)
      if (token && yearRange) {
        try {
          const getFilteredTracks = await ServerCalls.getTracks(
            '/tracks/filtered_tracks',
            {
              token,
              year_range: yearRange,
              offset: 0,
            }
          )
          setTotalTracks(getFilteredTracks.tracks.items.length)
          setOffset(getFilteredTracks.tracks.items.length)
          setReceivedTracks(getFilteredTracks)
        } catch (error) {
          console.log(error)
        }
      }
      setLoading(false)
    }
    getFilteredTracks()
  }, [yearRange])

  const handleGetMoreTracks = async () => {
    if (token && yearRange) {
      try {
        const getMoreTracks = await ServerCalls.getTracks(
          `/tracks/filtered_tracks`,
          {
            token,
            year_range: yearRange,
            offset,
          }
        )
        setTotalTracks(totalTracks + getMoreTracks.tracks.items.length)
        setOffset(offset + getMoreTracks.tracks.items.length)
        if (receivedTracks) {
          const allAlbums = [
            ...receivedTracks.tracks.items,
            ...getMoreTracks.tracks.items,
          ]
          getMoreTracks.tracks.items = allAlbums
          setReceivedTracks(getMoreTracks)
        }
      } catch (error) {
        console.log(error)
      }
    } else if (token) {
      try {
        const getMoreTracks = await ServerCalls.getTracks(
          `/tracks/initial_tracks`,
          {
            token,
            offset,
          }
        )
        setTotalTracks(totalTracks + getMoreTracks.tracks.items.length)
        setOffset(offset + getMoreTracks.tracks.items.length)
        if (receivedTracks) {
          const allAlbums = [
            ...receivedTracks.tracks.items,
            ...getMoreTracks.tracks.items,
          ]
          getMoreTracks.tracks.items = allAlbums
          setReceivedTracks(getMoreTracks)
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

  const years = [1960, 1970, 1980, 1990, 2000, 2010]

  return receivedTracks ? (
    <div className="text-white p-4 pt-16 sm:px-5 lg:px-8 xl:px-14 bg-gradient-to-t from-[#121212] from-85% to-[#252A2F] to-100%">
      <div className="font-bold text-lg">Explore songs</div>
      <div className="mt-6">
        <div>Filter by decade</div>
        <div className="flex space-x-4 w-full mx-auto mt-2">
          {years.map((year, index) => {
            return (
              <span
                key={index}
                onClick={() => {
                  setActivePeriod(year)
                  setYearRange(`${year}-${year + 9}`)
                }}
                className={`border rounded-full w-12 text-center lg:hover:bg-[#3a3a3a] lg:active:bg-[#5e5d5d] ease-in-out duration-200 cursor-pointer ${
                  activePeriod === year && 'bg-[#5e5d5d]'
                }`}
              >
                {year.toString().slice(2)}'
              </span>
            )
          })}
        </div>
      </div>
      {receivedTracks.tracks.items.length > 0 ? (
        <InfiniteScroll
          dataLength={totalTracks}
          next={handleGetMoreTracks}
          hasMore={receivedTracks.tracks.next ? true : false}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 xl:grid-cols-4 gap-y-8 gap-x-2">
            {loading ? (
              <SongCardLoader />
            ) : (
              <SongCard tracksResponse={receivedTracks} />
            )}
          </div>
        </InfiniteScroll>
      ) : (
        <p className="text-gray-200 mt-6 text-center">
          Sorry! no results where found.
        </p>
      )}
    </div>
  ) : (
    <Loader />
  )
}

export default ExploreSongs
