import React from "react";
import styled, { keyframes } from "styled-components";
import Svg from "./svg";

const Modal = (props) => {

    if (!props.open) return
    return (
        <Container>
            <div className="main-wrap">
                <div onClick={props.onCancel} className="overlay"></div>
                <div className="main-content">
                    <div className="title">
                        <div className="text">{props.title ?? `Медиа файл`}</div>
                        <div className="close" onClick={props.onCancel}><Svg name="close" color="textColor" /></div>
                    </div>
                    <div className="content_parent">
                        {props.children}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Modal
const animate = keyframes`
    0% { transform:scale(0.8); opacity:0;  }
    100% { transform:scale(1); opacity:1; }
`

const Container = styled.div`
.main-wrap{
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 1000;
    .overlay {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        background: rgba(50, 50, 77, 0.2);
        z-index: 1001;
    }
    .main-content{
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${props => props.theme.boxBackground};
        border-radius: 4px;
        max-width: 900px;
        // min-width: 800px;
        width: 900px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 1002;
        .title{
            border-radius: 4px 4px 0px 0px;
            border-bottom: 1px solid ${props => props.theme.sectionBorderColor};
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
                border: 1px solid ${props => props.theme.sectionBorderColor};
                background: ${props => props.theme.boxBackground};
                padding: 8px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                svg{
                    width: 12px;
                    heihgt: 12px;
                    path{
                        fill: ${props => props.theme.textColor};
                    }
                }
            }
        }
        .content_parent{
            width:100%;
        }
        .main{
            animation:${animate} 0.15s ease;
            position:relative;
            display: flex;
            flex-direction: column;
            // max-height: calc(100% - 132px);
            max-height: 100%;
            max-height: 400px;
            width:100%;
            overflow-y: auto;
        }
        .footer{
            border-radius: 0px 0px 4px 4px;
            border-top: 1px solid ${props => props.theme.sectionBorderColor};
            background: ${props => props.theme.gray};
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .addition{
                display:flex;
                gap:20px;
                align-items: center;
            }
        }
    }
}
`