import { routerMessage } from "./router.js";
const SERVER_URL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "ws://localhost:9876"
    : "wss://104.248.48.75:9876";
const socketStatus = document.getElementById("status");
const btnToggle = document.getElementById("toggle-connection");

/**
 * Función CONNECT. Conecta al WS.
 * @param {*} username
 */
const connect = (username) => {
  const socket = new WebSocket(SERVER_URL + "?username=" + username);

  /**
   * Handler de errores
   * @param {*} error
   */
  socket.onerror = function (error) {
    console.error("WebSocket Error", error);
    socketStatus.innerHTML = "Error al conectar a servidor.";
    socketStatus.className = "closed";
    btnToggle.innerHTML = "Reintentar";
  };

  // Show a connected message when the WebSocket is opened.
  socket.onopen = function (event) {
    socketStatus.innerHTML = "Conectado a: " + event.currentTarget.url;
    socketStatus.className = "open";
    btnToggle.innerHTML = "Cerrar conexión";
  };

  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function (event) {
    socketStatus.innerHTML = "Desconectada.";
    socketStatus.className = "closed";
    btnToggle.innerHTML = "Abrir conexión";
  };

  // Handle messages sent by the server.
  socket.onmessage = (event) => routerMessage(event);

  return socket;
};

export default { connect };
