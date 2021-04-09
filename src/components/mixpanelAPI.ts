import mixpanel from 'mixpanel-browser'

enum Page {
  AloomLoop = "aloom loop",
  CrossRoads = "cross roads",
  Product = "product",
  Company = "company",
  NA = "na"
}
enum DeviceType {
  Desktop = "desktop",
  Mobile = "mobile"
}

interface Company_Do_Once {
  viewed_DNA: boolean
  viewedFounders: boolean
  viewedAdvisors: boolean
  viewedNews: boolean
  viewedContact: boolean
  viewedEndScreen?: boolean
}
interface Product_Do_Once {
  viewedOverview: boolean
  viewedDemo: boolean
  viewedSignUp: boolean
  viewedTech: boolean
  viewedExplore: boolean
  viewedEndScreen?: boolean
}

////// Top Layer //////
const initMixpanel = (token: string, device: DeviceType) => {
  mixpanel.init(token)
  mixpanel.register({"device type": device})
}
const trackVisitedSite = () => {
  mixpanel.track("visited site")
}
const trackCrossRoadsView = () => {
  mixpanel.track("viewed cross roads")
}
///////////////////////


////// Company //////
const trackCompanyView = () => {
  mixpanel.track("viewed company")
}
const track_DNA_View = () => {
  mixpanel.track("viewed dna")
}
const trackFoundersView = () => {
  mixpanel.track("viewed founders")
}
const trackAdvisorsView = () => {
  mixpanel.track("viewed advisors")
}
const trackNewsView = () => {
  mixpanel.track("viewed news")
}
const trackContactView = () => {
  mixpanel.track("viewed contact")
}
/////////////////////


////// Product //////
const trackProductView = () => {
  mixpanel.track("viewed product")
}
const trackOverviewView = () => {
  mixpanel.track("viewed overview")
}
const trackDemoView = () => {
  mixpanel.track("viewed demo")
}
const trackSignUpView = () => {
  mixpanel.track("viewed sign up")
}
const trackTechView = () => {
  mixpanel.track("viewed tech")
}
const trackExploreView = () => {
  mixpanel.track("viewed explore")
}
const trackStartWatchingDemo = () => {
  mixpanel.time_event("watching demo video")
}
const trackStopWatchingDemo = () => {
  mixpanel.track("watching demo video")
}
/////////////////////


////// Other //////
const trackEndScreenView = (page: Page) => {
  mixpanel.track("viewed end screen", {"page": page})
}
const trackStartWatchingBueller = () => {
  mixpanel.time_event("watching bueller video")
}
const trackStopWatchingBueller = (page: Page) => {
  mixpanel.track("watching bueller video", {"page": page})
}
///////////////////


////// Navigation //////
const trackClickedProduct = () => {
  mixpanel.track("clicked product")
}
const trackClickedCompany = () => {
  mixpanel.track("clicked company")
}
const trackClickedSeeCompany = () => {
  mixpanel.track("clicked see company")
}
const trackClickedSeeProduct = () => {
  mixpanel.track("clicked see product")
}
const trackClickedBackToSurface = (page: Page) => {
  mixpanel.track("clicked back to surface", {"page": page})
}
const trackClickedGoHome = (page: Page) => {
  mixpanel.track("clicked go home", {"page": page})
}
const trackClickedBackToTop = (page: Page) => {
  mixpanel.track("clicked back to top", {"page": page})
}
////////////////////////

export type CompanyDoOnce = Company_Do_Once
export type ProductDoOnce = Product_Do_Once
export {
  initMixpanel,
  Page,
  DeviceType,
  track_DNA_View,
  trackFoundersView,
  trackAdvisorsView,
  trackNewsView,
  trackContactView,
  trackEndScreenView,
  trackStartWatchingBueller,
  trackStopWatchingBueller,
  trackCompanyView,
  trackOverviewView,
  trackDemoView,
  trackSignUpView,
  trackTechView,
  trackExploreView,
  trackStartWatchingDemo,
  trackStopWatchingDemo,
  trackClickedProduct,
  trackClickedCompany,
  trackCrossRoadsView,
  trackClickedBackToSurface,
  trackClickedSeeCompany,
  trackClickedSeeProduct,
  trackClickedGoHome,
  trackClickedBackToTop,
  trackVisitedSite,
  trackProductView
}