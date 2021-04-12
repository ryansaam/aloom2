import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import '../App.css'

import staticFrame from "../assets/aloom_company_transition_static.jpeg"
import productTransition from "../assets/aloom_product_transition.mp4"
import productVideo from "../assets/aloom_product_background.mp4"
import BackgroundVideo from "./BackgroundVideo"
import ContentBlockP from "./ContentBlockP"
import ThirdPartyLink from "./ThirdPartyLink"
import ButtonLink from "./ButtonLink"
import BackToSurfaceButton from "./BackToSurfaceButton"
import PreOrdersForm from "./PreOrdersForm"
import BetaTestingForm from "./BetaTestingForm"
import {
  Page,
  trackClickedBackToSurface,
  trackClickedSeeCompany,
  trackClickedGoHome,
  trackClickedBackToTop,
  trackProductView,
  trackStartWatchingBueller,
  trackStopWatchingBueller,
  ProductDoOnce,
  trackEndScreenView,
  trackStartWatchingDemo,
  trackStopWatchingDemo,
  trackOverviewView,
  trackDemoView,
  trackSignUpView,
  trackTechView,
  trackExploreView
} from "./mixpanelAPI"

import { getOpacity } from "./utils"

const AltProduct = () => {
  const transitionVideo = useRef<HTMLVideoElement>(null)
  const transitionWrapper = useRef<HTMLDivElement>(null)
  const heightRef = useRef<HTMLDivElement>(null)
  const hide = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const backgroundWrapper = useRef<HTMLDivElement>(null)

  const [playerState, setPlayerState] = useState<number | null>(null)
  const [buellerState, setBuellerState] = useState<number | null>(null)

  // content section refs
  const overviewRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const signUpRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const exploreRef = useRef<HTMLDivElement>(null)
  const buellerRef = useRef<HTMLDivElement>(null)
  ///////////////////////

  const setViewableContent = (frameNumber: number, actions: ProductDoOnce) => {
    if (frameNumber <= 42) {
      if (overviewRef.current) overviewRef.current.style.opacity = "1.0"
      if (!actions.viewedOverview) {
        setTimeout(() => {
          if (overviewRef.current) overviewRef.current.style.transition = ""
        }, 600)
        actions.viewedOverview = true
        trackOverviewView()
      }
    } else {
      if (overviewRef.current) overviewRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 50 && frameNumber <= 63) {
      if (demoRef.current) demoRef.current.style.opacity = getOpacity(50, 63, frameNumber)
      if (!actions.viewedDemo) {
        actions.viewedDemo = true
        trackDemoView()
      }
    } else {
      if (demoRef.current) demoRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 72 && frameNumber <= 84) {
      if (signUpRef.current) signUpRef.current.style.opacity = getOpacity(72, 84, frameNumber)
      if (!actions.viewedSignUp) {
        actions.viewedSignUp = true
        trackSignUpView()
      }
    } else {
      if (signUpRef.current) signUpRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 93 && frameNumber <= 105) {
      if (techRef.current) techRef.current.style.opacity = getOpacity(93, 105, frameNumber)
      if (!actions.viewedTech) {
        actions.viewedTech = true
        trackTechView()
      }
    } else {
      if (techRef.current) techRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 114 && frameNumber <= 126) {
      if (exploreRef.current) exploreRef.current.style.opacity = getOpacity(114, 126, frameNumber)
      if (!actions.viewedExplore) {
        actions.viewedExplore = true
        trackExploreView()
      }
    } else {
      if (exploreRef.current) exploreRef.current.style.opacity = "0.0"
    }
    let timeoutId = window.setTimeout(() => {})
    if (frameNumber >= 138) {
      if (!actions.viewedEndScreen) {
        actions.viewedEndScreen = true
        trackEndScreenView(Page.Product)
      }
      timeoutId = window.setTimeout(() => {
        if (buellerRef.current) buellerRef.current.style.transition = "opacity 600ms linear"
        if (buellerRef.current) buellerRef.current.style.opacity = "1.0"
      }, 10 * 1000)
    } else {
      clearTimeout(timeoutId)
      if (buellerRef.current) buellerRef.current.style.opacity = "0.0"
    }
  }

  const initVideoScroll = () => {
    let frameNumber = 0; // start video at frame 0

    let video = videoRef!.current!

    video.playbackRate = 0.5;

    // lower numbers = faster playback
    const playbackConst = 50;

    // get page height from video duration
    const setHeight = heightRef!.current!;
    // select video element

    // dynamically set the page height according to video length
    setTimeout(() => {
      hide.current!.style.display = "block"
      setHeight.style.height = Math.floor(video.duration) * playbackConst + "px";
    }, 1000)

    // Use requestAnimationFrame for smooth playback
    const doOnce: ProductDoOnce = {
      viewedOverview: false,
      viewedDemo: false,
      viewedSignUp: false,
      viewedTech: false,
      viewedExplore: false,
      viewedEndScreen: false
    }
    function scrollPlay() {
      // if (
      //   dnaRef.current === null
      //   || foundersRef.current === null
      //   || advisorsRef.current === null
      //   || linksRef.current === null
      //   || contactRef.current === null
      //   || buellerRef.current === null
      // ) return


      frameNumber = (window.pageYOffset / playbackConst) + 30;

      setViewableContent(frameNumber, doOnce)

      if (video.readyState !== 1) {
        video.currentTime = frameNumber;
      }
      window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
  };

  const initTransition = () => {
    const listenForVideoEnd = () => {
      const id = setInterval(() => {
        if (transitionVideo.current && transitionVideo.current.currentTime >= 3.2) {
          transitionVideo.current.pause()
          backgroundWrapper.current!.style.visibility = "visible"
          setTimeout(() => {
            transitionVideo.current!.style.visibility = "hidden"
          }, 1000)
          initVideoScroll()
          clearInterval(id)
        }
      }, 10)
    }

    transitionVideo.current!.play()
    listenForVideoEnd()
  }

  useEffect(() => {
    // -1   – unstarted
    //  0   – ended
    //  1   – playing
    //  2   – paused
    //  3   – buffering
    //  5   – video cued
    switch (playerState) {
      case -1:
        break;
      case 0:
        trackStopWatchingDemo()
        break;
      case 1:
        trackStartWatchingDemo()
        break;
      case 2:
        trackStopWatchingDemo()
        break;
      case 3:
        trackStopWatchingDemo()
        break;
      case 5:
        break
    }
  }, [playerState])

  useEffect(() => {
    // -1   – unstarted
    //  0   – ended
    //  1   – playing
    //  2   – paused
    //  3   – buffering
    //  5   – video cued
    switch (buellerState) {
      case -1:
        break;
      case 0:
        trackStopWatchingBueller(Page.Product)
        break;
      case 1:
        trackStartWatchingBueller()
        break;
      case 2:
        trackStopWatchingBueller(Page.Product)
        break;
      case 3:
        trackStopWatchingBueller(Page.Product)
        break;
      case 5:
        break
    }
  }, [buellerState])

  useEffect(() => {
    trackProductView()
    overviewRef.current!.style.opacity = "0.0"
    overviewRef.current!.style.transition = "opacity 600ms linear"

    window.scrollTo(0,0)
    const handleScroll = () => {
      window.scroll({top: 0, left: 0, behavior: 'smooth' })
    }

    window.addEventListener("scroll", handleScroll)
    setTimeout(() => {
      window.removeEventListener("scroll", handleScroll)
    }, 3000)

    return () => { window.removeEventListener("scroll", handleScroll) }
  }, [])

  return (
    <Container ref={heightRef} bgWidth={1920} bgHeight={1440} bgScale={0.82} imageUrl={staticFrame}>
      <TransitionVideoWrapper ref={transitionWrapper}>
        <BackgroundVideo ref={transitionVideo} scale={0.82} src={productTransition} onLoadedData={() => {
          setTimeout(() => {
            transitionWrapper.current!.style.visibility = "visible"
            transitionVideo.current!.playbackRate = 2.0
            initTransition()
          }, 60)
        }} />
      </TransitionVideoWrapper>
      <BackgroundVideoWrapper ref={backgroundWrapper}>
        <BackgroundVideo ref={videoRef} src={productVideo} />
      </BackgroundVideoWrapper>
      <BackToSurfaceButton onClick={() => { trackClickedBackToSurface(Page.Product) }} />
      <ContentWrapper>
        <ContentBlockWrapper1>
          <ContentBlock ref={overviewRef} title="“audio illuminated”">
            <div style={{boxSizing: "border-box", padding: "10%"}}>
              <ContentBlockP>
                Our smart light visualizes the emotion in audio to create more engaging experiences, controlled by our app.
              </ContentBlockP>
              <ContentBlockP opacity={0.8}>
                Using neuroscience, we create content-tailored visual ambiance. This multi-sensory immersion helps you feel more connected to the moment.
              </ContentBlockP>
            </div>
          </ContentBlock>
        </ContentBlockWrapper1>
        <ContentBlockWrapper2 top={1456} zIndex={25}>
          <ContentBlock ref={demoRef} title="Overview">
            <YouTube
              videoId={"ZkmyKHz1WGQ"}
              opts={{
                height: '409.5',
                width: '728',
              }}
              onStateChange={(event) => {
                setPlayerState(event.data)
              }}
            />
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper2 top={1042 + 1456} zIndex={20}>
          <ContentBlock ref={signUpRef} title="">
            <div>
              <ContentBlockP>
                Be among the first to experience aloom
              </ContentBlockP>
              <div style={{display: "grid", gridTemplateColumns: "auto auto", gap: "20px"}}>
                <BetaTestingForm />
                <PreOrdersForm />
              </div>
            </div>
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper2 top={(1042 * 2) + 1456} >
          <ContentBlock ref={techRef} title="Our Tech">
            <div style={{boxSizing: "border-box", padding: "0% 10%"}}>
              <ContentBlockP>
                We leverage Internet of Things, Mixed Reality & Machine Learning technologies, in a unique architecture prioritizing UX & integrability.
              </ContentBlockP>
              <ContentBlockP opacity={0.8}>
                But the magic of our platform comes from the neurological condition of Synesthesia - when your senses mix & trigger each other, like <i>seeing sounds</i>. These multi-sensory associations helped great artists from Van Gogh to Steve Wonder improve creativity, memory & focus. Some call it nature’s genius button.
              </ContentBlockP>
              <ContentBlockP opacity={0.6}>
                Best of all, it’s not just genetic & can be learned. We’ve coded this natural mechanism along with customization tools, for communal creativity towards collective transcendence.
              </ContentBlockP>
            </div>
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper2 top={(1042 * 3) + 1456}>
          <ContentBlock ref={exploreRef} title="Explore Synesthesia">
            <LinkWrapper>
              <ThirdPartyLink href="https://thepsychologist.bps.org.uk/volume-28/february-2015/surprising-world-synaesthesia">The surprising world of Synesthesia</ThirdPartyLink>
              <ThirdPartyLink href="https://www.ingentaconnect.com/content/fmea/rpme/2019/00000020/00000001/art00005">Pitch-Perfect Chromesthesia</ThirdPartyLink>
              <ThirdPartyLink href="https://digitalcommons.iwu.edu/psych_honproj/198/">Can Synesthesia be learned?</ThirdPartyLink>
              <ThirdPartyLink href="https://www.sciencedirect.com/science/article/abs/pii/S0028393216301130">Synesthesia via LSD</ThirdPartyLink>
              <ThirdPartyLink href="https://www.psychologytoday.com/us/blog/sensorium/201203/synesthetes-people-the-future">Pharrell talks about his Synesthesia</ThirdPartyLink>
              <ThirdPartyLink href="https://www.youtube.com/watch?v=E6pcgv-SkPQ">Billie Eilish: Synesthesia in her process</ThirdPartyLink>
              <ThirdPartyLink href="https://www.youtube.com/watch?v=EyZg-FDTMxc">Lorde: how Synesthesia inspires her</ThirdPartyLink>
              <ThirdPartyLink href="https://www.youtube.com/watch?t=1s&v=88s6guf9egs">TEDx: “Seeing Sound” Annie Dickinson</ThirdPartyLink>
              <ThirdPartyLink href="https://pitchfork.com/thepitch/229-what-the-hell-is-synesthesia-and-why-does-every-musician-seem-to-have-it/">Pitchfork: Every musician has Synesthesia</ThirdPartyLink>
              <div style={{gridColumn: "2/3"}}>
                <ThirdPartyLink href="https://synesthesia.com/blog/synesthesia-tests/">Do you have synesthesia? Take a quiz!</ThirdPartyLink>
              </div>
            </LinkWrapper>
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper3 ref={hide}>
          <EndScreenWrapper>
            <ButtonLinkWrapper>
              <ButtonLink onClick={() => { trackClickedSeeCompany() }} to="company">See Company</ButtonLink>
              <ButtonLink onClick={() => { trackClickedGoHome(Page.Product) }} to="cross-roads">Go Home</ButtonLink>
              <ScrollButton onClick={() => {
                trackClickedBackToTop(Page.Product)
                window.scroll({top: 0, left: 0, behavior: 'smooth' })
              }}>Back To Top</ScrollButton>
            </ButtonLinkWrapper>
            <div ref={buellerRef}>
              <YouTube
                videoId={"T1XgFsitnQw"}
                opts={{
                  height: '409.5',
                  width: '728',
                }}
                onStateChange={(event) => {
                  setBuellerState(event.data)
                }}
              />
            </div>
          </EndScreenWrapper>
        </ContentBlockWrapper3>
      </ContentWrapper>
    </Container>
  )
}

interface ContainerProps {
  imageUrl: string
  bgWidth: number
  bgHeight: number
  bgScale: number
}
const Container = styled.div<ContainerProps>`
  background-image: url(${props => props.imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => props.bgWidth * props.bgScale}px ${props => props.bgHeight * props.bgScale}px;

  width: 100vw;
  height: calc(100vh + 1px);
  position: relative;
`
const TransitionVideoWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 6;
  visibility: hidden;
`
const BackgroundVideoWrapper = styled.div`
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 5;
  visibility: hidden;
`


const ContentWrapper = styled.div`
  background-color: rgba(0,0,0,0);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`
const ContentBlockWrapper1 = styled.div`
  background-color: rgba(0,0,0,0);
  width: 100%;
  height: 1456px;

  position: relative;
  z-index: 10;
`
interface ContentBlockWrapper2Props {
  top: number
  zIndex?: number
}
const ContentBlockWrapper2 = styled.div<ContentBlockWrapper2Props>`
  background-color: rgba(0,0,0,0);
  width: 100%;
  height: calc(1042px + 100vh);

  position: absolute;
  top: calc(${props => props.top}px - 100vh);
  z-index: ${props => props.zIndex || 10};
`
const ContentBlockWrapper3 = styled.div`
  background-color: rgba(0,0,0,0);
  width: 100%;
  height: calc(100% - 1456px - 1042px - 1042px - 1042px - 1042px);

  position: absolute;
  bottom: 0px;
  z-index: 10;
  display: none;
`
const LinkWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`
const EndScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
`
const ButtonLinkWrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: auto auto auto;
  gap: 20px;
`
const ScrollButton = styled.button`
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: 15px;
  width: 150px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 10px;
`

interface ContentBlockProps {
  title: string
  children: React.ReactNode
}
const ContentBlock = React.forwardRef<HTMLDivElement, ContentBlockProps>(({ title, children }, ref) => {
  return (
    <ContentBlockContainer ref={ref}>
      {
        title !== ""
        ? <h1 className="contentHeaders"
            style={{
              width: "100%",
              color: "white",
              fontSize: "38px",
              letterSpacing: "4px",
              position: "absolute",
              top: "0px"
            }}
          >{ title }</h1>
        : null
      }

      { children }
    </ContentBlockContainer>
  )
})
const ContentBlockContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 10;
  opacity: 0.0;
`

/*
<iframe
  width="728"
  height="409.5"
  src="https://www.youtube.com/embed/ZkmyKHz1WGQ"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  style={{marginTop: "10%"}}
/>
*/

export default AltProduct