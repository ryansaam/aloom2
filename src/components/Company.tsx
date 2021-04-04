import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import disableScroll from 'disable-scroll'
import mixpanel from 'mixpanel-browser'
import YouTube from 'react-youtube'
import '../App.css'

import BackgroundVideo from "./BackgroundVideo"
import companyVideo from "../assets/aloom_company_background.mp4"
import companyTransition from "../assets/aloom_company_transition.mp4"
import ContentBlockP from "./ContentBlockP"
import ProfileCard from "./ProfileCard"
import ThirdPartyLink from "./ThirdPartyLink"
import ButtonLink from "./ButtonLink"
import BackToSurfaceButton from "./BackToSurfaceButton"
import staticFrame from "../assets/aloom_transition_static.jpeg"

import samim from "../assets/samim.jpeg"
import shin from "../assets/shin_headshot.png"
import ryansam from "../assets/ryansam_profile.jpeg"
import will from "../assets/will_mills.jpeg"
import sean from "../assets/sean_mcgrail.jpeg"
import dr_sean from "../assets/dr_sean.jpg"

import { getOpacity } from "./utils"

interface DoOnce {
  viewedDNA: boolean
  viewedFounders: boolean
  viewedAdvisors: boolean
  viewedLinks: boolean
  viewedContact: boolean
  viewedCompanyEndScreen: boolean
  viewedBuellerVideo: boolean
}

const Company = () => {
  const heightRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const transitionVideo = useRef<HTMLVideoElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  const [buellerState, setBuellerState] = useState<number | null>(null)

  // content section refs
  const dnaRef = useRef<HTMLDivElement>(null)
  const foundersRef = useRef<HTMLDivElement>(null)
  const advisorsRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const buellerRef = useRef<HTMLDivElement>(null)
  ///////////////////////

  const setViewableContent = (frameNumber: number, actions: DoOnce) => {
    if (frameNumber <= 42) {
      if (dnaRef.current) dnaRef.current.style.opacity = "1.0"
      if (!actions.viewedDNA) {
        actions.viewedDNA = true
        mixpanel.track("viewed dna")
      }
    } else {
      if (dnaRef.current) dnaRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 50 && frameNumber <= 63) {
      if (foundersRef.current) foundersRef.current.style.opacity = getOpacity(50, 63, frameNumber)
      if (!actions.viewedFounders) {
        actions.viewedFounders = true
        mixpanel.track("viewed founders")
      }
    } else {
      if (foundersRef.current) foundersRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 72 && frameNumber <= 84) {
      if (advisorsRef.current) advisorsRef.current.style.opacity = getOpacity(72, 84, frameNumber)
      if (!actions.viewedAdvisors) {
        actions.viewedAdvisors = true
        mixpanel.track("viewed advisors")
      }
    } else {
      if (advisorsRef.current) advisorsRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 93 && frameNumber <= 105) {
      if (linksRef.current) linksRef.current.style.display = "grid"
      if (linksRef.current) linksRef.current.style.opacity = getOpacity(93, 105, frameNumber)
      if (!actions.viewedLinks) {
        actions.viewedLinks = true
        mixpanel.track("viewed company links")
      }
    } else {
      if (linksRef.current) linksRef.current.style.display = "none"
      if (linksRef.current) linksRef.current.style.opacity = "0.0"
    }
    if (frameNumber >= 114 && frameNumber <= 126) {
      if (contactRef.current) contactRef.current.style.opacity = getOpacity(114, 126, frameNumber)
      if (!actions.viewedContact) {
        actions.viewedContact = true
        mixpanel.track("viewed contact")
      }
    } else {
      if (contactRef.current) contactRef.current.style.opacity = "0.0"
    }
    let timeoutId = window.setTimeout(() => {})
    if (frameNumber >= 138) {
      if (!actions.viewedContact) {
        actions.viewedCompanyEndScreen = true
        mixpanel.track("viewed company end screen")
      }
      timeoutId = window.setTimeout(() => {
        if (buellerRef.current) buellerRef.current.style.transition = "opacity 600ms linear"
        if (buellerRef.current) buellerRef.current.style.opacity = "1.0"
        if (!actions.viewedBuellerVideo) {
          actions.viewedBuellerVideo = true
          mixpanel.track("viewed company bueller video")
        }
      }, 10 * 1000)
    } else {
      clearTimeout(timeoutId)
      if (buellerRef.current) buellerRef.current.style.opacity = "0.0"
    }
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
        mixpanel.track('watching company bueller video');
        break;
      case 1:
        mixpanel.time_event('watching company bueller video');
        break;
      case 2:
        mixpanel.track('watching company bueller video');
        break;
      case 3:
        mixpanel.track('watching company bueller video');
        break;
      case 5:
        break
    }
  }, [buellerState])

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
    setHeight.style.height = Math.floor(video.duration) * playbackConst + "px";

    // Use requestAnimationFrame for smooth playback
    const doOnce = {
      viewedDNA: false,
      viewedFounders: false,
      viewedAdvisors: false,
      viewedLinks: false,
      viewedContact: false,
      viewedCompanyEndScreen: false,
      viewedBuellerVideo: false
    }
    function scrollPlay() {
      if (
        dnaRef.current === null
        || foundersRef.current === null
        || advisorsRef.current === null
        || linksRef.current === null
        || contactRef.current === null
        || buellerRef.current === null
      ) return


      frameNumber = (window.pageYOffset / playbackConst) + 30;

      setViewableContent(frameNumber, doOnce)

      if (video.readyState !== 1) {
        video.currentTime = frameNumber;
      }
      window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
  };

  const fadeContentIn = () => {
    transitionVideo.current!.style.transition = "opacity 600ms linear"
    setTimeout(() => {
      transitionVideo.current!.style.opacity = "0.0"
      dnaRef.current!.style.transition = ""
      setTimeout(() => {
        disableScroll.off()
        mixpanel.track("viewed company")
      }, 600)
    }, 600)
    dnaRef.current!.style.transition = "opacity 600ms linear"
    dnaRef.current!.style.opacity = "1.0"
    initVideoScroll()
  }
  const initTransition = () => {
    const listenForVideoEnd = () => {
      const id = setInterval(() => {
        if (transitionVideo.current && transitionVideo.current.currentTime >= 3.2) {
          transitionVideo.current.pause()
          fadeContentIn()
          clearInterval(id)
        }
      }, 10)
    }

    transitionVideo.current!.play()
    listenForVideoEnd()
  }

  useEffect(() => {
    window.scrollTo(0,0)
    disableScroll.on()
  }, [])

  return (
    <Container ref={heightRef} >
      <TransitionVideoWrapper>
        <BackgroundVideo ref={transitionVideo} scale={0.8} src={companyTransition} onLoadedData={() => {
          setTimeout(() => {
            imgRef.current!.style.display = "none"
            initTransition()
          }, 60)
        }} />
      </TransitionVideoWrapper>
      <BackgroundVideoWrapper>
        <BackgroundVideo ref={videoRef} src={companyVideo} />
      </BackgroundVideoWrapper>
      <Image ref={imgRef} imageUrl={staticFrame} />
      <BackToSurfaceButton />
      <ContentWrapper>
        <ContentBlockWrapper1>
          <ContentBlock ref={dnaRef} title="DNA">
            <div>
              <ContentBlockP>We help people feel more.</ContentBlockP>
              <p className="contentBlockP" style={{margin: "20px 0px 0px 0px", opacity: 0.8}}>By visualizing the emotion in audio,</p>
              <p className="contentBlockP" style={{margin: "0px 0px 20px 0px", opacity: 0.8}}>we make multimedia more engaging.</p>
              <ContentBlockP opacity={0.6}>Ultimately, we are pioneering human perception technologies.</ContentBlockP>            
            </div>
          </ContentBlock>
        </ContentBlockWrapper1>
        <ContentBlockWrapper2 top={1456}>
          <ContentBlock ref={foundersRef} title="Founders">
            <ProfileCardWrapper>
              <ProfileCard
                imgSrc={samim}
                name={"Samim Safaei"}
                title={"CEO"}
                desc={"An experienced engineer, product manager and founder; striving to spread the power of immersive audio-visual experiences."}
              />
              <ProfileCard
                imgSrc={shin}
                name={"Shin Nagpal"}
                title={"COO"}
                desc={"A manufacturing expert with practical experience scaling audio hardware OEMs; he creates high-quality products with unique value."}
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
        <ContentBlockWrapper2 top={1042 + 1456}>
          <ContentBlock ref={advisorsRef} title="Advisors">
            <ProfileCardWrapper>
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
        <ContentBlockWrapper2 top={(1042 * 2) + 1456} zIndex={15}>
          <ContentBlock ref={linksRef} title="News">
            <LinkWrapper>
              <ThirdPartyLink href="https://aloom.medium.com/aloom-inated-2b6ac871172f">Blog 5: “aloom-inated”</ThirdPartyLink>
              <ThirdPartyLink href="https://medium.com/@synaesthetic/synesthesia-to-day-1210d0e2858b">Blog 4: “Synesthesia, To-day”</ThirdPartyLink>
              <ThirdPartyLink href="https://www.mondo.nyc/2020-panels/hot-musictech-startups">aloom (synaesthetic) on the Mondo NYC Hot Startup Panel</ThirdPartyLink>
              <ThirdPartyLink href="https://medium.com/@synaesthetic/the-untold-history-of-synesthesia-music-e13774272d1c">Blog 3: “The Untold History of Synesthesia & Music”</ThirdPartyLink>
              <ThirdPartyLink href="https://musically.com/2020/09/18/startup-synaesthetic-seeks-artists-for-immersive-music/">aloom calls on musicians for its beta-testing program</ThirdPartyLink>
              <ThirdPartyLink href="https://medium.com/@synaesthetic/lets-rethink-virtual-reality-daad06313330?sk=18dcd4586fff13d6c13a18d92d6afffc">Blog 2: “Let’s Rethink Virtual Reality”</ThirdPartyLink>
              <ThirdPartyLink href="https://medium.com/@synaesthetic/the-synaesthetic-manifesto-f0f63c4b374a?sk=016df46ef7ab3db3bb7604a126a6cf20">Blog 1: “The Synaesthetic Manifesto”</ThirdPartyLink>
              <ThirdPartyLink href="https://musically.com/2019/10/22/synaesthetic-to-blend-classical-music-ai-and-ar-technologies/">Our first paragraph online got free press!</ThirdPartyLink>
            </LinkWrapper>
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper2 top={(1042 * 3) + 1456}>
          <ContentBlock ref={contactRef} title="Contact">
            <div style={{backgroundColor: "black", width: "340px", marginBottom: "20px", borderRadius: "20px"}}>
              <p style={{color: "white", padding: "20px"}}>Contact Us! (Coming Soon)</p>
            </div>
          </ContentBlock>
        </ContentBlockWrapper2>
        <ContentBlockWrapper3>
          <EndScreenWrapper>
            <ButtonLinkWrapper>
              <ButtonLink onClick={() => { mixpanel.track("clicked see product") }} to="product">See Product</ButtonLink>
              <ButtonLink onClick={() => { mixpanel.track("clicked company go home") }} to="cross-roads">Go Home</ButtonLink>
              <ScrollButton onClick={() => {
                mixpanel.track("clicked company back to top")
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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`
interface ImageProps {
  imageUrl?: string
}
const Image = styled.div<ImageProps>`
  background-image: url(${props => props.imageUrl || null});
  background-position: center;
  background-repeat: no-repeat;
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 20;
`
const TransitionVideoWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 6;
`
const BackgroundVideoWrapper = styled.div`
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 5;
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
`
const ProfileCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
  title: string
  children: React.ReactNode
}
const ContentBlock = React.forwardRef<HTMLDivElement, ContentBlockProps>(({ title, children }, ref) => {
  return (
    <ContentBlockContainer ref={ref}>
      { children }
      <h1 style={{
        width: "100%",
        margin: "60px auto",
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

export default Company