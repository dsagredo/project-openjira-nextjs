# Proyecto OpenJira App

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
npm install
npm run dev
```

## Llenar la base de datos con información de pruebas (Postman)

Llamará

```
    GET: http://localhost:3000/api/seed
```
