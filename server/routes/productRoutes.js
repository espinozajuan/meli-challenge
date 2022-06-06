import express from 'express'
const router = express.Router()
import { queryProducts, getProductInfo } from '../controllers/productControllers.js'

router.get('/', queryProducts)
router.get('/:id', getProductInfo)

export default router