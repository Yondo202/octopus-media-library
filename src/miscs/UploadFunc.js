import axios from 'axios';

const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', "image/gif"];

const documentTypes = [ 
    'application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

export const allTypes = acceptedImageTypes.concat(documentTypes)

// const documentTypes = {
//     'application/pdf': 'pdf',
//     'application/vnd.ms-excel': 'xls',
//     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
//     'application/msword': 'doc',
//     'application/vnd.openxmlformats-officedocument.wordprocessingml.document':'docx',
// };

export const InsertImage = (file) => {
    let filEname = file.name?.slice(0, file.name?.lastIndexOf('.'));
     
    return new Promise((resolve) =>{
        if (!allTypes.includes(file.type)) {
            return window.alert("Хавсаргах боломжгүй файл байна!")
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

export const download = (data) => {
    const link = document.createElement("a");
    link.href = data.url;
    link.download = data.title;
    link.target = "_blank"
    document.body.appendChild(link);
    link.click();
};