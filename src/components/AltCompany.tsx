import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import '../App.css'

import staticFrame from "../assets/aloom_company_transition_static.jpeg"
import companyTransition from "../assets/aloom_company_transition.mp4"
import companyVideo from "../assets/aloom_company_background.mp4"
import BackgroundVideo from "./BackgroundVideo"
import ContentBlockP from "./ContentBlockP"
import ProfileCard from "./ProfileCard"
import ThirdPartyLink from "./ThirdPartyLink"
import ButtonLink from "./ButtonLink"
import BackToSurfaceButton from "./BackToSurfaceButton"
import ContactForm from "./ContactForm"
import PageMap from "./PageMap"
import {
  Page,
  trackClickedBackToSurface,
  trackClickedSeeProduct,
  trackClickedGoHome,
  trackClickedBackToTop,
  trackCompanyView,
  trackStartWatchingBueller,
  trackStopWatchingBueller,
  CompanyDoOnce,
  track_DNA_View,
  trackFoundersView,
  trackAdvisorsView,
  trackNewsView,
  trackContactView,
  trackEndScreenView
} from "./mixpanelAPI"

import samim from "../assets/samim.jpeg"
import ryansam from "../assets/ryansam_profile.jpeg"
import will from "../assets/will_mills.jpeg"
import sean from "../assets/sean_mcgrail.jpeg"
import dr_sean from "../assets/dr_sean.jpg"

import { getOpacity } from "./utils"

const AltCompany = () => {
  const transitionVideo = useRef<HTMLVideoElement>(null)
  const transitionWrapper = useRef<HTMLDivElement>(null)
  const heightRef = useRef<HTMLDivElement>(null)
  const hide = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const backgroundWrapper = useRef<HTMLDivElement>(null)
  const [buellerState, setBuellerState] = useState<number | null>(null)
  const [viewedContent, setViewedContent] = useState<boolean[]>([false, false, false, false, false, false])

  // content section refs
  const dnaRef = useRef<HTMLDivElement>(null)
  const foundersRef = useRef<HTMLDivElement>(null)
  const advisorsRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const buellerRef = useRef<HTMLDivElement>(null)
  ///////////////////////

  const setViewableContent = (frameNumber: number, actions: CompanyDoOnce) => {
    const offset = 16
    if (frameNumber <= 42) {
      if (dnaRef.current) dnaRef.current.style.opacity = "1.0"
      setViewedContent([true, false, false, false, false, false])
      if (!actions.viewed_DNA) {
        setTimeout(() => {
          if (dnaRef.current) dnaRef.current.style.transition = ""
        }, 600)
        actions.viewed_DNA = true
        track_DNA_View()
      }
    } else {
      if (dnaRef.current) dnaRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 44 && frameNumber <= 63) {
      if (foundersRef.current) foundersRef.current.style.opacity = getOpacity(44, 63 - offset, frameNumber)
      setViewedContent([false, true, false, false, false, false])
      if (!actions.viewedFounders) {
        actions.viewedFounders = true
        trackFoundersView()
      }
    } else {
      if (foundersRef.current) foundersRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 65 && frameNumber <= 84) {
      if (advisorsRef.current) advisorsRef.current.style.opacity = getOpacity(65, 84 - offset, frameNumber)
      setViewedContent([false, false, true, false, false, false])
      if (!actions.viewedAdvisors) {
        actions.viewedAdvisors = true
        trackAdvisorsView()
      }
    } else {
      if (advisorsRef.current) advisorsRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 86 && frameNumber <= 105) {
      if (linksRef.current) linksRef.current.style.display = "grid"
      if (linksRef.current) linksRef.current.style.opacity = getOpacity(86, 105 - offset, frameNumber)
      setViewedContent([false, false, false, true, false, false])
      if (!actions.viewedNews) {
        actions.viewedNews = true
        trackNewsView()
      }
    } else {
      if (linksRef.current) linksRef.current.style.display = "none"
      if (linksRef.current) linksRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 107 && frameNumber <= 126) {
      if (contactRef.current) contactRef.current.style.opacity = getOpacity(107, 126 - offset, frameNumber)
      setViewedContent([false, false, false, false, true, false])
      if (!actions.viewedContact) {
        actions.viewedContact = true
        trackContactView()
      }
    } else {
      if (contactRef.current) contactRef.current.style.opacity = "0.0"
    }
    let timeoutId = window.setTimeout(() => {})
    if (frameNumber >= 138) {
      setViewedContent([false, false, false, false, false, true])
      if (!actions.viewedContact) {
        actions.viewedEndScreen = true
        trackEndScreenView(Page.Company)
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
    const doOnce: CompanyDoOnce = {
      viewed_DNA: false,
      viewedFounders: false,
      viewedAdvisors: false,
      viewedNews: false,
      viewedContact: false,
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
    switch (buellerState) {
      case -1:
        break;
      case 0:
        trackStopWatchingBueller(Page.Company)
        break;
      case 1:
        trackStartWatchingBueller()
        break;
      case 2:
        trackStopWatchingBueller(Page.Company)
        break;
      case 3:
        trackStopWatchingBueller(Page.Company)
        break;
      case 5:
        break
    }
  }, [buellerState])

  useEffect(() => {
    trackCompanyView()
    dnaRef.current!.style.opacity = "0.0"
    dnaRef.current!.style.transition = "opacity 600ms linear"
    
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
        <BackgroundVideo ref={transitionVideo} scale={0.82} src={companyTransition} onLoadedData={() => {
          setTimeout(() => {
            transitionWrapper.current!.style.visibility = "visible"
            transitionVideo.current!.playbackRate = 2.0
            initTransition()
          }, 60)
        }} />
      </TransitionVideoWrapper>
      <BackgroundVideoWrapper ref={backgroundWrapper}>
        <BackgroundVideo ref={videoRef} src={companyVideo} />
      </BackgroundVideoWrapper>
      <BackToSurfaceButton
        companyLinks={
          <PageMap
            anchorIds={["slide-1", "slide-2", "slide-3", "slide-4", "slide-5"]}
            anchorNames={["DNA", "Founders", "Advisors", "News", "Contact"]}
            anchorsReached={viewedContent}
          />
        }
        onClick={() => { trackClickedBackToSurface(Page.Company) }}
      />

      <ContentWrapper  >
        <ContentBlockWrapper1 id="slide-1">
          <ContentBlock ref={dnaRef} title="DNA" id="slide-height">
            <div>
              <ContentBlockP>We help people feel more.</ContentBlockP>
              <p className="contentBlockP" style={{margin: "20px 0px 0px 0px", opacity: 0.8}}>By visualizing the emotion in audio,</p>
              <p className="contentBlockP" style={{margin: "0px 0px 20px 0px", opacity: 0.8}}>we make multimedia more engaging.</p>
              <ContentBlockP opacity={0.6}>Ultimately, we are pioneering human perception technologies.</ContentBlockP>
              <div  className="bounce-effect" style={{
                position: "absolute",
                left: "50%",
                marginLeft: "-70px",
                bottom: "0px",
                marginBottom: "20px",
                zIndex: 20
              }}>
                <span style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "4px"
                }}>swim down</span>
              </div>      
            </div>
          </ContentBlock>
        </ContentBlockWrapper1>
        <ContentBlockWrapper2 top={1456} id="slide-2">
          <ContentBlock ref={foundersRef} title="Founders">
            <ProfileCardWrapper className="profileCardWrapper" columns={2}>
              <ProfileCard
                imgSrc={samim}
                name={"Samim Safaei"}
                title={"CEO"}
                desc={"An experienced engineer, product manager and founder; striving to spread the power of immersive audio-visual experiences."}
              />
              <ProfileCard
                imgSrc={ryansam}
                imgAlt={"Ryan Sam"}
                name={"Ryan Sam"}
                title={"VP Software"}
                desc={"A self-taught full-stack developer with a passion for audio; he brings a modern, practical approach to digital product design."}
              />
            </ProfileCardWrapper>
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper2 top={1042 + 1456} id="slide-3">
          <ContentBlock ref={advisorsRef} title="Advisors">
            <ProfileCardWrapper className="profileCardWrapper" columns={3}>
              <ProfileCard
                imgSrc={will}
                name={"Will Mills"}
                title={""}
                desc={"A seasoned music industry professional, former VP of Shazam, Founder of Dynamic Music (acq’d); he advises music tech startups."}
              />
              <ProfileCard
                imgSrc={sean}
                name={"Sean McGrail"}
                title={""}
                desc={"President of Paint-Nite (acq’d), Managing Director of a seed fund; he advises startups in the artistic space."}
              />
              <ProfileCard
                imgSrc={dr_sean}
                name={"Dr. Sean A. Day"}
                title={""}
                desc={"A pioneer of synesthesia research; he is an author, professor, & president of the largest synesthete group globaly, the IASAS."}
              />
            </ProfileCardWrapper>
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper2 top={(1042 * 2) + 1456} zIndex={15} id="slide-4">
          <ContentBlock ref={linksRef} title="News">
            <LinkWrapper>
              <ThirdPartyLink href="https://aloom.medium.com/the-neon-ocean-35016cf2a4d9">Blog 6: “The Neon Ocean”</ThirdPartyLink>
              <ThirdPartyLink href="https://aloom.medium.com/aloom-inated-2b6ac871172f">Blog 5: “aloom-inated”</ThirdPartyLink>
              <ThirdPartyLink href="https://medium.com/@synaesthetic/synesthesia-to-day-1210d0e2858b">Blog 4: “Synesthesia, To-day”</ThirdPartyLink>
              <ThirdPartyLink href="https://www.mondo.nyc/2020-panels/hot-musictech-startups">aloom (synaesthetic) on the Mondo NYC Hot Startup Panel</ThirdPartyLink>
              <ThirdPartyLink href="https://medium.com/@synaesthetic/the-untold-history-of-synesthesia-music-e13774272d1c">Blog 3: “The Untold History of Synesthesia & Music”</ThirdPartyLink>
              <ThirdPartyLink href="https://musically.com/2020/09/18/startup-synaesthetic-seeks-artists-for-immersive-music/">aloom calls on musicians for its beta-testing program</ThirdPartyLink>
              <ThirdPartyLink href="https://medium.com/@synaesthetic/lets-rethink-virtual-reality-daad06313330?sk=18dcd4586fff13d6c13a18d92d6afffc">Blog 2: “Let’s Rethink Virtual Reality”</ThirdPartyLink>
              <ThirdPartyLink href="https://medium.com/@synaesthetic/the-synaesthetic-manifesto-f0f63c4b374a?sk=016df46ef7ab3db3bb7604a126a6cf20">Blog 1: “The Synaesthetic Manifesto”</ThirdPartyLink>
            </LinkWrapper>
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper2 top={(1042 * 3) + 1456} id="slide-5">
          <ContentBlock ref={contactRef} title="Contact">
            <ContactForm />
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper3 ref={hide} id="slide-6">
          <EndScreenWrapper>
            <ButtonLinkWrapper>
              <ButtonLink onClick={() => { trackClickedSeeProduct() }} to="product">See Product</ButtonLink>
              <ButtonLink onClick={() => { trackClickedGoHome(Page.Company) }} to="home">Go Home</ButtonLink>
              <ScrollButton onClick={() => {
                trackClickedBackToTop(Page.Company)
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
interface ProfileCardWrapperProps {
  columns: number
}
const ProfileCardWrapper = styled.div<ProfileCardWrapperProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: 20px;
`
const LinkWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  id?: string
  title: string
  children: React.ReactNode
}
const ContentBlock = React.forwardRef<HTMLDivElement, ContentBlockProps>(({ id, title, children }, ref) => {
  return (
    <ContentBlockContainer ref={ref} id={id}>
      { children }
      <h1 className="contentHeaders" style={{
        width: "100%",
        color: "white",
        fontSize: "38px",
        letterSpacing: "4px",
        position: "absolute",
        bottom: "0px"
      }}>{ title }</h1>
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

export default AltCompany