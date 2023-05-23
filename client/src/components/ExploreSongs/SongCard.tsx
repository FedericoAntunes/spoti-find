import { Link } from 'react-router-dom'

// Types
import { RawTracksResponse } from '../../types/track'

interface SongCardProps {
  tracksResponse: RawTracksResponse
}

function SongCard({ tracksResponse }: SongCardProps) {
  return (
    <>
      {tracksResponse &&
        tracksResponse.tracks.items.map((track, index) => {
          return (
            <Link
              to={`/albums/${track.album.id}`}
              key={index}
              className="mx-auto h-[132px] flex rounded-lg w-[90vw] md:w-[40vw] lg:w-[30vw] xl:w-[20vw] p-4 shadow-lg bg-[#181818] active:bg-[#3a3a3a] lg:hover:scale-105 ease-in-out duration-200"
            >
              <img
                className="h-[100px] shadow-lg"
                src={track.album.images[0].url}
                alt={`Album ${track.album.name} poster.`}
              />
              <div className="h-full ml-4 overflow-hidden">
                <p className="text-white font-bold truncate">{track.name}</p>
                <p className="text-gray-200 truncate">{track.album.name}</p>
                <p className="text-gray-200 mt-6 truncate">
                  {track.album.artists[0].name}
                </p>
              </div>
            </Link>
          )
        })}
    </>
  )
}

export default SongCard
