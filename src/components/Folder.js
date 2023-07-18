import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLoad } from "../context/MediaCtx";
import { SecondaryButton, PrimaryButton } from "./MainWrapper"
// import messageAlert from "miscs/MessageAlert";

const Folder = ({ setFocus }) => {
    const { useLoading, webId, folders, jwt, mainUrl } = useLoad()
    const [ state, setState ] = useState({ path:'home', name:''  })
    
    const [data, setData] = React.useState(
        {
            "paths": [
                {
                    "path": "",
                    "order": ""
                }
            ]
        }
    )

    const change = (e) => {
        setData({ paths: [{ path: e.target.value, order: 1 }] })
    }

    const handleSubmit = async () => {
        // const { signInUserSession: session } = await Auth.currentAuthenticatedUser()
        const token = { headers: { Authorization: `Bearer ${jwt}`, } }
        useLoading(true)
        try {
            await axios.post(`${mainUrl}/image/newFolder`, { webId: webId, ...data }, token)
            // messageAlert("Амжилттай хадгалагдлаа")
            setFocus({ _uploaded_back:true })
        } catch (err) {
            // messageAlert(err)
        } finally {
            useLoading(false)
        }
    }

    const onChange = (name, value) =>{
        setState(prev => ({ ...prev, [name]:value }))
    }

    return (
        <Container >
            <div className="main">
                <div className="body">
                    <div className="input-wrap">
                        <label>Хавтасны нэр</label>
                        <input type="text" name="path" onChange={change} required />
                    </div>
                    <div className="input-wrap">
                        <label>Хавтасны байршил</label>
                        <select  onChange={(event) =>onChange( "path", event.target.value)} value={state.path??``}>
                            <option value="home" >Media Library</option>
                            {folders.map((el,ind) =>{
                                return(
                                    <option key={ind} value={el.key} name={el.key} >{el.key}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>

            <div className="footer">
                <SecondaryButton onClick={()=>setFocus({_back:true})}>Цуцлах</SecondaryButton>
                <PrimaryButton onClick={() => handleSubmit()}>Үүсгэх</PrimaryButton>
            </div>
        </Container>
    )
}

export default Folder

const Container = styled.div`
    .body{
        display: flex;
        padding: 30px;
        align-items: center;
        gap: 15px;
        .checkbox-wrap{
            
        }
        .input-wrap{
            width: calc((100% - 15px) / 2);
            input, select{
                width: 100%;
                border-radius: 4px;
                border: 1px solid ${props=>props.theme.borderColor};
                margin-top:8px;
                &:focus{
                    outline: none;
                }
            }
            label{
                color:${props=>props.theme.lightTextColor};
                font-weight:500;
            }
        }
    }
`