# Plural贸fono 馃幑馃垰馃寧

**Bienvenidxs al Plural贸fono v0.0.1.**

El Plural贸fono es un **instrumento virtual** pensado para ser interpretado por **m煤ltiples entidades** 馃馃馃惢 al **mismo tiempo**, comunicadas a trav茅s de Internet. Este se puede componer de uno o m谩s instrumentos, de cualquier tipo, pero temporalmente s贸lo dispone de un piano. 

## Funcionalidades

Desde el momento que se abre la p谩gina web, ya se puede interpretar el piano integrado. Sin embargo, **esto a煤n no es el Plural贸fono**. Par ausar el Plural贸fono, ingresa un nombre de usuarix y has click en el bot贸n Conectar.

## Uso
### Piano
- <kbd>Q</kbd> - DO / C
- <kbd>2</kbd> - DO鈾? / C鈾?
- <kbd>W</kbd> - RE / D
- <kbd>3</kbd> - RE鈾? / D鈾?
- <kbd>E</kbd> - MI / E
- <kbd>r</kbd> - FA / F
- <kbd>5</kbd> - FA鈾? / F鈾?
- <kbd>T</kbd> - SOL / G
- <kbd>6</kbd> - SOL鈾? / G鈾?
- <kbd>Y</kbd> - LA / A
- <kbd>7</kbd> - LA鈾? / A鈾?
- <kbd>U</kbd> - SI / B
- <kbd>I</kbd> - DO / C

### Teclas especiales (modificadores)
馃憖 Ojo: Los efectos marcados con un signo de advertencia 鈿狅笍 (como el Crescendo y otros), s贸lo t煤 los escuchar谩s. <strong>馃檳 El resto de la gente escuchar谩 el sonido sin este efecto.</strong>

- <kbd>Space</kbd> - Corta todo sonido en caso de error (bot贸n de p谩nico)</dd>
- <kbd>A</kbd> - Activa/desactiva el color de fondo</dd>
- <kbd>O</kbd> - Subir una octava</dd>
- <kbd>K</kbd> - Bajar una octava</dd>
- <kbd>C</kbd> - Crescendo 鈿狅笍</dd>
- <kbd>N</kbd> - Pizzicato 鈿狅笍</dd>
- <kbd>M</kbd> - Sustain 鈿狅笍</dd>
- <kbd>.</kbd> - Cambiar sintetizador 鈿狅笍</dd>

### Color
El Plural贸fono incluye un llamativo cambio de color cada vez que se interpreta. Este est谩 desactivado por defecto para evitar problemas para personas fotosensibles, pero si deseas probarlo, puedes hacer click en el boton *Activar color* en la parte superior derecha.

## Infraestructura

El proyecto se compone de un frontend HTML+JS+CSS, y un WebSocket hecho en node.

## TODO

**Server:**
- Permitir agregar nombres. 馃檮 (falta verificar que nombre no exista en server)
- Chekear conexiones muertas. 馃檮 (implementaci贸n heartbeat no verificada)
- Pasar a Elixir. 鉂? (posiblemente sea m谩s r谩pido y escalable. Evaluar)

**Cliente:**
- Permitir agregar nombres. 鉁旓笍
- Crear teremin para celulares. 鉂?
- Crear piano para escritorio. 鉁旓笍
- Conexi贸n MIDI. 鉂?
- Arreglar dise帽o. 馃檮
- Lista de usuarios con 煤ltima nota ingresada. 鉁旓笍
- Permitir ocultar paneles flotantes 鉂?
- Permitir ocultar piano 鉂?
- Agregar m谩s controles a piano (para celulares) 鉂?
- Mejorar dise帽o POR FAVOR 鉂?
- Activar hover de teclas en piano cuando se use teclado 鉂?

## Comandos
```
node srv/websocket.js
nom install serve -g
serve public/ 
```

## Despliegue
```
rsync -av -e ssh --exclude='.git' . root@IP_SERVER:/srv/

screen -S http-pluralofono
serve -l 80 public/

screen -S ws-pluralofono
node srv/websocket.js
```