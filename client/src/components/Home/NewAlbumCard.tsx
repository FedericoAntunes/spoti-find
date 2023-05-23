import { Link } from 'react-router-dom'

// Types
import { NewAlbumsResponse } from '../../types/album'

interface AlbumCardProps {
  serverResponseAlbums: NewAlbumsResponse
}

function NewAlbumCard({ serverResponseAlbums }: AlbumCardProps) {
  return (
    <>
      {serverResponseAlbums &&
        serverResponseAlbums.albums.items.map((album, index) => {
          return (
            <Link
              to={`/albums/${album.id}`}
              key={index}
              className="mx-auto rounded-lg w-[90vw] md:w-[45vw] lg:w-[30vw] xl:w-[20vw] p-4 shadow-lg bg-[#181818] active:bg-[#3a3a3a] lg:hover:scale-105 ease-in-out duration-200"
            >
              <img
                className="w-full shadow-lg"
                src={album.images[0].url}
                alt={`Album ${album.name} poster.`}
              />
              <div className="h-[50px] mt-4">
                <p className="text-white font-bold truncate">{album.name}</p>
                <p className="text-gray-200">{album.artists[0].name}</p>
              </div>
            </Link>
          )
        })}
    </>
  )
}

export default NewAlbumCard
