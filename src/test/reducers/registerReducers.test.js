import '@testing-library/jest-dom'
import { loginReducers } from '../../redux/reducers/loginReducers';
import { typesRegister } from '../../redux/types/types';



describe('Pruebas en el reducer registerReducers', () => {
    test('Se debe registrar correctamente', () => {

        const initState = {}
        const action = {
            type: typesRegister.login,
            payload: {
                nombre:'pepe perez',
                email: 'pepito@gmail.com',
                password: '123456'
            }
        };

        // const state = loginReducers(initState, action);
        const state = loginReducers(initState, action)
        console.log(state);

        expect(state).toEqual({})


    })

    test('debe retornar el estado por default', () => {
        const initState = {
            id: 'pepito',
            name: 'Pepito Perez'
        }

        const action = {
            type: typesRegister.holisGentesssss
        };

        const state = loginReducers(initState, action);
        expect(state).toEqual(initState)
    })
}) 