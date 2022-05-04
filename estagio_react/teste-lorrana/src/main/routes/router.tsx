import { BrowserRouter, Routes, Route } from 'react-router-dom';

import  Feed  from '../../pages/Feed';
import Users  from '../../pages/Users';
import UserAlbum  from '../../pages/UserAlbum';
import UserGallery from '../../pages/UserGallery';
  

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed/>}/> 
                <Route path="/users" element={<Users/>}/> 
                <Route path="/users/:id/albums" element={<UserAlbum/>}/>  
                <Route path="/albums/:id/photos" element={<UserGallery/>}/> 
            </Routes>
        </BrowserRouter>
    )
}

export default Router;