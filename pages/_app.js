import GlobalStyle from "@/Frontend/theme/GlobalStyle";

function MyApp({Component, pageProps}){
    return(
        <>
        <GlobalStyle/>
        <Component {...pageProps}/>
    </>
    )
}
export default MyApp;