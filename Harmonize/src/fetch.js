import Cookies from 'js-cookie';

export function actualizarCokies() {
    const token = Cookies.get('token')
    fetch('https://localhost:3000/api/data', {
        method: 'GET',
        headers: {
            'auth-token': `${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            // Obtener el nuevo token de la respuesta del servidor
            const newToken = data.newToken;

            // Actualizar el token en las cookies
            Cookies.set('token', newToken, { expires: 2 });

            // Manejar la respuesta
            console.log(data);
        })
        .catch(error => console.error(error));

}

export function getUserData(setUser) {
    const token = Cookies.get('token')
    console.log(token)
    fetch('https://localhost:3000/api/user', {
        method: 'GET',
        headers: {
            
            'auth-token': token,
            
        }
    })
        .then(response => response.json())
        .then(data => {
            // Obtener el nuevo token de la respuesta del servidor
            const user = data.user;

            // Actualizar el token en las cookies
            setUser( user);

            // Manejar la respuesta
            console.log(data);
        })
        .catch(error => console.error(error));

}