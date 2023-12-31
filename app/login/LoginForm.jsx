'use client'

import { useForm } from "react-hook-form"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Input from "../components/Input"

const LoginForm = () => {
  const { register, handleSubmit, formState: {errors}} = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      const { email, password } = data

      if (!email || !password) {
        toast.error("All Fields are required!")
      }
      
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if(response.status === 200 ) {
        toast.success("Login successful")
        router.back()
        // router.push("/")
      }

      if (response.status === 401) {
        toast.error("Invalid Credentials! Try again!")
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className="text-4xl font-semibold mb-2 text-primary">Welcome to Pearls Collections</h1>

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
        Have an account? <Link className="underline" href={"/register"}>Sign Up</Link>
      </p>
    </>
  )
}

export default LoginForm