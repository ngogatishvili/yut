import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import logo from "../img/logo.png"
import {useSelector} from "react-redux"


const Container=styled.div`
        flex:1;
        background:${({theme})=>theme.bgLighter};
        height:100vh;
        color:${({theme})=>theme.text};
        font-size:14px;
        position:sticky;
        top:0;
`
const Title=styled.h2`
font-size:14px;
font-weight:500;
color:#aaaaaa;
margin-bottom:20px;
`

const Wrapper=styled.div`
    padding:18px 26px;
`
const Logo=styled.div`
    display:flex;
    align-items:center;
    gap:5px;
    font-weight:bold;
    margin-bottom:25px;
`

const Img=styled.img`
    height:25px;
`

const Item=styled.div`
display:flex;
align-items:center;
gap:20px;
cursor:pointer;
padding:7.5px 0;

&:hover {
    background:${({theme})=>theme.soft}
}
`

const Hr=styled.hr`
    border:0.5px solid ${({theme})=>theme.soft};
    margin:15px 0;
`


const Login=styled.div`

`

const Button=styled.button`
    padding:5px 15px;
    background-color:transparent;
    border:1px solid #3eabff;
    color:#3eabff;
    border-radius:3px;
    font-weight:500;
    margin-top:10px;
    cursor:pointer;
`

export const Menu = ({setLightMode,lightMode}) => {
    const {user}=useSelector(store=>store.user)
  return (
    <Container>
        <Wrapper>
            <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
            <Logo>
                <Img src={logo} alt="logo"/>
                    Ninitube
            </Logo>
            </Link>
            <Item>
                Home</Item>
                <Link to="trend" style={{textDecoration:"none",color:"inherit"}}>
                <Item>
                Explore</Item>
                </Link>
            <Link to="sub" style={{textDecoration:"none",color:"inherit"}}>
            <Item>
                Subscriptions</Item>
            </Link>
            
                <Hr/>
            <Item>
                Library</Item>
            <Item>
                History</Item>
                <Hr/>
               {!user && <>
                <Login>
                    Sign in to like videos,comment and subscribe:
                    <Link to="/signin" style={{textDecoration:"none"}}>
                    <Button>sign in</Button>
                    </Link>
                </Login>
                <Hr/></> } 

                <Title>Best of Ninitube</Title>

            <Item>
                
                Music</Item>
            <Item>
                Sports</Item>
            <Item>
                Gaming</Item>
            <Item>
                Movies</Item>
            <Item>
                News</Item>
            <Item>
                Lives</Item>
                <Hr/>
            <Item>
                
                Settings</Item>
            <Item>
                Report</Item>
            <Item>
                Help</Item>
            <Item onClick={()=>setLightMode(!lightMode)}>
                {lightMode? "Dark Mode":"Light Mode"}</Item>
        </Wrapper>
    </Container>
  )
}

