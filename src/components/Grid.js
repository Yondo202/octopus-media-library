import React from 'react';
import styled from 'styled-components';
import Svg from '../miscs/svg';
import { SecondaryButton } from './MainWrapper';
import ImageCard from '../miscs/ImageCard';
// import Pagination from "./Pagination"; // footer baigaa

const Grid = ({ setFocus, setImage, media, handleFolder, editFolder }) => {
   const handleEdit = (data) => {
      setFocus({ type: 'detail', data: data });
   };

   return (
      <Container>
         {media?.folders?.data?.length > 0 && (
            <div className="folder-wrap">
               <h5>Хавтас ({media?.folders?.data?.length})</h5>
               <div className="folders">
                  {media?.folders?.data?.map((data, i) => (
                     <div className="folder_card" key={i}>
                        <div onClick={() => handleFolder(data)} className="icon">
                           <Svg name="folder" color="#6CB7F1" size="24px" />
                        </div>
                        <div onClick={() => handleFolder(data)} className="info">
                           <h5>{data.key}</h5>
                           <p>{data.doc_count} файл</p>
                        </div>
                        <div className="edit" onClick={() => editFolder(data)}>
                           <Svg name="edit" size="18px" />
                        </div>
                     </div>
                  ))}
               </div>
               <div className="hr"></div>
            </div>
         )}

         {media?.images?.data?.length > 0 && (
            <div className="media-wrap">
               <div className="assets">
                  <h5>Зураг ({media.images?.data?.length})</h5>
                  <div className="files">
                     {media?.images?.data?.map((data, i) => <ImageCard key={i} data={{ _id:data._id, ...data._source }} setImage={setImage} handleEdit={handleEdit} />)}
                  </div>
               </div>
            </div>
         )}

         {media?.images?.data?.length === 0 && media?.images?.data?.length === 0 && (
            <div className="empty">
               <img src="/img/media/file.svg" alt="empty_svg" />
               <h5>Мэдээлэл алга байна...</h5>
               <SecondaryButton onClick={() => setFocus({ type: 'upload', data: {} })}>
                  <Svg name="add" /> Шинэ файл нэмэх
               </SecondaryButton>
            </div>
         )}
      </Container>
   );
};

export default Grid;

const Container = styled.div`
   width: 100%;
   .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 30px;
      p {
         font-size: 16px;
         color: ${(props) => props.theme.lightTextColor};
      }
   }
   .media-wrap {
      .assets {
         h5 {
            font-size: 16px;
            font-weight: 600;
            color: ${(props) => props.theme.textColor};
            margin-bottom: 15px;
         }
         .files {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
         }
      }
   }
   .folder-wrap {
      .hr {
         margin: 30px 0;
         background: ${(props) => props.theme.sectionBorderColor};
         height: 1px;
      }
      h5 {
         font-size: 16px;
         font-weight: 600;
         color: ${(props) => props.theme.textColor};
         margin-bottom: 15px;
      }
      .folders {
         width: 100%;
         display: flex;
         flex-wrap: wrap;
         gap: 15px;
         .folder_card {
            position: relative;
            cursor: pointer;
            grid-column: span 3 / auto;
            width: calc((100% - 45px) / 4);
            background: ${(props) => props.theme.boxBackground};
            box-shadow: rgba(33, 33, 52, 0.1) 0px 1px 4px;
            border: 1px solid ${(props) => props.theme.sectionBorderColor};
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding: 12px;
            gap: 8px;
            z-index: 2;
            .edit {
               position: absolute;
               display: none;
               top: 0px;
               right: 12px;
               transform: translate(0%, 50%);
               z-index: 3;
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
            .icon {
               width: fit-content;
               background: #eaf5ff;
               padding: 8px 12px;
               border-radius: 4px;
            }
            .info {
               width: 100%;
               h5 {
                  margin: 0;
                  color: ${(props) => props.theme.textColor};
                  font-size: 14px;
               }
               p {
                  color: ${(props) => props.theme.lightTextColor};
                  font-size: 12px;
                  margin-top: 3px;
               }
            }
         }
      }
   }
   .empty {
      background: ${(props) => props.theme.boxBackground};
      border-radius: 16px;
      width: 100%;
      padding: 40px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      img {
         width: 150px;
         height: 150px;
      }
      h5 {
         color: ${(props) => props.theme.lightTextColor};
         font-size: 16px;
      }
   }
`;
