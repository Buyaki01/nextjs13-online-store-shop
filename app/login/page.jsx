import { getSession, getServerSession } from "next-auth"
import FormWrap from "../components/FormWrap"
import LoginForm from "./LoginForm"
import { redirect } from "next/navigation"

const Login = async ({ req, res }) => {
  const session = await getServerSession({ req })

  // If session exists, redirect to the stored URL
  if (session) {
    redirect(session.redirectUrl || "/")
  }

  // If no session, try to get the session on the client side
  const clientSession = await getSession()

  // If session exists on the client side, redirect to the stored URL
  if (clientSession) {
    redirect(clientSession.redirectUrl || "/")
  }

  return (
    <FormWrap>
      <LoginForm />
    </FormWrap>
  )
}

export default Login