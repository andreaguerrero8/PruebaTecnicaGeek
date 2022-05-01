import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutAsync } from '../redux/actions/actionLogin'
import '../styles/NavBars.css'

const NavBars = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutAsync())
        navigate("/login")

    }
    return (
        <>
            <Navbar expand="md">
                <Container fluid className="conatinerNav">
                    <Navbar.Brand>
                        <Link to="/">
                            <img
                                src="https://res.cloudinary.com/dhu8kck7f/image/upload/v1651170177/jdtpziafit7gp8gv2ftl.png"
                                width="30%"
                                className="d-inline-block align-top logoNavDentro"
                                alt="logo"
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" >
                        <Nav
                            className="me-0 my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link><Link to="/" className="linkDentroCar">Carro Rissoto</Link></Nav.Link>
                            <Nav.Link><Link to="/add" className="linkDentroCar">Más Ingredientes</Link></Nav.Link>
                            <Nav.Link className="linkDentro" onClick={logout}>Cerrar sesion</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBars