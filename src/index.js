import React, { useState, useEffect } from 'react';
import { CustomContext } from './context/MediaCtx';
import styled, { ThemeProvider } from 'styled-components';
import { config, titles } from './miscs/config';
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


const mainUrl = "https://content-service.siro.mn"
const testToken = `eyJraWQiOiJsU2RNcWtQbHFzc0dOVzJUejJkeDMrWjVGejR6U2UrUkFBNFwvanZKRWFcL009IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjM2VkMTBiYi1kNTc1LTQ5ZTItODUyMi1kMDcwYzdlOGRiZmEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfbDZEUDZaYnV2IiwiY2xpZW50X2lkIjoiMmtiN3VrdnY2Ymk4YnBtZW9nNHYxdjQ4dWYiLCJvcmlnaW5fanRpIjoiZTAyYWMyYmMtZDkyNC00NWY3LWJmZWYtNzQ4ZjAzNTMzOTQ1IiwiZXZlbnRfaWQiOiJkODVlOGJjNC03MGIzLTRlZGEtOTY5OS0yYjMwYjhlYmNhMDQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjkwNDU2MjU2LCJleHAiOjE2OTA4NTc5MzgsImlhdCI6MTY5MDc3MTUzOCwianRpIjoiMDIzOGJhZmMtZWYwZS00ODYwLWEyMzItMzcyYzAxOWE5OWU0IiwidXNlcm5hbWUiOiI5MDgwMDE1MCJ9.gKkukO2VAH5wzFy70o07qcLYXn8sEb5PZCzIYq984kTv1rDNRelbrg3dLTSmN64nxCjftnvegSqF0D32AJ-zT_aKLBVTRn6fau3oQSkEsF0VyZ9_yrf6zLnN_n4eJshi-RGdxq8iqVzccmpWa5qbAtIKhT3HaxHbPKmR6EudyMTl6yBDjQy8yXjA4KGtX4PWjL1ummRrWyUtljn87KD1zqVOzCzd1JE0kHmxl6V7mY7LYVjMRUzMhWOuq21oYEkvz2XmRHUd37iGpqMO5itHfMvtyRxGeWTmfw1-9IanYNQtsFbKbTbmxcKR4WUV_X_Rj9xIkc3rB7f3ho2KPVDnng`
const testWebid = `c795bdf9-8f8d-4fe0-b6c1-662a5ce2b840`
const testOpenState = true

const MediaIndex = ({ page, setImage, onCancel, open = testOpenState, webId = testWebid, accessToken = testToken, theme }) => {
   const [loading, setLoading] = useState(false); // use global load
   const [focus, setFocusState] = useState(initial);
   const [ data, setData] = useState({});
   const [ renderData, setRenderData ] = useState({})
   // , sort: { column: "createdAt", order:'0' }
   const [fetchBody, setFetchBody] = useState({ paths: [], pagination: { size: 10, number: 1 } });

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
            setData({ images:{ data:res.data.data }, search:prop.search });
         }else{
            const res = await axios.post(`${mainUrl}/image/list`, fetchBody, token);
            setData(res.data.data);
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
               fetch(data);
            }
         } else if (page && focus._uploaded_back) {
            fetch(data);
         }
      }).then(setFocusState(initial));
   }, [focus._back, focus._uploaded_back]);

   const Details = {
      main: {
         Component: (props) => <MainWrapper {...props} />,
         page, data, setImage, loading, setFetchBody, fetchBody, setData, renderData
      },
      detail: { Component: (props) => <FileDetail {...props} />, focus, fetchBody },
      upload: { Component: (props) => <MediaUpload {...props} /> },
      finalupload: { Component: (props) => <UploadFinal {...props} />, page, setImage, focus, fetchBody },
      folder: { Component: (props) => <Folder {...props} />, focus, fetchBody },
      move: { Component: (props) => <Move {...props} /> },
   };

   const ctxProps = { mainUrl:mainUrl, webId:webId , jwt:accessToken }

   return (
      <ThemeProvider theme={theme?.theme ?? config}>
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
