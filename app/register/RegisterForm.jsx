'use client'

import { useState } from "react"
import Input from "../components/inputs/Input"
import { useForm } from "react-hook-form"
import Link from "next/link"

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: {errors}} = useForm()
  
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <h1 className="text-4xl font-semibold mb-2 text-primary">Welcome to Pearls Collections</h1>
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <button
        className="w-full text-white text-lg px-4 py-2 rounded-lg focus:outline-none"
        onClick={handleSubmit(onSubmit)}
      >
        Sign Up
      </button>

      <p className="text-sm">
        Already have an account? <Link className="underline" href={'/login'}>Log in</Link>
      </p>
    </>
  )
}

export default RegisterForm