import axios from 'axios';
import React, { useState,useEffect } from 'react'
import styled from "styled-components"
import logo from "../img/photo.png";
import Comment from './Comment';
import {useSelector} from "react-redux"


const Container=styled.div`

`


const NewComment=styled.div`
    display:flex;
    align-items:center;
    gap:10px;
`

const Avatar=styled.img`
    width:50px;
    height:50px;
    border-radius:50%;
`

const Input=styled.input`
border:none;
border-bottom:1px solid ${({theme})=>theme.text};
background:transparent;
outline:none;
padding:5px;
width:100%;

`

const Comments = ({videoId}) => {
    const {user}=useSelector(store=>store.user)
    const [comments,setComments]=useState([]);
    useEffect(()=>{
        const fetchComments=async()=>{
            const {data}=await axios.get(`http://localhost:8000/api/comments/${videoId}`);
            setComments(data);
        }
        fetchComments();

    },[videoId])
  return (
    <Container>
        <NewComment>
        <Avatar src={user.img}/>
        <Input placeholder="add a comment..."/>
        </NewComment>
        {comments.map(comm=>(
            <Comment key={comm._id} comment={comm}/>
        ))}
    </Container>
  )
}

export default Comments
