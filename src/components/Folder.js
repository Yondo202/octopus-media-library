import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLoad } from '../context/MediaCtx';
import RouteHead from '../miscs/RouteHead';
import { SecondaryButton, PrimaryButton } from './MainWrapper';
// import messageAlert from "miscs/MessageAlert";

const Folder = ({ setFocus, focus, fetchBody }) => {
   const { useLoading, webId, jwt, mainUrl } = useLoad();
   const [ newFolder, setNewFolder ] = useState({ path:'', order:'' })
 
   useEffect(() => {
      if (focus.data?.key) {
         setNewFolder({ path:focus.data?.key });
      }
   }, []);

   // ** order uudiig static avahiig boliul
   const handleSubmit = async (status) => {
      // const { signInUserSession: session } = await Auth.currentAuthenticatedUser()
      const token = { headers: { Authorization: `Bearer ${jwt}`, webId: webId } };
      useLoading(true);

      try {
         if (status === 'delete') {
            await axios({
               url: `${mainUrl}/image/deleteFolderWithImages`,
               method: 'delete',
               data: { paths: [{ path: focus.data.key, order: fetchBody.paths?.length + 1 }] },
               headers: token.headers,
            });
         } else {
            if(!newFolder.path && newFolder.path === "") return window.alert('Хавтасны нэр оруулна уу')
               
            if (focus.data?.key) {
               await axios.put(`${mainUrl}/image/updateFolder`, { path: newFolder.path, paths:[{ path:focus.data?.key, order:fetchBody.paths?.length + 1 }] }, token);
            } else {
               await axios.post(`${mainUrl}/image/newFolder`, { paths: [ ...fetchBody.paths, newFolder ] }, token);
            }
         }
         setFocus({ _uploaded_back: true });
      } catch (err) {
         // console.log(err);
         return
      } finally {
         useLoading(false);
      }
   };

   const onChange = (value) => {
      setNewFolder({ path:value, order:fetchBody.paths?.length + 1 })
   };

   return (
      <Container>
         <div className="main">
            {focus.data?.key && (
               <div className="info_parent">
                  <div className="children">
                     <span className="title">Хавтас дотор: ( {focus.data?.doc_count} ) - Зураг байна</span>
                  </div>
               </div>
            )}
            
            <div className="inp_body">
               <RouteHead fetchBody={fetchBody}/>
               <div className="input-wrap">
                  <label>Хавтасны нэр</label>
                  <input
                     type="text"
                     onChange={(event) => onChange(event.target.value)}
                     //  disabled={!!focus.data?.key}
                     // required
                     // value={focus.data ? focus.data?.key : state.name}
                     placeholder='Хавтасны нэр...'
                     value={newFolder.path}
                  />
               </div>
            </div>
         </div>

         <div className="footer">
            <SecondaryButton onClick={() => setFocus({ _back: true })}>Цуцлах</SecondaryButton>
            <div className="addition">
               {focus.data?.key && (
                  <PrimaryButton onClick={() => handleSubmit('delete')} danger>
                     Хавтас устгах
                  </PrimaryButton>
               )}
               <PrimaryButton onClick={() => handleSubmit()}>Хадгалах</PrimaryButton>
            </div>
         </div>
      </Container>
   );
};

export default Folder;

const Container = styled.div`
   .main {
      .info_parent {
         padding: 16px 24px;
         border-radius: 4px;

         display: grid;
         grid-template-columns: repeat(12, 1fr);
         gap: 16px;
         .children {
            grid-column: span 6 / auto;
            max-width: 100%;
            align-items: stretch;
            display: flex;
            flex-direction: column;
            gap: 4px;
         }
      }
   }
   .inp_body {
      display: flex;
      flex-direction:column;
      padding: 30px;
      align-items: start;
      gap: 15px;
      background: ${(props) => props.theme.boxBackground};
      .input-wrap {
         width: calc((100% - 15px) / 2);
         input {
            width: 100%;
            border-radius: 4px;
            border: 1px solid ${(props) => props.theme.sectionBorderColor};
            margin-top: 8px;
            padding:10px 12px;
            background: ${(props) => props.theme.boxBackground};
            color: ${(props) => props.theme.textColor};
            &:focus {
               outline: none;
            }
            &::placeholder{
               opacity:0.5;
            }
         }
         label {
            color: ${(props) => props.theme.lightTextColor};
            font-weight: 500;
         }
      }
   }
`;
