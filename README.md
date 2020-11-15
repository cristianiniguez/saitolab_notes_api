# SaitoLab Notes - API

REST API de notas en markdown hecha con Express y Passport

## Dependencias utilizadas:

**_Dependencias de producción_**:

- boom: para crear respuestas de error amigables
- bcrypt: para encriptar contraseñas
- cross-env: para ejecutar comandos con variables de entorno en cualquier sistema operativo
- dotenv: para incluir variables de entorno desde un archivo **_.env_**
- express: para crear el servidor
- joi: para validar datos
- jsonwebtoken: para firmar y validar JWT's
- mongodb: para conectarme a la base de datos
- morgan: para imprimir información de cada petición entrante en consola
- passport: para implementar autenticación
- passport-http: para implementar autenticación para sign-in
- passport-jwt: para implementar autenticación en cada petición

**_Dependencias de desarrollo_**:

- chalk: para imprimir en consola con colores
- nodemon: para actualizar el servidor automáticamente durante el desarrollo
