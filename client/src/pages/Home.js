import axios from "axios"
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Card } from '../components/Card'


const Container=styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;
`



export const Home = ({type}) => {

  const [videos,setVideos]=useState([])

  useEffect(()=>{
    const fetchVideos=async()=>{
      const {data}=await axios.get(`http://localhost:8000/api/videos/${type}`,{withCredentials:true});
      setVideos(data);
    }
    fetchVideos();
  },[type])
  
  return (
    <Container>
      
        {
          videos.map(video=>(
            <Card key={video._id} video={video}/>
          ))
        }
       
    </Container>
  )
}
