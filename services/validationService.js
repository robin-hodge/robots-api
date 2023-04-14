const { ObjectId } = require('mongodb')
const getCollection = require('./databaseService')

function validateCategories(categoriesArray) {
    const validCategories = ['Aprons', 'Baseball Hats', 'Mugs', 'T-Shirts']
    const validationArray = categoriesArray.map(word =>
        validCategories.includes(word) ? true : false
    )
    return validationArray.includes(false) ? false : true
}

function validateCharacters(charactersArray) {
    const validCharacters = ['Fred', 'Dolores', 'Bubbles', 'Rex']
    const validationArray = charactersArray.map(word =>
        validCharacters.includes(word) ? true : false
    )
    return validationArray.includes(false) ? false : true
}

function validateId(id) {
    try {
        const objectId = new ObjectId(id)
        return true
    } catch {
        return false
    }
}

function validateBody(body) {
    try {
        const validProperties = ['title', 'price', 'image', 'category', 'character', 'description', 'image2', 'image3']
        const validationArray = Object.keys(body).map(property =>
            validProperties.includes(property) ? true : false)
        if (validationArray.includes(false)) {
            return false
        } else {           
            let image2 = null
            let image3 = null
            if (body.image2) {
                const validUrl = new URL(body.image2)
                image2 = body.image2
            }
            if (body.image3) {
                const validUrl = new URL(body.image2)
                image3 = body.image3
            }
            const validUrl = new URL(body.image)
            const image = body.image
            const title = typeof body.title === 'string' ? true : false
            const price = typeof body.price === 'number' ? true : false
            const category = typeof body.category === 'string' ? true : false
            const character = typeof body.character == 'string' ? true : false
            const description = typeof body.description === 'string' ? true : false
            
            
            if (title && price && category && character && description && image) {
                console.log('hello')
                return true
            } else {
                return false
            }
        }

    } catch {
        return false
    }
}

module.exports = {
    validateCategories,
    validateCharacters,
    validateBody, 
    validateId
}