import React from 'react'
import styled from 'styled-components'

interface FormProps {
  heading: string
  subheading?: string
  buttonText: string
  children: React.ReactNode
  onSubmit: () => void
}
const Form = ({ heading, subheading, buttonText, children, onSubmit }: FormProps) => {
  return (
    <Container>
      <div>
        <h1 style={{color: "white", margin: "0px auto"}}>{ heading }</h1>
        { subheading ? <h5 style={{color: "white", margin: "0px auto", textAlign: "center"}}>{ subheading }</h5> : null }
      </div>
      { children }
      <FormButton onClick={() => { onSubmit() }}>{ buttonText }</FormButton>
    </Container>
  )
}
const Container = styled.div`
  background-color: black;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 20px;
  display: grid;
  gap: 20px;
`
const FormButton = styled.button`
  background-color: #04fc00;
  color: white;
  width: 120px;
  border: none;
  outline: none;
  margin: auto;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 20px;
  font-size: 18px;
  letter-spacing: 2px;
`

interface InputProps {
  label: string
  placeholder: string
  htmlFor: string
  type: string
  error: boolean
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const Input = ({ label, placeholder, htmlFor, type, error, value, onChange }: InputProps) => {
  return (
    <div>
      <label htmlFor={ htmlFor } style={{color: "white", display: "block", fontSize: "22px", marginBottom: "10px"}}>{ label }</label>
      <StyledInput
        style={{border: `3px solid ${ !error ? "#ffffff" : "#ff0000" }`}}
        type={ type }
        id={ htmlFor }
        placeholder={ placeholder }
        value={ value }
        onChange={(event) => {
          onChange(event)
        }}
      />
    </div>
  )
}
const StyledInput = styled.input`
  width: 300px;
  font-size: 22px;
  border-radius: 30px;
  box-sizing: border-box;
  padding: 5px 16px;
  outline: none;
`

export default Form
export {
  Input
}