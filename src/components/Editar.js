import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm'
import Swal from 'sweetalert2';
import { Button, Form, Modal } from 'react-bootstrap';
import { editAsync, listAsyn } from '../redux/actions/actionAcciones';
import uuid from 'react-uuid';


const Editar = ({ modal, setModal }) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false)
        setModal(false)
    };

    const [formValue, handleInputChange] = useForm({
        nombre: modal.nombre,
        marca: modal.marca,
        precio: modal.precio,
        gramos: modal.gramos,
        id: modal.id

    })

    const { nombre, id, marca, gramos, precio  } = formValue

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editAsync(id, formValue))
        // dispatch(listAsyn())
        Swal.fire(
            'producto Editado Correctamente!'
        )
        

        handleClose()

    }


    return (
        <div>
            <>
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Planta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={()=>handleSubmit()}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nombre del Productos</Form.Label>
                                <Form.Control type="text" name="nombre" placeholder="Ingrese el nombre del producto" value={nombre} onChange={handleInputChange} />

                                <Form.Label>Marca</Form.Label>
                                <Form.Control type="text" name="marca" placeholder="Ingrese la marca del producto" value={marca} onChange={handleInputChange} />

                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="text" name="precio" placeholder="Ingrese el precio del producto" value={precio} onChange={handleInputChange} />

                                <Form.Label>Gramos</Form.Label>
                                <Form.Control type="text" name="gramos" placeholder="Ingrese los gramos del producto" value={gramos} onChange={handleInputChange} />

                            </Form.Group>

                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button type="submit" variant="primary" onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Form>

                    </Modal.Body>


                </Modal>
            </>
        </div>

    );
}

export default Editar