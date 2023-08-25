import React, { useState, useEffect, useMemo } from 'react';
import { CustomContext } from './context/MediaCtx';
import styled, { ThemeProvider } from 'styled-components';
import { config, titles, defaultSize } from './miscs/config';
import FileDetail from './components/FileDetail';
import Move from './components/Move';
import Loading from './miscs/Loading';
import MediaModal from './miscs/MediaModal';
import MainWrapper from './components/MainWrapper';
import Error from './miscs/Error';
import "./miscs/styles/GlobalConfig.css"
// import { Auth } from 'aws-amplify';
import axios from 'axios';
import MediaUpload, { UploadFinal } from './components/MediaUpload'; // huselttei comp
import Folder from './components/Folder'; // huselttei comp

const initial = { type: `main`, title: '', data: {}, chain: [{ type: 'main' }] };

// const mainUrl = window.urls.elasticsearch
// const mainUrl = "https://content-service.siro.mn"
// const mainUrl = 'http://192.168.230.160:3003';

const getWebId = () =>{
   return document.cookie?.split('; ')?.find(row => row.startsWith('webid='))?.split('=')[1]
}

const getJwt = () =>{
   return document.cookie?.split('; ')?.find(row => row.startsWith('jwt='))?.split('=')[1]
}

// theme_asset - localstorage {}
const mainUrl = "https://content-service.siro.mn"
// const testToken = `eyJraWQiOiJsU2RNcWtQbHFzc0dOVzJUejJkeDMrWjVGejR6U2UrUkFBNFwvanZKRWFcL009IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMWJiYmIxMS02ZTM4LTQ0ZWItOTg2OS04NmE3ZTcyODYyODIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfbDZEUDZaYnV2IiwiY2xpZW50X2lkIjoiMmtiN3VrdnY2Ymk4YnBtZW9nNHYxdjQ4dWYiLCJvcmlnaW5fanRpIjoiZWU1MjkwMGYtYmFjNS00NGJjLWJjZjYtMDY2YzQ1NWU4NzM3IiwiZXZlbnRfaWQiOiIwODhiYzgwMC04MGI3LTQxM2UtYmM4ZS03ODg2MWNjZGM1MjkiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjkxMzc1MzAzLCJleHAiOjE2OTE0NjE3MDMsImlhdCI6MTY5MTM3NTMwMywianRpIjoiYWY1MDNjYzUtZTE3My00MGFhLWFmMTctMWIyZjhmMGM5ZTI4IiwidXNlcm5hbWUiOiI5OTgwMTQwNiJ9.dsE6lkjx2ZXaGGUMbKKhmchYGWUx5ZEtsmyz75EHnA7cUiGpWXlVU8rW-hxtf8CtBOIxNC6v1256iO5wIt-L_5Wc3UVdPeXUOE276_g0LRQliMNEuuTYY-7An1_UtBS252fk592P6I-nswdB_zO1MMxHikY3f0_ODeSzK1CCS9bh2uSF4Lt-LIg3ncjMLq0IDhJ9NhzPczFDTARemFlwquL0Ev9vKZa-W7Xj4jC1RHdIAoBPAKEoQvD_h6da-lxQAIIYone8NCIuDlcFUV_MmjVuq80hcWvF0EcXTwEHiPAdr2Gr5Z0bkC7AHwGcEyaM6_3xfNLkvYyWeYg8050kow`
// const testWebid = `c795bdf9-8f8d-4fe0-b6c1-662a5ce2b840`

const MediaIndex = ({ page, setImage, onCancel, open, webId = getWebId(), accessToken = getJwt() }) => {
   const [loading, setLoading] = useState(false); // use global load
   const [focus, setFocusState ] = useState(initial);
   const [ searchData, setSearchData] = useState({});
   const [ renderData, setRenderData ] = useState({})
   // , sort: { column: "createdAt", order:'0' }
   const [fetchBody, setFetchBody] = useState({ paths: [], pagination: { size: defaultSize, number: 1 } });

   // webId -- damjuuldag bolno
   const setFocus = (data) => {
      setFocusState((prev) => {
         let force = { ...initial, _back: true };
         if (data._uploaded_back) return { ...force, _uploaded_back: true };
         if (!data._back) return { ...data, chain: [...prev.chain, data] };
         if (prev.chain.length <= 1) return force;
         let chains = prev.chain.slice(-2).slice(0, 1)[0];
         return { ...chains, chain: prev.chain.slice(0, prev.chain.length - 1) };
      });
   };

   KeyPress('Escape', setFocus, { _back: true });

   const fetch = async (prop) => {
      setLoading(true);
      const token = { headers: { Authorization: `Bearer ${accessToken}`, webId: webId } };
      // pagination: { size: size, number: number }
      try {
         if(prop?.search){
            const res = await axios.post(`${mainUrl}/image/search`, {search:prop.search}, token);
            setSearchData({ images:{ data:res.data.data }, search:prop.search });
         }else{
            const res = await axios.post(`${mainUrl}/image/list`, { ...fetchBody, sort: { column: "createdAt", order:'desc' } }, token);
            setSearchData(res.data.data);
            setRenderData(res.data.data)
            setFetchBody((prev) => ({ ...prev, pagination: res.data.data.images?.pagination }));
         }
         
      } catch (err) {
         console.log(err, 'err');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      setFocusState(initial);
      if (page || open) fetch();
   }, [open]);

   useEffect(() => {
      fetch();
   }, [fetchBody.paths?.length, fetchBody.pagination?.number, fetchBody.pagination?.size]);

   useEffect(() => {
      new Promise(() => {
         if (!page && focus._back) {
            if (!focus._uploaded_back) {
               onCancel?.(false);
            } else {
               fetch(searchData);
            }
         } else if (page && focus._uploaded_back) {
            fetch(searchData);
         }
      }).then(setFocusState(initial));
   }, [focus._back, focus._uploaded_back]);

   const Details = {
      main: {
         Component: (props) => <MainWrapper {...props} />,
         page, searchData, setImage, loading, setFetchBody, fetchBody, setSearchData, renderData
      },
      detail: { Component: (props) => <FileDetail {...props} />, focus, fetchBody },
      upload: { Component: (props) => <MediaUpload {...props} /> },
      finalupload: { Component: (props) => <UploadFinal {...props} />, page, setImage, focus, fetchBody },
      folder: { Component: (props) => <Folder {...props} />, focus, fetchBody },
      move: { Component: (props) => <Move {...props} /> },
   };

   const ctxProps = { mainUrl:mainUrl, webId:webId , jwt:accessToken }

   const themes = useMemo(() => JSON.parse(localStorage.getItem('theme_asset')),[])

   return (
      <ThemeProvider theme={{ ...config, ...themes }}>
         <CustomContext {...ctxProps} >
            <Container page={page}>
               {!webId && page ? <Error /> : page && Details['main'].Component({ ...Details['main'], setFocus })}
               <MediaModal title={titles[focus.type]} open={focus.type !== 'main' || open} onCancel={() => setFocus({ _back: true })}>
                  <Loading withGhost={true} />
                  {!webId ? <Error /> : Details?.[focus.type]?.Component({ ...Details[focus.type], setFocus: setFocus })}
               </MediaModal>
            </Container>
         </CustomContext>
      </ThemeProvider>
   );
};

export default MediaIndex;

const Container = styled.div`
   position: relative;
   padding-bottom: ${(props) => (props.page ? `70px` : `0px`)};
   .one_line{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
   }
`;

function KeyPress(targetKey, handleFunc, passValue) {
   const keyPress = React.useCallback((e) => {
      if (!handleFunc) return;
      if (e.key === targetKey) {
         if (passValue) return handleFunc(passValue);
         handleFunc(false);
      }
   }, []);

   React.useEffect(() => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
   }, [keyPress]);
}
