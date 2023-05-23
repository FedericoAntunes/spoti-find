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

function ExploreSongs() {
  const [receivedTracks, setReceivedTracks] = useState<RawTracksResponse>()
  const [yearRange, setYearRange] = useState<string | null>(null)
  const [activePeriod, setActivePeriod] = useState<number | null>(null)

  const token = useSelector((state: RootState) => state.token)

  useEffect(() => {
    async function getTracks() {
      if (token) {
        try {
          const response = await ServerCalls.getTracks(
            '/tracks/initial_tracks',
            {
              token,
            }
          )
          setReceivedTracks(response)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getTracks()
  }, [])

  useEffect(() => {
    async function getFilteredTracks() {
      if (token && yearRange) {
        try {
          const response = await ServerCalls.getTracks(
            '/tracks/filtered_tracks',
            {
              token,
              year_range: yearRange,
            }
          )
          setReceivedTracks(response)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getFilteredTracks()
  }, [yearRange])

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 xl:grid-cols-4 gap-y-8 gap-x-2">
        <SongCard tracksResponse={receivedTracks} />
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default ExploreSongs
