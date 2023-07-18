import React, { useState } from "react";
import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "./MainWrapper"
import axios from "axios";
import Svg from '../miscs/svg'
import { config } from "../miscs/config";
import { useLoad } from "../context/MediaCtx";

export const UploadFinal = ({ setFocus, focus, page, setImage }) => {
    const [success, setSuccess] = useState({ data: null, success: false })
    const { useLoading, webId, jwt, mainUrl } = useLoad()

    const handleEdit = (data) => {
        setFocus({ type: 'detail', data: { _source: data } })
    }

    const handleSubmit = async () => {
        let formData = new FormData()
        formData.append("file", focus.data.file)
        formData.append("title", focus.data.name)
        formData.append("alt", focus.data.name)
        formData.append("webId", webId)

        const token = { headers: { "content-type": "multipart/form-data", Authorization: `Bearer ${jwt}`, } }
        useLoading(true)
        try {
            const res = await axios.post(`${mainUrl}/image/upload`, formData, token)
            // messageAlert("Амжилттай хадгалагдлаа");
            // console.log(res)
            if (res.data.data) {
                if (page) {
                    setFocus({ _uploaded_back: true })
                } else {
                    setSuccess({ data: res.data.data, success: true })
                }
            } else {
                setFocus({ _uploaded_back: true })
            }

        } catch (err) {
            console.log(err)
            // messageAlert(err)
        } finally {
            useLoading(false)
        }
    }


    return (
        <ContainerFinal className="main">
            <div className="new_assets">
                <div className="top">
                    {/* <h5>{images.length} {images.length == 1 && images.length > 1 ? "asset ready to upload" : "assets ready to upload"}</h5> */}
                    {/* <PrimaryButton onClick={() => setIsUploadMode(true)}>Add new assets</PrimaryButton> */}
                </div>
                {/* <div className="input-wrap">
                    <label>Хавтас сонгох</label>
                    <select>
                        <option selected>Media Library</option>
                    </select>
                </div> */}
                <div className="files">
                    <div className='img_cards' >
                        {success.success ? <div className="edit block" >
                            <Svg name="check" color="limegreen" size="24px" />
                        </div>:
                        <div className="edit" onClick={() => handleEdit(focus.data)}>
                            <Svg name="edit" size="16px" />
                        </div> }
                        <article className='ghost'>
                            <div className='image_sector'>
                                <div className='box'>
                                    <img src={focus.data.url} alt='img' />
                                </div>
                            </div>
                            {/* ynzlana */}
                            <div className='info_sector'>
                                <div className='info'>
                                    <div className='name'>{focus.data.name}</div>
                                    <div className='file_size'>{focus.data.type}</div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            <div className="footer">
                <SecondaryButton onClick={() => setFocus({ _back: true })}>Цуцлах</SecondaryButton>
                {
                    success.success
                        ? <PrimaryButton onClick={() => setImage({ _id:success.data, _source:{ url: success.data } })}>Дуусгах</PrimaryButton>
                        : <PrimaryButton onClick={() => handleSubmit()}>Хавсаргах</PrimaryButton>
                }
            </div>
        </ContainerFinal>
    )
}

const ContainerFinal = styled.div`
    .new_assets{
        height: calc(100% - 139px);
        overflow-y: auto;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        .top{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            h5{
                color: ${props => props.theme.textColor};
                font-size: 14px;

            }
        }
        .input-wrap{
            width: 100%;
            input, select{
                width: 100%;
                border-radius: 4px;
                border: 1px solid ${props => props.theme.borderColor};
                margin-top:8px;
                &:focus{
                    outline: none;
                }
            }
            label{
                color:${props => props.theme.textColor};
                font-weight:600;
            }
        }
        .files{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            .img_cards{
                cursor:pointer;
                grid-column: span 3 / auto;
                width: calc((100% - 45px) / 4);
                position:relative;
                .edit{
                    position: absolute;
                    display:none;
                    top: 5px;
                    right: 10px;
                    z-index: 2;
                    border: 1px solid ${props => props.theme.borderColor};
                    border-radius: 4px;
                    background: white;
                    padding: 5px;
                    svg{
                        border: none;
                        path{
                            border: none;
                        }
                    }
                }
                .block{
                    padding: 3px;
                    display:block;
                }
                &:hover{
                    .edit{
                        display:block;
                    }
                }
                
                .ghost{
                    background: rgb(255, 255, 255);
                    border-radius: 4px;
                    border: 1px ${props => props.theme.borderColor};
                    box-shadow: rgba(33, 33, 52, 0.1) 0px 1px 4px;
                    height: 100%;
                    .image_sector{
                        position:relative;
                        -webkit-box-align: center;
                        align-items: center;
                        display: flex;
                        flex-direction: row;
                        -webkit-box-pack: center;
                        justify-content: center;
                        .box{
                            display: flex;
                            -webkit-box-pack: center;
                            justify-content: center;
                            height: 10.25rem;
                            width: 100%;
                            background: repeating-conic-gradient(rgb(246, 246, 249) 0%, rgb(246, 246, 249) 25%, transparent 0%, transparent 50%) 50% center / 20px 20px;
                            border-top-left-radius: 4px;
                            border-top-right-radius: 4px;
                            img{
                                margin: 0px;
                                padding: 0px;
                                height: 100%;
                                width: 100%;
                                border-radius: 4px 4px 0 0;
                                object-fit: contain;
                            }
                        }
                    }
                    .info_sector{
                        padding: 9px 12px;
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        background: white;
                        .info{
                            max-width:100%;
                            .name{
                                font-weight:500;
                                padding-bottom:5px;
                                color: ${props => props.theme.textColor};
                                width : 90%;
                                overflow:hidden;
                                display:inline-block;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .file_size{
                                color: ${props => props.theme.lightTextColor};
                            }
                        }
                        .tag_info{
                            font-weight:600;
                            background-color: white;
                            padding:5px 9px;
                            border-radius:4px;
                            color: ${props => props.theme.lightTextColor};
                            font-size:12px;
                        }
                    }
                }
            }
        }
    }
`

const MediaUpload = ({ setFocus }) => {
    const selectImage = async (file) => {
        let imageUrl = URL.createObjectURL(file)
        const reader = new FileReader()
        reader.readAsBinaryString(file)
        reader.onload = function () {
            const string = btoa(reader.result)
            let data = { file: file, url: imageUrl, base64: string, name: file.name, type: file.type, size: file.size, alt: '' }
            setFocus({ type: 'finalupload', data: data })
            // setImages([{ url: imageUrl, base64: string, name: file.name, type: file.type, size: file.size, alt: '' }])
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
                            id="file-input"
                            key={Math.random()}
                            className="file-input__input"
                            onChange={(e) => selectImage(e.target.files[0])}
                        />
                        <label className="file-input__label" htmlFor="file-input">
                            <Svg name="add" color={config.mainColor} />
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
    )
}

export default MediaUpload

const Container = styled.div`
    .main{
        .title{
            width: 100%;
            border-radius: 4px 4px 0px 0px;
            border-bottom: 1px solid ${props => props.theme.borderColor};
            background: ${props => props.theme.gray};
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                color: ${props => props.theme.textColor};
                font-size: 13px;
                font-weight: 700;
            }
            .close{
                border: 1px solid ${props => props.theme.borderColor};
                background: white;
                padding: 8px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                svg{
                    width: 12px;
                    heihgt: 12px;
                }
            }
        }
       
        .upload_wrap{
            border: 1px dashed ${props => props.theme.borderColor};
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
                    color: ${props => props.theme.textColor};
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
`