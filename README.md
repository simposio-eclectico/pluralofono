TODO

Server:
Permitir agregar nombres. SOK
Chekear conexiones muertas. NOK
Pasar a Elixir. NOK

Cliente:
Permitir agregar nombres. SOK
Crear teremin para celulares. NOK
Crear piano para escritorio. SOK
Conexión MIDI. NOK
Arreglar diseño. SOK
Lista de usuarios con última nota ingresada. SOK

## Comandos
node srv/websocket.js
nom install serve -g
serve public/

## Subir
rsync -av -e ssh --exclude='.git' /home/saulo/Proyectos/pluralofono-node -i ~/.ssh/ramosmerino_rsa root@104.248.48.75:/srv/ 

## Despliegue
screen -S http-pluralofono
serve -l 80 public/

screen -S ws-pluralofono
node srv/websocket.js