import React from "react";
import styled from "styled-components";
import Svg from '../miscs/svg'
import { SecondaryButton } from "./MainWrapper"
import { config } from "../miscs/config";
// import Pagination from "./Pagination"; // footer baigaa

const Grid = ({ setFocus, setImage, media, handleFolder }) => {

    const handleEdit = (data) => {
        setFocus({ type: 'detail', data: data })
    }

    const selectHandle = (data) => {
        setImage?.(data)
    }

    return (
        <Container>
            {media.folders?.length > 0 &&
                <div className="folder-wrap">
                    <h5>Хавтас ({media.folders.length})</h5>
                    <div className="folders">
                        {media.folders.map((data, i) => (
                            <div onClick={()=>handleFolder(data)} className='folder_card' key={i}>
                                <div className="icon">
                                    <Svg name="folder" color="#6CB7F1" size="24px" />
                                </div>
                                <div className='info'>
                                    <h5>{data.key}</h5>
                                    <p>{data.doc_count} файл</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="hr"></div>
                </div>
            }

            {media.images?.length > 0 &&
                <div className="media-wrap">
                    <div className="assets">
                        <h5>Зураг ({media.images.length})</h5>
                        <div className="files">
                            {media.images.map((data, i) => (
                                <div className='img_cards' key={i}>
                                    <div className="edit" onClick={() => handleEdit(data)}>
                                        <Svg name="edit" size="16px" />
                                    </div>
                                    <article onClick={() => selectHandle(data)} className='ghost'>
                                        <div className='image_sector'>
                                            <div className='box'>
                                                <img src={data._source.url} alt='img' />
                                            </div>
                                        </div>
                                        <div className='info_sector'>
                                            <div className='info'>
                                                <div className='name'>{data._source.title}</div>
                                                <div className='file_size'>{data._source.ext} - 600✕527</div>
                                            </div>
                                            <div className='tag_info'>
                                                {data._source.ext}
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
            {media?.length == 0 &&
                <div className="empty">
                    <img src="/img/media/file.svg" alt="empty_svg" />
                    <h5>Мэдээлэл алга байна...</h5>
                    <SecondaryButton onClick={() => setFocus({ type: 'upload', data: {} })}><Svg name="add" color={config.mainColor} /> Шинэ файл нэмэх</SecondaryButton>
                </div>
            }
        </Container>
    )
}

export default Grid

const Container = styled.div`
    width: 100%;
    .checkbox-wrap{
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 30px;
        p{
            font-size: 16px;
            color: ${props=> props.theme.lightTextColor};
        }
    }
    .media-wrap{
        .assets{
            h5{
                font-size: 16px;
                font-weight: 600;
                color: ${props=> props.theme.textColor};
                margin-bottom: 15px;
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
                    position: relative;
                    .edit{
                        position: absolute;
                        display:none;
                        top: 5px;
                        right: 10px;
                        z-index: 2;
                        border: 1px solid ${props=> props.theme.borderColor};
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
                    &:hover{
                        .edit{
                            display:block;
                        }
                    }
                    .ghost{
                        background: rgb(255, 255, 255);
                        border-radius: 4px;
                        border: 1px ${props=> props.theme.borderColor};
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
                                .name{
                                    font-weight:500;
                                    padding-bottom:5px;
                                    color: ${props=> props.theme.textColor};
                                }
                                .file_size{
                                    color: ${props=> props.theme.lightTextColor};
                                }
                            }
                            .tag_info{
                                font-weight:600;
                                background-color: white;
                                padding:5px 9px;
                                border-radius:4px;
                                color: ${props=> props.theme.lightTextColor};
                                font-size:12px;
                                text-transform: uppercase;
                            }
                        }
                       
                    }
                }
            }
        }
    }
    .folder-wrap{
        .hr{
            margin: 30px 0;
            background: ${props=> props.theme.borderColor};
            height: 1px;
        }
        h5{
            font-size: 16px;
            font-weight: 600;
            color: ${props=> props.theme.textColor};
            margin-bottom: 15px;
        }
        .folders{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            .folder_card{
                cursor:pointer;
                grid-column: span 3 / auto;
                width: calc((100% - 45px) / 4);
                background: white;
                box-shadow: rgba(33, 33, 52, 0.1) 0px 1px 4px;
                border: 1px solid rgb(234, 234, 239);
                border-radius: 4px;
                display: flex;
                align-items: center;
                padding: 12px;
                gap: 8px;
                .icon{
                    width: fit-content;
                    background: #eaf5ff;
                    padding: 8px 12px;
                    border-radius: 4px;
                }
                .info{
                    h5{
                        margin: 0;
                        color: ${props=> props.theme.textColor};
                        font-size: 14px;
                    }
                    p{
                        color: ${props=> props.theme.lightTextColor};
                        font-size: 12px;
                        margin-top: 3px;
                    }
                }
            }
        }
    }
    .empty{
        background: white;
        border-radius: 16px;
        width: 100%;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        img{
            width: 150px;
            height: 150px;
        }
        h5{
            color: ${props=> props.theme.lightTextColor};
            font-size: 16px;
        }
    }
`