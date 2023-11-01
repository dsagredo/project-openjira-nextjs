# Proyecto OpenJira App

<div align="center">
 
![Badge](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) 
![Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

## Build-With:

-   @mui/material
-   date-fns
-   axios
-   mongoose
-   uuid
-   notistack

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

-   El -d, signfica **detached**

-   MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

-   Reconstruir los módulos de node y levantar Next

```
$ npm install
$ npm run dev
```

## Llenar la base de datos con información de pruebas (Postman)

Llamará

```
    GET: http://localhost:3000/api/seed
```
<p align="center">
<img width="1728" alt="Captura de pantalla 2023-04-08 a la(s) 22 49 39" src="https://github.com/dsagredo/project-pokemon-nextjs/assets/24228373/49ee4506-6742-4f7d-a83a-9b4411e5f975">
</p>

## Deploy on Vercel
https://project-openjira-nextjs-a7md-r5v53a9nj-dsagredo.vercel.app/ 
