import type{Metadata}from"next";import"./globals.css";import Header from"@/components/Header";import BottomNav from"@/components/BottomNav";import Footer from"@/components/Footer";
export const metadata:Metadata={title:"ROCK STYLES | Tamil Streetwear",description:"Tamil Streetwear • Built for the Bold",applicationName:"Rock Styles"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/><main>{children}</main><Footer/><BottomNav/></body></html>}
