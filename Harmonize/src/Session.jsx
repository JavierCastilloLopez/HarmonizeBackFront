import React, { useState } from 'react';
import * as Yup from 'yup';
import './css/Session.css'
import { useNavigate } from 'react-router-dom';
export function Login({ setLoged }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('Ingrese su correo electrónico'),
        password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('Ingrese su contraseña'),
    });

    const handleEmailChange = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let values = { email, password }
        try {
            await schema.validate(values, { abortEarly: false }).then(() => {
                fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then(response => response.json())
                    .then(async (data) => {
                        if (data.ok) {
                            await setLoged({ loged: true, headers: { 'Content-Type': 'application/json', 'auth-token': data.data.token } })
                            navigate('/')
                        } else {
                            setErrors({ email: data.err.message, email: data.err.message })


                        }

                    })
                    .catch(error => console.error(error));
            });

        } catch (error) {
            if (error.inner) {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            }
        }
    };

    const emailClassName = errors.email ? 'input-error' : '';
    const passwordClassName = errors.password ? 'input-error' : '';

    return (
        <div className='Session'>






            <div className="loginForm">
                <form onSubmit={handleSubmit} className='form'>
                    <label aria-hidden="true">Log in</label>

                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`${emailClassName} input`}
                    />
                    <span className="error-message">{errors.email}</span>



                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`${passwordClassName} input`}
                    />
                    <span className="error-message">{errors.password}</span>


                    <button type="submit" className='submitLoginForm' >Iniciar sesión</button>
                </form>
            </div>

        </div>
    );
};



export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('Ingrese su correo electrónico'),
        password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('Ingrese su contraseña'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden. Inténtalo de nuevo.'),
    });

    const handleEmailChange = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let values = { email, password,confirmPassword }
        try {
            await schema.validate(values, { abortEarly: false }).then(() => {
                fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then(response => response.json())
                    .then(async (data) => {
                        if (data.ok) {
                            await setLoged({ loged: true, headers: { 'Content-Type': 'application/json', 'auth-token': data.data.token } })
                            navigate('/')
                        } else {
                           console.log(data)


                        }

                    })
                    .catch(error => console.error(error));
            });

        } catch (error) {
            if (error.inner) {
                const newErrors = {};
                error.inner.forEach((err) => {
                    console.log(err.message)
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            }
        }
    };

    const emailClassName = errors.email ? 'input-error' : '';
    const passwordClassName = errors.password ? 'input-error' : '';
    const confirmPasswordClassName = errors.confirmPassword ? 'input-error' : '';

    return (
        <div className='Session'>






            <div className="loginForm">
                <form onSubmit={handleSubmit} className='form'>
                    <label aria-hidden="true">Log in</label>

                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`${emailClassName} input`}
                    />
                    <span className="error-message">{errors.email}</span>



                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`${passwordClassName} input`}
                    />
                    <span className="error-message">{errors.Password}</span>
                    <input
                        placeholder="Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={`${confirmPasswordClassName} input`}
                    />
                    <span className="error-message">{errors.confirmPassword}</span>


                    <button type="submit" className='submitLoginForm' >Registrarse</button>
                </form>
            </div>

        </div>
    );


    return

}