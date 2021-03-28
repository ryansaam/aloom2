import React, { useRef } from 'react'
import disableScroll from 'disable-scroll'
import './App.css'

import InitContent from "./components/InitContent"
import BackgroundVideo from "./components/BackgroundVideo"
import ContentBlock from "./components/ContentBlock"
import ContentBlockP from "./components/ContentBlockP"
import ProfileCard from "./components/ProfileCard"

import companyBackground from "./assets/aloom_company_background.mp4"
import productBackground from "./assets/aloom_product_background.mp4"

import ryansam from "./assets/ryansam_profile.jpeg"
// TODO: Line up background videos and build scroll to seek function


function App() {
  const companyBackgroundRef = useRef<HTMLVideoElement>(null)
  const productBackgroundRef = useRef<HTMLVideoElement>(null)
  const companyBackgroundContainerRef = useRef<HTMLDivElement>(null)
  const productBackgroundContainerRef = useRef<HTMLDivElement>(null)
  const companyContentRef = useRef<HTMLDivElement>(null)
  const productContentRef = useRef<HTMLDivElement>(null)
  const initContentContainerRef = useRef<HTMLDivElement>(null)
  const heightRef = useRef<HTMLDivElement>(null)
  const masterRef = useRef<HTMLDivElement>(null)


  // content section refs
  const dnaRef = useRef<HTMLDivElement>(null)
  const foundersRef = useRef<HTMLDivElement>(null)
  const advisorsRef = useRef<HTMLDivElement>(null)
  ///////////////////////

  const initVideo = (type: string) => {
    initVideoScroll(type)
    if (type === "company") {
      productBackgroundContainerRef!.current!.style.display = "none"
      productContentRef!.current!.style.display = "none"
    } else {
      companyBackgroundContainerRef!.current!.style.display = "none"
      companyContentRef!.current!.style.display = "none"
    }
  }

  const handleInitContent = (location: string) => {
    disableScroll.off()
    masterRef!.current!.className = "App"
    window.scrollTo(0,0)
    initContentContainerRef!.current!.style.display = "none"
    initVideo(location)
  }

  const initVideoScroll = (location: string) => {
    let frameNumber = 0; // start video at frame 0

    let vidRef: HTMLVideoElement;

    if (location === "company") {
      vidRef = companyBackgroundRef!.current!
    } else {
      vidRef = productBackgroundRef!.current!
    }

    vidRef.playbackRate = 0.5;

    // lower numbers = faster playback
    const playbackConst = 50;

    // get page height from video duration
    const setHeight = heightRef!.current!;
    // select video element

    const vid = vidRef;

    // dynamically set the page height according to video length
    console.log(vid.duration);
    setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";

    // Use requestAnimationFrame for smooth playback
    function scrollPlay() {
      frameNumber = (window.pageYOffset / playbackConst) + 30;
      console.log(frameNumber)

      if (frameNumber >= 42) {
        dnaRef!.current!.style.display = "none"
      } else {
        dnaRef!.current!.style.display = "block"
      }

      if (frameNumber < 42 || frameNumber >= 63) {
        foundersRef!.current!.style.display = "none"
      } else {
        foundersRef!.current!.style.display = "grid"
        foundersRef!.current!.style.opacity = `${(1 / (63 - 49)) * (frameNumber - 49)}`
      }

      if (frameNumber < 70 || frameNumber >= 84) {
        advisorsRef!.current!.style.display = "none"
      } else {
        advisorsRef!.current!.style.display = "grid"
        advisorsRef!.current!.style.opacity = `${(1 / (84 - 70)) * (frameNumber - 70)}`
      }

      if (vid.readyState !== 1) {
        vid.currentTime = frameNumber;
      }
      window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
  };

  return (
    <div ref={masterRef} className="App ScrollLimit">
      <div ref={heightRef}>
        <div ref={productBackgroundContainerRef} style={{ position: "sticky", top: "0px" }}>
          <BackgroundVideo ref={productBackgroundRef} src={productBackground} onLoadedData={() => { productBackgroundRef!.current!.currentTime = 0.44 * 60 }} />
        </div>
        <div ref={companyBackgroundContainerRef} style={{ position: "sticky", top: "0px" }}>
          <BackgroundVideo ref={companyBackgroundRef} src={companyBackground} onLoadedData={() => { companyBackgroundRef!.current!.currentTime = 0.44 * 60 }} />
        </div>

        <div ref={companyContentRef} style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
        }}>
          <ContentBlock height={"194%"} top={"0%"} heading={"DNA"} backgroundColor={"blue"}>
            <div ref={dnaRef}>
              <ContentBlockP>We help people feel more.</ContentBlockP>
              <ContentBlockP opacity={0.8}>By visualizing the emotion in audio, we make multimedia more engaging.</ContentBlockP>
              <ContentBlockP opacity={0.6}>Ultimately, we are pioneering human perception technologies.</ContentBlockP>
              <div style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                marginBottom: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>DNA</h1>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-100%"} heading={"Founders"} backgroundColor={"red"}>
            <div className="profiles" ref={foundersRef}>
              <ProfileCard
                name={"Samim Safaei"}
                title={"CEO"}
                desc={"An experienced engineer, product manager and founder; striving to spread the power of immersive audio-visual experiences."}
              />
              <ProfileCard
                name={"Shin Nagpal"}
                title={"COO"}
                desc={"A manufacturing expert with practical experience scaling audio hardware OEMs; he creates high-quality products that offer unique value."}
              />
              <ProfileCard
                imgSrc={ryansam}
                imgAlt={"Ryan Sam"}
                name={"Ryan Sam"}
                title={"VP Software"}
                desc={"A self-taught full-stack developer with a passion for audio; he brings a modern, practical approach to digital product design."}
              />
              <div style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                marginBottom: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Founders</h1>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-200%"} heading={"Advisors"} backgroundColor={"magenta"}>
            <div className="profiles" ref={advisorsRef}>
              <ProfileCard
                name={"Will Mills"}
                title={"Advisor A"}
                desc={"seasoned music industry professional, former VP of Shazam, Founder of Dynamic Music (acq’d); he advises startups in the music tech space."}
              />
              <ProfileCard
                name={"Sean McGrail"}
                title={"Advisor Founder"}
                desc={"President of Paint-Nite (acq’d), Managing Director of a seed fund; he advises startups in the artistic space."}
              />
              <ProfileCard
                name={"Dr. Sean A. Day"}
                title={"Advisor Founder"}
                desc={"Advisor A pioneer in the field of synesthesia research; he is an author, professor, & president of the largest synesthete group in the world, the IASAS."}
              />
              <div style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                marginBottom: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Advisors</h1>
              </div>
            </div>
          </ContentBlock>
        </div>

        <div ref={productContentRef} style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
        }}>
          <ContentBlock heading={"Overview"} backgroundColor={"green"}>
            <div>
              <ContentBlockP>“Audio Illuminated”</ContentBlockP>
              <ContentBlockP opacity={0.8}>
                Our smart light visualizes the emotion in audio to create more engaging experiences, controlled by our app.
              </ContentBlockP>
              <ContentBlockP opacity={0.6}>
                Using neuroscience, we create content-tailored visual ambiance. This multi-sensory immersion helps you feel more connected to the moment.
              </ContentBlockP>
            </div>
          </ContentBlock>
          <ContentBlock heading={"Demo"} backgroundColor={"yellow"}>
            <div>
              
            </div>
          </ContentBlock>
          <ContentBlock heading={"Tech"} backgroundColor={"orange"}>
            <div>
              <ContentBlockP>
                The magic of our platform comes from the neurological condition of Synesthesia; where your senses mix & trigger each other, like seeing sounds.
              </ContentBlockP>
              <ContentBlockP opacity={0.8}>
                These multi-sensory associations helped great artists from Van Gogh to Steve Wonder to  improve creativity, memory and focus. Some call it nature’s genius button.
              </ContentBlockP>
              <ContentBlockP opacity={0.6}>
                Best of all, it’s not just genetic and can be learned. We’ve coded this natural mechanism along with customization tools, for communal creativity towards collective transcendence.
              </ContentBlockP>
            </div>
          </ContentBlock>
        </div>

      </div>
      
      <div ref={initContentContainerRef} style={{
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
      }}>
        <InitContent handleScroll={() => { disableScroll.on() }} startTransition={(location) => { handleInitContent(location) }} />
      </div>
    </div>
  )
}




export default App
