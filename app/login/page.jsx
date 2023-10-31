import { getServerSession } from "next-auth"
import FormWrap from "../components/FormWrap"
import LoginForm from "./LoginForm"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const Login = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect("/")

  return (
    <FormWrap>
      <LoginForm />
    </FormWrap>
  )
}

export default Login