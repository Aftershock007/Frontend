import axios from "axios"
import ButtonAtom from "../Atoms/ButtonAtom"
import AuthTemplate from "../Templates/AuthTemplate"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const otpRegex = /^\d?$/

export default function OtpPage() {
  const [otp, setOtp] = useState(Array(6).fill(""))
  const navigate = useNavigate()
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const emailReceived = queryParams.get("email")
  const passwordReceived = queryParams.get("password")

  function handleChange(e, index) {
    const { value } = e.target
    if (otpRegex.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus()
      }
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (otp.includes("")) {
      alert("Please enter all OTP digits")
      return
    }
    const otpReceived = otp.join("")

    axios
      .patch(`${import.meta.env.VITE_AUTH_BASE_URL}/otp`, {
        email: emailReceived,
        password: passwordReceived,
        otp: otpReceived
      })
      .then((response) => {
        if (response?.data?.status !== 200) {
          alert(response?.data?.message)
        } else {
          navigate("/home")
        }
      })
      .catch((error) => {
        console.error("There was an error in otp page:", error?.response?.data)
      })
  }

  return (
    <AuthTemplate headerText="Enter OTP">
      <div className="flex flex-row text-sm font-medium text-gray-400">
        <p>
          We have sent a code to your email{" "}
          <span className="text-ellipsis overflow-hidden">{emailReceived}</span>
        </p>
      </div>
      <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-16 h-16">
              <input
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder="-"
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700"
              />
            </div>
          ))}
        </div>
        <ButtonAtom buttonText="Submit" />
        <p className="text-sm font-light text-gray-500">
          Didn’t recieve OTP?{" "}
          <button className="font-medium text-blue-600 hover:underline">
            Resend
          </button>
        </p>
      </form>
    </AuthTemplate>
  )
}
