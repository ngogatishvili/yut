import { useEffect, useState } from "react";
import styled,{ThemeProvider} from "styled-components"
import {useSelector} from "react-redux"
import { Menu } from "./components/Menu";
import { NavBar } from "./components/NavBar";
import { darkTheme, lightTheme } from "./utils/Theme";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Home } from "./pages/Home";
import { Video } from "./pages/Video";
import Signin from "./pages/Signin";


const Container=styled.div`
  display:flex;
`

const MainContainer=styled.div`
 flex:7;
 background:${({theme})=>theme.bg};
`

const lightModeSave=JSON.parse(localStorage.getItem("mode"));


const Wrapper=styled.div`
  padding:22px 96px;
`

function App() {
  const [lightMode,setLightMode]=useState(lightModeSave);
  useEffect(()=>{
    localStorage.setItem("mode",JSON.stringify(lightMode))
  },[lightMode])
  return (
    <ThemeProvider theme={lightMode?lightTheme:darkTheme}>
    <Container>
      <BrowserRouter>
      <Menu setLightMode={setLightMode} lightMode={lightMode}/>
      <MainContainer>
        <NavBar/>
        <Wrapper>
          <Routes>
            <Route path="/">
              <Route index element={<Home type="random"/>}/>
              <Route path="trend" element={<Home type="trend"/>}/>
              <Route path="sub" element={<Home type="sub"/>}/>
              <Route path="signin" element={<Signin/>}/>
              <Route path="video">
                <Route path=":id" element={<Video/>}/>
                <Route/>
              </Route>
            </Route>
          </Routes>
        </Wrapper>
      </MainContainer>
      </BrowserRouter>
      
    </Container>
    </ThemeProvider>
  );
}

export default App;
