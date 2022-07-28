import React, { useState } from 'react'
import styled from "styled-components"
import {Logout, SearchOutlined, VideoCallOutlined} from "@mui/icons-material"
import { Link, useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {logout} from "../redux/userSlice";
import Upload from './Upload';


const Container=styled.div`
position:sticky;
top:0;
background:${({theme})=>theme.bgLighter};
height:56px;

`;
const Wrapper=styled.div`
display:flex;
align-items:center;
height:100%;
padding:0px 20px;
justify-content:flex-end;
position:relative;
`

const Search=styled.div`
width:40%;
position:absolute;
left:0;
right:0;
margin:auto;
display:flex;
justify-content:space-between;
align-items:center;
padding:5px;
border:1px solid #ccc;
border-radius:3px;
`
const Input=styled.input`
border:none;
background:transparent;
`

const Button=styled.button`
    padding:5px 15px;
    background-color:transparent;
    border:1px solid #3eabff;
    color:#3eabff;
    border-radius:3px;
    font-weight:500;
    cursor:pointer;
    display:flex;
    align-items:center;
`

const User=styled.div`
    display:flex;
    align-items:center;
    gap:10px;
    font-weight:500;
    color:${({theme})=>theme.text}

`

const Avatar=styled.img`
    width:32px;
    height:32px;
    border-radius:50%;
    background:#999;
`


export const NavBar = () => {
    const [open,setOpen]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector(state=>state.user);
    const handleLogout=()=>{
        dispatch(logout());
        navigate("/signin")

    }
  return (
      <>
    <Container>
        <Wrapper>
            {user && <Button onClick={handleLogout}> <Logout/> Log out</Button>}
            <Search>
                <Input placeholder="search..."/>
                <SearchOutlined/>
            </Search>
           {user? (
               <User>
                   <VideoCallOutlined onClick={()=>setOpen(true)}/>
                   <Avatar src={user.img} />
                   {user.name}
               </User>
           ) : (
                <Link to="/signin">
                <Button>
                    SIGN IN
                </Button>
                </Link>  
           )} 
           
        </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen}/> }
    </>
  )
}
