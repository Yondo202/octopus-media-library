import React, { useState } from "react";
// import styled from "styled-components";
// import { SecondaryButton, PrimaryButton } from "pages/media/components/MainWrapper"
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

const Detail = ({ }) => {
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ aspect: 16 / 9 })

    const cropImageNow = () => {
        const canvas = document.createElement('canvas')
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')

        const pixelRatio = window.devicePixelRatio
        canvas.width = crop.width * pixelRatio
        canvas.height = crop.height * pixelRatio
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.imageSmoothingQuality = 'high'

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        // Converting to base64
        if (focus.data?._source) {
            const base64Image = btoa(image)
            // console.log(base64Image)
        } else {
            const base64 = canvas.toDataURL('image/jpeg')
            const base64Image = base64.slice(23)
            // setImages([base64Image])
            // convertFile(base64Image)
        }
    };

    return (
        <div >
            {/* <ReactCrop
                src={focus.data?._source ? focus.data?._source.url : focus.data}
                onComplete={(e) => {
                    const img = document.querySelector('#cropInstance')
                    setImage(img)
                }}
                crop={crop}
                onChange={c => setCrop(c)}
            >
                <img id="cropInstance" src={focus.data?._source ? focus.data?._source.url : `data:image/png;base64, ${focus.data}`} alt='img' />
            </ReactCrop> */}
        </div>
    )
}

export default Detail

// const convertFile = (base64) => {
//     const blob = atob(base64)
//     const newFile = new File([blob], imageFile.name, { type: imageFile.type })
//     SetImageFile(newFile)
// }
