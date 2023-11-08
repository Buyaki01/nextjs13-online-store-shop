import { useState } from "react"

const AddressForm = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  return (
    <form>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={firstname}
        onChange={e => setFirstname(e.target.value)}
      />

      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={lastname}
        onChange={e => setLastname(e.target.value)}
      />

      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />

    </form>
  )
}

export default AddressForm