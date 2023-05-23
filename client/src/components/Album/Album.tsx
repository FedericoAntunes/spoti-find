import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Calls
import { ServerCalls } from '../../axios_calls/serverCalls'

// Types
import { CompleteAlbum } from '../../types/album'
import { RootState } from '../../redux/store'

// Components
import Loader from '../Loader/Loader'

function Album() {
  const [album, setAlbum] = useState<CompleteAlbum>()
  const [totalTime, setTotalTime] = useState<number>(0)

  const token = useSelector((state: RootState) => state.token)

  const { id } = useParams()

  useEffect(() => {
    async function getAlbum() {
      if (token && id) {
        try {
          const response = await ServerCalls.getAlbum({
            token,
            album_id: id,
          })
          let time = 0
          for (const track of response.tracks.items) {
            time += track.duration_ms
          }
          setTotalTime(time)
          setAlbum(response)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getAlbum()
  }, [id])

  function parseTotalTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)

    seconds = seconds % 60
    minutes = minutes % 60

    return `${hours > 0 ? `${hours} h ` : ''} ${
      minutes > 0 ? `${minutes} min ` : ''
    } ${hours > 0 ? `${hours} s ` : ''}`
  }

  return album ? (
    <div className="bg-gradient-to-r from-transparent via-green-900">
      <img
        className="mx-auto"
        src={album.images[0].url}
        alt={`Album ${album.name} front page.`}
      />
      <div className="bg-gradient-to-t px-4 lg:px-8 xl:px-14 from-[#121212] pb-6 from-85% to-[#252A2F] to-100%">
        <h3 className="text-white font-bold text-2xl text-center pt-4">
          {album.name}
        </h3>
        <div className="md:flex justify-center mt-6 max-w-[90vw] mx-auto text-white space-x-2">
          <div className="font-bold text-center">{album.artists[0].name}</div>
          <span className="hidden md:inline"> • </span>
          <span className="hidden md:inline">
            {album.release_date.split('-')[0]}
          </span>
          <span className="hidden md:inline"> • </span>
          <div className="text-center">
            {album.total_tracks} tracks,{' '}
            <span className="text-gray-300">{parseTotalTime(totalTime)}</span>
          </div>
        </div>
        <div className="relative lg:max-w-[50vw] mx-auto flex justify-center mt-6 overflow-x-auto">
          <table className="text-sm w-[90vw] text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs border-b text-gray-400 uppercase">
              <tr>
                <th scope="col" className="w-[20px] text-center py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="hidden md:block py-3">
                  <svg
                    role="img"
                    height="16"
                    width="16"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    data-encore-id="icon"
                    stroke="rgb(156 163 175)"
                    className="Svg-sc-ytk21e-0 text-gray-400 ldgdZj"
                  >
                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                    <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              {album.tracks.items.map((track, index) => {
                return (
                  <tr key={index} className="">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-400 whitespace-nowrap dark:text-white"
                    >
                      {track.track_number}
                    </th>
                    <td className="px-6 py-4 text-white">{track.name}</td>
                    <td className="hidden text-gray-400 md:block py-4">
                      {parseTotalTime(track.duration_ms)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="text-sm mt-6 text-gray-400">
          {album.copyrights?.map((item, index) => {
            return <div key={index}> {item.text} </div>
          })}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default Album
