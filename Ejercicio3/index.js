const express = require('express')
const app = express()
const PORT = 3000


const productos = [
  { id: 1, nombre: 'Taza de Harry Potter' , precio: 300},
  { id: 2, nombre: 'FIFA 23 PS5' , precio: 1000},
  {  id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100},
  {  id: 4,  nombre: 'Zelda Breath of the Wild' , precio: 200},
  {  id: 5,  nombre: 'Skin Valorant' , precio: 120},
  {  id: 6, nombre: 'Taza de Star Wars' , precio: 220}
]

const PRODUCT_NOT_FOUND = 'Product not found'

app.get('/', (req, res) => {
  res.send(productos)
})

app.use(express.json()) /**middleware */

// Crear endpoint para poder crear un producto nuevo
app.post('/', (req, res) => {
  const newProduct = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio
  }
  productos.push(newProduct)
  
  res.status(201).send(productos)
  
})

// Crear endpoint para poder actualizar un producto

app.put('/id/:id', (req, res) => {

  const found = productos.some(producto => producto.id == req.params.id)
  if(found){
    productos.forEach(producto => {
      if (producto.id == req.params.id) {
        producto.nombre = req.body.nombre || producto.nombre
        producto.precio = req.body.precio || producto.precio
      }
    })
    res.send(productos)
  } else {
    res.status(404).send(PRODUCT_NOT_FOUND)
  }

})

// Crear endpoint para poder eliminar un producto
app.delete('/id/:id', (req, res) => {
  const found = productos.some(producto => producto.id == req.params.id)
  if(found){
    const productosFiltrados = productos.filter(producto => producto.id != req.params.id)
    res.send(productosFiltrados)
  } else {
    res.status(404).send(PRODUCT_NOT_FOUND)
  }
})

// Crear filtro por precio de producto

app.get('/products/price/:price', (req, res) => {
  const filteredProductsByPrice = productos.filter(producto => producto.precio == req.params.price)
  if (filteredProductsByPrice.length === 0){
    res.status(404).send(PRODUCT_NOT_FOUND)
  }
  res.status(200).send(filteredProductsByPrice)
})

// Crear filtro que muestre los productos con un price entre 50 y 250.

app.get('/products/price-50-to-250', (req, res) => {

  const filteredProducts = []

  productos.forEach(product => {
    if (product.precio > 50 && product.precio < 250){
      filteredProducts.push(product)
    }
  })
  res.status(200).send(filteredProducts)
  
})

// Crear un filtro que cuando busque en postman por parámetro el id de un producto me devuelva ese producto

app.get('/products/id/:id', (req, res) => {
  const filteredProductsById = productos.filter(producto => producto.id == req.params.id)
  if (filteredProductsById.length == 0) {
    res.status(404).send(PRODUCT_NOT_FOUND)
  }
  res.status(200).send(filteredProductsById[0])
  
})

// Crear un filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese producto

app.get('/products/name/:name', (req, res) => {
  
  const filteredProductsByName = productos.filter(producto => producto.nombre == req.params.name)

  if(filteredProductsByName === 0) {
    res.status(404).send(PRODUCT_NOT_FOUND)
  }
  
  res.status(200).send(filteredProductsByName)
  
})







app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`)
})