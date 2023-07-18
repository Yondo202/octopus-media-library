import React from "react";
import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "./MainWrapper"


const Detail = ({ focus, setFocus }) => {
    console.log("#file detail ")
    const saveClick = () => {
        setFocus({ type:'upload', data:focus.data })
    }

    return (
        <Container >
            <div className="main">
                <div className="main-detail">
                    <div className="left">
                        <article className='ghost'>
                            <div className='image_sector'>
                                <div className='box'>
                                    <img src={focus.data?._source.url} alt='img' />
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="right">
                        <div className="input-wrap">
                            <label>Файлын нэр</label>
                            <input type="text" defaultValue={focus.data?._source?.name} />
                        </div>
                        <div className="input-wrap">
                            <label>Файл устгагдсан үед харагдах текст</label>
                            <input type="text" defaultValue={focus.data?._source?.alt || focus.data?._source?.name} />
                        </div>
                        <div className="input-wrap">
                            <label>Файлын байршил</label>
                            <select>
                                <option selected>Media Library</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <SecondaryButton onClick={()=>setFocus({_back:true})}>Цуцлах</SecondaryButton>
                <PrimaryButton onClick={()=>saveClick()}>Хадгалах</PrimaryButton>
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
                    height: 100%;
                    width: 100%;
                    .box{
                        display: flex;
                        -webkit-box-pack: center;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
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
                input, select{
                    width: 100%;
                    border-radius: 4px;
                    border: 1px solid ${props => props.theme.borderColor};
                    margin-top:8px;
                    padding: 15px 20px;
                    &:focus{
                        outline: none;
                    }
                }
                label{
                    color:${props => props.theme.textColor};
                    font-weight:600;
                }
            }
        }
    }
`