import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from "axios";
import {useDispatch,useSelector} from "react-redux"
import {loginFailure,loginStart,loginSuccess} from "../redux/userSlice"
import {auth,provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom';



const Container=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:calc(100vh - 56px);
    color:${({theme})=>theme.text}
`
const Wrapper=styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    background:${({theme})=>theme.bgLighter};
    border:1px solid ${({theme})=>theme.soft};
    padding:20px 50px;
    gap:10px;
`

const Title=styled.h1`
    font-size:24px;
`;

const SubTitle=styled.h2`
    font-size:20px;
    font-weight:300;
`;

const Input=styled.input`
border:1px solid ${({theme})=>theme.soft};
border-radius:3px;
padding:10px;
background:transparent;
width:100%;
`;

const Button=styled.button`
    border:none;
    border-radius:3px;
    padding:10px 20px;
    font-weight:500;
    cursor:pointer;
    background:${({theme})=>theme.soft};
    color:${({theme})=>theme.textSoft}
`;

const More=styled.div`
    display:flex;
    font-size:12px;
    color:color:${({theme})=>theme.textSoft};
    margin-top:10px;

`

const Links=styled.div`
    margin-left:50px;
`

const Link=styled.span`
    margin-left:30px;
    
`


const Signin = () => {
    const {user}=useSelector(store=>store.user);
    const navigate=useNavigate();
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();

    const handleLogin=async(e)=>{
        e.preventDefault();
        dispatch(loginStart())

        try{
        const {data}=await axios.post('http://localhost:8000/api/auth/signin',{name,password},
        {withCredentials:true}
        )
            dispatch(loginSuccess(data))
            navigate("/");
        }catch(err) {
            dispatch(loginFailure());
        }
    }

    const signInWithGoogle=async()=>{
        signInWithPopup(auth,provider)
        .then(result=>{
            axios.post('http://localhost:8000/api/auth/google',{name:result.user.displayName,email:result.user.email,img:result.user.photoURL})
            .then(response=>{
                dispatch(loginSuccess(response.data));
            })
            .catch(()=>{
                dispatch(loginFailure())
            })
            
        })
        .catch(err=>{
            alert(err);
        })
    }


    
    useEffect(()=>{
        if(user) {
            navigate("/")
        }
    },[user,navigate])
  return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>To continue to NiniTube</SubTitle>
            <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin}>sign in</Button>
            <Title>or</Title>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            <Title>or</Title>
            <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
            <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <Input/>
            <Button>Sign up</Button>
        </Wrapper>
        <More>
            English (USA)
            <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
            </Links>

        </More>
    </Container>
  )
}

export default Signin
