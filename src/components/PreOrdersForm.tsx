import React, { useState } from 'react'
import Form, { Input } from "./Form"
import {
  registerProfile,
  RegisterFor
} from "./mixpanelAPI"

const PreOrdersForm = () => {
  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [header, setHeader] = useState("Pre Orders Waitlist")

  const handleSubmit = () => {
    setNameError(true)
    setEmailError(true)

    const regex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    if (!regex.test(emailValue) || nameValue === "") {
      if (!regex.test(emailValue)) {
        setEmailError(true)
      } else {
        setEmailError(false)
      }
      if (nameValue === "") {
        setNameError(true)
      } else {
        setNameError(false)
      }
    } else {
      registerProfile(emailValue, nameValue, RegisterFor.PreOrder)
      setHeader("Thank You!")
      setEmailError(false)
      setNameError(false)
      setNameValue("")
      setEmailValue("")
    }

  }

  return (
    <Form heading={header} buttonText="Submit" onSubmit={() => { handleSubmit() }}>
      <Input
        error={nameError}
        type="text"
        htmlFor="pre-orders-name"
        label="Name"
        placeholder=""
        value={nameValue}
        onChange={(event) => { setNameValue(event.target.value) }}
      />
      <Input
        error={emailError}
        type="email"
        htmlFor="pre-orders-email"
        label="Email"
        placeholder="john@example.com"
        value={emailValue}
        onChange={(event) => { setEmailValue(event.target.value) }}
      />
    </Form>
  )
}

export default PreOrdersForm