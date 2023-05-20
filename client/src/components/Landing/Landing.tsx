import { ServerCalls } from '../../axios_calls/serverCalls'
import { useDispatch } from 'react-redux'
import { saveToken } from '../../redux/slices/tokenSlice'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGetToken = async () => {
    try {
      const token = await ServerCalls.getToken()
      dispatch(saveToken(token))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <main>
        <div>
          <h1 className="text-[#1DB954] font-semibold text-6xl text-center mb-16">
            SpotiFind
          </h1>
        </div>
        <div className="p-2 rounded-lg bg-[#121212] h-64">
          <h3 className="text-white font-semibold text-lg text-center">
            About this project
          </h3>
          <p className="text-white mt-6">
            This proyect allows you to search any artist and get his albums
            using the Spotify API.
            <br />
            To start using the app you have to click the "Start searching"
            button.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGetToken}
            className="bg-[#1DB954] p-2 rounded-lg text-white font-medium"
          >
            Start searching
          </button>
        </div>
      </main>
    </div>
  )
}

export default Landing
