import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Calls
import { TokenCalls } from '../../axios_calls/tokenCall'

// Actions
import { saveToken } from '../../redux/slices/tokenSlice'

import style from './Landing.module.css'

function Landing() {
  const [loading, setLoading] = useState<boolean>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGetToken = async () => {
    try {
      setLoading(true)
      const token = await TokenCalls.getToken()
      dispatch(saveToken(token))
      navigate('/home')
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex">
      <div
        style={{
          backgroundImage:
            'url(https://rare-gallery.com/thumbs/1079269-music-album-covers-vinyl-rock-roll-book-personal-computer-hardware.jpg)',
        }}
        className="h-screen absolute bg-cover w-screen z-1"
      ></div>
      <main className="z-50 h-screen flex justify-center items-center w-screen bg-[#121212] bg-opacity-80 px-4">
        <div className="w-[700px]">
          <div>
            <Link to={'/home'}>
              <h1 className="text-[#1DB954] font-bold text-6xl text-center mb-12">
                <span className={style.text_fast_flicker_in_glow}>Sp</span>
                <span className={style.text_flicker_in_glow}>o</span>
                <span className={style.text_fast_flicker_in_glow}>ti</span>
                <span className={style.text_flicker_in_glow}>F</span>
                <span className={style.text_medium_flicker_in_glow}>in</span>
                <span className={style.text_flicker_in_glow}>d</span>
              </h1>
            </Link>
          </div>
          <div className="p-2 my-auto text-center rounded-lg backdrop-blur-lg border border-black h-64">
            <div className="flex items-center h-full w-full justify-center">
              <div>
                <h3 className="text-white font-bold -mt-12 text-lg">
                  About this project
                </h3>
                <p className="text-white mt-6">
                  You can search any artist and get his albums using the{' '}
                  <Link
                    className="text-[#1DB954] underline lg:hover:text-[#55d181] active:text-[#1c8340] ease-in-out duration-200"
                    to={'https://developer.spotify.com/documentation/web-api'}
                    target="_blank"
                  >
                    Spotify API
                  </Link>
                  .
                </p>
                <p className="text-white">
                  This is a open source project, you can{' '}
                  <Link
                    className="text-[#1DB954] underline lg:hover:text-[#55d181] active:text-[#1c8340] ease-in-out duration-200"
                    to={'https://github.com/FedericoAntunes/spoti-find'}
                    target="_blank"
                  >
                    contribute
                  </Link>{' '}
                  or open an issue to discuss what you would like to change.
                </p>
                <p className="text-white mt-4">
                  To start using the app click on the "Start searching" button.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleGetToken}
              className="bg-[#1DB954] w-[124.47px] h-[40px] p-2 rounded-lg text-white font-medium lg:hover:bg-[#44bb6e] active:bg-[#1c8340] ease-in-out duration-200"
            >
              {loading ? (
                <svg
                  className="animate-spin mx-auto h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Start searching'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Landing
