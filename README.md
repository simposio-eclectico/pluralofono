# Pluralófono 🎹🈚🌎

Bienvenidx al Pluralófono v0.0.1.

El Pluralófono es un instrumento virtual pensado para ser interpretado por múltiples entidades 🦊🤖🐻 al mismo tiempo, comunicadas a través de Internet. Este se puede componer de uno o más instrumentos, de cualquier tipo, pero temporalmente sólo dispone de un piano. 

## Funcionalidades

Desde el momento que se abre la página web, ya se puede interpretar el piano integrado. Sin embargo, **esto aún no es el Pluralófono**. Par ausar el Pluralófono, ingresa un nombre de usuarix y has click en el botón Conectar.

## Uso
### Piano
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

### Teclas especiales (modificadores)
👀 Ojo: Los efectos marcados con un signo de advertencia ⚠️ (como el Crescendo y otros), sólo tú los escucharás. <strong>🙉 El resto de la gente escuchará el sonido sin este efecto.</strong>

- <kbd>Space</kbd> - Corta todo sonido en caso de error (botón de pánico)</dd>
- <kbd>O</kbd> - Subir una octava</dd>
- <kbd>K</kbd> - Bajar una octava</dd>
- <kbd>C</kbd> - Crescendo ⚠️</dd>
- <kbd>N</kbd> - Pizzicato ⚠️</dd>
- <kbd>M</kbd> - Sustain ⚠️</dd>
- <kbd>.</kbd> - Cambiar sintetizador ⚠️</dd>

### Color
El Pluralófono incluye un llamativo cambio de color cada vez que se interpreta. Este está desactivado por defecto para evitar problemas para personas fotosensibles, pero si deseas probarlo, puedes hacer click en el boton *Activar color* en la parte superior derecha.

## Infraestructura

El proyecto se compone de un frontend HTML+JS+CSS, y un WebSocket hecho en node.

## TODO

**Server:**
- Permitir agregar nombres. SOK (falta verificar que nombre no exista en server)
- Chekear conexiones muertas. SOK (implementación heartbeat no verificada)
- Pasar a Elixir. NOK (posiblemente sea más rápido y escalable. Evaluar)

**Cliente:**
- Permitir agregar nombres. OK
- Crear teremin para celulares. NOK
- Crear piano para escritorio. OK
- Conexión MIDI. NOK
- Arreglar diseño. SOK
- Lista de usuarios con última nota ingresada. SOK
- Permitir ocultar paneles flotantes
- Permitir ocultar piano
- Agregar más controles a piano (para celulares)
- Mejorar diseño POR FAVOR

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