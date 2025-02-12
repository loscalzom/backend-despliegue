
Este repositorio contiene el backend de la aplicación, desarrollado con Node.js y Express. La API maneja la autenticación de usuarios (registro, inicio de sesión, verificación de correo electrónico y restablecimiento de contraseña), utilizando JWT para la gestión de tokens y bcrypt para el hash de contraseñas. Además, se integra con una base de datos para la gestión de usuarios y otros servicios asociados.

Funcionalidades principales:
Registro de usuario: Permite a los usuarios crear una cuenta proporcionando un nombre de usuario, correo electrónico y contraseña.
Inicio de sesión: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña, obteniendo un token de acceso.
Verificación de correo electrónico: Envía un enlace de verificación al correo electrónico del usuario después del registro.
Restablecimiento de contraseña: Permite a los usuarios restablecer su contraseña si la olvidaron.

Librerías usadas

jsonwebtoken: Para la creación y verificación de tokens JWT.
bcrypt: Para el hash y la comparación de contraseñas de forma segura.
nodemailer: Para enviar correos electrónicos.
express: Framework para la creación de la API.
cors: Para habilitar las solicitudes entre dominios.
dotenv: Para gestionar las variables de entorno.

Dificultades y aprendizajes

Fue una cursada muy intensa debido a la cantidad de contenido incluido que creo que fue excesivo para la cantidad de horas. Particularmente, me llevó mucho tiempo la implementación de cada función, debido a que es mi primera experiencia en programación. Me siento satisfecho con lo aprendido y creo que voy a necesitar muchas horas de práctica para poder seguir avanzando en mi aprendizaje.

