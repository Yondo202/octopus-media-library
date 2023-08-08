import React, { useState } from "react";
import styled from "styled-components";
import Svg from "../miscs/svg";
import { SecondaryButton } from "./MainWrapper";
import { useLoad } from '../context/MediaCtx';
import FileImg from "../miscs/img/image.png"
import axios from "axios";
import ImageCard from "../miscs/ImageCard";
import { InsertImage, UploadImage, acceptedImageTypes } from '../miscs/UploadFunc';
// import Pagination from "./Pagination"; // footer baigaa

const initial = { active: false, loading: false };

const Grid = ({ setFocus, setImage, media, handleFolder, editFolder, fetchBody }) => {
  const { useLoading, webId, jwt, mainUrl } = useLoad();
  const dragImage = React.useRef()
  const [dragAsset, setDragAsset] = useState(initial);
  const [ dragDirect, setDragDirect ] = useState(false)
  // const [ ]
  const handleEdit = (data) => {
    setFocus({ type: "detail", data: data });
  };

  React.useEffect(() => {
    const img = document.createElement('img')
    img.src = FileImg
    dragImage.current = img
  }, [])

  const selectImage = async (file) => {
    try{
      const { data } = await InsertImage(file)
      const { data: uploadedData } = await UploadImage({ focus:{ data:data }, fetchBody, mainUrl, jwt, webId, useLoading })
      setFocus({ _uploaded_back: true });
      return uploadedData
    }finally{
      console.log("finish anyway")
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragAsset(initial);
    const { files } = event.dataTransfer;
    if (files.length > 0) {
      selectImage(files[0])
      // if(files.length === 1){
      //   selectImage(files[0])
      // }else{
      //   Object.keys(files).forEach(element => {
      //       if(acceptedImageTypes.includes(files[element].type)){
      //         let data = selectImage( files[element])
      //         console.log(data)
      //       }
      //   });
      // }
    }
  };

  const onDragEnter = (event) => {
    event.preventDefault();
    setDragAsset({active:true});
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setDragAsset(initial);
  };

  const reset = (force) =>{
    const el2 = document.querySelectorAll(`.folder_card`)
    el2.forEach(item=>{
      item.style.border = "1px solid white"
      item.style.opacity = "0.7"
      item.style.transform = "scale(1)"
      if(force){
        item.style.opacity = "1"
      }
    })
  }

  const FolderDragEnter = (ev, id) =>{
    ev.preventDefault();
    reset()
    const el  = document.querySelector(`.folder_card${id}`)
    el.style.border = "1px solid blue"
    el.style.opacity = "1"
    el.style.transform = "scale(1.057)"
  }

  const FolderDragLeave = (ev) =>{
    if (ev.currentTarget.contains(ev.relatedTarget)) return;
    reset(true)
  }

  const handleDragStart = (event, data) => {
    setDragDirect(true);
    event.dataTransfer.setDragImage(dragImage.current, 0, 0)
    event.dataTransfer.setData('data', JSON.stringify(data))
    event.target.style.transform = "scale(0.7)"
    event.target.style.opacity = "0.7"
  }

  const dragOver = (event) =>{
    setDragDirect(false);
    event.target.style.transform = "scale(1)"
    event.target.style.opacity = "1"
    reset(true)
  }

  const handleSubmit = async (props) => {
    useLoading(true)
    const token = { headers: { Authorization: `Bearer ${jwt}`, webId: webId} }
    try {
      await axios.put(`${mainUrl}/image/moveImage`, props, token);
      setFocus({ _uploaded_back:true })
    }catch(err){
      window.alert('Хүсэлт амжилтгүй');
    }finally {
      useLoading(false)
    }
  }

  const FolderDragDrop = (e, data) => {
    e.preventDefault()
    const imgData = JSON.parse(e.dataTransfer.getData('data'))
    handleSubmit({ _id:imgData._id, toPaths: [ ...fetchBody.paths, { path:data.key, order: fetchBody.paths.length + 1 } ] })
  }

  // console.log(fetchBody)

  const MainEnter = (e) => {
    e.preventDefault();
    if(dragDirect){
      window.open("#section2", "_self").scrollTo(100, 0)
    }else{
      window.open("#section1", "_self")
    }
  }

  // const MainDragLeave = (ev) =>{
  //   if (ev.currentTarget.contains(ev.relatedTarget)) return;
  //   setDragDirect(false)
  // }

  return (
    <Container 
      onDragEnter={MainEnter} 
      onDragOver={e => e.preventDefault()} 
      // onDragLeave={MainDragLeave}
    >
      {media?.folders?.data?.length > 0 && (
        <div id="section2" className="folder-wrap">
          <h5>Хавтас ({media?.folders?.data?.length})</h5>
          <div className="folders">
            {media?.folders?.data?.map((data, i) => (
              <div 
                onDragLeave={FolderDragLeave}
                // onDragOver={()=>reset()}
                onDrop={e=> FolderDragDrop(e, data)}
                onDragOver={e => e.preventDefault()}
                onDragEnter={e=>FolderDragEnter(e, i)}
                className={`folder_card folder_card${i}`} 
                key={i}
               >
                <button onClick={() => handleFolder(data)} className="icon">
                  <Svg name="folder" color="#6CB7F1" size="24px" />
                </button>
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
        <div
          id="section1"
          className={`assets ${dragAsset.active&&`active_asset`}`}
          onDragLeave={onDragLeave}
          onDrop={handleDrop}
          onDragOver={e =>( e.preventDefault())}
          onDragEnter={onDragEnter}
        >
          <h5>Зураг ({fetchBody.pagination.total})</h5>
          <div  className="files">
            {media?.images?.data?.map((data, i) => (
              <ImageCard
                key={i}
                data={{ _id: data._id, ...data._source }}
                setImage={setImage}
                handleEdit={handleEdit}
                dragable={{
                  draggable:true,
                  onDragStart:e=>handleDragStart(e, data),
                  onDragEnd:dragOver
                }}
              />
            ))} 
          </div>
        </div>
      )}
      
      <EmptyComponent
          dragProps={{
            className:`assets ${dragAsset.active&&`active_asset`}`,
            onDragLeave:onDragLeave,
            onDrop:handleDrop,
            onDragOver:e => e.preventDefault(),
            onDragEnter:onDragEnter
          }}
          media={media}
          setFocus={setFocus}
      />
    </Container>
  );
};

export default Grid;

const Container = styled.div`
  width: 100%;
  .active_asset{
    border: 2px solid ${(props) => props.theme.mainColor};
    border-radius: 8px;
  }
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
  .active_asset{
    border: 2px solid ${(props) => props.theme.mainColor};
    border-radius: 8px;
    .files{
      opacity:0.5;
    }
  }
  .folder-wrap {
    scroll-top:20px;
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
        transition: all 0.2s ease;
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
        gap: 12px;
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
          padding: 5px 8px;
          border-radius: 4px;
          border: none;
        }
        .info {
          width: 100%;
          h5 {
            margin: 0;
            color: ${(props) => props.theme.textColor};
            font-size: 13px;
          }
          p {
            color: ${(props) => props.theme.lightTextColor};
            font-size: 11px;
            margin-top: 3px;
          }
        }
      }
    }
  }
  
`;

export const EmptyComponent = ({ media, setFocus, dragProps }) =>{
  console.log(dragProps, "props")
  if(media?.images?.data?.length === 0 && media?.images?.data?.length === 0){
    return(
      <EmptyStyle {...dragProps}>
        <h5>Мэдээлэл алга байна...</h5>
        <SecondaryButton
          onClick={() => setFocus({ type: "upload", data: {} })}
        >
          <Svg name="add" /> Шинэ файл нэмэх
        </SecondaryButton>
      </EmptyStyle>
    )
  }else{
    return null
  }
}

export const EmptyStyle = styled.div`
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
`
