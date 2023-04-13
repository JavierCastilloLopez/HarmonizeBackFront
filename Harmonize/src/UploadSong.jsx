

import { useRef } from 'react';
import {useCookies} from 'react-cookie'
export function UploadSong() {

    return (

        <FileUploader></FileUploader>

    )


}




function FileUploader() {
    const fileInputRef = useRef(null);
    const [token, setToken, removeToken] = useCookies(['playlist']);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        uploadFile(file)
    };
    const uploadFile=(file)=>{
       
      
          const formData = new FormData();
          formData.append('cancion', file);
          formData.append('artista', 'Adele');
          console.log('aa')
          fetch('http://localhost:3000/api/upload', {
              method: 'POST',
              headers: {
                   
                  'auth-token': `${token.token}`
                },
              body: formData,
          }).then((response) => response.json());
      }

    return (
        <div>
            <input
                type="file"
                accept="audio/mp3"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
            <button onClick={() => fileInputRef.current.click()}>
                Select MP3 file
            </button>
        </div>
    );
}




