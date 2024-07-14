import axios from "axios"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function PublicRoute({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (isAuthenticated !== null) {
      axios
        .get(`${import.meta.env.VITE_AUTH_BASE_URL}/cookies-exists`, {
          withCredentials: true
        })
        .then((res) => {
          console.log("Result", res)
          if (res.data === false) {
            localStorage.clear()
            navigate("/login", { replace: true })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    if (isAuthenticated === "true") {
      navigate("/", { replace: true })
    }
  }, [navigate])

  return children
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
}
