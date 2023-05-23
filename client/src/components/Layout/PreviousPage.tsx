import { useNavigate } from 'react-router-dom'

function PreviousPage() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleNext = () => {
    navigate(1)
  }

  return (
    <div className="text-[#5f5f5f] flex space-x-2 fixed z-40 top-20 left-3 sm:left-5 lg:left-14">
      <svg
        onClick={handleBack}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="opacity-70 lg:hover:opacity-100 lg:hover:text-[#8d8d8d] active:text-[#a1a1a1] lg:active:text-[#a1a1a1] ease-in-out duration-200 cursor-pointer"
        viewBox="0 0 16 16"
      >
        {' '}
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />{' '}
      </svg>
      <svg
        onClick={handleNext}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="opacity-70 lg:hover:opacity-100 lg:hover:text-[#8d8d8d] active:text-[#a1a1a1] lg:active:text-[#a1a1a1] ease-in-out duration-200 cursor-pointer"
        viewBox="0 0 16 16"
      >
        {' '}
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />{' '}
      </svg>
    </div>
  )
}

export default PreviousPage