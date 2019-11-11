const sequelize = require('sequelize')
const db = require('../config/db')

const product = db.define('product', {
    name: {
        type: sequelize.STRING
    },
    sku: {
        type: sequelize.STRING
    },
    image: {
        type: sequelize.STRING
    },
    description: {
        type: sequelize.STRING
    },
    price: {
        type: sequelize.STRING
    }
}, {
    timestamps: false
})
module.exports = product