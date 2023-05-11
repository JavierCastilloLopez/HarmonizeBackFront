
import "./css/upload.css"
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from 'react-cookie'
export function UploadSong({serverURL}) {

    return (

        <FileUploader serverURL={serverURL}></FileUploader>

    )


}




function FileUploader({serverURL}) {
    const generosMusicales = ["rock", "pop", "jazz", "blues", "hip hop", "electrónica", "reggae", "folk", "country", "clásica"];
    const [token, setToken, removeToken] = useCookies(['playlist']);
    const [titulo, setTitulo] = useState("");
    const [artista, setArtista] = useState("");
    const [genero, setGenero] = useState("Rock");
    const [imagenCancion, setImagenCancion] = useState(null);
    const [cancion, setCancion] = useState(null);
    const [duration, setDuration] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        uploadFile()
    };
    const handleSong = (file) => {
        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
            return `${formattedMinutes}:${formattedSeconds}`;
        }
        setCancion(file)
        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
            setDuration(formatTime(audio.duration))
            console.log(duration)
        }

    };
    const uploadFile = () => {



        const formData = new FormData();
        formData.append('cancion', cancion);
        formData.append('artista', artista);
        formData.append('genero', genero);
        formData.append('imagenCancion', imagenCancion);
        formData.append('titulo', titulo.toLowerCase());
        formData.append('duration', duration);

        fetch(`${serverURL}/api/upload`, {
            method: 'POST',
            headers: {

                'auth-token': `${token.token}`
            },
            body: formData,
        }).then((response) => response.json());
    }
    console.log(cancion)
    return (

        <div className='register'>
            <form className=' form' onSubmit={handleSubmit}>
                <label>Sube tu musica</label>



                <input type="text" placeholder="Título" className="input" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <input type="text" placeholder="Artista" className="input" value={artista} onChange={(e) => setArtista(e.target.value)} />
                <select className="input" onChange={(e) => setGenero(e.target.value)}>
                    {generosMusicales.map(genero => (
                        <option key={genero} value={genero.charAt(0).toUpperCase() + genero.substring(1).toLowerCase()}>{genero.charAt(0).toUpperCase() + genero.substring(1).toLowerCase()}</option>
                    ))}
                </select>
               

                <div className={imagenCancion ?"file-selected":"file-upload"} onClick={() => document.querySelector(".input-image").click()}>
                   <FontAwesomeIcon icon={faUpload}/>
                    <h2>{imagenCancion ? imagenCancion.name:"Click para subir la imagen"}</h2>
                    <input className="file input-image" type="file" accept="image/*" onChange={(e) => setImagenCancion(e.target.files[0])} />

                </div>
                <div className={cancion ?"file-selected":"file-upload"} onClick={() => document.querySelector(".input-song").click()}>
                   <FontAwesomeIcon icon={faUpload}/>
                    <h2>{cancion ? cancion.name:"Click para subir el archivo de sonido"}</h2>
                    
                    <input type="file" className="file input-song" accept="audio/*" onChange={(e) => handleSong(e.target.files[0])} />

                </div>
             
                <button type="submit">Subir canción</button>
            </form>
        </div>




    );
}




