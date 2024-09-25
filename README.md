# Task Manager API

Una API para gestionar tareas, diseñada utilizando NestJS y TypeORM con una base de datos PostgreSQL. Esta aplicación permite a los usuarios crear, leer, actualizar y eliminar tareas, así como gestionar roles y  permisos.

## Características

- **Gestión de Tareas**: Crea, lee, actualiza y elimina tareas.
- **Gestión de Usuarios**: Crea y gestiona usuarios con diferentes roles.
- **Roles y Permisos**: Asigna roles y permisos a los usuarios para controlar el acceso a diferentes funcionalidades.
- **Base de Datos Relacional**: Utiliza PostgreSQL para almacenar los datos.

## Tecnologías y Herramientas

- **NestJS**: Framework para construir aplicaciones del lado del servidor con Node.js.
- **TypeORM**: ORM para manejar la base de datos.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **TypeScript**: Lenguaje de programación basado en JavaScript que añade tipado estático.
- **Docker** (opcional): Para contenerizar la aplicación y la base de datos.


# Site-Keeper-NestJS

Este proyecto utiliza [NestJS](https://nestjs.com/) como framework principal y está diseñado para gestionar tareas relacionadas con la administración de sitios web. El proyecto implementa autenticación, gestión de usuarios y roles, además de funcionalidades relacionadas con sitios web.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (versión 6 o superior)
- [PostgreSQL](https://www.postgresql.org/) como base de datos

## Paso a Paso para Configurar el Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Site-Keeper/Site-Keeper-NestJS.git
cd Site-Keeper-NestJS
code -r
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las Variables de Entorno

Copia el archivo `.env.example` y renómbralo como `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con los valores correctos:

```bash
# Ejemplo de configuración
DATABASE_URL=postgres://usuario:password@localhost:5432/nombre_base_de_datos
JWT_SECRET=tu_secreto_para_jwt
```

### 4. Configurar la Base de Datos

Asegúrate de tener PostgreSQL corriendo y crea una base de datos:

```bash
CREATE DATABASE site_keeper_db;
```

La migración se realiza desde el paso "6" al realizar el "npm run start:dev" :

### 5. Documentación de la API

La documentación de la API está disponible usando Swagger. Para acceder, inicia el servidor y ve a:

```bash
https://site-keeper-nestjs.onrender.com/api
```

Esto te mostrará la interfaz Swagger con todos los endpoints disponibles y sus descripciones.

### 6. Ejecutar el Servidor

Inicia el proyecto en modo de desarrollo con el siguiente comando:

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`.

<!-- ### 7. Pruebas Unitarias

Para ejecutar las pruebas del proyecto, usa el comando:

```bash
npm run test
``` -->

## Estructura del Proyecto

```bash
src/
├── app.controller.ts        # Controlador principal de la aplicación.
├── app.module.ts            # Módulo raíz que organiza los diferentes módulos de la aplicación.
├── app.service.ts           # Servicio principal con lógica básica de negocio.
├── main.ts                  # Punto de entrada de la aplicación, donde se inicia NestJS.
├── config/                  # Configuraciones globales (e.g., base de datos, variables de entorno, etc.).
│   └── database.config.ts   # Configuración de la conexión con la base de datos.
├── modules/                 # Módulos que agrupan diferentes funcionalidades de la aplicación.
│   ├── auth/                # Módulo de autenticación.
│   │   ├── auth.controller.ts # Controlador para manejo de autenticación (login, register, etc.).
│   │   ├── auth.module.ts     # Módulo que organiza el flujo de autenticación.
│   │   └── auth.service.ts    # Servicio que contiene la lógica de autenticación.
│   ├── users/               # Módulo de gestión de usuarios.
│   │   ├── users.controller.ts # Controlador para operaciones de usuarios.
│   │   ├── users.module.ts     # Módulo que organiza el flujo de usuarios.
│   │   └── users.service.ts    # Servicio que contiene la lógica de usuarios.
│   └── (otros módulos de la aplicación)
├── common/                  # Elementos reutilizables entre varios módulos.
│   ├── decorators/          # Decoradores personalizados.
│   ├── filters/             # Filtros globales de excepciones.
│   ├── guards/              # Guardias para proteger rutas (ej. autenticación).
│   ├── interceptors/        # Interceptores que alteran la respuesta o petición.
│   └── pipes/               # Pipes para transformar y validar datos.
├── entities/                # Definiciones de las entidades o modelos de la base de datos.
│   └── user.entity.ts       # Entidad que define la estructura de un usuario.
├── interfaces/              # Interfaces para definir contratos de datos.
│   └── user.interface.ts    # Interface que define los datos de un usuario.
└── dto/                     # Objetos de Transferencia de Datos (Data Transfer Objects).
    ├── create-user.dto.ts   # DTO para la creación de usuarios.
    └── login-user.dto.ts    # DTO para el login de usuarios.

```


## Detalles Adicionales

- **Base de datos**: Este proyecto utiliza PostgreSQL, pero puedes configurar otro motor de base de datos ajustando el `DATABASE_URL` en el archivo `.env`.
- **Autenticación**: Se utiliza JWT para gestionar la autenticación de usuarios.
- **Swagger**: Proporciona una forma fácil de documentar y probar los endpoints de la API.
