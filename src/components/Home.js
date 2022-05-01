import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { listDatosAsyn } from '../redux/actions/actionDatos';
import '../styles/Home.css'

const Home = () => {

  //-----estados usados en la app-------//
  const [cantidad, setCantidad] = useState(0)
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [datoss, setDatoss] = useState([])
  const [envio, setEnvio] = useState(0)

  //------seleccionar check-----//
  const [check, setCheck] = useState(false)

  //----modal----//
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (total == 0) {
      alert('DEBES AGREGAR INGREDIENTES..')
    } else {
      setShow(true);
    }
  }
  const url = 'https://recipe-rissoto.vercel.app/recipe';

  const dispatch = useDispatch()
  const { datos } = useSelector(store => store.datos);

  const data = async () => {
    const resp = await fetch(url)
    const dato = await resp.json()
    setDatoss(dato)
  }


  const handleCambiar = (ingrediente, e) => {

    //---datos del ingrediente----//
    const cantida = Number(e.target.value);
    const precio = Number(ingrediente.price);
    const totall = precio * cantida;

    //---actualiza el carrito---//
    const Ingrediente = {
      nombre: ingrediente.product,
      precio: ingrediente.price,
      cantida,
      totall
    }

    const existeIngrediente = carrito.find(item => item.nombre === Ingrediente.nombre)

    if (existeIngrediente) {
      const indice = carrito.indexOf(existeIngrediente);
      console.log(indice);

      const Carrito = [...carrito];
      Carrito[indice] = Ingrediente;
      setCarrito(Carrito);

    } else {
      setCarrito([...carrito, Ingrediente])
    }
  }


  //----actualizar estados de total, cantidad y si se cobra envío de acuerdo del pedido, si es 0 no se cobra envío---//
  const handleTotal = () => {

    let sumaTotal = 0;
    let sumaCantidad = 0;

    //---array de carrito----//
    carrito.forEach(p => {
      const { cantida } = p;
      const { totall } = p;

      sumaCantidad = sumaCantidad + cantida;
      sumaTotal = sumaTotal + totall;

      setTotal(sumaTotal);
      setCantidad(sumaCantidad);

      if (sumaCantidad === 0) {
        setEnvio(0)
      } else {
        setEnvio(7)
      }
    })
  }


  //para actualizar el total al iniciar el componente y tambien cada vez que los datos del carrito cambien
  useEffect(() => {
    handleTotal()
    dispatch(listDatosAsyn())
    data()
  }, [carrito])

  const handleSeleccionar = () => {
    setCheck(true)
  }

  const handleDesSeleccionar = () => {
    setCheck(false)
  }

  return (
    <div className="home">
      <div className="contenedor">

        <div className="divs">
          <p>INGREDIENTES</p>
          <h2>{datoss.name}</h2>
          <div><button className="btnSeleccion" onClick={() => handleSeleccionar()}>Seleccionar Todo </button> | <button className="btnDesSeleccion" onClick={() => handleDesSeleccionar()}>Deseleccionar Todo</button></div>
        </div>

        {
          datos.map(Ing => (

            <div className="divPedido" key={Ing.product}>
              <div className="check">
                <input type="checkbox" className="checkBox" name='producto' id={Ing.product} checked={check} aria-label="option 1" value={Ing.product} />
              </div>

              <div className="divInput">
                <input className="number" type="number" min="0" onChange={(e) => handleCambiar(Ing, e)} />
              </div>

              <div>
                <strong><p>{Ing.product}</p></strong>
                <p className='pMarca'>{Ing.brand}</p>
                <p>{Ing.quantity}</p>
              </div>

              <div className="divPrecio">
                <p className="precioText">{Ing.price} €</p>
              </div>
            </div>
          ))

        }


        <div className="divTotal">
          <div className=""><p className="p">Items: {cantidad}</p></div>
          <div className="divPTotales"><p className="p">Subtotal </p> <p> {(total).toFixed(2)} €</p></div>
          <div className="divPTotales"><p className="p">Gatos de envío</p> {envio},00 €</div>
          <div className="divPTotales"><p className="pTotal">Total:</p>  <p>{(total + envio).toFixed(2)} €</p></div>


          <div className="d-grid gap-2">
            <Button className="btnComprar" size="lg" onClick={handleShow}>
              Comprar Ingredientes: {(total + envio).toFixed(2)} €
            </Button>
          </div>


          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Posha Shop te da las gracias por tu Compra</Modal.Title>
              </Modal.Header>
              <Modal.Body>El pedido llegará de 1 a 5 horas <br></br> Esparamos que vuelvas Pronto </Modal.Body>
              <Modal.Footer>
                <Button className="btnComprar" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>



      </div>
    </div>
  )
}

export default Home

