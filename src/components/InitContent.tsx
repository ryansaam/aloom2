import React, { useRef } from 'react'
import mixpanel from 'mixpanel-browser'
import '../App.css'

import Intro from "./Intro"
import companyTransition from "../assets/aloom_company_transition.mp4"
import productTransition from "../assets/aloom_product_transition.mp4"
import BackgroundVideo from "./BackgroundVideo"
import TransitionButton from "./TransitionButton"

import background from "../assets/initContentBackground.jpeg"

interface InitContentProps {
  startTransition: (location: string) => void
  handleScroll: () => void
}
const InitContent = ({ startTransition, handleScroll }: InitContentProps) => {
  const companyVideoRef = useRef<HTMLVideoElement>(null)
  const productVideoRef = useRef<HTMLVideoElement>(null)
  const introContainerRef = useRef<HTMLDivElement>(null)
  const companyContainerRef = useRef<HTMLDivElement>(null)
  const productContainerRef = useRef<HTMLDivElement>(null)
  const contentBackgroundContainerRef = useRef<HTMLDivElement>(null)
  const contentBackgroundRef = useRef<HTMLDivElement>(null)

  
  const introContentRef = useRef<HTMLDivElement>(null)
  const companyBtnRef = useRef<HTMLDivElement>(null)
  const productBtnRef = useRef<HTMLDivElement>(null)


  const fadeContentIn = () => {
    const companyBtn = companyBtnRef!.current!
    const productBtn = productBtnRef!.current!
    const introContent = introContentRef!.current!
    const contentBackground = contentBackgroundRef!.current!

    companyBtn.style.transition = "opacity 300ms linear"
    productBtn.style.transition = "opacity 300ms linear"
    introContent.style.transition = "opacity 300ms linear"
    companyBtn.style.opacity = "0.6"
    productBtn.style.opacity = "0.6"
    introContent.style.opacity = "1.0"

    setTimeout(() => {
      companyBtn.className = "hover-up-effect"
      productBtn.className = "hover-down-effect"
      contentBackground.className = "glow-effect"
    }, 300)
  }

  const fadeContentOutTo = (location: string) => {
    const companyBtn = companyBtnRef!.current!
    const productBtn = productBtnRef!.current!
    const introContent = introContentRef!.current!

    companyBtn.style.transition = "opacity 2s linear"
    productBtn.style.transition = "opacity 2s linear"
    introContent.style.transition = "opacity 2s linear"
    companyBtn.style.opacity = "0.0"
    productBtn.style.opacity = "0.0"
    introContent.style.opacity = "0.0"

    transitionTo(location)
  }

  const transitionTo = (location: string) => {
    contentBackgroundContainerRef!.current!.style.backgroundColor = ""
    contentBackgroundContainerRef!.current!.style.display = "none"
    if (location === "company") {
      productContainerRef!.current!.style.display = "none"
      companyVideoRef!.current!.play()
      setTimeout(() => {
        companyVideoRef!.current!.pause()
        startTransition(location)
      }, (3.5 * 1000))
    } else {
      // companyContainerRef!.current!.style.display = "none"
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
        <div ref={contentBackgroundContainerRef} style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px"
        }}>
          <div ref={contentBackgroundRef} style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            scale: "0.8"
          }} />
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
            onClick={() => {
              mixpanel.track("clicked company");
              fadeContentOutTo("company")
            }}
          >Company</TransitionButton>

          <div ref={introContentRef} style={{
            color: "white",
            fontSize: "28px",
            fontWeight: 600,
            boxSizing: "border-box",
            padding: "40px",
            opacity: "0.0"
          }}>
            <p className="contentBlockP" style={{margin: "20px 0px"}}>
              aloom makes multimedia immersive.
            </p>
            <p className="contentBlockP" style={{opacity: 0.8, margin: "20px 0px"}}>
              Our lights are a content platform that simply engage remote audiences better.
            </p>
            <p className="contentBlockP" style={{opacity: 0.6, margin: "20px 0px"}}>
              We merge digital experiences with the home.
            </p>
          </div>

          <TransitionButton
            ref={productBtnRef}
            bottom
            onClick={() => {
              mixpanel.track("clicked product");
              fadeContentOutTo("product")
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
        <Intro handleScroll={() => { handleScroll() }} startTransition={() => {
          introContainerRef!.current!.style.display = "none"
          mixpanel.track("hit cross roads");
          setTimeout(() => {
            fadeContentIn()
          }, 1000)
        }}/>
      </div>
    </div>
  )
}

export default InitContent