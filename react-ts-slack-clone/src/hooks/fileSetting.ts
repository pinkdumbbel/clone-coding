import { DragEvent } from 'react';

function FileSetting(e?: DragEvent<HTMLDivElement>): [FormData, string] {
    const data = e?.dataTransfer;
    const formData = new FormData();
    let fileName = '';
    
    if(data) {
        if(data.items){
            for(let i = 0; i<data.items.length; i++) {
                if(data.items[i].kind==='file'){
                    let file = data.items[i].getAsFile();
                    file && formData.append('image', file);
                    fileName = file ? file.name : fileName;
                }
            }
        }else {
            for(let i = 0; i<data.files.length; i++) {
                formData.append('image', data.files[i]);
                fileName = data.files[i].name;
            }
        }
    }
    return [formData, fileName];
}

export default FileSetting