import Slider from 'react-slick'
import { Link } from 'react-router-dom'

// Types
import { SimplifiedAlbumObject } from '../../types/album'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface NewAlbumsCarouselProps {
  albums: SimplifiedAlbumObject[]
}

function NewAlbumsCarousel({ albums }: NewAlbumsCarouselProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
  }

  return (
    <Slider className="" {...settings}>
      {albums.map((album, index) => {
        return (
          <Link
            to={`/albums/${album.id}`}
            key={index}
            className="bg-gradient-to-r from-transparent via-green-900 text-center text-white border-y border-black"
          >
            <div className="w-fit mx-auto">
              <img className="m-auto" src={album.images[0].url} />
              <div className="sm:bg-black">
                <h3 className="font-bold">{album.name}</h3>
                <p>{album.artists[0].name}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </Slider>
  )
}

export default NewAlbumsCarousel
