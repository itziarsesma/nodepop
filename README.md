# Nodepop

## Cómo empezar

### Descargar el proyecto del repositorio
https://github.com/itziarsesma/nodepop.git

### Instalar dependencias
npm install

### Cargar datos iniciales en la base de datos
npm run installDB

## API de usuarios

### Crear un nuevo usuario
Petición POST
http://localhost:3000/apiv1/users

#### Parámetros:
- name: campo de texto, **requerido**
- password: campo de texto, **requerido**
- email: campo de texto, **requerido**. No puede existir en la aplicacion otro usuario con este email.

#### Devuleve:
- El usuario creado

{
  "sucess": true,
  "user": {
    "__v": 0,
    "name": "Itzi",
    "email": "itzi4@nodepop.com",
    "password": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
    "_id": "58ea596649e20f04cc801012"
  }
}
- Un error en caso de que los datos introducidos no sean válidos.

{
  "sucess": false,
  "errorCode": "USR_DUPLICATE_KEY",
  "errorDescription": "El usuario ya existe"
}

### Autenticar un usuario
Petición POST
http://localhost:3000/apiv1/users/authenticate

#### Parámentros:
- password: campo de texto
- email: campo de texto

#### Devuelve:
- Un token válido por 2 horas

{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0emk0QG5vZGVwb3AuY29tIiwiaWF0IjoxNDkxNzUzNjU0LCJleHAiOjE0OTE3NjA4NTR9.kbPZll1VK5dhnfLCFJlQD1TZrfvvSnbJ3aZ8ek7veNg"
}
- Un error en caso de que los datos introducidos no sean válidos.

{
  "sucess": false,
  "errorCode": "USR_BAD_PWD",
  "errorDescription": "Contraseña incorrecta"
}

## API de anuncios

### Listado de anuncios
Petición GET
http://localhost:3000/apiv1/adverts

#### Parámentros:
- token: campo de texto. Token válido generado al autenticar al usuario. **Requerido**
- tag: filtro por categoria http://localhost:3000/apiv1/adverts?tag=mobile
- sale: filtro venta o busqueda http://localhost:3000/apiv1/adverts?sale=false
- price: filtro precio 
    - Igual a un valor: http://localhost:3000/apiv1/adverts?price=50
    - Menor o igual a un valor: http://localhost:3000/apiv1/adverts?price=-50
    - Mayor o igual a un valor: http://localhost:3000/apiv1/adverts?price=10-
    - Entre dos valores: http://localhost:3000/apiv1/adverts?price=10-50
- name: el nombre del artículo empieza por los caracteres que indica este parámetro http://localhost:3000/apiv1/adverts?name=ip
- sort: ordena los anuncios en funcion del campo que se indique en este parámetro
    - Orden ascendente: http://localhost:3000/apiv1/adverts?sort=sale
    - Orden descendente: http://localhost:3000/apiv1/adverts?sort=-sale
- skip: Se salta el número de anuncios que se indican en este parámetro. Útil para la paginación. http://localhost:3000/apiv1/adverts?skip=2
- limit: Devuelve como máximo el número de registros que se indican en este parámetro http://localhost:3000/apiv1/adverts?limit=2
- fields: Devuelve los campos que se indiquen en este parámetro. Es necesario separar los campos por el caracter espacio. http://localhost:3000/apiv1/adverts?fields=name%20price

#### Devuelve:
- Listado de anuncios

{
  "sucess": true,
  "adverts": [
    {
      "_id": "58ea2dc32cd9cf299c25f789",
      "name": "iPhone 3GS",
      "sale": false,
      "price": 50,
      "image": "iphone.jpg",
      "__v": 0,
      "tags": [
        "lifestyle",
        "mobile"
      ]
    }
  ]
}
- Un mensaje de error

{
  "sucess": false,
  "errorCode": "USR_NO_TOKEN",
  "errorDescription": "No hay token"
}

### Listado de tags activos
Petición GET
http://localhost:3000/apiv1/adverts/tags
#### Parámentros:
- token: campo de texto. Token válido generado al autenticar al usuario. **Requerido**

#### Devuelve:
- Listado de anuncios

{
  "sucess": true,
  "tags": [
    "lifestyle",
    "motor",
    "mobile"
  ]
}
- Un mensaje de error

{
  "sucess": false,
  "errorCode": "USR_INVALID_TOKEN",
  "errorDescription": "Invalid token"
}

### Imagenes
Las imagenes de los anuncios están disponibles en la ruta http://localhost:3000/images/adverts/[nombre del recurso], por ejemplo http://localhost:3000/images/adverts/bici.jpg

## Internacionalización

### Mensajes de error
Los mensajes de eror de todas las peticiones a la api están disponibles en inglés o castellano. Para seleccionar el idioma es necesario incluir la cabecera 
- {"Accept-Language":"en"} para los mensajes en inglés.
- {"Accept-Language":"es"} para los mensajes en castellano. 

Por defecto los mensajes se muestran en ingles.