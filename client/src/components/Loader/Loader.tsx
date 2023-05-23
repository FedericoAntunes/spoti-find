import style from './Loader.module.css'

function Loader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center backdrop-blur-lg absolute top-0 z-[500]">
      <div className="text-[#1DB954] font-bold text-6xl text-center mb-12">
        <span className={style.text_fast_flicker_in_glow}>Sp</span>
        <span className={style.text_flicker_in_glow}>o</span>
        <span className={style.text_fast_flicker_in_glow}>ti</span>
        <span className={style.text_flicker_in_glow}>F</span>
        <span className={style.text_medium_flicker_in_glow}>in</span>
        <span className={style.text_flicker_in_glow}>d</span>
      </div>
    </div>
  )
}

export default Loader
