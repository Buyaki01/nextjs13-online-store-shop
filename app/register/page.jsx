import { getServerSession } from "next-auth"
import FormWrap from "../components/FormWrap"
import RegisterForm from "./RegisterForm"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const Register = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect("/")
  
  return (
    <FormWrap>
      <RegisterForm />
    </FormWrap>
  )
}

export default Register