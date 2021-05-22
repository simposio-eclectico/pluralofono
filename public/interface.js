import { resonantColor } from "./fz2color.js";
import ws from "./ws.js";
import { isSpecialKey, isPianoKey, obtenerTeclaPiano } from "./keys.js";
import { Oscilator } from "./osc.js";
window.AudioContext = window.AudioContext || window.webkitAudioContext;

const osciladoresActivos = {};
// Referencias a elementos de la página
const divUsuarios = document.getElementById("usuarios");
const strongConectados = document.getElementById("conectados");
const txtUsername = document.getElementById("username");
const strongSpecialKeyStatus = document.getElementById("special-key-status");
const btnToggle = document.getElementById("toggle-connection");
const btnToggleColor = document.getElementById("toggle-color");
const btnToggleNavbars = document.getElementById("toggle-navbars");
const userListContainer = document.getElementsByClassName(
  "hide-before-connect"
)[0];

const INITIAL_FADETIME = 0.5;
const INITIAL_CRESCENDO = 0;
const INITIAL_SYNTH = "sine";
let fadeTime = INITIAL_FADETIME;
let crescendo = INITIAL_CRESCENDO;
let factor = 1;
let synth = INITIAL_SYNTH;
let changeBackgroundColor = false;
let hideNavbars = false;
let socket; // Se define en la función connect

// UTILIDADES
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Cambiar background color dinámicamente
 * @param {*} hex
 */
const cambiarBackground = ({ r, g, b }) => {
  document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, .8)`;
};

/**
 * Función usada cuando el tipo de mensaje es la lista general. La llama router.routerMessage
 * @param {*} data
 */
const printUsers = (data) => {
  const users = Object.values(data);
  divUsuarios.innerHTML = "";
  for (const user of users) {
    divUsuarios.innerHTML +=
      "<dt>" +
      user.user +
      "</dt><dd>" +
      obtenerTeclaPiano(user.key).note +
      "</dd>";
  }
  strongConectados.innerHTML = `En este momento hay ${users.length} usuarixs conectadxs.`;
};

/**
 * Procesa los tonos recibidos desde el ws. La llama router.routerMessage
 * @param {*} data
 * @returns
 */
const processTone = ({ key, fz, connectionId }) => {
  let esElFin = fz.toString().slice(-1) === "k"; // K means kill note

  crearClienteSiNoExiste(connectionId);

  if (esElFin) {
    osciladoresActivos[connectionId][key].stop(fadeTime);
    setTimeout(
      () => delete osciladoresActivos[connectionId][key],
      (fadeTime + 1) * 2
    );
    return;
  }

  // Si existe la nota, dejarla sonando sin crear nueva.
  if (existeNotaEnCliente(connectionId, key)) {
    return;
  }

  if (changeBackgroundColor) {
    cambiarBackground(resonantColor(fz)[5]);
  }

  osciladoresActivos[connectionId][key] = new Oscilator(fz, synth);
  osciladoresActivos[connectionId][key].start(crescendo);
};

/**
 * Para todos los osciladores activos
 * @returns
 */
const stopAll = () => {
  for (const connectionId of Object.keys(osciladoresActivos)) {
    if (!osciladoresActivos[connectionId]) {
      return;
    }
    for (const note of Object.keys(osciladoresActivos[connectionId])) {
      osciladoresActivos[connectionId][note].stop(0);
      delete osciladoresActivos[connectionId][note];
    }
  }
};

const getNextSynth = (w) => {
  const waves = ["sine", "square", "sawtooth", "triangle"];
  const i = waves.indexOf(w);
  return waves[i + 1];
};

const handleKeyDownSpecialKeys = (key) => {
  if (key === ".") {
    synth = getNextSynth(synth);
    strongSpecialKeyStatus.innerHTML = synth;
    return; // A futuro debe cambiar tipo de sinte
  }
  if (key === "ESC") {
    strongSpecialKeyStatus.innerHTML = "Salida ESC";
    handleToggle();
    return;
  }
  if (key === "c") {
    strongSpecialKeyStatus.innerHTML = "Crescendo";
    crescendo = 5;
    return;
  }
  if (key === "n") {
    strongSpecialKeyStatus.innerHTML = "Pizzicato";
    fadeTime = 0;
    return;
  }
  if (key === "m") {
    strongSpecialKeyStatus.innerHTML = "Dejar sonar";
    fadeTime = 5;
    return;
  }
  if (key === "o") {
    ++factor;
    strongSpecialKeyStatus.innerHTML = "Octava arriba (" + factor + ")";
    return;
  }
  if (key === "k") {
    --factor;
    strongSpecialKeyStatus.innerHTML = "Octava abajo (" + factor + ")";
    return;
  }
  if (key === " ") {
    strongSpecialKeyStatus.innerHTML = "Pánico";
    stopAll();
  }
  if (key === "a") {
    changeBackgroundColor = !changeBackgroundColor;
  }

  strongSpecialKeyStatus.innerHTML = "[ ]";
};

const handleKeyUpSpecialKeys = (key) => {
  strongSpecialKeyStatus.innerHTML = "[ ]";
  if (key === "n" || key === "m") {
    fadeTime = 0.5;
    return;
  }
  if (key === "c") {
    crescendo = 0;
    return;
  }
};

const crearClienteSiNoExiste = (id) => {
  if (!(id in osciladoresActivos)) {
    osciladoresActivos[id] = {};
  }
};

const existeNotaEnCliente = (id, note) => note in osciladoresActivos[id];

/**
 * Si el socket no está activado, sólo procesa el tono, sin considearr una respuesta del server.
 */
const eventoTeclaPiano = debounce(
  function ({ key, fz }) {
    const finalFz = fz * factor;
    if (socket) {
      socket.send(JSON.stringify({ key, fz: finalFz }));
    } else {
      processTone({ key, fz: finalFz, connectionId: "onlyyou" });
    }
  },
  5,
  true
);

/**
 * Si el socket no está activado, sólo procesa el tono, sin considearr una respuesta del server.
 *
 * EN caso de estar activado, prepara y envía el fin de presión en una tecla al WS.
 */
const eventoFinTeclaPiano = debounce(
  function ({ key, fz }) {
    const kill = fz + "k";
    if (socket) {
      socket.send(JSON.stringify({ key, fz: kill }));
    } else {
      processTone({ key, fz: kill, connectionId: "onlyyou" });
    }
  },
  5,
  true
);

/**
 * Handler del evento que se produce al clicar el botón de abrir/cerrar conexión con WS server
 * @returns
 */
const handleToggle = () => {
  if (!!socket) {
    stopAll();
    socket.close();
    socket = null;
    userListContainer.style.display = "none";
    return;
  }
  const username = txtUsername.value;
  console.log(username);
  if (!username) {
    alert("Debe ingresar un nombre de usuario");
    return;
  }

  socket = ws.connect(username);
  userListContainer.style.display = "block";
};

window.onload = function () {
  // Eventos
  // Eventos de teclado
  window.addEventListener(
    "keydown",
    (event) => {
      console.log(event.key);
      if (isSpecialKey(event.key)) {
        handleKeyDownSpecialKeys(event.key);
        return;
      }
      if (isPianoKey(event.key)) {
        eventoTeclaPiano(obtenerTeclaPiano(event.key));
      }
    },
    true
  );

  window.addEventListener(
    "keyup",
    (event) => {
      if (isSpecialKey(event.key)) {
        handleKeyUpSpecialKeys(event.key);
        return;
      }
      if (isPianoKey(event.key)) {
        eventoFinTeclaPiano(obtenerTeclaPiano(event.key));
      }
    },
    true
  );

  // Eventos de piano
  const pianoKeys = document.getElementsByClassName("piano-btn");
  for (let item of pianoKeys) {
    item.addEventListener(
      "pointerdown",
      (e) => {
        e.preventDefault();
        console.log(item.dataset.tecla);
        eventoTeclaPiano(obtenerTeclaPiano(item.dataset.tecla));
      },
      true
    );
    item.addEventListener(
      "pointerup",
      (e) => {
        e.preventDefault();
        console.log(item.dataset.tecla);
        eventoFinTeclaPiano(obtenerTeclaPiano(item.dataset.tecla));
      },
      true
    );
  }
  /**
   * Inicia/termina conexión con el websocket
   * @param {*} e
   * @returns
   */
  btnToggle.onclick = function (e) {
    e.preventDefault();
    handleToggle();
  };

  btnToggleColor.onclick = function (e) {
    e.preventDefault();
    changeBackgroundColor = !changeBackgroundColor;
  };

  btnToggleNavbars.onclick = function (e) {
    e.preventDefault();
    hideNavbars = !hideNavbars;
    if (hideNavbars) {
      document.getElementById("aside").style.display = "none";
      document.getElementById("info").style.display = "none";
    } else {
      document.getElementById("aside").style.display = "block";
      document.getElementById("info").style.display = "block";
    }
  };
};

export { printUsers, processTone };
