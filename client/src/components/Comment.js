import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import logo from "../img/photo.png"
import {format} from "timeago.js"


const Container=styled.div`
    display:flex;
    gap:10px;
    margin:30px 0;
`

const Avatar=styled.img`
    width:50px;
    height:50px;
    border-radius:50%;

`


const Details=styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    color:${({theme})=>theme.text}
`

const Name=styled.span`
font-size:13px;
font-weight:500;
`
const Date=styled.span`
    font-size:12px;
    font-weight:400;
    color:${({theme})=>theme.textSoft};
    margin-left:5px;
    font-size:14px;
`
const Text=styled.span`
font-size:14px;
`

const Comment = ({comment}) => {
   const [channel,setChannel]=useState({});
   useEffect(()=>{
       const fetchChannel=async()=>{
            try{
            const {data}=await axios.get(`http://localhost:8000/api/users/find/${comment.userId}`)
            setChannel(data);
            }catch(err) {

            }
       }
       fetchChannel();
       
   },[comment])
  return (
   <Container>
       <Avatar src={channel.img}/>
       <Details>
            <Name>{channel.name} <Date>{format(comment.createdAt)}</Date></Name>
            <Text>{comment.description}</Text>
       </Details>
   </Container>
  )
}

export default Comment;
