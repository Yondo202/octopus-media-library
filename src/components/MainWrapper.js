import React, { useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Loading from "../miscs/Loading";
import Svg from '../miscs/svg'
import Filter from "./Filter"; // tur hadgalna
import { ST, defaultSize } from "../miscs/config";
// import List from "./List";
import { useLoad } from "../context/MediaCtx";
import Pagination from "./Pagination";
import GlobalImage from "./PublicImage";

const MainWrapper = ({ setImage, setFocus, searchData, page, loading, setFetchBody, fetchBody, setSearchData, renderData, type }) => {
    const { loading:globLoading } = useLoad()
    // const [ grid, setGrid ] = useState(false)
    // const [ mainType, setMainType ] = useState(page?`local`:'public')
    // const [ mainType, setMainType ] = useState('public')
    const [ mainType, setMainType ] = useState('local')

    // const toggleClass = () => {
    //     if (grid === true)
    //         setGrid(false)
    //     else
    //         setGrid(true)
    // }

    const handleFolder = (data) => {
        setFetchBody(prev=> ({ ...prev, paths: [ ...prev.paths, { path:data.key, doc_count:data.doc_count, order: prev.paths.length + 1 } ] }))
    }
    
    const linkFunc = (data) =>{
        setFetchBody(prev=> ({ ...prev, paths: [ ...prev.paths.slice(0, prev.paths.findIndex(item=> item.path === data.path) + 1 ), ] }))
    }

    const editFolder = (data) =>{
        setFocus({ type: 'folder', data:data })
    }
    let props = { setFocus, setImage, media: searchData??{}, handleFolder, editFolder, fetchBody }
    let hrProp = { setFocus, setMainType, mainType, page, setImage }
    let filterProps = {  fetchBody, setFetchBody, setSearchData, renderData }

    return (
        <Container>
           
            { mainType === 'public' 
            ? <>
                <Loading withGhost local={globLoading} />
                <GlobalImage setImage={setImage} Header={PageHead} headerProps={hrProp} page={page} type={type} /> 
            </>
            :<>
                <PageHead {...hrProp} />
                <div className={`${!page && `body2`}`}>
                    <Filter {...filterProps} />

                    {!searchData?.search && <div className="route_head">
                        {fetchBody.paths.length !== 0 &&<><div onClick={() =>setFetchBody(prev=>({ ...prev, paths:[] }))} className="text">{ST['home']}</div>
                        <span className="slash">/</span></> }
                        {fetchBody.paths?.map((el, ind) =>{
                            return(
                                <React.Fragment key={ind}>
                                    <div onClick={()=>linkFunc(el)} className={`text ${ind === fetchBody.paths?.length - 1 ?`active`:``}`}>{el.path} </div>
                                    <span className="slash">{ind !== fetchBody.paths?.length - 1 ?` / `:``}</span>
                                </React.Fragment>
                            )
                        })}
                    </div>}

                </div>
                <div className={`${!page && `main`}`}>
                    <div className={`${!page && `media-modal`}`}>
                        {(page && globLoading) && <Loading withGhost local={true} />}
                        {/* { loading ? <Loading local={true} /> : grid ? <List {...props} /> : <Grid {...props} />}  */}
                        { loading ? <Loading local={true} /> : <Grid {...props} />} 
                        { fetchBody.pagination?.total > defaultSize && !searchData?.search && <Pagination fetchBody={fetchBody} setFetchBody={setFetchBody} />}
                    </div>
                </div>
            </> }

            {!page && <div className="footer">
                <SecondaryButton onClick={() => setFocus({ _back: true })} >Цуцлах</SecondaryButton>
            </div>}

        </Container>
    )
}

export default MainWrapper

const Container = styled.div`
    .route_head{
        margin-bottom:15px;
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
                            background: ${props => props.theme.boxBackground};
                            border-radius: 4px;
                            z-index: 1;
                            border: 1px solid ${props => props.theme.sectionBorderColor};
                        }
                        .edit{
                            position: absolute;
                            top: 5px;
                            right: 10px;
                            z-index: 2;
                            border: 1px solid ${props => props.theme.sectionBorderColor};
                            border-radius: 4px;
                            background: ${props => props.theme.boxBackground};
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
                                .box{
                                    display: flex;
                                    -webkit-box-pack: center;
                                    justify-content: center;
                                    height: 10.25rem;
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
                                }
                            }
                            .info_sector{
                                padding: 9px 12px;
                                display:flex;
                                align-items:center;
                                justify-content:space-between;
                                background: ${props => props.theme.boxBackground};
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
                                    background-color: ${props => props.theme.boxBackground};
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
        border-bottom: 1px solid ${props => props.theme.sectionBorderColor};
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
// daraa ene 2 iig 1 bolgo
const PageHead = ({ setFocus, setMainType, mainType, page, Render, setImage }) => {
    const [ linkContet, setLinkContet ] = useState({ isOpen:false, value:'' })
    return (
        <div className={`${page ? `head_title`: `tab-wrap`}`}>
            {/* <div className="text">Медиа файл</div> */}
            <TabStyle >
                <StyledLink>
                    {!page && <span onClick={()=>setLinkContet({ isOpen:!linkContet.isOpen, value:'' })} ><Svg name="link" size="100%" /></span>}
                    
                    {linkContet.isOpen && <div className="content">
                        <input value={linkContet.value} onChange={(e)=>setLinkContet({ isOpen:true, value:e.target.value })} type="text" placeholder="https://..." />

                        {linkContet.value && <img className="image" src={linkContet.value} alt="icon" />}
                        <Button onClick={()=>setImage?.({ url: linkContet.value })} className="custom_inp">Хадгалах</Button>
                    
                    </div>}
                </StyledLink>
                <div onClick={()=>setMainType(`public`)} className={`item ${mainType==='public'&&`active_item`}`}>Нээлттэй</div>
                <div onClick={()=>setMainType(`local`)}  className={`item ${mainType==='local'&&`active_item`}`}>Хувийн</div>
            </TabStyle>
            {Render
            ?<Render />
            :<div className={`${page ? `button`: `button-wrap`}`}>
                <Button onClick={() => setFocus({ type: 'folder' })}><Svg name="add" size="0.7rem" /> Шинэ хавтас үүсгэх</Button>
                <PrimaryButton onClick={() => setFocus({ type: 'upload' })}><Svg name="add" size="0.7rem" color={"#fff"} /> Шинэ файл нэмэх</PrimaryButton>
            </div>}
        </div>
    )
}

const StyledLink = styled.div`
   width: 32px;
   height: 32px;
   border-radius: 50%;
   border: 1px solid transparent;
   position: relative;
   &:hover{
    border: 1px solid ${(props) => props.theme.sectionBorderColor};
    background-color: ${(props) => props.theme.bgHover};
   }
   svg{
     cursor: pointer;

   }
   .content{
        position: absolute;
        top: 40px;
        left: 0;    
        padding: 20px 15px;
        z-index: 3;
        background-color: ${(props) => props.theme.boxBackground};
        /* width: 100px; */
        border: 1px solid ${(props) => props.theme.sectionBorderColor};
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        .image{
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 5px;
        }
        .custom_inp{
            width: min-content;
            margin-left: auto;
            padding: 6px 20px;
            &:hover{
                background-color: ${(props) => props.theme.mainColor};
                color: #fff;
            }
        }
        input {
            padding: 7px 12px;
            border-radius: 4px;
            border: 1px solid ${(props) => props.theme.sectionBorderColor};
            width: 240px;
          
         }
   }
`

const TabStyle = styled.div`
    displaY:flex;
    gap:12px;
    .item{
        position:relative;
        padding:10px 15px;
        font-size:12px;
        font-weight:600;
        cursor:pointer;
        color: ${props => props.theme.lightTextColor};
        border-radius:8px;
        &:hover{
            background-color:rgba(0,0,0,0.037);
        }
        &:before{
            content:'';
            position:absolute;
            bottom:0;
            left:0;
            height:2px;
            width:0%;
            background-color:${props => props.theme.mainColor};
            transition:all 0.3s ease;
        }
    }
    .active_item{
        color: ${props => props.theme.mainColor};
        &:before{
            width:100%;
        }
    }
`

export const Button = styled.div`
    padding:10px 20px;
    align-items: center;
    gap: 10px;
    display: flex;
    border-radius: 8px;
    background: ${props => props.theme.lightMainColor};
    color: ${props => props.theme.mainColor};
    font-weight: 700;
    cursor: pointer;
    font-size: 12px;
    border: 1px solid ${props => props.theme.sectionBorderColor};
    letter-spacing: 0.3px;
`

// const DeleteButton = styled.div`
//     padding:10px 20px;
//     align-items: center;
//     width: fit-content;
//     gap: 10px;
//     display: flex;
//     border-radius: 4px;
//     background: #fcecea;
//     color: #b72b1a;
//     font-weight: 700;
//     border: 1px solid rgb(245, 192, 184);
//     cursor: pointer;
//     font-size: 12px;
//     svg{
//         path{
//             fill: ${props => props.theme.mainColor};
//         }
//     }
//     &:hover{
//         background: ${props => props.theme.boxBackground};
//     }
// `
export const PrimaryButton = styled.div`
    position:relative;
    padding:10px 20px;
    align-items: center;
    gap: 10px;
    display: flex;
    border-radius: 4px;
    background: ${props => props.theme.boxBackground};
    color: ${props => props.theme.boxBackground};
    font-weight: 600;
    cursor: pointer;
    font-size: 12px;
    background: ${props =>  props.theme.mainColor};
    ${props=>props.danger?`border: 1px solid rgb(245, 192, 184);
    background: rgb(252, 236, 234);
    color: rgb(183, 43, 26);`:``}
`

export const SecondaryButton = styled.div`
    padding:10px 20px;
    align-items: center;
    gap: 10px;
    display: flex;
    border-radius: 4px;
    background: ${props => props.theme.bodyBackground};
    color: ${props => props.theme.textColor};
    font-weight: 700;
    cursor: pointer;
    font-size: 12px;
    border: 1px solid ${props => props.theme.sectionBorderColor};
    &:hover{
        background: rgba(0,0,0,0.037);
    }
`