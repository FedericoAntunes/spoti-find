import { TokenCalls } from '../axios_calls/tokenCall'
import { useDispatch } from 'react-redux'
import { saveToken } from '../redux/slices/tokenSlice'

function Home() {
  const dispatch = useDispatch()

  const handleGetToken = async () => {
    try {
      const token = await TokenCalls.getToken()
      dispatch(saveToken(token))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <main>
        <h1 className="text-green-500 font-semibold text-2xl text-center mb-16">
          Frontend SpotiSearch home
        </h1>
        <div className="p-2 rounded-lg bg-gray-700 bg-opacity-50 h-64">
          <h3 className="text-white font-semibold text-lg text-center">
            About this project
          </h3>
          <p className="text-white mt-6">
            This proyect allows you to search any artist and get his albums
            using the Spotify API
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGetToken}
            className="bg-green-600 p-2 rounded-lg text-white font-medium"
          >
            Start searching
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
