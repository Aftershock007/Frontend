import axios from "axios"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ErrorMessageGenerator } from "../utils/ErrorMessageGenerator.js"

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem("isAuthenticated")

  useEffect(() => {
    if (isAuthenticated !== "true") {
      navigate("/login", { replace: true })
    }
    axios
      .get(`${import.meta.env.VITE_AUTH_BASE_URL}/user`, {
        withCredentials: true
      })
      .then((res) => {
        if (res.data.statusCode !== 200) {
          navigate("/login", { replace: true })
        }
      })
      .catch((error) => {
        navigate("/login", { replace: true })
        const errorMessage = ErrorMessageGenerator(error.response.data)
        console.log(errorMessage)
      })
  }, [navigate, isAuthenticated])

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}
