import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterAsyncronico } from '../redux/actions/actionRegister';
import "../styles/Registro.css"

const SignupSchema = Yup.object().shape({

    nombre: Yup.string().min(2, 'El nombre es muy corto').max(50, 'el nombre excede el maximo de caracteres permitidos').required('El nombre campo es obligatorio'),
    email: Yup.string().email('El texto ingresado debe ser de tipo pepito@gmail.com').min(5, 'Email muy corto, ingresa un email mas largo').max(50, 'El email excede el maximo de caracteres permitidos').required('El email es un campo obligatorio'),
    pass1: Yup.string().min(5, 'contraseña muy corta').max(10, 'contraseña muy larga').required('el password es obligatorio').oneOf([Yup.ref('pass2')], 'Las Contraseñas no coinciden'),
    pass2: Yup.string().min(5, 'contraseña muy corta').max(10, 'contraseña muy larga').required('el password es obligatorio').oneOf([Yup.ref('pass1')], 'Las Contraseñas no coinciden')
});

const Registro = () => {

    const dispatch = useDispatch()

    return (
        <div className="container-fluid fondo">
            <div className="logoRegistro">
                <Link to="/lading"><img className="logoForm"
                    src="https://res.cloudinary.com/dhu8kck7f/image/upload/v1651170177/jdtpziafit7gp8gv2ftl.png"
                    width="15%"
                    alt=""
                /></Link>
            </div>

            <div className='divFormRegistro'>

                <Formik
                    initialValues={{
                        nombre: '',
                        email: '',
                        pass1: '',
                        pass2: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        dispatch(RegisterAsyncronico(values.nombre, values.email, values.pass1))
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="formLogin">
                            <center><p className="pCrear">Crear Cuenta</p></center>
                            <br></br>

                            <label> Tu nombre</label>
                            <Field name="nombre" type="text" className="field" /* values={nombre} onChange={handleInputChange} */ />
                            {errors.nombre && touched.nombre ? (
                                <div>{errors.nombre}</div>
                            ) : null}

                            <label> Correo electrónico</label>
                            <Field name="email" type="email" className="field" /* values={nombre} onChange={handleInputChange} */ />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}

                            <label> Contraseña</label>
                            <Field name="pass1" type="password" placeholder="Como mínimo 6 caracteres" className="field" /* values={nombre} onChange={handleInputChange} */ />
                            {errors.pass1 && touched.pass1 ? <div>{errors.pass1}</div> : null}

                            <label> Vuelve a escribir la contraseña</label>
                            <Field name="pass2" type="password" className="field" /* values={nombre} onChange={handleInputChange} */ />
                            {errors.pass2 && touched.pass2 ? <div>{errors.pass2}</div> : null}

                            <center>

                                <button type="submit" className="btnRegistro">Registrame</button>

                                <br></br><br></br>

                                <p className="yatienes">¿Ya tienes una cuenta? <Link to="/login" className="linkRegistro"> Iniciar sesión </Link></p>

                            </center>

                            <br></br>
                            

                        </Form>


                    )}
                </Formik>
            </div>
        </div>

    )
}

export default Registro