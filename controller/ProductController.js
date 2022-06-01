//database connection 
const mysql = require('../model/connectDatabase')

async function getAllProduct(){
    try{
        const allProducts = await mysql.query(`select * from product`)
        
        return allProducts[0]
    }
    catch(e){
        console.log('Product Controller getAllProduct', e)
    }
}

async function getProductByCategory(type){
    try{
        const allProducts = await mysql.query(`select * from product where type_of_package = '${type}'`)
        
        return allProducts[0]
    }
    catch(e){
        console.log('Product Controller getProductByCategory', e)
    }
}

module.exports = {
    getAllProduct,
    getProductByCategory
}