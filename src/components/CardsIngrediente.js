import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { addAsync, deleteAsync, listAsyn } from '../redux/actions/actionAcciones'
import Swal from 'sweetalert2'
import { useForm } from '../hooks/useForm'
import { FileUp } from '../helpers/FileUp'
import '../styles/divCards.css'
import { useState } from 'react'
import Editar from './Editar'
import { useEffect } from 'react'

const CardsIngrediente = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listAsyn())
    }, [])

    const { acciones } = useSelector(store => store.acciones)


    const [formValue, handleInputChange, reset] = useForm({
        nombre: '',
        marca: '',
        precio: '',
        gramos: '',
        foto: '',
        id: uuid()

    })

    const { nombre, marca, gramos, precio, foto, id } = formValue

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addAsync(formValue))
        reset()
    }


    let timerInterval;

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        //el FileUp es la configuracion con cloudinary y le asigno la respuesta de cloudinary a la foto
        FileUp(file)
            .then(resp => {

                Swal.fire({
                    title: 'Cargando Imagen!',
                    html: 'Espera <b></b> milisegundos.',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })

                formValue.foto = resp

            })
            .catch(error => {
                console.warn(error)
            })

    }


    //-------------------------eliminar------------------------//
    const handleEliminar = (id) => {

        Swal.fire({
            title: 'Eliminar Producto?',
            text: "¿Desea eliminar este Producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(deleteAsync(id))

                Swal.fire(
                    'Producto Eliminado!'
                )
            }
        })

        console.log(id);
    }


    //-------------------editar modal-------------//
    const [modal, setModal] = useState(false) //indicarle al modal que se active o no 
    const [enviarDatosModal, setEnviarDatosModal] = useState([])

    const editar = (id) => {
        // //--------t= conseguir los datos de ese objeto con ese id--------------//
        const traerAcciones = acciones.find(t => t.id === id)

        setModal(true)
        setEnviarDatosModal(traerAcciones)
        console.log(traerAcciones);

    }


    return (
        <div className="container-fluid cont">
            <div className="row">

                <center>
                    <h1>Productos En Tienda</h1>
                    <br></br>
                    <br></br>
                </center>


                {
                    acciones.map(Ingredientes => (
                        <Card style={{ width: '17rem' }} key={Ingredientes.id}>
                            <Card.Img variant="top" src={Ingredientes.foto} />
                            <Card.Body>
                                <Card.Title>{Ingredientes.nombre}</Card.Title>
                                <Card.Text>
                                    Marca: {Ingredientes.marca} / Precio: {Ingredientes.precio}
                                </Card.Text>
                                <Button variant="secondary" className="btnEditar" onClick={() => editar(Ingredientes.id)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleEliminar(Ingredientes.id)}>Eliminar</Button>
                            </Card.Body>
                        </Card>
                    ))

                }


            </div>

            <br></br>
            <br></br>

            <hr></hr>

            <br></br>
            <br></br>



            <div className="divFormCards">
                <center>
                    <h1>Agregar Productos</h1>
                    <br></br>
                    <br></br>
                </center>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control type="text" name="nombre" required placeholder="Nombre del Producto" value={nombre} onChange={handleInputChange} />

                        <Form.Label>Marca</Form.Label>
                        <Form.Control type="text" name="marca" required placeholder="Descripción del Producto" value={marca} onChange={handleInputChange} />

                        <Form.Label>Gramos</Form.Label>
                        <Form.Control type="text" name="gramos" required placeholder="Categoría del Producto" value={gramos} onChange={handleInputChange} />

                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="number" name="precio" required placeholder="Precio del producto" value={precio} onChange={handleInputChange} />

                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" name="foto" required onChange={handleFileChange} />
                    </Form.Group>

                    <center>
                        <Button variant="primary" type="submit">
                            Agregar Producto
                        </Button>
                    </center>
                </Form>
                <br></br>
                <br></br>
                <br></br>
            </div>
            {

                modal === true ? <Editar modal={enviarDatosModal} setModal={setModal} /> : ''
            }

        </div>
    )

}

export default CardsIngrediente