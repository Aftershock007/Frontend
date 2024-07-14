import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ErrorMessageGenerator } from "../utils/ErrorMessageGenerator"
import { ApiError } from "../utils/ApiError"

export default function HomePage() {
  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()

    axios
      .post(
        `${import.meta.env.VITE_AUTH_BASE_URL}/logout`,
        {},
        {
          withCredentials: true
        }
      )
      .then((res) => {
        if (res.data.statusCode !== 200) {
          alert(res.data.message)
        } else {
          localStorage.clear()
          navigate("/login")
        }
      })
      .catch((error) => {
        const errorMessage = ErrorMessageGenerator(error.response.data)
        alert(errorMessage)
        throw new ApiError(error.response.status, errorMessage)
      })
  }

  return (
    <>
      <div>HomePage</div>
      <button
        className="border px-5 py-2 bg-red-800 text-white"
        onClick={handleClick}
      >
        Log out
      </button>
    </>
  )
}
