'use client'

import { useState } from "react"
import Input from "../components/inputs/Input"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import axios from "axios"
import { signIn } from "next-auth/react"

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: {errors}} = useForm()
  
  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data

      const resUserExists = await axios.post("/api/userExists", { email })

      const { user } = await resUserExists.data

      if (user) {
        toast.error("User already exists")
        return
      }

      await axios.post('/api/register', { name, email, password })
      toast.success("Account created successfully")

    } catch (error) {
      console.log("Error during registration: ", error)
    }
  }

  return (
    <>
      <h1 className="text-4xl font-semibold mb-2 text-primary">Welcome to Pearls Collections</h1>

      <button
        className="bg-[#c0c0c0] hover:bg-[#a0a0a0] flex gap-2 items-center justify-center w-full outline text-white text-lg px-4 py-2 rounded-lg focus:outline-none"
        onClick={() => signIn('google')}
      >
        <AiOutlineGoogle />
        Continue with Google
      </button>

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
        className="w-full outline text-white text-lg px-4 py-2 rounded-lg focus:outline-none"
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