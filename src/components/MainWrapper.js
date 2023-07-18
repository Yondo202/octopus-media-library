import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";
import { config } from "../miscs/config";
import Loading from "../miscs/Loading";
import Svg from '../miscs/svg'
import Filter from "./Filter"; // tur hadgalna
import List from "./List";
import axios from "axios"
import { useLoad } from "../context/MediaCtx";
import { Auth } from 'aws-amplify';

// const initial = { key:'home', doc_count:0 }
// paths:[
    // { path: }
// ]

const MainWrapper = ({ setImage, setFocus, data, page, loading }) => {
    const { webId, useLoading, loading:globLoading, mainUrl } = useLoad()
    const [ renderData, setRenderData ] = useState({})
    const [ grid, setGrid ] = useState(false)
    const [ route, setRoute ] = useState([])

    const fetch = async (prop) => {
        useLoading(true)
        const { signInUserSession: session } = await Auth.currentAuthenticatedUser()
        const token = { headers: { Authorization: `Bearer ${session.accessToken.jwtToken}`, } }
        // pagination: { size: size, number: number }
        try {
            const res = await axios.post(`${mainUrl}/image/list`, { webId: webId, paths:[ prop ] }, token)
            setRenderData(res.data.data)
        } catch (err) {
            console.log(err, "err")
        } finally {
            useLoading(false)
        }
    };

    // const renderData = React.useMemo(()=> data ,[loading])

    useEffect(() =>{
        if(route.length === 0){
            setRenderData(data)
        }else{
            const last = route[route.length - 1]
            // console.log(route.doc_count)
            fetch({ path: last.key, order: last.doc_count})
        }
    },[loading, route.length])

    const toggleClass = () => {
        if (grid === true)
            setGrid(false)
        else
            setGrid(true)
    }

    const handleFolder = (data) => {
        setRoute(prev => [ ...prev, data ])
    }

    let props = { setFocus, setImage, media: renderData??{}, handleFolder }

    // if(page && globLoading) return <Loading local={true} />
    
    return (
        <Container>
            {page ? <PageHead setFocus={setFocus} /> : <ModalHead setFocus={setFocus} />}

            <div className={`${!page && `body2`}`}>
                <div className="route_head">
                    {route.length !== 0 &&<><div onClick={() =>setRoute([])} className="text">Media</div>
                    <span className="slash">/</span></> }
                    {route.map((el, ind) =>{
                        return(
                            <React.Fragment key={ind}>
                                <div className={`text ${ind === route.length - 1 ?`active`:``}`}>{el.key} </div>
                                <span className="slash">{ind !== route.length - 1 ?` / `:``}</span>
                            </React.Fragment>
                        )
                    })}
                </div>
                <Filter toggleClass={toggleClass} grid={grid} />
                {/* <div className="body">
                    {selected?.length > 0 &&
                        <div className="checkbox-wrap">
                            <p><b>{selected?.length}</b> файл сонгогдсон байна.</p>
                            <DeleteButton>Устгах</DeleteButton>
                            <Button onClick={() => setFocus({ type: 'move'})}>Move</Button>
                        </div>
                    }
                </div> */}
            </div>
            {/* setDetail, setDetailInfo, detailInfo, */}
            <div className={`${!page && `main`}`}>
                <div className={`${!page && `media-modal`}`}>
                    {(page && globLoading) ? <Loading local={true} /> : loading ? <Loading local={true} /> : grid ? <List {...props} /> : <Grid {...props} />}
                </div>
            </div>

            {!page && <div className="footer">
                <SecondaryButton onClick={() => setFocus({ _back: true })} >Цуцлах</SecondaryButton>
                <PrimaryButton>Хадгалах</PrimaryButton>
            </div>}

        </Container>
    )
}

export default MainWrapper

const Container = styled.div`
    .route_head{
        margin-bottom:8px;
        display:flex;
        align-items:center;
        margin-left:-12px;
        font-size:13px;
        .text{
            padding:5px 12px;
            cursor:pointer;
            border-radius:5px;
            font-weight:500;
            opacity:0.7;
            &:hover{
                background-color:rgba(0,0,0,0.057);
                opacity:1;
            }
        }
        .active{
            font-weight:700;
            opacity:1;
        }
    }
    .media-modal{
        padding: 50px 40px;
        padding-top:30px;
        // height: calc(100% - 83px);
        // overflow-y: auto;
        .media-wrap{
            .assets{
                h5{
                    font-size: 16px;
                    font-weight: 600;
                    color: ${props => props.theme.textColor};
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
                        .selected_sign {
                            width: 20px;
                            height: 20px;
                            position: absolute;
                            top: 10px;
                            left: 10px;
                            z-index: 1;
                            background: ${props => props.theme.mainColor};
                            border-radius: 4px;
                            svg{
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                color: #fff;
                                path{
                                    fill: #fff;
                                }
                            }
                        }
                        .selected{
                            width: 20px;
                            height: 20px;
                            position: absolute;
                            top: 10px;
                            left: 10px;
                            background: white;
                            border-radius: 4px;
                            z-index: 1;
                            border: 1px solid ${props => props.theme.borderColor};
                        }
                        .edit{
                            position: absolute;
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
                                    .name{
                                        font-weight:500;
                                        padding-bottom:5px;
                                        color: ${props => props.theme.textColor};
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
        }
    }
    .head_title{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 0;
        .text{
            color: ${props => props.theme.textColor};
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.25;
        }
        .button{
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }
    .tab-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 40px 12px 40px;
        border-bottom: 1px solid ${props => props.theme.borderColor};
        .tablist{
            display: flex;
            .tab{
                padding: 15px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                color: ${props => props.theme.textColor};
                letter-spacing: 0.4px;
                cursor: pointer;
                &.active{
                border-bottom: 2px solid ${props => props.theme.mainColor};
                }
            }
        }
        .button-wrap{
            display: flex;
            gap: 15px;
        }
    }
    
    .body{
        .checkbox-wrap{
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 30px;
            p{
                font-size: 16px;
                color: ${props => props.theme.lightTextColor};
            }
        }
    }
    .body2{
        padding:12px 40px;
    }
    
`

const PageHead = ({ setFocus }) => {
    return (
        <div className="head_title">
            <div className="text">Media Library</div>
            <div className="button">
                <Button onClick={() => setFocus({ type: 'folder' })}><Svg name="add" color={config.mainColor} /> Шинэ хавтас үүсгэх</Button>
                <PrimaryButton onClick={() => setFocus({ type: 'upload' })}><Svg name="add" color={"#fff"} /> Шинэ файл нэмэх</PrimaryButton>
            </div>
        </div>
    )
}

const ModalHead = ({ setFocus }) => {
    return (
        <div className="tab-wrap">
            <div className="tablist">
                <div className={`tab `} >Жагсаалт</div>
                {/* <div className={`tab `} >Selected ({selected?.length})</div> */}
            </div>
            <div className="button-wrap">
                <Button onClick={() => setFocus({ type: 'folder' })}>Шинэ хавтас үүсгэх</Button>
                <PrimaryButton onClick={() => setFocus({ type: 'upload' })}>Шинэ файл нэмэх</PrimaryButton>
            </div>
        </div>
    )
}

const Button = styled.div`
    padding:10px 20px;
    align-items: center;
    gap: 10px;
    display: flex;
    border-radius: 4px;
    background: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.mainColor};
    font-weight: 700;
    cursor: pointer;
    font-size: 12px;
`

const DeleteButton = styled.div`
    padding:10px 20px;
    align-items: center;
    width: fit-content;
    gap: 10px;
    display: flex;
    border-radius: 4px;
    background: #fcecea;
    color: #b72b1a;
    font-weight: 700;
    border: 1px solid rgb(245, 192, 184);
    cursor: pointer;
    font-size: 12px;
    svg{
        path{
            fill: ${props => props.theme.mainColor};
        }
    }
    &:hover{
        background: white;
    }
`
export const PrimaryButton = styled.div`
    padding:10px 20px;
    align-items: center;
    gap: 10px;
    display: flex;
    border-radius: 4px;
    background: white;
    color: white;
    font-weight: 700;
    cursor: pointer;
    font-size: 12px;
    background: ${props => props.theme.mainColor};
`

export const SecondaryButton = styled.div`
    padding:10px 20px;
    align-items: center;
    gap: 10px;
    display: flex;
    border-radius: 4px;
    background: white;
    color: ${props => props.theme.textColor};
    font-weight: 700;
    cursor: pointer;
    font-size: 12px;
    border: 1px solid ${props => props.theme.borderColor};
    &:hover{
        background: rgba(0,0,0,0.037);
    }
`