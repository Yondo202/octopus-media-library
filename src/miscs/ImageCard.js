import React from "react";
import Svg from "./svg";
import styled from "styled-components";
import { fileTypes } from "./enums";
import { download } from "./UploadFunc";

const ImageCard = ({ setImage, handleEdit, data, dragable }) => {

  return (
    <Container {...dragable}>
      <a className="edit download" download={data.title} href={data.url} target="_blank">
        <Svg name="download" size="20px" />
      </a>

      <div className="edit" onClick={() => handleEdit(data)}>
        <Svg name="edit" size="16px" />
      </div>

      <div onClick={() => data.type === fileTypes.file? download(data) : setImage?.(data)} className="ghost">
        <div className="image_sector">
          {data.type === fileTypes.file ? (
            <div className="file_type">
               <Svg name={data.ext} size="2rem"/>
            </div>
          ) : (
            <div className="box">
              <img src={data.url} alt="img" />
            </div>
          )}
        </div>
        <div className="info_sector">
          <div className="name one_line">{data.title}</div>
          <div className="file_size">{data.ext}</div>
        </div>
      </div>
    </Container>
  );
};

export default ImageCard;

const Container = styled.div`
  user-select: none;
  cursor: pointer;
  grid-column: span 3 / auto;
  width: calc((100% - 45px) / 4);
  position: relative;
  transition: all 0.2s ease;
  .edit {
    position: absolute;
    display: none;
    top: 5px;
    right: 10px;
    z-index: 2;
    border: 1px solid ${(props) => props.theme.sectionBorderColor};
    border-radius: 4px;
    background: ${(props) => props.theme.boxBackground};
    padding: 5px;
    svg {
      border: none;
      path {
        border: none;
      }
    }
    &:hover{
      background: ${(props) => props.theme.bodyBackground};
    }
  }
  .download{
    right:auto;
    left:10px;
  }
  &:hover {
    .edit {
      display: block;
    }
  }
  .ghost {
    display: flex;
    flex-direction: column;
    background: ${(props) => props.theme.boxBackground};
    border-radius: 4px;
    border: 1px ${(props) => props.theme.sectionBorderColor};
    box-shadow: rgba(33, 33, 52, 0.1) 0px 1px 4px;
    height: 100%;
    .image_sector {
      align-items: center;
      display: flex;
      justify-content: center;
      flex:1;
      .file_type{
         width:100%;
         height:100%;
         aspect-ratio: 16 / 9;
         background: ${(props) => props.theme.bodyBackground};
         align-items: center;
         display: flex;
         justify-content: center;
      }
      .box {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        width: 100%;
        aspect-ratio: 16 / 9;
        background: repeating-conic-gradient(
            ${(props) => props.theme.sectionBorderColor} 0%,
            ${(props) => props.theme.sectionBorderColor} 25%,
            transparent 0%,
            transparent 50%
          )
          50% center / 20px 20px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        img {
          margin: 0px;
          padding: 0px;
          height: 100%;
          width: 100%;
          border-radius: 4px 4px 0 0;
          object-fit: contain;
          user-drag: none;
        }
      }
    }
    .info_sector {
      padding: 12px 15px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-between;
      background: ${(props) => props.theme.boxBackground};
      height: auto;
      width: auto;
      .name {
        font-weight: 500;
        padding-bottom: 5px;
        color: ${(props) => props.theme.textColor};
        max-width: 100%;
      }
      .file_size {
        color: ${(props) => props.theme.lightTextColor};
      }
    }
  }
`;
