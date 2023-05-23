import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'

// Calls
import { ServerCalls } from '../../axios_calls/serverCalls'

// Types
import { ArtistResponse } from '../../types/artist'
import { RootState } from '../../redux/store'

// Components
import Loader from '../Loader/Loader'
import ArtistCard from './ArtistCard'

function ExploreArtists() {
  const [receivedArtists, setReceivedArtists] = useState<ArtistResponse>()
  const [actualGenre, setActualGenre] = useState<string | null>(null)

  const token = useSelector((state: RootState) => state.token)

  useEffect(() => {
    async function getArtists() {
      if (token) {
        try {
          const response = await ServerCalls.getArtists(
            '/artists/initial_artists',
            {
              token,
            }
          )
          setReceivedArtists(response)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getArtists()
  }, [])

  useEffect(() => {
    async function getFilteredTracks() {
      if (token && actualGenre) {
        try {
          const response = await ServerCalls.getArtists(
            '/artists/filtered_artists',
            {
              token,
              genre: actualGenre,
            }
          )
          setReceivedArtists(response)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getFilteredTracks()
  }, [actualGenre])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    swipeToSlide: true,
    variableWidth: true,
  }

  const genres = [
    'Pop',
    'Rap',
    'Rock',
    'Urbano latino',
    'Hip Hop',
    'Trap latino',
    'Dance pop',
    'Reggaeton',
    'Trap',
  ]

  return receivedArtists ? (
    <div className="text-white p-4 pt-16 sm:px-5 lg:px-8 xl:px-14 bg-gradient-to-t from-[#121212] from-85% to-[#252A2F] to-100% min-h-[calc(100vh-4rem)]">
      <div className="font-bold text-lg">Explore artist</div>
      <div className="mt-6">Filter by genre</div>
      <div className="flex justify-center">
        <div className="mt-2 w-[80vw] sm:space-x-4">
          <Slider className="" {...settings}>
            {genres.map((genre, index) => {
              return (
                <div key={index}>
                  <div
                    onClick={() => setActualGenre(genre)}
                    className={`border sm:mx-4 w-32 rounded-full text-center lg:hover:bg-[#3a3a3a] lg:active:bg-[#5e5d5d] ease-in-out duration-200 cursor-pointer ${
                      genre === actualGenre && 'bg-[#5e5d5d]'
                    }`}
                  >
                    {genre}
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
      {receivedArtists.artists.items.length > 0 ? (
        <div className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-12">
          <ArtistCard artistsResponse={receivedArtists} />
        </div>
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

export default ExploreArtists
