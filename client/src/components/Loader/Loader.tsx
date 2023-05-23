import style from './Loader.module.css'

function Loader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center backdrop-blur-lg absolute top-0 z-[500]">
      <div className="text-[#1DB954] font-bold text-6xl text-center mb-12">
        <p className={style.heartbeat}> SpotiFind </p>
      </div>
    </div>
  )
}

export default Loader
