import axios from 'axios';

export const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', "image/gif"];

export const InsertImage = (file) => {
    let filEname = file.name?.slice(0, file.name?.lastIndexOf('.'));
     
    return new Promise((resolve) =>{
        if (!acceptedImageTypes.includes(file.type)) {
            return window.alert("Зөвхөн зураг хавсаргах боломжтой")
        }else {
            let imageUrl = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function () {
                const string = btoa(reader.result);
                let data = { ...file, file: file, type: file.type, url: imageUrl, base64: string, alt: filEname, name: filEname, title:filEname };
                resolve({ data:data });
            };
        }
    })
}

export const UploadImage = async ({ focus, fetchBody, jwt, webId, mainUrl, useLoading }) => {
    useLoading(true);
    let formData = new FormData();
    formData.append('file', focus.data.file);
    formData.append('type', focus.data.type);
    formData.append('title', focus.data.title);
    formData.append('alt', focus.data.alt);
    if (fetchBody.paths?.length > 0) {
       formData.append('paths', JSON.stringify(fetchBody.paths));
    }
    const token = { headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${jwt}`, webId: webId } };

    try {
        const res = await axios.post(`${mainUrl}/image/upload`, formData, token);
        return { data:res.data.data }
    }catch(err) {
        return window.alert('Хүсэлт амжилтгүй');
    }finally {
        useLoading(false);
    }
}