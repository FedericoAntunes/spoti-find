import { Link } from 'react-router-dom'

function Error404() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#181818]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#1DB954] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <Link
          to="/"
          className="relative inline-block text-sm font-medium text-[#1DB954]"
        >
          <span className="relative block px-8 py-3 bg-[#1DB954] text-white font-bold lg:hover:bg-[#44bb6e] active:bg-[#1c8340] ease-in-out duration-200 border border-current">
            <span>Go Home</span>
          </span>
        </Link>
      </button>
    </main>
  )
}

export default Error404
