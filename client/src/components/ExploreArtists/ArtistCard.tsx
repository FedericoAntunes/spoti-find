import { toast } from 'react-toastify'

// Types
import { ArtistResponse } from '../../types/artist'

interface ArtistCardProps {
  artistsResponse: ArtistResponse
}

function ArtistCard({ artistsResponse }: ArtistCardProps) {
  const notify = () => toast.warning('This feature is not implemented yet.')

  return (
    artistsResponse && (
      <>
        {artistsResponse.artists.items.map((artist, index) => {
          return (
            <div
              onClick={notify}
              key={index}
              className="mx-auto rounded-lg w-[90vw] md:w-[45vw] lg:w-[30vw] xl:w-[20vw] p-4 shadow-lg bg-[#181818] active:bg-[#3a3a3a] lg:hover:scale-105 ease-in-out duration-200"
            >
              <img
                className="w-[258px] mx-auto rounded-full h-[258px] shadow-lg"
                src={
                  artist.images.length > 0
                    ? artist.images[0].url
                    : 'https://img.freepik.com/free-icon/user_318-563642.jpg?w=360'
                }
                alt={`${artist.name}`}
              />
              <div className="h-[30px] mt-4">
                <p className="text-white font-bold truncate">{artist.name}</p>
              </div>
            </div>
          )
        })}
      </>
    )
  )
}
export default ArtistCard
