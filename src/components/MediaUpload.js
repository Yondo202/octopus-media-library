import React, { useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton, PrimaryButton } from './MainWrapper';
import axios from 'axios';
import ImageCard from '../miscs/ImageCard';
import Svg from '../miscs/svg';
import { useLoad } from '../context/MediaCtx';
import RouteHead from '../miscs/RouteHead';

export const UploadFinal = ({ setFocus, focus, page, setImage, fetchBody }) => {
   const [success, setSuccess] = useState({ data: null, success: false });
   const { useLoading, webId, jwt, mainUrl } = useLoad();

   const handleEdit = (data) => {
      setFocus({ type: 'detail', data: data });
   };

   const handleSubmit = async () => {
      useLoading(true);
      let formData = new FormData();
      formData.append('file', focus.data.file);
      formData.append('type', focus.data.type);
      formData.append('title', focus.data.title);
      formData.append('alt', focus.data.alt);
      if (fetchBody.paths?.length > 0) {
         formData.append('paths', JSON.stringify(fetchBody.paths));
      }

      const token = { headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${jwt}`, webId: webId } };

      try {
         const res = await axios.post(`${mainUrl}/image/upload`, formData, token);
         // messageAlert("Амжилттай хадгалагдлаа");
         // console.log(res)
         if (res.data.data) {
            if (page) {
               setFocus({ _uploaded_back: true });
            } else {
               setSuccess({ data: res.data.data, success: true });
            }
         } else {
            setFocus({ _uploaded_back: true });
         }
      } finally {
         useLoading(false);
      }
   };

   return (
      <ContainerFinal className="main">
         <div className="new_assets">
            <RouteHead fetchBody={fetchBody} />
            <div className={`files ${success.success ? `files_success`:``} `}>
               <ImageCard data={focus.data} handleEdit={handleEdit} />
               {success.success && <div className='aftersuccess'>
                  <span>Амжилттай </span> <Svg name="check" color="limegreen" size="22px" />
               </div>}
            </div>
         </div>

         <div className="footer">
            <SecondaryButton onClick={() => setFocus({ _back: true })}>Цуцлах</SecondaryButton>
            {success.success ? (
               <PrimaryButton onClick={() => setImage({ _id: success.data._id, ...success.data._source })}>Дуусгах</PrimaryButton>
            ) : (
               <PrimaryButton onClick={() => handleSubmit()}>Хавсаргах</PrimaryButton>
            )}
         </div>
      </ContainerFinal>
   );
};


const MediaUpload = ({ setFocus }) => {
   const selectImage = async (file) => {
      let filEname = file.name?.slice(0, file.name?.lastIndexOf('.'));
      const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png']; //'image/svg+xml' -- server error ogj baigaa

      if (!acceptedImageTypes.includes(file.type)) {
         window.alert('Зөвхөн зураг хавсаргах боломжтой');
      } else {
         let imageUrl = URL.createObjectURL(file);
         const reader = new FileReader();
         reader.readAsBinaryString(file);
         reader.onload = function () {
            const string = btoa(reader.result);
            let data = { ...file, file: file, type: file.type, url: imageUrl, base64: string, alt: filEname, name: filEname, title:filEname };
            setFocus({ type: 'finalupload', data: data });
         };
      }
   };

   return (
      <Container>
         <div className="main">
            <div className="upload_wrap">
               <div className="file-input">
                  <input
                     type="file"
                     name="filename"
                     accept="image/*"
                     id="file-input"
                     key={Math.random()}
                     className="file-input__input"
                     onChange={(e) => selectImage(e.target.files[0])}
                  />
                  <label className="file-input__label" htmlFor="file-input">
                     <Svg name="add" />
                     <span>Файл оруулах</span>
                  </label>
               </div>
            </div>
         </div>
         <div className="footer">
            <SecondaryButton onClick={() => setFocus({ _back: true })}>Цуцлах</SecondaryButton>
         </div>
         {/* {detail && <Detail convertFile={convertFile} setImages={setImages} detailInfo={detailInfo} setDetail={setDetail} />} */}
      </Container>
   );
};

export default MediaUpload;


const ContainerFinal = styled.div`
   .new_assets {
      height: calc(100% - 139px);
      overflow-y: auto;
      padding: 30px;
      display: flex;
      flex-direction: column;
      gap: 30px;
      .top {
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         h5 {
            color: ${(props) => props.theme.textColor};
            font-size: 14px;
         }
      }
      .input-wrap {
         width: 100%;
         input,
         select {
            width: 100%;
            border-radius: 4px;
            border: 1px solid ${(props) => props.theme.sectionBorderColor};
            margin-top: 8px;
            &:focus {
               outline: none;
            }
         }
         label {
            color: ${(props) => props.theme.textColor};
            font-weight: 600;
         }
      }
      .files {
         width: 100%;
         display: flex;
         flex-wrap: wrap;
         gap: 15px;
         position:relative;
         justify-content:space-between;
         .aftersuccess{
            display:flex;
            position:absolute;
            top:-20px;
            right:12px;
            background: ${(props) => props.theme.gray};
            z-index:2;
            padding:5px 15px;
            font-weight:500;
            border-radius:5px;
            align-items:center;
            gap:10px;
            transform:scale(0);
         }

      }
      .files_success{
         border:1px solid green;
         .aftersuccess{
            transform:scale(1);
         }
      }
   }
`;

const Container = styled.div`
   .main {
      .title {
         width: 100%;
         border-radius: 4px 4px 0px 0px;
         border-bottom: 1px solid ${(props) => props.theme.sectionBorderColor};
         background: ${(props) => props.theme.gray};
         padding: 16px 20px;
         display: flex;
         justify-content: space-between;
         align-items: center;
         .text {
            color: ${(props) => props.theme.textColor};
            font-size: 13px;
            font-weight: 700;
         }
         .close {
            border: 1px solid ${(props) => props.theme.sectionBorderColor};
            background: ${(props) => props.theme.boxBackground};
            padding: 8px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            svg {
               width: 12px;
               heihgt: 12px;
            }
         }
      }

      .upload_wrap {
         border: 1px dashed ${(props) => props.theme.sectionBorderColor};
         border-radius: 4px;
         margin-top: 15px;
         display: flex;
         justify-content: center;
         align-items: center;
         flex-direction: column;
         margin: 24px 40px;
         // height: 100%;
         height: 22.25rem;
         .file-input {
            width: 100%;
            height: 100%;
            .file-input__input {
               width: 0.1px;
               height: 0.1px;
               opacity: 0;
               overflow: hidden;
               position: absolute;
               z-index: -1;
            }
            .file-input__label {
               cursor: pointer;
               display: flex;
               gap: 15px;
               align-items: center;
               justify-content: center;
               flex-direction: column;
               font-size: 12px;
               color: ${(props) => props.theme.textColor};
               font-weight: 700;
               width: 100%;
               height: 100%;
            }
            .file-input__label svg {
               height: 25px;
            }
         }
      }
   }
`;
