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

import demoVideo from "./assets/demo_video.mp4"

import ryansam from "./assets/ryansam_profile.jpeg"
import samim from "./assets/samim.jpeg"
import shin from "./assets/shin_headshot.png"
import sean from "./assets/sean_mcgrail.jpeg"
import will from "./assets/will_mills.jpeg"
import dr_sean from "./assets/dr_sean.jpg"
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
  const overviewRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const signUpRef = useRef<HTMLDivElement>(null)
  const synesthesiaRef = useRef<HTMLDivElement>(null)
  const productLinksRef = useRef<HTMLDivElement>(null)
  const backTopSurfaceRef = useRef<HTMLDivElement>(null)
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
    dnaRef!.current!.style.opacity = "0.0"
    overviewRef!.current!.style.opacity = "0.0"
    setTimeout(() => {
      dnaRef!.current!.style.transition = "opacity 300ms linear"
      overviewRef!.current!.style.transition = "opacity 300ms linear"
      dnaRef!.current!.style.opacity = "1.0"
      overviewRef!.current!.style.opacity = "1.0"
    }, 300) 

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

      if (location === "company") {
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
      } else {
        if (frameNumber >= 42) {
          overviewRef!.current!.style.display = "none"
        } else {
          overviewRef!.current!.style.display = "block"
        }
  
        if (frameNumber < 42 || frameNumber >= 63) {
          demoRef!.current!.style.display = "none"
        } else {
          demoRef!.current!.style.display = "grid"
          demoRef!.current!.style.opacity = `${(1 / (63 - 49)) * (frameNumber - 49)}`
        }
  
        if (frameNumber < 70 || frameNumber >= 84) {
          signUpRef!.current!.style.display = "none"
        } else {
          signUpRef!.current!.style.display = "grid"
          signUpRef!.current!.style.opacity = `${(1 / (84 - 70)) * (frameNumber - 70)}`
        }

        if (frameNumber < 92 || frameNumber >= 104) {
          synesthesiaRef!.current!.style.display = "none"
        } else {
          synesthesiaRef!.current!.style.display = "grid"
          synesthesiaRef!.current!.style.opacity = `${(1 / (104 - 92)) * (frameNumber - 92)}`
        }

        if (frameNumber < 118 || frameNumber >= 126) {
          productLinksRef!.current!.style.display = "none"
        } else {
          productLinksRef!.current!.style.display = "grid"
          productLinksRef!.current!.style.opacity = `${(1 / (126 - 118)) * (frameNumber - 118)}`
        }

        if (frameNumber < 127) {
          backTopSurfaceRef!.current!.style.display = "none"
        } else {
          backTopSurfaceRef!.current!.style.display = "grid"
        }
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
          <ContentBlock height={"194%"} top={"0%"} heading={"DNA"}>
            <div ref={dnaRef}>
              <ContentBlockP>We help people feel more.</ContentBlockP>
              <p className="contentBlockP" style={{margin: "20px 0px 0px 0px", opacity: 0.8}}>By visualizing the emotion in audio,</p>
              <p className="contentBlockP" style={{margin: "0px 0px 20px 0px", opacity: 0.8}}>we make multimedia more engaging.</p>
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
          <ContentBlock top={"-100%"} heading={"Founders"}>
            <div className="profiles" ref={foundersRef}>
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
          <ContentBlock top={"-200%"} heading={"Advisors"}>
            <div className="profiles" ref={advisorsRef}>
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
          <ContentBlock height={"194%"} top={"0%"} heading={"Overview"}>
            <div ref={overviewRef}>
              <div style={{
                width: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                marginTop: "60px"
              }}>
                <h1 style={{color: "white", fontSize: "42px", textAlign: "center", margin: "0px"}}>“Audio Illuminated”</h1>
              </div>
              <ContentBlockP>
                Our smart light visualizes the emotion in audio to create more engaging experiences, controlled by our app.
              </ContentBlockP>
              <ContentBlockP opacity={0.8}>
                Using neuroscience, we create content-tailored visual ambiance. This multi-sensory immersion helps you feel more connected to the moment.
              </ContentBlockP>
              <div style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                marginBottom: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Overview</h1>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock zIndex={10} top={"-100%"} heading={"Demo"}>
            <div style={{width: "100%", height: "100%", display: "grid", justifyItems: "center"}} ref={demoRef}>

              <video
                style={{outline: "none", marginTop: "10%"}}
                height="40%"
                tabIndex={0}
                playsInline
                controls
                onLoadedData={() => {disableScroll.off()}}
              >
                <source type="video/mp4" src={demoVideo} />
              </video>


              <div style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                marginBottom: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Demo</h1>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-200%"} heading={"Tech"}>
            <div style={{justifyItems: "center", alignItems: "center"}} ref={signUpRef}>
              <ContentBlockP>
                Be among the first to experience aloom:
              </ContentBlockP>
              <div style={{backgroundColor: "black", width: "340px", marginBottom: "20px", borderRadius: "20px"}}>
                <p style={{color: "white", padding: "20px"}}>Beta-testing for creators (Coming Soon)</p>
              </div>
              <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                <p style={{color: "white", padding: "20px"}}>Customer pre-orders (Coming Soon)</p>
              </div>
              <div style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                marginBottom: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Sign Up</h1>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-300%"} heading={"Tech"}>
            <div ref={synesthesiaRef}>
              <ContentBlockP>
                The magic of our platform comes from the neurological condition of Synesthesia; where your senses mix & trigger each other, like seeing sounds.
              </ContentBlockP>
              <ContentBlockP opacity={0.8}>
                These multi-sensory associations helped great artists from Van Gogh to Steve Wonder to  improve creativity, memory and focus. Some call it nature’s genius button.
              </ContentBlockP>
              <ContentBlockP opacity={0.6}>
                Best of all, it’s not just genetic and can be learned. We’ve coded this natural mechanism along with customization tools, for communal creativity towards collective transcendence.
              </ContentBlockP>
              <div style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                marginBottom: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Synesthesia</h1>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-400%"} heading={"Tech"}>
          <div style={{justifyItems: "center", alignItems: "center"}} ref={productLinksRef}>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px"}}>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://thepsychologist.bps.org.uk/volume-28/february-2015/surprising-world-synaesthesia"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>The surprising world of Synesthesia</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://www.ingentaconnect.com/content/fmea/rpme/2019/00000020/00000001/art00005"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Pitch-Perfect Chromesthesia</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://digitalcommons.iwu.edu/psych_honproj/198/"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Can Synesthesia be learned?</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://www.sciencedirect.com/science/article/abs/pii/S0028393216301130"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Synesthesia via LSD</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://www.psychologytoday.com/us/blog/sensorium/201203/synesthetes-people-the-future"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Pharrell talks about his Synesthesia</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://www.youtube.com/watch?v=E6pcgv-SkPQ"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Billie Eilish: Synesthesia in her process</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://www.youtube.com/watch?v=EyZg-FDTMxc"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Lorde: how Synesthesia inspires her</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://www.youtube.com/watch?t=1s&v=88s6guf9egs"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>TEDx: “Seeing Sound” Annie Dickinson</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://pitchfork.com/thepitch/229-what-the-hell-is-synesthesia-and-why-does-every-musician-seem-to-have-it/"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Pitchfork: Every musician has Synesthesia</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px", gridColumn: "2/3"}}>
                  <a
                    href="https://synesthesia.com/blog/synesthesia-tests/"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Do you have synesthesia? Take a quiz!</p>
                  </a>
                </div>
              </div>
              <div style={{
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                marginBottom: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Explore</h1>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-550%"} heading={"Tech"}>
            <div ref={backTopSurfaceRef}>
              <button onClick={() => { window.location.reload() }} style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: 600,
                width: "150px",
                height: "40px",
                outline: "none",
                border: "none",
                borderRadius: "10px"
              }}>Back To Suface</button>
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
