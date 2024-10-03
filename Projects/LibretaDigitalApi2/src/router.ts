import { Router } from "express";

const router = Router()

// Routing
router.get('/get', (req, res) => {

    const datos = [
        { id: 1, nombre: 'Juan'},
        { id: 2, nombre: 'Pablo'},
    ]

    res.json(datos)
})

router.post('/', (req, res) => {
    const body = req.body
    const datos = [
        { id: 3, nombre: 'Jose'},
        { id: 4, nombre: 'Franco'},
    ]
    const objRes = {
        datos,
        body
    }

    res.json(objRes)
})

export default router