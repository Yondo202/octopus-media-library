import React, { useState, useEffect, useMemo } from 'react';
import { CustomContext } from './context/MediaCtx';
import styled, { ThemeProvider } from 'styled-components';
import { config, titles, defaultSize } from './miscs/config';
import FileDetail from './components/FileDetail';
import Move from './components/Move';
import Loading from './miscs/Loading';
// import { fileTypes } from "./miscs/enums"
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

const getWebId = () => {
   return document.cookie?.split('; ')?.find(row => row.startsWith('webid='))?.split('=')[1]
}

const getJwt = () => {
   return document.cookie?.split('; ')?.find(row => row.startsWith('jwt='))?.split('=')[1]
}

const getUrl = () => {
   return document.cookie?.split('; ')?.find(row => row.startsWith('cUrl='))?.split('=')[1]
}

// theme_asset - localstorage {}
const mainUrl = `https://${getUrl()??`content-service.siro.mn`}`


// const mainUrl = "http://192.168.230.160:3003"
const testToken = `eyJraWQiOiJ3Z2dvTjU2cDZwbXhyRHl5bm1PQjZiWU5MS3dqQTYySHRBSXRveDJPcVRvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyZmRkYjYxMy1lOWQ2LTRlNTktYTkwYi1hZDk1NjViYzQ2ZjIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfUThERUxpc0dmIiwiY2xpZW50X2lkIjoiMjBtbmM2Z21pcWppa3VtN2lxdGJ1YmtkOXQiLCJvcmlnaW5fanRpIjoiMGVhNjIzYzUtNjc0NC00ZmFjLTgwNTMtNDkxYmQyMGEyYzBmIiwiZXZlbnRfaWQiOiJiZTdhYmNhMC1jMjc5LTQxYzItODFiOC1hMzg3NzcyOTFjNWYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzAzNzI3OTczLCJleHAiOjE3MDQzNDQ5OTcsImlhdCI6MTcwNDI1ODU5NywianRpIjoiNTM0NmJkZDUtNDAzNS00ZmI2LWE1OTYtZGEzZDVkZTI0YjZjIiwidXNlcm5hbWUiOiI5OTgwMTQwNiJ9.dhZTT8opiLbzbW3AaJJt3IXmwpwv0D0IkG7Ps7I80QFtA8srA3DOtq1Xs8lLoy2uggovRw1ZmqKKVqZyhtWumfujapBPF8jXVwgtKOK2NyzILioZvDdC-A7Y32zZnWMJIGou_UvEmpVgzX4RYRX5XONvv8JhfjMVz7WK5V1UT7b7dEve1LJJKtBavP55kuQWrpB6Q6XFICPp39gG-qlFA31boCWsTwm3oteG7Vc0IhV4CTQUKcTZclXw2lvx-1yJsPArjElNAgIh0axzPTlDnAaUYNKZ3oXmiD08qmWZUxGbOBEkdtydHUWA9qXVpkeLqJLq01XpO_F-Gm-3LUH92Q`
const testWebid = `2f8e1f38-0c3f-4422-bdd7-9fb773ec9bbb`
// ['image, video']

const MediaIndex = ({ page, setImage, onCancel, open = true, type="image", webId = testWebid, accessToken = testToken }) => {
   const [ loading, setLoading ] = useState(false); // use global load
   const [ focus, setFocusState ] = useState(initial);
   const [ searchData, setSearchData] = useState({});
   const [ renderData, setRenderData ] = useState({})
   const [ fetchBody, setFetchBody ] = useState({ paths: [], type: 'image', pagination: { size: defaultSize, number: 1 } });

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
         return
         // console.log(err, 'err');
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
   }, [fetchBody.paths?.length, fetchBody.pagination?.number, fetchBody.pagination?.size, fetchBody.type]);

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
         page, searchData, setImage, loading, setFetchBody, fetchBody, setSearchData, renderData, type
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
   // transform:translateY(-10px);
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
