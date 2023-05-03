import React, { useState } from 'react';
import * as Yup from 'yup';
import './css/Session.css'
import { useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';
export function Login({ setLoged,serverURL }) {
    const [email, setEmail] = useState('');
    const [token, setToken, removeToken] = useCookies(['token']);
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
                fetch(`${serverURL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        
                    },
                    body: JSON.stringify(values)
                })
                    .then(response => response.json())
                    .then(async (data) => {
                        console.log(data)
                        if (data.ok) {
                            setToken('token', data.data.token);
                            setToken('user', data.data.user);
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




export function Register({serverURL}) {
    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
        age: '01-01-1900'
    });

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    const [errors, setErrors] = useState({});

    const schema = Yup.object().shape({
        email: Yup.string().email('Ingresa un correo electrónico válido').required('El correo electrónico es obligatorio'),
        name: Yup.string().required('El nombre es obligatorio'),
        password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es obligatoria'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .required('Las contraseñas no coinciden'),
        age: Yup.date()
            .max(maxDate, 'Debes tener como mínimo 18 años')
            .min(minDate, 'Ingresa una fecha válida')
            .required('Ingresa tu fecha de nacimiento')
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        schema.validate(values, { abortEarly: false })
            .then(() => {
                fetch(`${serverURL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then(response =>response.json())
                    .then(data =>{ console.log(data)
                        setErrors({})
                    if(data.error){
                        setErrors({
                            
                            ['email']:data.error[0]
                        })
                    }}
                            )
                    
                    

                    
                
            })
            .catch(errors => {
                const validationErrors = {};
                errors.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            });
    };

    return (
        <div className='Session'>
            <div className='register'>
                <form onSubmit={handleSubmit} className=' form'>
                    <label htmlFor="email">Register</label>


                    <input type="email" className='input' placeholder='ejemplo@ejemplo.com' name="email" value={values.email} onChange={handleChange} />
                    {errors.email && <div className="error-message">{errors.email}</div>}


                    <input type="text" className='input' placeholder='Name' name="name" value={values.name} onChange={handleChange} />
                    {errors.name && <div className="error-message">{errors.name}</div>}


                    <input type="password" className='input' placeholder='Contraseña' name="password" value={values.password} onChange={handleChange} />
                    {errors.password && <div className="error-message">{errors.password}</div>}

                    <input type="password" className='input' placeholder='Confirma la contraseña' name="passwordConfirmation" value={values.confirmPassword} onChange={handleChange} />
                    {errors.passwordConfirmation && <div className="error-message">{errors.passwordConfirmation}</div>}


                    <input type="date" className='input' name="age" value={values.age} onChange={handleChange} />
                    {errors.age && <div className="error-message">{errors.age}</div>}
                    <button type="submit">register</button>
                  
                </form>
            </div>
        </div>
    )
}