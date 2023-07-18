import React from "react";
import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "./MainWrapper"

const Move = ({ setFocus }) => {
    return (
        <Container >
            <div className="main">
                <div className="body">
                    <div className="input-wrap">
                        <label>Байршил сонгох</label>
                        <select>
                            <option selected>Media Library</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="footer">
                <SecondaryButton onClick={()=>setFocus({_back:true})}>Цуцлах</SecondaryButton>
                <PrimaryButton >Хадгалах</PrimaryButton>
            </div>
        </Container>
    )
}

export default Move

const Container = styled.div`
    .body{
        display: flex;
        padding: 30px;
        align-items: center;
        .input-wrap{
            width: 100%;
            input, select{
                width: 100%;
                border-radius: 4px;
                border: 1px solid ${props=>props.theme.borderColor};
                margin-top:8px;
                &:focus{
                    outline: none;
                }
            }
            label{
                color:${props=>props.theme.lightTextColor};
                font-weight:500;
            }
        }
    }
        
`