import React from 'react';
import styled from 'styled-components';
import { ST } from './config';

const RouteHead = ({ fetchBody }) => {
   return (
      <RouteHeadStyle>
         <>
            <div className="text">{ST['home']}</div>
            {fetchBody.paths.length !== 0 && <span className="slash">/</span>}
         </>
         {fetchBody.paths?.map((el, ind) => {
            return (
               <React.Fragment key={ind}>
                  <div className={`text ${ind === fetchBody.paths?.length - 1 ? `active` : ``}`}>{el.path} </div>
                  <span className="slash">{ind !== fetchBody.paths?.length - 1 ? ` / ` : ``}</span>
               </React.Fragment>
            );
         })}
      </RouteHeadStyle>
   );
};

export default RouteHead;

const RouteHeadStyle = styled.div`
   margin-bottom: 8px;
   display: flex;
   align-items: center;
   margin-left: -12px;
   font-size: 13px;
   .text {
      padding: 5px 12px;
      cursor: pointer;
      border-radius: 5px;
      font-weight: 500;
      opacity: 0.7;
      &:hover {
         background-color: rgba(0, 0, 0, 0.057);
         opacity: 1;
      }
   }
   .active {
      font-weight: 700;
      opacity: 1;
   }
`;
