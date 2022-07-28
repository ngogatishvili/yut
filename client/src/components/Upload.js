import { ImageAspectRatio } from '@mui/icons-material'
import React, { useState } from 'react'
import styled from "styled-components"



const Container=styled.div`
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.7);
    display:flex;
    justify-content:center;
    align-items:center;
`

const Wrapper=styled.div`
    width:600px;
    height:600px;
    background:${({theme})=>theme.bgLighter};
    color:${({theme})=>theme.text};
    padding:20px;
    display:flex;
    flex-direction:column;
    gap:20px;
    position:relative;
    
`

const Close=styled.div`
    cursor:pointer;
    position:absolute;
    right:10px;
    top:10px;
    z-index:99;
`

const Title=styled.h1`
    text-align:center;
`


const Input=styled.input`
    border:1px solid ${({theme})=>theme.soft};
    color:${({theme})=>theme.text};
    border-radius:3px;
    padding:10px;
    background:transparent;
    z-index:99;
`

const Desc=styled.textarea`
border:1px solid ${({theme})=>theme.soft};
color:${({theme})=>theme.text};
border-radius:3px;
padding:10px;
background:transparent;
z-index:99;
`

const Button=styled.button`
    border-radius:3px;
    border:none;
    padding:10px 20px;
    font-weight:500;
    cursor:pointer;
    background:${({theme})=>theme.soft};
    color:${({theme})=>theme.textSoft};

`

const Label=styled.label`
    font-size:14px;
`

const Upload = ({setOpen}) => {
    const [video,setVideo]=useState(null);
    const [img,setImg]=useState(null);
    const [videoPerc,setVideoPerc]=useState(0);
    const  [imgPerc,setImgPerc]=useState(0);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("")
    const [tags,setTags]=useState([]);
    const handleTags=(e)=>{
        setTags(e.target.value.split(","))
    }                               
  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload a new video</Title>
            <Label>Video:</Label>
            <Input type="file" accept='video/*' onChange={(e)=>setVideo(e.target.files[0])}/>
            <Input type="text" placeholder="title" onChange={e=>setTitle(e.target.value)}/>
            <Desc placeholder='description' rows={8} onChange={e=>setDescription(e.target.value)}/>
            <Input type="text" placeholder="seperate tags with commas" onChange={handleTags}/>
            <Label>Image:</Label>
            <Input type="file" accept="image/*" onChange={e=>setImg(e.target.files[0])}/>
            <Button>Upload</Button>

        </Wrapper>
    </Container>
  )
}

export default Upload;
