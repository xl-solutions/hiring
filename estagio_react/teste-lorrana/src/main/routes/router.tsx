import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Feed } from '../../pages/Feed'
import { Users } from '../../pages/Users'
import { UserAlbum } from '../../pages/UserAlbum'
  

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed/>}/> 
                <Route path="/users" element={<Users/>}/> 
                <Route path="/user/album" element={<UserAlbum/>}/> 
            </Routes>
        </BrowserRouter>
    )
}

export default Router;