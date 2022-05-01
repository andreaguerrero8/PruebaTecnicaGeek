import '@testing-library/jest-dom'
import { typesAcciones, typesLogin, typesRegister, typesDatos } from '../../redux/types/types'

describe('validar los types', () => {
    test('evaluar los types de login y logout', () => {
        expect(typesLogin).toEqual({
            login: 'login',
            logout: 'logout',

        })
    })

    test('evaluar los types de datos', () => {
        expect(typesDatos).toEqual({
            list: 'listItem'

        })
    })

    test('evaluar los types de register', () => {
        expect(typesRegister).toEqual({
            register: 'register'

        })
    })

    test('evaluar los types de las Acciones', () => {
        expect(typesAcciones).toEqual({
            add: 'add',
            list: 'list',
            edit: 'editar',
            delete: 'delete',

        })
    })
})