import {BrowserView,MobileView,isMobile,isBrowser} from 'react-device-detect'

const device = ()=>{
    return(
        <>
        <BrowserView>
     <h1 className='pt-5 mt-5'>This is rendered only in browser</h1>
   </BrowserView>
   <MobileView>
     <h1>This is rendered only on mobile</h1>
   </MobileView>
   
       </>
    )
  
    }
    export default device
