'use client'

import Input from "../components/inputs/Input"

const RegisterForm = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-2">Welcome to Pearls Collections</h1>
      <p className="text-sm mb-4">Type your email and password to sign up or log in, or use Google to sign in</p>
      <Input />
    </>
  )
}

export default RegisterForm