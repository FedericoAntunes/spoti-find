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
import InfiniteScroll from 'react-infinite-scroll-component'
import ArtistCardLoader from './ArtistCardLoader'

function ExploreArtists() {
  const [receivedArtists, setReceivedArtists] = useState<ArtistResponse>()
  const [actualGenre, setActualGenre] = useState<string | null>(null)
  const [totalArtists, setTotalArtists] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const token = useSelector((state: RootState) => state.token)

  useEffect(() => {
    async function getArtists() {
      if (token) {
        try {
          const getArtists = await ServerCalls.getArtists(
            '/artists/initial_artists',
            {
              token,
            }
          )
          setTotalArtists(getArtists.artists.items.length)
          setOffset(getArtists.artists.items.length)
          setReceivedArtists(getArtists)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getArtists()
  }, [])

  useEffect(() => {
    setOffset(0)
    async function getFilteredTracks() {
      setLoading(true)
      if (token && actualGenre) {
        try {
          const getFilteredArtists = await ServerCalls.getArtists(
            '/artists/filtered_artists',
            {
              token,
              offset: 0,
              genre: actualGenre,
            }
          )
          setTotalArtists(getFilteredArtists.artists.items.length)
          setOffset(getFilteredArtists.artists.items.length)
          setReceivedArtists(getFilteredArtists)
        } catch (error) {
          console.log(error)
        }
      }
      setLoading(false)
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

  const handleGetMoreArtists = async () => {
    if (token && actualGenre) {
      try {
        const getMoreArtists = await ServerCalls.getArtists(
          `/artists/filtered_artists`,
          {
            token,
            genre: actualGenre,
            offset,
          }
        )
        setTotalArtists(totalArtists + getMoreArtists.artists.items.length)
        setOffset(offset + getMoreArtists.artists.items.length)
        if (receivedArtists) {
          const allAlbums = [
            ...receivedArtists.artists.items,
            ...getMoreArtists.artists.items,
          ]
          getMoreArtists.artists.items = allAlbums
          setReceivedArtists(getMoreArtists)
        }
      } catch (error) {
        console.log(error)
      }
    } else if (token) {
      try {
        const getMoreArtists = await ServerCalls.getArtists(
          `/artists/initial_artists`,
          {
            token,
            offset,
          }
        )
        setTotalArtists(totalArtists + getMoreArtists.artists.items.length)
        setOffset(offset + getMoreArtists.artists.items.length)
        if (receivedArtists) {
          const allAlbums = [
            ...receivedArtists.artists.items,
            ...getMoreArtists.artists.items,
          ]
          getMoreArtists.artists.items = allAlbums
          setReceivedArtists(getMoreArtists)
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
        <InfiniteScroll
          dataLength={totalArtists}
          next={handleGetMoreArtists}
          hasMore={receivedArtists.artists.next ? true : false}
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
          <div className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-12">
            {loading ? (
              <ArtistCardLoader />
            ) : (
              <ArtistCard artistsResponse={receivedArtists} />
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

export default ExploreArtists
