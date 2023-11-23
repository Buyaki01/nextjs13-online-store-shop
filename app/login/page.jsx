import { getServerSession } from "next-auth"
import FormWrap from "../components/FormWrap"
import LoginForm from "./LoginForm"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const Login = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect("/") //I want when user tries to checkout and they are not logged in, they get redirected to the login page and the come back to the checkout-page NOT the login page

  return (
    <FormWrap>
      <LoginForm />
    </FormWrap>
  )
}

export default Login