import React from "react";
import styled from "styled-components";
import Svg from '../miscs/svg'
// import Pagination from "./Pagination";

const List = ({ media, setFocus, setImage, handleFolder, editFolder }) => {

    const handleEdit = (data) => {
        setFocus({ type: 'detail', data: data })
    }
    
    return (
        <Container>
            {(media?.images?.data?.length > 0 ||  media?.folders?.data?.length > 0) &&
                <table>
                    <thead>
                        <tr>
                            {/* <th><div className="selected"></div></th> */}
                            <th>Харагдац</th>
                            <th>Файл</th>
                            <th>Файлын төрөл</th>
                            <th>Файлын хэмжээ</th>
                            <th>Үүссэн огноо</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {media?.folders?.data?.map((data, i) => (
                            //onClick={()=>handleFolder(data)} map dotor hii daraa
                            <tr key={i} >
                                {/* <td></td> */}
                                <td onClick={()=>handleFolder(data)}>
                                    <div className="preview">
                                        <Svg name="folder" color="#6CB7F1" size="24px" />
                                    </div>
                                </td>
                                <td onClick={()=>handleFolder(data)}>{data.key}</td>
                                <td onClick={()=>handleFolder(data)} style={{ textTransform: "uppercase" }}>Folder</td>
                                <td onClick={()=>handleFolder(data)} style={{ textTransform: "uppercase" }}>57KB</td>
                                <td onClick={()=>handleFolder(data)}>June 26, 2023</td>
                                <td onClick={() => editFolder(data)}><div className="action_button"><Svg name="edit" color="lightTextColor" size="17px" /></div> </td>
                            </tr>
                        ))}
                        {media.images?.data?.map((data, i) => (
                            <tr key={i} onClick={() => setImage?.({ _id:data.id, ...data._source })}>
                                {/* <td>
                                    {detectSelected(data) ? (
                                        <div className="selected_sign" onClick={() => handleSetSelected(data)}>
                                            <Svg name="check" size="24px" />
                                        </div>
                                    ) : (
                                        <div className="selected" onClick={() => handleSetSelected(data)}></div>
                                    )}
                                </td> */}
                                <td>
                                    <div className="preview">
                                        <img src={data._source.url} alt='img' />
                                    </div>
                                </td>
                                <td>{data._source.title}</td>
                                <td style={{ textTransform: "uppercase" }}>{data._source.ext}</td>
                                <td style={{ textTransform: "uppercase" }}>57KB</td>
                                <td>June 26, 2023</td>
                                <td onClick={() => handleEdit(data)}><div className="action_button"><Svg name="edit" color="lightTextColor" size="17px" /></div> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            
        </Container>
    )
}

export default List

const Container = styled.div`
width: 100%;
background: ${props => props.theme.boxBackground};
    border-radius: 4px;
    padding: 15px 25px;
    box-shadow: rgba(33, 33, 52, 0.1) 0px 1px 4px;
    table{
        width: 100%;
        background: ${props => props.theme.boxBackground};
        border-radius: 4px;
        .action_button{
            display:flex;
            justify-content:center;
        }
        tr{
            th, td{
                padding: 18px 12px;
                text-align: left;
                border-bottom: 1px solid ${props=>props.theme.sectionBorderColor};
                &:first-of-type{
                    padding: 0;
                    padding-left: 10px;
                }
                // .selected_sign {
                //     width: 18px;
                //     height: 18px;
                //     z-index: 1;
                //     background: ${props=>props.theme.mainColor};
                //     border-radius: 4px;
                //     svg{
                //         width: 100%;
                //         height: 100%;
                //         object-fit: cover;
                //         color: #fff;
                //         path{
                //             fill: #fff;
                //         }
                //     }
                // }
                // .selected{
                //     width: 18px;
                //     height: 18px;
                //     background: white;
                //     border-radius: 4px;
                //     z-index: 1;
                //     border: 1px solid ${props=>props.theme.sectionBorderColor};
                // }
                .preview{
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color:rgba(0,100,20,0.055);
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }
            }
            th{
                text-transform: uppercase;
                color: ${props=>props.theme.lightTextColor}
                font-size: 11px;
            }
            td{
                color: ${props=>props.theme.textColor};
                cursor: pointer;
                font-size: 13px;
                &:last-of-type{
                    padding: 0;
                    text-align: right;
                }
            }
        }
    }
`