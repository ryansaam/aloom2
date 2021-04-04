import React, { useEffect, useRef } from 'react'
import disableScroll from 'disable-scroll'
import mixpanel from 'mixpanel-browser'
// import './App.css'

import InitContent from "../components/InitContent"
import BackgroundVideo from "../components/BackgroundVideo"
import ContentBlock from "../components/ContentBlock"
import ContentBlockP from "../components/ContentBlockP"
import ProfileCard from "../components/ProfileCard"

import companyBackground from "./assets/aloom_company_background.mp4"
import productBackground from "./assets/aloom_product_background.mp4"


import ryansam from "./assets/ryansam_profile.jpeg"
import samim from "./assets/samim.jpeg"
import shin from "./assets/shin_headshot.png"
import sean from "./assets/sean_mcgrail.jpeg"
import will from "./assets/will_mills.jpeg"
import dr_sean from "./assets/dr_sean.jpg"
// TODO: Line up background videos and build scroll to seek function

declare global {
  interface Window {
      FB:any;
  }
}

let FB = window.FB; // ok now

const mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||FB.opera);
  console.log(check)
  return check;
};

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
  const newsLinksRef = useRef<HTMLDivElement>(null)
  const backToSurfaceRef = useRef<HTMLDivElement>(null)
  const backToSurfaceRef2 = useRef<HTMLDivElement>(null)
  const contactUsRef = useRef<HTMLDivElement>(null)
  const buellarRef = useRef<HTMLDivElement>(null)
  const buellarRef2 = useRef<HTMLDivElement>(null)

  const productLinksZIndex = useRef<HTMLDivElement>(null)
  ///////////////////////

  useEffect(() => {
    mixpanel.init("ada50c2a8d4a7588c92176205627c223");
    mixpanel.track("visited site");
    if (mobileCheck()) {
      mixpanel.track("viewed on mobile", {
        "navigator user agent": navigator.userAgent
      });
    }
  }, [])

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
    const doOnce = {
      viewedDNA: false,
      viewedFounders: false,
      viewedAdvisors: false,
      viewedNewsLinks: false,
      viewedContact: false,
      viewedEndCompanyScreen: false,

      viewedOverview: false,
      viewedDemo: false,
      viewedSignUp: false,
      viewedSynesthesia: false,
      viewedProductLinks: false,
      viewedEndProductScreen: false
    }
    function scrollPlay() {
      frameNumber = (window.pageYOffset / playbackConst) + 30;
      // console.log(frameNumber)

      

      if (location === "company") {
        if (frameNumber >= 42) {
          dnaRef!.current!.style.display = "none"
        } else {
          dnaRef!.current!.style.display = "block"
          if (!doOnce.viewedDNA) {
            mixpanel.track("viewed DNA");
            doOnce.viewedDNA = true
          }
        }
  
        if (frameNumber < 42 || frameNumber >= 63) {
          foundersRef!.current!.style.display = "none"
        } else {
          foundersRef!.current!.style.display = "grid"
          foundersRef!.current!.style.opacity = `${(1 / (63 - 49)) * (frameNumber - 49)}`
          if (!doOnce.viewedFounders) {
            mixpanel.track("viewed founders");
            doOnce.viewedFounders = true
          }
        }
  
        if (frameNumber < 70 || frameNumber >= 84) {
          advisorsRef!.current!.style.display = "none"
        } else {
          advisorsRef!.current!.style.display = "grid"
          advisorsRef!.current!.style.opacity = `${(1 / (84 - 70)) * (frameNumber - 70)}`
          if (!doOnce.viewedAdvisors) {
            mixpanel.track("viewed advisors");
            doOnce.viewedAdvisors = true
          }
        }

        if (frameNumber < 92 || frameNumber >= 104) {
          newsLinksRef!.current!.style.display = "none"
        } else {
          newsLinksRef!.current!.style.display = "grid"
          newsLinksRef!.current!.style.opacity = `${(1 / (104 - 92)) * (frameNumber - 92)}`
          if (!doOnce.viewedNewsLinks) {
            mixpanel.track("viewed news links");
            doOnce.viewedNewsLinks = true
          }
        }

        if (frameNumber < 118 || frameNumber >= 126) {
          contactUsRef!.current!.style.display = "none"
        } else {
          contactUsRef!.current!.style.display = "grid"
          contactUsRef!.current!.style.opacity = `${(1 / (126 - 118)) * (frameNumber - 118)}`
          if (!doOnce.viewedContact) {
            mixpanel.track("viewed contact");
            doOnce.viewedContact = true
          }
        }

        if (frameNumber < 127) {
          backToSurfaceRef2!.current!.style.display = "none"
          buellarRef2!.current!.style.opacity = "0.0"
          // buellarRef2!.current!.style.transition = "opacity 5s linear"
          // buellarRef2!.current!.style.transitionDelay = "4s"
        } else {
          backToSurfaceRef2!.current!.style.display = "grid"
          buellarRef2!.current!.style.opacity = "1.0"
          // buellarRef2!.current!.style.transition = ""
          if (!doOnce.viewedEndCompanyScreen) {
            mixpanel.track("viewed company end screen");
            doOnce.viewedEndCompanyScreen = true
          }
        }
      } else {
        if (frameNumber >= 42) {
          overviewRef!.current!.style.display = "none"
        } else {
          overviewRef!.current!.style.display = "block"
          if (!doOnce.viewedOverview) {
            mixpanel.track("viewed overview");
            doOnce.viewedOverview = true
          }
        }
  
        if (frameNumber < 42 || frameNumber >= 63) {
          demoRef!.current!.style.display = "none"
        } else {
          demoRef!.current!.style.display = "grid"
          demoRef!.current!.style.opacity = `${(1 / (63 - 49)) * (frameNumber - 49)}`
          if (!doOnce.viewedDemo) {
            mixpanel.track("viewed product demo");
            doOnce.viewedDemo = true
          }
        }
  
        if (frameNumber < 70 || frameNumber >= 84) {
          signUpRef!.current!.style.display = "none"
        } else {
          signUpRef!.current!.style.display = "grid"
          signUpRef!.current!.style.opacity = `${(1 / (84 - 70)) * (frameNumber - 70)}`
          if (!doOnce.viewedSignUp) {
            mixpanel.track("viewed sign up screen");
            doOnce.viewedSignUp = true
          }
        }

        if (frameNumber < 92 || frameNumber >= 104) {
          synesthesiaRef!.current!.style.display = "none"
        } else {
          synesthesiaRef!.current!.style.display = "grid"
          synesthesiaRef!.current!.style.opacity = `${(1 / (104 - 92)) * (frameNumber - 92)}`
          if (!doOnce.viewedSynesthesia) {
            mixpanel.track("viewed synesthesia");
            doOnce.viewedSynesthesia = true
          }
        }

        if (frameNumber < 118 || frameNumber >= 126) {
          productLinksRef!.current!.style.display = "none"
          productLinksZIndex!.current!.style.zIndex = "0"
        } else {
          productLinksRef!.current!.style.display = "grid"
          productLinksRef!.current!.style.opacity = `${(1 / (126 - 118)) * (frameNumber - 118)}`
          productLinksZIndex!.current!.style.zIndex = "12"
          if (!doOnce.viewedProductLinks) {
            mixpanel.track("viewed product links");
            doOnce.viewedProductLinks = true
          }
        }

        if (frameNumber < 127) {
          backToSurfaceRef!.current!.style.display = "none"
          buellarRef!.current!.style.opacity = "0.0"
          // buellarRef!.current!.style.transition = "opacity 5s linear"
          // buellarRef!.current!.style.transitionDelay = "4s"
        } else {
          backToSurfaceRef!.current!.style.display = "grid"
          buellarRef!.current!.style.opacity = "1.0"
          // buellarRef!.current!.style.transition = ""
          if (!doOnce.viewedEndProductScreen) {
            mixpanel.track("viewed product end screen");
            doOnce.viewedEndProductScreen = true
          }
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

          <ContentBlock top={"-300%"} heading={"News"}>
            <div style={{justifyItems: "center", alignItems: "center"}} ref={newsLinksRef}>
              <div style={{
                width: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                marginTop: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>News</h1>
              </div>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px"}}>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://aloom.medium.com/aloom-inated-2b6ac871172f"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Blog 5: “aloom-inated”</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://medium.com/@synaesthetic/synesthesia-to-day-1210d0e2858b"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Blog 4: “Synesthesia, To-day”</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://www.mondo.nyc/2020-panels/hot-musictech-startups"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>aloom (synaesthetic) on the Mondo NYC Hot Startup Panel</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://medium.com/@synaesthetic/the-untold-history-of-synesthesia-music-e13774272d1c"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Blog 3: “The Untold History of Synesthesia & Music”</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://musically.com/2020/09/18/startup-synaesthetic-seeks-artists-for-immersive-music/"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>aloom calls on musicians for its beta-testing program</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://medium.com/@synaesthetic/lets-rethink-virtual-reality-daad06313330?sk=18dcd4586fff13d6c13a18d92d6afffc"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Blog 2: “Let’s Rethink Virtual Reality”</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                  <a
                    href="https://medium.com/@synaesthetic/the-synaesthetic-manifesto-f0f63c4b374a?sk=016df46ef7ab3db3bb7604a126a6cf20"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Blog 1: “The Synaesthetic Manifesto”</p>
                  </a>
                </div>
                <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px", gridColumn: "2/3"}}>
                  <a
                    href="https://musically.com/2019/10/22/synaesthetic-to-blend-classical-music-ai-and-ar-technologies/"
                    target="_blank"
                    rel="noreferrer"
                    style={{textDecoration: "none"}}
                  >
                    <p style={{color: "white", padding: "20px"}}>Our first paragraph online got free press!</p>
                  </a>
                </div>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-400%"} heading={"Tech"}>
            <div style={{justifyItems: "center", alignItems: "center"}} ref={contactUsRef}>
              <div style={{
                width: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                marginTop: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Contact</h1>
              </div>
              <div style={{backgroundColor: "black", width: "340px", marginBottom: "20px", borderRadius: "20px"}}>
                <p style={{color: "white", padding: "20px"}}>Contact Us! (Coming Soon)</p>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-550%"} heading={"Tech"}>
            <div style={{justifyItems: "center", alignItems: "center", gap: "20px"}} ref={backToSurfaceRef2}>
              <div ref={buellarRef2}>
                <iframe
                  width="728"
                  height="409.5"
                  src="https://www.youtube.com/embed/T1XgFsitnQw"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <button onClick={() => { 
                mixpanel.track("clicked company go home");
                window.location.reload()
              }} style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: 600,
                width: "150px",
                height: "40px",
                outline: "none",
                border: "none",
                borderRadius: "10px"
              }}>Go Home</button>
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
                <h1 style={{color: "white", fontSize: "42px", textAlign: "center", margin: "0px"}}>“audio illuminated”</h1>
              </div>
              <ContentBlockP>
                Our smart light visualizes the emotion in audio to create more engaging experiences, controlled by our app.
              </ContentBlockP>
              <ContentBlockP opacity={0.8}>
                Using neuroscience, we create content-tailored visual ambiance. This multi-sensory immersion helps you feel more connected to the moment.
              </ContentBlockP>
            </div>
          </ContentBlock>
          <ContentBlock zIndex={10} top={"-100%"} heading={"Demo"}>
            <div style={{width: "100%", height: "100%", display: "grid", justifyItems: "center"}} ref={demoRef}>
              <div style={{
                width: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                marginTop: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Demo</h1>
              </div>

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
            </div>
          </ContentBlock>
          <ContentBlock top={"-200%"} heading={"Tech"}>
            <div style={{justifyItems: "center", alignItems: "center"}} ref={signUpRef}>
              <div style={{
                width: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                marginTop: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Sign Up</h1>
              </div>
              <ContentBlockP>
                Be among the first to experience aloom
              </ContentBlockP>
              <div style={{backgroundColor: "black", width: "340px", marginBottom: "20px", borderRadius: "20px"}}>
                <p style={{color: "white", padding: "20px"}}>Beta-testing for creators (Coming Soon)</p>
              </div>
              <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
                <p style={{color: "white", padding: "20px"}}>Customer pre-orders (Coming Soon)</p>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock top={"-300%"} heading={"Tech"}>
            <div ref={synesthesiaRef}>
              <div style={{
                width: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                marginTop: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Our Tech</h1>
              </div>
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
          <ContentBlock ref={productLinksZIndex} top={"-400%"} heading={"Tech"}>
            <div style={{justifyItems: "center", alignItems: "center"}} ref={productLinksRef}>
              <div style={{
                width: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                marginTop: "60px"
              }}>
                <h1 style={{color: "white", textAlign: "center", margin: "0px"}}>Explore Synesthesia</h1>
              </div>
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
            </div>
          </ContentBlock>
          <ContentBlock top={"-550%"} heading={"Tech"}>
            <div style={{justifyItems: "center", alignItems: "center", gap: "20px"}} ref={backToSurfaceRef}>
              <div ref={buellarRef}>
                <iframe
                  width="728"
                  height="409.5"
                  src="https://www.youtube.com/embed/T1XgFsitnQw"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <button onClick={() => {
                mixpanel.track("clicked product go home");
                window.location.reload()
              }} style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: 600,
                width: "150px",
                height: "40px",
                outline: "none",
                border: "none",
                borderRadius: "10px"
              }}>Go Home</button>
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
      <div style={{position: "fixed", top: "40px", left: "40px"}}>
        <button onClick={() => {
          mixpanel.track("clicked back to surface");
          window.location.reload()
        }} style={{
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
    </div>
  )
}




export default App
