import '@testing-library/jest-dom'
import { loginReducers } from '../../redux/reducers/loginReducers';
import { typesLogin } from '../../redux/types/types';



describe('Pruebas en el reducer loginReducers', () => {
    test('Se debe logear correctamente', () => {

        const initState = {};
        const action = {
            type: typesLogin.login,
            payload: {
                email: 'pepito@gmail.com',
                password: '123456'
            }
        };

        // const state = loginReducers(initState, action);
        const state = loginReducers(initState, action)
        console.log(state);

        expect(state).toEqual({
            id: 'pepito@gmail.com',
            name: '123456'
        })


    })

    test('Debe Cerrar sesion correctamente', () => {
        const initState = {
            email: 'pepito@gmail.com',
            password: '123456'
        }

        const action = {
            type: typesLogin.logout
        };

        const state = loginReducers(initState, action);

        expect(state).toEqual({})
    })

    test('debe retornar el estado por default', () => {
        const initState = {
            id: 'pepito',
            name: 'Pepito Perez'
        }

        const action = {
            type: typesLogin.holisGente
        };

        const state = loginReducers(initState, action);
        expect(state).toEqual(initState)
    })
})