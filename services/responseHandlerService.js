async function getAllProductsResponseHandler(collection, query, response) {

    const data = await collection.find(query).toArray()

    const responseBody = {
        message: 'Successfully retrieved all robots',
        data: data
    }
    response.json(responseBody)
}

module.exports = getAllProductsResponseHandler