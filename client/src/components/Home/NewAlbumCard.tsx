import { NewAlbumsResponse } from '../../types/albumsResponse'

interface AlbumCardProps {
  serverResponseAlbums: NewAlbumsResponse
}

function NewAlbumCard({ serverResponseAlbums }: AlbumCardProps) {
  return (
    <>
      {serverResponseAlbums &&
        serverResponseAlbums.albums.items.map((album, index) => {
          return (
            <div
              key={index}
              className="mx-auto w-[300px] p-4 shadow-lg bg-[#181818]"
            >
              <img
                className="h-[300px] shadow-lg"
                src={album.images[0].url}
                alt=""
              />
              <div className="h-[50px] mt-4">
                <p className="text-white font-semibold truncate">
                  {album.name}
                </p>
                <p className="text-gray-200">{album.artists[0].name}</p>
              </div>
            </div>
          )
        })}
    </>
  )
}

export default NewAlbumCard
