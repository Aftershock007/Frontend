import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import AuthTemplate from "../Templates/AuthTemplate"
import InputAtom from "../Atoms/InputAtom"
import ButtonAtom from "../Atoms/ButtonAtom"
import { ErrorMessageGenerator } from "../utils/ErrorMessageGenerator"
import { ApiError } from "../utils/ApiError"

export default function LoginPage() {
  const defaultUser = {
    usernameOrEmail: "",
    password: ""
  }
  const [user, setUser] = useState(defaultUser)
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    axios
      .post(
        `${import.meta.env.VITE_AUTH_BASE_URL}/login`,
        {
          usernameOrEmail: user.usernameOrEmail,
          password: user.password
        },
        {
          withCredentials: true
        }
      )
      .then((res) => {
        if (res.data.statusCode !== 200) {
          alert(res.data.message)
          navigate("/signup")
        } else {
          localStorage.setItem("isAuthenticated", "true")
          navigate("/")
        }
      })
      .catch((error) => {
        const errorMessage = ErrorMessageGenerator(error.response.data)
        alert(errorMessage)
        throw new ApiError(error.response.status, errorMessage)
      })
  }

  return (
    <AuthTemplate headerText="Login to your Account">
      <form className="space-y-5" method="POST" onSubmit={handleSubmit}>
        <InputAtom
          label="Email/Username"
          type="text"
          name="usernameOrEmail"
          value={user.usernameOrEmail}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
        <InputAtom
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-start"></div>
          <Link
            to="/forgotpassword"
            className=" text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <ButtonAtom buttonText="Log in" />
        <p className="text-sm font-light text-gray-500">
          Don’t have an account yet?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Signup Here
          </Link>
        </p>
      </form>
    </AuthTemplate>
  )
}
