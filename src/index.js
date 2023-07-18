import React, { useState, useEffect } from "react";
import { CustomContext } from "./context/MediaCtx";
import styled, { ThemeProvider } from "styled-components";
import { config, titles } from "./miscs/config"
import FileDetail from "./components/FileDetail";
import Move from "./components/Move";
import Loading from "./miscs/Loading";
import MediaModal from "./miscs/MediaModal";
import MainWrapper from "./components/MainWrapper";
import Error from "./miscs/Error";
// import { Auth } from 'aws-amplify';
import axios from "axios";
import MediaUpload, { UploadFinal } from "./components/MediaUpload"; // huselttei comp
import Folder from "./components/Folder"; // huselttei comp

const initial = { type: `main`, title: '', data: {}, chain: [{ type: 'main' }] }

const mainUrl = "https://content-service.siro.mn"

const testToken = `eyJraWQiOiJsU2RNcWtQbHFzc0dOVzJUejJkeDMrWjVGejR6U2UrUkFBNFwvanZKRWFcL009IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjM2VkMTBiYi1kNTc1LTQ5ZTItODUyMi1kMDcwYzdlOGRiZmEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfbDZEUDZaYnV2IiwiY2xpZW50X2lkIjoiMmtiN3VrdnY2Ymk4YnBtZW9nNHYxdjQ4dWYiLCJvcmlnaW5fanRpIjoiY2U0NjFhNzEtNjMwYS00NTJlLThhZWYtN2I5MjU3MWVjNjMwIiwiZXZlbnRfaWQiOiJhNWZlNmY1OC04NjNmLTQzNzItOWU3NS00NGU4MTNjOGJjOGEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjg5NjQ4NzgyLCJleHAiOjE2ODk3NTc5MTksImlhdCI6MTY4OTY3MTUxOSwianRpIjoiZjI2ZjlhZGMtMzcwNy00MTRlLThiMTQtOTgxZjEzM2JhZWNkIiwidXNlcm5hbWUiOiI5MDgwMDE1MCJ9.hIPkRXlljkYSR8_FCMsLt7q-Oj-j8yeF-2GlqKyup-y5H8Snjfn6O4efPRK7NRfVQ2Tib3TRyvK6zegiDE2FepZBm_fUjDegG6d1YVvs2vUK64fko_v4-1G6M_0dY7X-Ze0cnYHFzFI9OCm9xI-LdJg-97PLeUCuKyO_W7uzvetKYpot8ajwEQebhJE83B3cf76zWE3JJ7E7PvIszH4zR1DtPaW2-XAV3fFW3W_P7Z6Z9BAP8YQB1xFbextwgqPN5qGy697MemTtq_DjHd2FwfWBH5bi5vqaee_xNcst9wnObzn3VUrSGmUyYonWOUU8BNlavinQROJl7WPz3q5S6A`
const testWebid = `3b53a7ec-36bc-4db3-8ccf-ac1163a674c3`
const testOpenState = true

const MediaIndex = ({ page = testOpenState, setImage, onCancel, open, webId = testWebid, accessToken = testToken }) => {
    const [ loading, setLoading ] = useState(false) // use global load
    const [ focus, setFocusState ] = useState(initial)
    const [ data, setData ] = useState({})

    // webId -- damjuuldag bolno
    const setFocus = (data) => {
        setFocusState(prev => {
            let force = { ...initial, _back: true }
            if(data._uploaded_back) return { ...force,  _uploaded_back:true}
            if (!data._back) return { ...data, chain: [...prev.chain, data] }
            if (prev.chain.length <= 1) return force
            let chains = prev.chain.slice(-2).slice(0, 1)[0]
            return { ...chains, chain: prev.chain.slice(0, prev.chain.length - 1) }
        })
    }

    KeyPress('Escape', setFocus, { _back: true })

    const fetch = async () => {
        setLoading(true)
    
        const token = { headers: { Authorization: `Bearer ${accessToken}`, } }
        // pagination: { size: size, number: number }
        try {
            const res = await axios.post(`${mainUrl}/image/list`, { webId: webId }, token)
            setData(res.data.data)
        } catch (err) {
            console.log(err, "err")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        setFocusState(initial)
        if (page || open) fetch()
    }, [open])

    useEffect(() => {
        new Promise(() => {
            if (!page && focus._back){
                if(!focus._uploaded_back) onCancel?.(false)
                fetch()
            }else if(page && focus._uploaded_back){
                fetch()
            }
        }).then( setFocusState(initial) )
    }, [focus._back, focus._uploaded_back])

    const Details = {
        main: {
            Component: (props) => <MainWrapper {...props} />,
            page, data, setImage, loading
        },
        detail: { Component: (props) => <FileDetail {...props} />, focus },
        upload: { Component: (props) => <MediaUpload {...props} /> },
        finalupload: {  Component: (props) => <UploadFinal {...props} />, page, setImage, focus },
        folder: { Component: (props) => <Folder {...props} /> },
        move: { Component: (props) => <Move {...props} /> }
    }

    return (
        <ThemeProvider theme={config} >
            <CustomContext mainUrl={mainUrl} webId={webId} folders={data?.folders??[]} jwt={accessToken}>
                <Container page={page}>
                    {(!webId && page) ? <Error /> : page && Details['main'].Component({...Details['main'], setFocus})}
                    <MediaModal title={titles[focus.type]} open={focus.type !== "main" || open} onCancel={() => setFocus({ _back: true })}>
                        <Loading withGhost={true} />
                        {!webId ?  <Error /> : Details?.[focus.type]?.Component({ ...Details[focus.type], setFocus:setFocus }) }
                    </MediaModal>
                </Container>
            </CustomContext>
        </ThemeProvider>
    )
}

export default MediaIndex

const Container = styled.div`
    position:relative;
    padding-bottom:${props => props.page ? `70px` : `0px`};
`

function KeyPress(targetKey, handleFunc, passValue) {
    const keyPress = React.useCallback(e => {
        if (!handleFunc) return
        if (e.key === targetKey) {
            if (passValue) return handleFunc(passValue)
            handleFunc(false)
        }
    }, []);

    React.useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);
}