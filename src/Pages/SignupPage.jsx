import AuthTemplate from "../Templates/AuthTemplate"
import InputAtom from "../Atoms/InputAtom"
import ButtonAtom from "../Atoms/ButtonAtom"

import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { ErrorMessageGenerator } from "../utils/ErrorMessageGenerator"
import { ApiError } from "../utils/ApiError"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export default function SignupPage() {
  const defaultUser = {
    name: "",
    username: "",
    email: "",
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
    if (!emailRegex.test(user.email)) {
      alert("Invalid Email Format")
    } else if (!passwordRegex.test(user.password)) {
      alert("Invalid Password Format")
    } else {
      axios
        .post(
          `${import.meta.env.VITE_AUTH_BASE_URL}/register`,
          {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password
          },
          {
            withCredentials: true
          }
        )
        .then((res) => {
          if (res?.data?.statusCode === 201) {
            localStorage.setItem("isAuthenticated", "true")
            navigate("/")
          } else {
            const message = ErrorMessageGenerator(res?.data?.message)
            alert(message)
            throw new ApiError(res?.data?.statusCode, message)
          }
        })
        .catch((error) => {
          const errorMessage = ErrorMessageGenerator(error.response.data)
          alert(errorMessage)
          throw new ApiError(error.response.status, errorMessage)
        })
    }
  }

  return (
    <AuthTemplate headerText="Create your Account">
      <form
        className="space-y-4 md:space-y-6"
        method="POST"
        onSubmit={handleSubmit}
      >
        <InputAtom
          label="Name"
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
        <InputAtom
          label="Username"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="johndoe"
        />
        <InputAtom
          label="Email"
          type="email"
          name="email"
          value={user.email}
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
        <ButtonAtom buttonText="Sign up" />
        <p className="text-sm font-light text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login Here
          </Link>
        </p>
      </form>
    </AuthTemplate>
  )
}
