import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { listDatosAsyn } from '../../redux/actions/actionDatos';


const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {};

let store = mockStore(initState)

describe('pruebas con las acciones a hacer con los productos', () => {

    beforeEach(() => {
        store = mockStore(initState)

    })

    test('listar producto', async () => {
        await store.dispatch(listDatosAsyn())

        const actions = store.getActions();
        console.log(actions);
    })
})