import React, { useRef } from 'react'

import Intro from "./Intro"
import diveVideo from "../assets/aloom_dive.mp4"
import companyTransition from "../assets/aloom_company_transition.mp4"
import productTransition from "../assets/aloom_product_transition.mp4"
import BackgroundVideo from "./BackgroundVideo"
import TransitionButton from "./TransitionButton"

interface InitContentProps {
  startTransition: (location: string) => void
  handleScroll: () => void
}
const InitContent = ({ startTransition, handleScroll }: InitContentProps) => {
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
        startTransition(location)
      }, (3.5 * 1000))
    } else {
      companyContainerRef!.current!.style.display = "none"
      productVideoRef!.current!.play()
      setTimeout(() => {
        productVideoRef!.current!.pause()
        startTransition(location)
      }, (3.5 * 1000))
    }
  }

  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0px",
      left: "0px"
    }}>
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

          <div style={{
            color: "white",
            fontSize: "28px",
            fontWeight: 600,
            boxSizing: "border-box",
            padding: "40px"
          }}>
            <p className="contentBlockP" style={{margin: "20px 0px"}}>
              Aloom makes multimedia immersive.
            </p>
            <p className="contentBlockP" style={{opacity: 0.8, margin: "20px 0px"}}>
              We enhance digital wellness and entertainment experiences in the home.
            </p>
            <p className="contentBlockP" style={{opacity: 0.6, margin: "20px 0px"}}>
              Our platform simply engages remote audiences better.
            </p>
          </div>

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
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
      }}>
        <Intro handleScroll={() => { handleScroll() }} startTransition={() => { introContainerRef!.current!.style.display = "none" }} />
      </div>
    </div>
  )
}

export default InitContent