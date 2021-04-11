import React, { useState } from 'react'
import Form, { Input } from "./Form"
import {
  registerProfile,
  RegisterFor
} from "./mixpanelAPI"

const BetaTestingForm = () => {
  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [header, setHeader] = useState("Beta Testing")

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
      registerProfile(emailValue, nameValue, RegisterFor.BetaTesting)
      setHeader("Thank You!")
      setEmailError(false)
      setNameError(false)
      setNameValue("")
      setEmailValue("")
    }

  }

  return (
    <Form heading={header} subheading="(Only for professionals in music, gaming & wellness)" buttonText="Submit" onSubmit={() => { handleSubmit() }}>
      <Input
        error={nameError}
        type="text"
        htmlFor="beta-testing-name"
        label="Name"
        placeholder=""
        value={nameValue}
        onChange={(event) => { setNameValue(event.target.value) }}
      />
      <Input
        error={emailError}
        type="email"
        htmlFor="beta-testing-email"
        label="Email"
        placeholder="john@example.com"
        value={emailValue}
        onChange={(event) => { setEmailValue(event.target.value) }}
      />
    </Form>
  )
}

export default BetaTestingForm