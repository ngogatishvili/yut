import React,{useEffect, useState} from 'react'
import styled from "styled-components";
import {ThumbDownAltOutlined, ThumbUpAltOutlined,Reply,AddTask, ThumbUp, ThumbDown} from "@mui/icons-material"
import logo from "../img/photo.png";
import Comments from '../components/Comments';
import { Card } from '../components/Card';
import {useSelector,useDispatch} from "react-redux"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislikeVideo, fetchSuccess, likeVideo } from '../redux/videoSlice';
import {format} from "timeago.js"
import { subscription } from '../redux/userSlice';
import { current } from '@reduxjs/toolkit';


const Container=styled.div`
  display:flex;
  gap:24px;
`

const Content=styled.div`
  flex:5;
`

const VideoWrapper=styled.div``

const Title=styled.h1`
  font-size:18px;
  font-weight:400;
  margin-top:20px;
  margin-bottom:10px;
  color:${({theme})=>theme.text}
`

const Details=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`

const Info=styled.span`
  color:${({theme})=>theme.textSoft}
`

const Buttons=styled.div`
  display:flex;
  gap:20px;
  color:${({theme})=>theme.text}
`

const Button=styled.div`
  display:flex;
  align-items;center;
  gap:5px;
  cursor:pointer;
`

const Hr=styled.hr`
  border:0.5px solid ${({theme})=>theme.soft};
  margin:15px 0;
`

const Channel=styled.div`
  display:flex;
  justify-content:space-between;

`

const ChannelInfo=styled.div`
  display:flex;
`

const ChannelImg=styled.img`
  width:50px;
  height:50px;
  border-radius:50%;
`

const ChannelDetails=styled.div`
  display:flex;
  flex-direction:column;
  color:${({theme})=>theme.text}
`
const ChannelName=styled.span`
font-weight:500;
`
const ChannelCounter=styled.span`
font-size:12px;
margin-top:5px;
margin-bottom:20px;
color:${({theme})=>theme.textSoft}
`
const Description=styled.p`
font-size:14px;
`;
const Subscribe=styled.button`
  background:#cc1a00;
  font-weight:500;
  color:#fff;
  border:none;
  border-radius:3px;
  cursor:pointer;
  height:max-content;
  padding:10px 20px;
`

const Recommendation=styled.div`
  flex:2;
`

const VideoFrame=styled.video`
  max-height:720px;
  width:100%;
  object-fit:cover;
`

export const Video = () => {
  const location=useLocation();
  const path=location.pathname.split("/")[2];

  const {user}=useSelector(store=>store.user);
  const {currentVideo}=useSelector(store=>store.video);
  const dispatch=useDispatch();
  


  const [channel,setChannel]=useState({})

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const {data:videoInfo}=await axios.get(`http://localhost:8000/api/videos/find/${path}`);
        const  {data:channelInfo}=await axios.get(`http://localhost:8000/api/users/find/${videoInfo.userId}`);
        setChannel(channelInfo)
        dispatch(fetchSuccess(videoInfo));
        
      }catch(err) {

      }
    }
    fetchData();
  },[path,dispatch])

  const handleLike=async()=>{
     await axios.put(`http://localhost:8000/api/users/like/${currentVideo._id}`,null,{withCredentials:true})
     dispatch(likeVideo(user._id))

  }

  const handleDislike=async()=>{
      await axios.put(`http://localhost:8000/api/users/unlike/${currentVideo._id}`,null,{withCredentials:true})
      dispatch(dislikeVideo(user._id))
  }

  const handleSubscribe=async()=>{
    const subUnSub=user.subscribedUsers.includes(channel._id)?`http://localhost:8000/api/users/unsubscribe/${channel._id}`:
    `http://localhost:8000/api/users/subscribe/${channel._id}`;
     await axios.put(subUnSub,null,{withCredentials:true})
     dispatch(subscription(channel._id));
  }
  return (
    <Container>
      <Content>
        <VideoWrapper>
        <VideoFrame src={currentVideo.videoUrl}/>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views * {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
            {currentVideo.likes.includes(user._id)? <ThumbUp/> : <ThumbUpAltOutlined/>}   {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes.includes(user._id)? <ThumbDown/>:<ThumbDownAltOutlined/>} Dislike 
            </Button>
            <Button>
              <Reply/> Share
            </Button>
            <Button>
              <AddTask/> Save
            </Button>
          </Buttons>
        </Details>
        <Hr/>
          <Channel>
            <ChannelInfo>
              <ChannelImg src={channel.img}/>
              <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo.description}</Description>
              </ChannelDetails>
             
            </ChannelInfo>
            <Subscribe onClick={handleSubscribe}>{user.subscribedUsers.includes(channel._id)? "SUBSCRIBED":"SUBSCRIBE"}</Subscribe>
          </Channel>
          <Hr/>
          <Comments videoId={currentVideo._id}/>
        </VideoWrapper>
      </Content>
      <Recommendation>
       
      </Recommendation>
    </Container>
  )
}
