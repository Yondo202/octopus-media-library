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

// theme_asset - localstorage {}
const mainUrl = "https://content-service.siro.mn"
// const mainUrl = "http://192.168.230.160:3003"
// const testToken = `eyJraWQiOiJsU2RNcWtQbHFzc0dOVzJUejJkeDMrWjVGejR6U2UrUkFBNFwvanZKRWFcL009IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjM2VkMTBiYi1kNTc1LTQ5ZTItODUyMi1kMDcwYzdlOGRiZmEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfbDZEUDZaYnV2IiwiY2xpZW50X2lkIjoiMmtiN3VrdnY2Ymk4YnBtZW9nNHYxdjQ4dWYiLCJvcmlnaW5fanRpIjoiNDJmNjRmZTgtMzQ4NS00ODQ2LTlmNDItNGQ2MWUzNzdmNjkzIiwiZXZlbnRfaWQiOiIwMGYwNWM3Mi1mODQ1LTQ5YTQtOWQ3MC0wYzc0MjIyNjEzZTkiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk1Nzc2MDEzLCJleHAiOjE2OTU4NjI0MTMsImlhdCI6MTY5NTc3NjAxMywianRpIjoiZDQxMzhlNDItNDgxNC00ZGYwLTlkODEtNDJiOTQ1NjBjMjZhIiwidXNlcm5hbWUiOiI5MDgwMDE1MCJ9.WwRS8ixfPbvZMSixCT7XyUrCAGno3NGVNMtV7kWt9qC-2eW0sD2-EYKTsNP_yA-NheoUWie2IKDsJHfN_5Etyz9L6nrp34bo-zZ4Gq4uWPTMQoDSMEMEyvv3XhY_0CZxoQDyd4Vap71_OW8N8uaQhU269sSLvMs98vXR330Fkznvcn2UL7qXMwvgtlHllqaAbc9VJgPrxOd-LWQ_Nyc9AG_N7AaDuPR6buUFer9qkQI80T9GH1LUmkVgQa6Hu2kWRoCV9TkO1nuWJtAMIUg9oi618juIPPTarw6PTsnP4r0EFRwy3VFTRI-DfJGKU2OuXYHQwsRllhvA7QXBGXOOWg`
// const testWebid = `ed3cc972-e978-44b7-aeab-5b25d5fd7124`

const MediaIndex = ({ page, setImage, onCancel, open, webId = getWebId(), accessToken = getJwt() }) => {
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
