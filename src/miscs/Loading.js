import styled from 'styled-components'
import React from 'react'
import LoadingGif from "./loading.gif"
import { useLoad } from "../context/MediaCtx";

const Loading = ({ withGhost, local }) => {
  const { loading } = useLoad()
  if(!loading && !local) return
  return (
    <Container withGhost={withGhost??false}>
      <img src={LoadingGif} alt='loading...' />
    </Container >
  )
}

export default Loading

const Container = styled.div`
    height:300px;
    display:flex;
    align-items:center;
    justify-content:center;
    ${props=>props.withGhost? 
    `
      position:absolute;
      top:0;
      left:0;
      z-index:10;
      height:100%;
      width:100%;
      background-color:rgba(255,255,255,0.4);
    `
    : `
    
    `}
    img{
      width:100px;
    }
`