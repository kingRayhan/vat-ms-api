## CuriousBiker Merchandise API


### Products
- GET /products
- GET /products/:id
- POST /products
- DELETE /products/:id

**Create product body**

```
{
    "name": "Hello",
    "hsCode": "0268-1517",
    "price": 4243,
    "vat": 15,
    "quantity": 7,
    "location": "38035 Novick Alley"
}
```

### Orders
- GET /orders
- POST /orders

** POST /orders **
```
payload -->
{
    "product": "62eac23ca31f6a5cf1af706d"
}
```

### Sells
- GET /sells
- POST /sells

** POST /sells **
```
payload -->
{
    "product": "62eac23ca31f6a5cf1af706d"
}
```