import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import RouteHead from "../miscs/RouteHead";
import { PrimaryButton } from "./MainWrapper"
import { useLoad } from "../context/MediaCtx";

const Detail = ({ focus, setFocus, fetchBody }) => {
    const [ image, setImage ] = useState({ title:"", alt:"" })
    const { useLoading, webId, jwt, mainUrl } = useLoad()

    useEffect(() =>{
        if(focus.data?.url){ setImage(focus.data) }
    },[focus.data?.url])

    const handleSubmit = async ( props, status ) => {
        if(!props._id){
            setFocus({ type: 'finalupload', data: image });
        }else{
            const token = { headers: { Authorization: `Bearer ${jwt}`, webId: webId} }
            useLoading(true)
            try {
                if(status === 'delete'){
                    await axios({ url:`${mainUrl}/image/deleteImage`, method:'delete', data:{ _id: props._id }, headers: token.headers })
                }else{
                    await axios.put(`${mainUrl}/image/updateImage`, props, token);
                }
                setFocus({ _uploaded_back:true })
            } finally {
                useLoading(false)
            }
        }
    }

    const onChange = (e) => {
        setImage(prev=>({ ...prev, [e.target.name]:e.target.value }))
    }

    return (
        <Container>
            <div className="main">
                <div className="main-detail">
                    <div className="left">
                        <article className='ghost'>
                            <div className='image_sector'>
                                <div className='box'>
                                    <img src={image.url} alt='img' />
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="right">
                        <div className="input-wrap">
                            <div className="custom">Файлын нэр</div>
                            <input onChange={onChange} type="text" required name="title" value={image.title} />
                        </div>
                        <div className="input-wrap">
                            <div className="custom">Файл устгагдсан үед харагдах текст</div>
                            <input onChange={onChange} type="text" value={image.alt} name="alt" required />
                        </div>
                        <div className="input-wrap">
                            <div className="custom">Файлын байршил</div>
                            <RouteHead fetchBody={fetchBody}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                {/* <SecondaryButton onClick={()=>setFocus({_back:true})}>Цуцлах</SecondaryButton> */}
                <PrimaryButton danger onClick={()=>handleSubmit(image, "delete")}>Зураг устгах</PrimaryButton>
                <PrimaryButton  onClick={()=>handleSubmit(image)}>Хадгалах</PrimaryButton>
            </div>
        </Container>
    )
}

export default Detail

const Container = styled.div`
    .main-detail{
        display: flex;
        width: 100%;
        gap: 30px;
        padding: 30px;
        height: 400px;
        .left{
            width: 50%;
            heihgt: 100%;
            .ghost{
                background: ${props => props.theme.boxBackground};
                border-radius: 4px;
                border: 1px ${props => props.theme.sectionBorderColor};
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
                    height: 100%;
                    width: 100%;
                    .box{
                        display: flex;
                        -webkit-box-pack: center;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                        background: repeating-conic-gradient(${props=> props.theme.sectionBorderColor} 0%, ${props=> props.theme.sectionBorderColor} 25%, transparent 0%, transparent 50%) 50% center / 20px 20px;
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
                        .ReactCrop{
                            width: 100%;
                            height: 100%;
                            .ReactCrop__child-wrapper{
                                width: 100%;
                            height: 100%;
                            }
                        }
                    }
                }
            }
        }
        .right{
            width: 50%;
            display: flex;
            flex-direction: column;
            gap: 30px;
            .input-wrap{
                width: 100%;
                .custom{
                    margin-bottom:8px;
                    color:${props => props.theme.textColor};
                    font-weight:600;
                }
                input, select{
                    width: 100%;
                    border-radius: 4px;
                    border: 1px solid ${props => props.theme.sectionBorderColor};
                    padding: 15px 20px;
                    background: ${props => props.theme.boxBackground};
                    color: ${props => props.theme.textColor};
                    &:focus{
                        outline: none;
                    }
                }
                
            }
        }
    }
`