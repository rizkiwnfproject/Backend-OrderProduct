# API Documentation

## Authentication
Use the Bearer token in the Authorization header.

## Endpoints

## API Reference

### Auth

#### Login

```http
  POST http://localhost:3000/api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |

  Body : {
    "email": "admin@toko.com",
    "password": "12341234"
  }

#### Register

```http
  POST http://localhost:3000/api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |
| `fullName` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |
| `username` | `string` | **Required**.  |
| `role` | `string` | **Required**. Default User  |

```http
  {
    "email": "yordan@gmail.com",
    "fullName": "yordan",
    "password": "12341234",
    "username": "yordan",
    "role":"user"
  }
```

#### Profile

```http
  POST http://localhost:3000/api/auth/me
```

```http
  Using Bearer Token
  Authorization -> Bearer Token
```

### Categories


#### Create Categories

```http
  POST  http://localhost:3000/api/categories
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.  |

```http
  {
      "name": "kids"
  }
```
#### Get Categories

```http
  Get  http://localhost:3000/api/categories
```
#### Get Categories By ID

```http
  Get  http://localhost:3000/api/categories/{$id}
```
```http
  $id = ObjectID
```

#### Update Categories

```http
  Put   http://localhost:3000/api/categories/{$id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.  |

```http
  $id = ObjectID
  {
      "name": "Dewasa"
  }
```

#### Delete Categories

```http
  Delete   http://localhost:3000/api/categories/{$id}
```

```http
  $id = ObjectID
```


### Products


#### Create Products

```http
  POST  http://localhost:3000/api/products
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.  |
| `description` | `string` | **Required**.  |
| `images` | `array[string]` | **Required**.  |
| `price` | `integer` | **Required**.  |
| `qty` | `integer` | **Required**. |
| `category` | `string` | **Required**. From Category ID  |
| `slug` | `string` | Default |

```http
{
    "name": "Kemeja Variant 5",
    "description": "Deskripsi kemeja variant 3",
    "images": ["https://res.cloudinary.com/five-code/image/upload/v1718805645/fxuurm45mt5talry7a29.png", "sepatu2.jpg", "sepatu3.jpg"],
    "price": 20000,
    "qty": 120,
    "category": "6760e6e32c09d58beb0bc4f7",
    "slug": "variant-3-slug"
}

```
#### Get Products

```http
  Get  http://localhost:3000/api/products
```
#### Get Categories By ID

```http
  Get  http://localhost:3000/api/products/{$id}
```
```http
  $id = ObjectID
```

#### Update Products

```http
  Put   http://localhost:3000/api/products/{$id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.  |
| `description` | `string` | **Required**.  |
| `images` | `array[string]` | **Required**.  |
| `price` | `integer` | **Required**.  |
| `qty` | `integer` | **Required**. |
| `category` | `string` | **Required**. From Category ID  |
| `slug` | `string` | Default |

```http
{
    "name": "Kemeja Variant 5",
    "description": "Deskripsi kemeja variant 3",
    "images": ["https://res.cloudinary.com/five-code/image/upload/v1718805645/fxuurm45mt5talry7a29.png", "sepatu2.jpg", "sepatu3.jpg"],
    "price": 20000,
    "qty": 120,
    "category": "6760e6e32c09d58beb0bc4f7",
    "slug": "variant-3-slug"
}
```

#### Delete Categories

```http
  Delete   http://localhost:3000/api/products/{$id}
```

```http
  $id = ObjectID
```


### Oders

```http
  Using Bearer Token
  Authorization -> Bearer Token
```

#### Create Oders
```http
  Login -> Authorization -> Bearer Token -> Fill Body
```

```http
  POST  http://localhost:3000/api/orders
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `grandTotal` | `integer` | **Required**.  |
| `orderItems` | `array[]` | **Required**.  |
| `orderItems -> product` | `string` | **Required**.  |
| `orderItems -> quantity` | `integer` | **Required**.  |

```http
{
    "grandTotal": 200000,
    "orderItems": [
        {
            "product": "676138dd9b9fb5ee4cca0819",
            "quantity": 1
        }
    ]
}

```
#### Get Orders By User

```http
  Login -> Authorization -> Bearer Token
```

```http
  Get  http://localhost:3000/api/products
```
