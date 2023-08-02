import React from 'react';
import styled from 'styled-components';
import Svg from '../miscs/svg';
import { defaultSize } from "../miscs/config";

const pages = [defaultSize, 20, 40, 50]

const Pagination = ({ fetchBody, setFetchBody }) => {

    const onChange = (element) =>{
        setFetchBody((prev) => ({ ...prev, pagination: { ...prev.pagination, size:element.target.value, number:1 } }))
    }

   return (
      <Container>

        <div className='select_par'>
            <select onChange={onChange} value={fetchBody.pagination.size}>
                {pages.map((el,ind) => {
                     return <option key={ind}>{el}</option>
                })}
            </select>
        </div>

         <div className="pagination-wrap">
            <div
               className="icon"
               onClick={() =>
                  setFetchBody((prev) => ({
                     ...prev,
                     pagination: {
                        ...prev.pagination,
                        number: fetchBody.pagination.number === 1 ? fetchBody.pagination.number : fetchBody.pagination.number - 1,
                     },
                  }))
               }
            >
               <Svg name="prev" />
            </div>
            {new Array(Math.ceil((fetchBody.pagination.total ?? 0) / fetchBody.pagination.size))
               .fill(fetchBody.pagination.number)
               .map((el, ind) => {
                  return (
                     <div
                        className={`frame ${ind + 1 === fetchBody.pagination.number ? 'active' : ''}`}
                        // item={el}
                        onClick={() => setFetchBody((prev) => ({ ...prev, pagination: { ...prev.pagination, number: ind + 1 } }))}
                        key={ind}
                     >
                        {ind + 1}
                     </div>
                  );
               })}

            <div
               className="icon"
               onClick={() =>
                  setFetchBody((prev) => ({
                     ...prev,
                     pagination: {
                        ...prev.pagination,
                        number:
                           Math.ceil((fetchBody.pagination.total ?? 0) / fetchBody.pagination.size) <= fetchBody.pagination.number
                              ? fetchBody.pagination.number
                              : fetchBody.pagination.number + 1,
                     },
                  }))
               }
            >
               <Svg name="next" />
            </div>
         </div>
      </Container>
   );
};

export default Pagination;

const Container = styled.div`
   display: flex;
   align-items:center;
   justify-content: space-between;
   padding: 30px 0;
   .select_par{
        select{
            border-radius:${(props) => props.theme.borderRadius};
            padding:10px;
            border:1px solid ${props=>props.theme.sectionBorderColor};
            border-radius:5px;
        }
        
   }
   .pagination-wrap {
      display: flex;
      gap: 15px;
      align-items: center;
      .icon {
         cursor: pointer;
         svg {
            
            width: 14px;
            height: 14px;
         }
      }
      .frame {
         padding: 8px 12px;
         border-radius: 4px;
         box-shadow: rgba(33, 33, 52, 0.1) 0px 1px 4px;
         text-decoration: none;
         display: flex;
         position: relative;
         outline: none;
         cursor: pointer;
         background-color: ${(props) => props.theme.boxBackground};
      }
      .active {
         background-color: ${(props) => props.theme.mainColor};
         color: white;
      }
   }
`;
