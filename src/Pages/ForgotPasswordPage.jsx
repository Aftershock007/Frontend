import AuthTemplate from "../Templates/AuthTemplate"
import InputAtom from "../Atoms/InputAtom"
import ButtonAtom from "../Atoms/ButtonAtom"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export default function ForgotPasswordPage() {
  const defaultUser = {
    email: "",
    password: "",
    confirm_password: ""
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
    } else if (user.password !== user.confirm_password) {
      alert("Passwords do not match")
    } else {
      axios
        .patch(`${import.meta.env.VITE_AUTH_BASE_URL}/forgotpassword`, {
          email: user.email,
          password: user.password
        })
        .then((response) => {
          if (response?.data?.status !== 200) {
            alert(response?.data?.message)
          } else {
            navigate(
              `/otp?email=${encodeURIComponent(
                user.email
              )}&password=${encodeURIComponent(user.password)}`
            )
          }
        })
        .catch((error) => {
          console.error(
            "There was an error in forgot password page:",
            error?.response?.data
          )
        })
    }
  }

  return (
    <AuthTemplate headerText="Reset your Password">
      <form
        className="mt-4 space-y-5 lg:mt-5"
        method="POST"
        onSubmit={handleSubmit}
      >
        <InputAtom
          label="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
        <InputAtom
          label="New Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        <InputAtom
          label="Confirm New Password"
          type="password"
          name="confirm_password"
          value={user.confirm_password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        <ButtonAtom buttonText="Reset password" />
      </form>
    </AuthTemplate>
  )
}
