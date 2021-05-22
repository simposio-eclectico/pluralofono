# Pluralófono

Bienvenidx al Pluralófono v0.0.1.

El Pluralófono es un instrumento virtual pensado para ser interpretado por múltiples entidades al mismo tiempo, comunicadas a través de Internet. Este se puede componer de uno o más instrumentos, de cualquier tipo, pero temporalmente sólo dispone de un piano. Para empezar a escuchar y enviar sonidos, ingresa un nombre de usuarix y has click en el botón Conectar.

## Funcionalidades

- <kbd>Q</kbd> - DO / C
- <kbd>2</kbd> - DO♯ / C♯
- <kbd>W</kbd> - RE / D
- <kbd>3</kbd> - RE♯ / D♯
- <kbd>E</kbd> - MI / E
- <kbd>r</kbd> - FA / F
- <kbd>5</kbd> - FA♯ / F♯
- <kbd>T</kbd> - SOL / G
- <kbd>6</kbd> - SOL♯ / G♯
- <kbd>Y</kbd> - LA / A
- <kbd>7</kbd> - LA♯ / A♯
- <kbd>U</kbd> - SI / B
- <kbd>I</kbd> - DO / C

## Infraestructura

El proyecto se compone de un frontend HTML+JS+CSS, y un WebSocket hecho en node.

## TODO

Server:
Permitir agregar nombres. SOK (falta verificar que nombre no exista en server)
Chekear conexiones muertas. SOK (implementación heartbeat no verificada)
Pasar a Elixir. NOK (posiblemente sea más rápido y escalable. Evaluar)

Cliente:
Permitir agregar nombres. OK
Crear teremin para celulares. NOK
Crear piano para escritorio. OK
Conexión MIDI. NOK
Arreglar diseño. SOK
Lista de usuarios con última nota ingresada. SOK

## Comandos
node srv/websocket.js
nom install serve -g
serve public/ 

## Despliegue
rsync -av -e ssh --exclude='.git' . root@IP_SERVER:/srv/

screen -S http-pluralofono
serve -l 80 public/

screen -S ws-pluralofono
node srv/websocket.js