const getCollection = require("./services/databaseService")
const { validateCategories, validateCharacters, validateBody, validateId } = require('./services/validationService')
const getAllProductsResponseHandler = require('./services/responseHandlerService')
const { ObjectId } = require("mongodb")

async function getAllProducts(request, response) {
    try {
        const collection = await getCollection()
        const categories = request.query.categories
        const characters = request.query.characters

        if (categories && characters) {

            const categoriesArray = categories.split(',')
            const charactersArray = characters.split(',')

            if (!validateCategories(categoriesArray)) {
                response.status(404).json({ "message": "Unknown category", "data": [] })
            } else if (!validateCharacters(charactersArray)) {

                response.status(404).json({ "message": "Unknown character", "data": [] })

            } else {

                const query = {
                    category: { $in: categoriesArray },
                    character: { $in: charactersArray }
                }

                getAllProductsResponseHandler(collection, query, response)
            }
        } else if (characters) {
            const charactersArray = characters.split(',')

            if (!validateCharacters(charactersArray)) {
                response.status(404).json({ "message": "Unknown character", "data": [] })
            } else {

                const query = { character: { $in: charactersArray } }
                getAllProductsResponseHandler(collection, query, response)

            }
        } else if (categories) {
            const categoriesArray = categories.split(',')

            if (!validateCategories(categoriesArray)) {
                response.status(404).json({ "message": "Unknown category", "data": [] })
            } else {

                const query = { category: { $in: categoriesArray } }
                getAllProductsResponseHandler(collection, query, response)
            }
        } else {

            const query = {}
            getAllProductsResponseHandler(collection, query, response)
        }
    } catch {
        response.status(500).json({ "message": "Unexpected error", "data": [] })
    }
}

async function getProductById(request, response) {
    try {
        const collection = await getCollection()
        const id = request.params.id
        if (!validateId(id)) {
            response.status(400).json({ "message": "Invalid Id", "data": [] })
        } else {
            const objectId = new ObjectId(id)
            const robot = await collection.findOne({ '_id': objectId })
            const responseBody = robot ? {
                message: 'Successfully retrieved robot',
                data: robot
            } :
                {
                    message: 'Unknown Id',
                    data: []
                }
            response.json(responseBody)
        }

    } catch {
        response.status(500).json({ "message": "Unexpected error", "data": [] })
    }
}

async function addNewProduct(request, response) {
    try {
        const collection = await getCollection()
        const newRobot = request.body
        if (validateBody(newRobot)) {
            await collection.insertOne(newRobot)
            const responseBody = {
                message: 'Successfully created product',
                data: []
            }
            response.status(201).json(responseBody)
        } else {
            response.status(400).json({ "message": "Invalid product data", "data": [] })
        }
    } catch {
        response.status(500).json({ "message": "Unexpected error", "data": [] })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct
}
