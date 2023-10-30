'use client'

import Input from "../components/inputs/Input"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"

const LoginForm = () => {
  const { register, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <h1 className="text-4xl font-semibold mb-2 text-primary">Welcome to Pearls Collections</h1>

      <button
        className="custom-button-style flex gap-2 items-center justify-center w-full outline text-white text-lg px-4 py-2 rounded-lg focus:outline-none"
        onClick={() => {}}
      >
        <AiOutlineGoogle />
        Continue with Google
      </button>

      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />

      <button
        className="w-full outline text-white text-lg px-4 py-2 rounded-lg focus:outline-none"
        onClick={handleSubmit(onSubmit)}
      >
        Log In
      </button>

      <p className="text-sm">
        Don't have an account? <Link className="underline" href={'/register'}>Sign Up</Link>
      </p>
    </>
  )
}

export default LoginForm