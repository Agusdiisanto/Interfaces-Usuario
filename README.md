# Enunciado

https://github.com/unq-ui/material/tree/master/TPs/2023s1

# Modelo

https://github.com/unq-ui/twitter-model

## Tener en cuenta

Los siguientes archivos y/o carpetas no se suben al repo

* Los archivos .iml 
* /target
* /.idea
* /node_modules
* .log

Dentro de las carpetas que nosotros subimos tienen que estar su proyecto directamente, eso significa que por ejemplo dentro de la carpeta de arena espero ver el `pom.xml` y la carpeta `src`

## Cambios en la Api
* Ahora SimpleUserDTO tambien tiene la imagen del usuario
* Ahora TwitterTypeDTO tiene un string que representa su tipo (normal, reply o retweet)
* Ahora TwitterTypeDTO guarda referencia con el tweet padre en caso de ser reply o retweet, se crea objeto parentTweetDTO

## Como correr la app

* Situarnos en la carpeta Web
* En la terminal ejecutar el comando npm install vite --save-dev
* Ejectutar el comando npm i para instalar todas las dependencias
* Ejectutar el comando npm run dev
* En la terminal figurara la url para acceder a la app

## Detalle app mobile
* Editar la IP en el archivo API para correr la API
