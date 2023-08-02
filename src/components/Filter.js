import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLoad } from '../context/MediaCtx';
import Svg from '../miscs/svg';

const Filter = ({ grid, toggleClass, setSearchData, renderData }) => {
   const [search, setSearch] = useState('');
   const { useLoading, webId, jwt, mainUrl } = useLoad();

   const onChangeSearch = (e) => {
      setSearch(e.target.value);
      if (e.target.value.length <= 1) {
        setSearchData(renderData);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      useLoading(true);
      const token = { headers: { Authorization: `Bearer ${jwt}`, webId: webId } };
      try {
         const res = await axios.post(`${mainUrl}/image/search`, { search: search, }, token);
         setSearchData({folders:[], images:res.data, search:search});
      } catch {
         setSearchData(renderData);
      } finally {
         useLoading(false);
      }
   };

   return (
      <Container>
         <div className="wrap">
            <form onSubmit={handleSubmit} className="box">
               <Svg name="search" color="rgb(142, 142, 169)" size="1rem" />
               <input onChange={onChangeSearch} value={search} type="search" placeholder="Search ..." />
            </form>
         </div>
         <div className="wrap">
            <div className="box" onClick={toggleClass}>
               {grid == true ? (
                  <Svg name="grid" color="rgb(142, 142, 169)" size="1rem" />
               ) : (
                  <Svg name="list" color="rgb(142, 142, 169)" size="1rem" />
               )}
            </div>
            {/* <div className="box">
                    <Svg name="setting" color="rgb(142, 142, 169)" size="16px" />
                </div> */}
         </div>
      </Container>
   );
};

export default Filter;

const Container = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 15px;
   .wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      width: fit-content;
      .box {
         background: ${(props) => props.theme.boxBackground};
         padding: 8px;
         padding-left: 10px;
         border-radius: 4px;
         border: 1px solid ${(props) => props.theme.sectionBorderColor};
         cursor: pointer;
         display: flex;
         align-items: center;
         justify-content: center;
         input {
            padding: 0;
            width: 200px;
            border: none;
            padding-left: 10px;
            background: transparent;
            &:focus {
               outline: none;
            }
         }
      }
   }
`;
