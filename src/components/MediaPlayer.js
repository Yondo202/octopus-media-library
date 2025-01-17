import React from "react";
import styled from "styled-components";

const MediaPlayer = ({ data, setImage }) => {
  return (
    <Container className="image_box" onClick={()=>setImage(data)}>
      <video
        width="100%"
        height="100%"
        playsInline
        poster={data.image}
      >
        <source src={data.url} type="video/mp4" />
      </video>
      <div className="tagSvg"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m417.63-327.522 215.848-139.804q7.957-5.564 7.957-14.717t-7.957-14.631L417.63-636.478q-8.956-5.718-17.532-.62t-8.576 15.294v279.608q0 10.196 8.576 15.294 8.576 5.098 17.532-.62Zm-275.478 173.5q-27.599 0-47.865-20.265-20.265-20.266-20.265-47.865v-515.696q0-27.697 20.265-48.033 20.266-20.337 47.865-20.337h675.696q27.697 0 48.033 20.337 20.337 20.336 20.337 48.033v515.696q0 27.599-20.337 47.865-20.336 20.265-48.033 20.265H142.152Z"/></svg></div>
    </Container>
  );
};

export default MediaPlayer;


const Container = styled.div`
    position:relative;
    video{
        border-radius:10px;
    }
    .tagSvg{
        position:absolute;
        top:10px;
        left:10px;
        svg{
            color:#fff;
            fill:#fff;
            width:25px;
            height:25px;
        }
    }
`