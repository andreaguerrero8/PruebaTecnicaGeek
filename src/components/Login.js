import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginEmailPassAsync,  loginGoogle, loginFaceboook} from "../redux/actions/actionLogin";
import "../styles/Login.css"

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email("El texto ingresado debe ser de tipo pepito@gmail.com")
        .min(5, "Email muy corto, ingresa un email mas largo")
        .max(50, "El email excede el maximo de caracteres permitidos")
        .required("El campo email es requerido"),
    password: Yup.string()
        .min(5, "contraseña muy corta")
        .max(10, "contraseña muy larga")
        .required("El campo contraseña es requerido"),
});

const Login = () => {
    const dispatch = useDispatch();

    const handleLoginGoogle = () => {
        dispatch(loginGoogle());
    };

    const handleLoginFacebook = () => {
        dispatch(loginFaceboook());
    };

    return (
        <div className="container-fluid fondo">
            <div className="logoLogin">
                <Link to="/lading"><img className="logoForm"
                    src="https://res.cloudinary.com/dhu8kck7f/image/upload/v1651170177/jdtpziafit7gp8gv2ftl.png"
                    width="18%"
                    alt="logo"
                /></Link>
            </div>

            <div className="divFormLogin">
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        dispatch(loginEmailPassAsync(values.email, values.password));
                        Form.reset();
                    }}
                >

                    {({ errors, touched }) => (
                        <Form className="formLogin">
                            <center><p className="pIniciar">Iniciar sesión</p></center>

                            <br></br>

                            <label>Direccíon de correo electrónico</label>

                            <Field name="email" type="email" className="field" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}

                            <label> Contraseña</label>
                            <Field
                                name="password"
                                type="password"
                                className="field" /* values={nombre} onChange={handleInputChange} */
                            />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}

                            <center>
                                <button type="submit" className="btnLogin">
                                    Ingresar
                                </button>
                            </center>

                            <div className="btnsAuth">

                                <div className="divGoogle" onClick={() => handleLoginGoogle()}>
                                    <button type="submit" className="google-icon">
                                        <img className="iconGoogle"
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="10%"
                                            alt="google button"
                                        />
                                        Ingresar con Google
                                    </button>
                                </div>

                                <div className="divFacebook" onClick={() => handleLoginFacebook()}>
                                    <button type="submit" className="google-icon">
                                        <img className="iconGoogle"
                                            src="https://res.cloudinary.com/dhu8kck7f/image/upload/v1651013567/kvb6soktdnxk0ndq1tti.png" width="10%"
                                            alt="google button"
                                        />
                                        Ingresar con Facebook
                                    </button>
                                </div>

                            </div>

                        </Form>
                    )}
                </Formik>

                <br></br><br></br>

                <center>

                    <p className="notiene">¿No tienes una cuenta? <Link className="link" to="/register">Crear tu cuenta
                    </Link></p>
                </center>

                <br></br>
                <br></br>

            </div>
        </div>

    );
};

export default Login;
