import React from 'react';
import Svg from './svg';
import styled from 'styled-components';

const ImageCard = ({ setImage, handleEdit, data, dragable }) => {
   return (
      <Container {...dragable}>
         <div className="edit" onClick={() => handleEdit(data)}>
            <Svg name="edit" size="18px" />
         </div>
         <div onClick={() => setImage?.(data)} className="ghost">
            <div className="image_sector">
               <div className="box">
                  <img src={data.url} alt="img" />
               </div>
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
   user-select:none;
   cursor: pointer;
   grid-column: span 3 / auto;
   width: calc((100% - 45px) / 4);
   position: relative;
   transition:all 0.2s ease;
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
   }
   &:hover {
      .edit {
         display: block;
      }
   }
   .ghost {
      background: ${(props) => props.theme.boxBackground};
      border-radius: 4px;
      border: 1px ${(props) => props.theme.sectionBorderColor};
      box-shadow: rgba(33, 33, 52, 0.1) 0px 1px 4px;
      height: 100%;
      .image_sector {
         align-items: center;
         display: flex;
         justify-content: center;
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
