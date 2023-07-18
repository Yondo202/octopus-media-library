import React from "react";
import styled from "styled-components";
import Svg from '../miscs/svg'

const Pagination = ({
    fetch,
    paginateNumber,
    setPaginateNumber
}) => {
    const currentPage = 1;
    const totalPages = 5;
    return (
        <Container>
            <div className="pagination-wrap">
                <div className="icon" onClick={() => fetch(currentPage > 1 ? (currentPage - 1) : 1, paginateNumber)}>
                    <Svg name="prev" />
                </div>
                {new Array(totalPages).fill(Math.random()).map((el, i) => {
                    if (
                        (i + 1 > currentPage - 5 && i + 1 <= currentPage + 5) ||
                        (i + 1 <= 10 && currentPage < 5)
                    ) {
                        return (
                            <div
                                className={`frame ${currentPage == i + 1 ? "active" : ""}`}
                                onClick={() => fetch(i + 1, paginateNumber)}
                                key={i}
                            >
                                {i + 1}
                            </div>
                        );
                    }
                })}
                <div className="icon" onClick={() => fetch(currentPage < totalPages ? (currentPage + 1) : totalPages, paginateNumber)}>
                    <Svg name="next" />
                </div>
            </div>
        </Container>
    )
}

export default Pagination

const Container = styled.div`
display: flex;
justify-content: end;
padding: 30px 0;
.pagination-wrap{
    display: flex;
    gap: 10px;
    align-items: center;
    .icon{
        cursor: pointer;
        svg{
            width: 12px;
            height: 12px;
        }
    }
    .frame{
        padding: 12px 16px;
        border-radius: 4px;
        box-shadow: rgba(33, 33, 52, 0.1) 0px 1px 4px;
        text-decoration: none;
        display: flex;
        position: relative;
        outline: none;
        cursor: pointer;
        background: white;
    }
    .active {
      background-color: ${props=>props.theme.mainColor};
      color: white;
    }
}
`