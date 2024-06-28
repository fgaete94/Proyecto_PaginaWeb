Integrantes:
- Julio Cifuentes
- Felipe Gaete
- Ariel Olivares

Link GitHub:
https://github.com/fgaete94/Proyecto_PaginaWeb.git

Descomprimir el archivo RAR:

Descomprime el archivo RAR que has recibido y asegúrate de extraer todos los archivos en una carpeta específica.
Posicionarse en la carpeta "proyecto web":

Navega a la carpeta "proyecto web" que se ha creado al descomprimir el archivo.
Abrir la terminal en la ubicación actual:

Abre la terminal o línea de comandos.
Cambia la ruta de la terminal a la ubicación de la carpeta "proyecto web". En Windows, puedes hacer esto escribiendo cd ruta\de\la\carpeta\proyecto web. En Mac y Linux, usa cd ruta/de/la/carpeta/proyecto web.
Crear y activar el entorno virtual:

Si aún no tienes un entorno virtual configurado, crea uno. En la terminal, escribe:
En Windows: python -m venv pagina
En Mac/Linux: python3 -m venv web
Activa el entorno virtual:
En Windows: pagina\Scripts\activate
En Mac/Linux: source web/bin/activate
Cambiar al directorio "enfqx":


Instalar las dependencias del proyecto:

Si creaste un nuevo entorno virtual en el paso 4, instala las dependencias necesarias ejecutando el siguiente comando:
pip install -r requirements.txt
Esto instalará todas las bibliotecas y paquetes necesarios para ejecutar el proyecto.
Ejecutar el servidor de desarrollo:

Una vez que las dependencias se hayan instalado. Dentro de la terminal, cambia al directorio "enfqx" escribiendo cd enfqx.
En esta carpeta deberías poder ver el archivo manage.py si listas los archivos (dir en Windows, ls en Mac/Linux). inicia el servidor de desarrollo de Django con el comando:
python manage.py runserver
Esto pondrá en marcha el servidor y deberías ver un mensaje indicando que el servidor está corriendo en http://127.0.0.1:8000/.
Acceder a la aplicación web:

Copia la dirección URL proporcionada por la terminal (normalmente http://127.0.0.1:8000/).
Abre un navegador web y pega la URL en la barra de direcciones.
Agrega /index al final de la URL para acceder a la página principal de la aplicación. Por ejemplo: http://127.0.0.1:8000/index

Acceder a Menú Administración:

si requieres acceder al menú de administración ingresa por medio de la URL proporcionada por Terminal, agregando la palabra "admin" al final de esta dirección. Por ejemplo: http://127.0.0.1:8000/admin.

una vez en la ventana correspondiente ingresa con las siguientes credenciales:
Usuario: prueba
Password:prueba123456