import React, { useRef, useState } from 'react'
import './App.css'

import Intro from "./components/Intro"
import diveVideo from "./assets/aloom_dive.mp4"
import companyTransition from "./assets/aloom_company_transition.mp4"
import productTransition from "./assets/aloom_product_transition.mp4"
import BackgroundVideo from "./components/BackgroundVideo"
import TransitionButton from "./components/TransitionButton"

// import companyBackground from "./assets/aloom_company_background.mp4"
// import productBackground from "./assets/aloom_product_background.mp4"
// TODO: Line up background videos and build scroll to seek function


function App() {
  const companyVideoRef = useRef<HTMLVideoElement>(null)
  const productVideoRef = useRef<HTMLVideoElement>(null)
  const introContainerRef = useRef<HTMLDivElement>(null)
  const diveVideoRef = useRef<HTMLVideoElement>(null)
  const companyBtnRef = useRef<HTMLDivElement>(null)
  const productBtnRef = useRef<HTMLDivElement>(null)
  const companyContainerRef = useRef<HTMLDivElement>(null)
  const productContainerRef = useRef<HTMLDivElement>(null)

  const transitionTo = (location: string) => {
    diveVideoRef!.current!.style.display = "none"
    if (location === "company") {
      productContainerRef!.current!.style.display = "none"
      companyVideoRef!.current!.play()
      setTimeout(() => {
        companyVideoRef!.current!.pause()
      }, (3.5 * 1000))
    } else {
      companyContainerRef!.current!.style.display = "none"
      productVideoRef!.current!.play()
      setTimeout(() => {
        productVideoRef!.current!.pause()
      }, (3.5 * 1000))
    }
  }

  return (
    <div className="App">
      <div style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
      }}>
        <div ref={companyContainerRef} style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px"
        }}>
          <BackgroundVideo scale={0.8} ref={companyVideoRef} src={companyTransition} onLoadedData={() => {  }} />
        </div>
        <div ref={productContainerRef} style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px"
        }}>
          <BackgroundVideo scale={0.8} ref={productVideoRef} src={productTransition} onLoadedData={() => {  }} />
        </div>
        <div style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px"
        }}>
          <BackgroundVideo scale={0.8} ref={diveVideoRef} src={diveVideo} onLoadedData={() => { diveVideoRef!.current!.currentTime = diveVideoRef!.current!.duration }} />
        </div>
        
        <div style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
          display: "grid",
          gridTemplateRows: "20% auto 20%",
          justifyItems: "center",
          alignItems: "center"
        }}>
          <TransitionButton
            ref={companyBtnRef}
            className="hover-up-effect"
            onClick={() => {
              transitionTo("company")
            }}
          >Company</TransitionButton>

          <TransitionButton
            ref={productBtnRef}
            className="hover-down-effect"
            onClick={() => {
              transitionTo("product")
            }}
          >Product</TransitionButton>
        </div>
         
      </div>
      <div ref={introContainerRef} style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
      }}>
        <Intro startTransition={() => { introContainerRef!.current!.style.display = "none" }} />
      </div>
    </div>
  )
}

export default App
