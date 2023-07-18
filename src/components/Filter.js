import React from "react";
import styled from "styled-components";
import Svg from '../miscs/svg'

const Filter = ({ grid, toggleClass }) => {
    
    return (
        <Container>
            <div className="wrap">
                <div className="box">
                    <Svg name="search" color="rgb(142, 142, 169)" size="1rem" />
                    <input type="search" placeholder="Search ..." />
                </div>
            </div>
            <div className="wrap">
                <div className="box" onClick={toggleClass}>
                    {grid == true ? <Svg name="grid" color="rgb(142, 142, 169)" size="1rem" /> : <Svg name="list" color="rgb(142, 142, 169)" size="1rem" />}
                </div>
                {/* <div className="box">
                    <Svg name="setting" color="rgb(142, 142, 169)" size="16px" />
                </div> */}
            </div>
        </Container>
    )
}

export default Filter

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .wrap{
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
        .box{
            background: rgb(255, 255, 255);
            padding: 8px;
            padding-left:10px;
            border-radius: 4px;
            border: 1px solid ${props => props.theme.borderColor};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            input{
                padding: 0;
                width: 200px;
                border: none;
                padding-left: 10px;
                &:focus{
                    outline: none;
                }
            }
           
        }
    }
`