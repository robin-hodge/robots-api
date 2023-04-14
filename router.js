
const {getAllProducts, getProductById, addNewProduct} = require('./controller')

function router(app) {
    app.get('/products', getAllProducts)
    app.get('/products/:id', getProductById)
    app.post('/products', addNewProduct)
}

module.exports = router