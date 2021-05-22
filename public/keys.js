const FZ_TECLAS = {
  q: { key: "q", note: "C4", fz: 262 },
  2: { key: "2", note: "C#4", fz: 277.1826 },
  w: { key: "w", note: "D4", fz: 294 },
  3: { key: "3", note: "D#4", fz: 311.127 },
  e: { key: "e", note: "E4", fz: 330 },
  r: { key: "r", note: "F4", fz: 349 },
  5: { key: "5", note: "F#4", fz: 369.9944 },
  t: { key: "t", note: "G4", fz: 392 },
  6: { key: "6", note: "G#4", fz: 415.3047 },
  y: { key: "y", note: "A4", fz: 440 },
  7: { key: "7", note: "A#4", fz: 466.1638 },
  u: { key: "u", note: "B4", fz: 494 },
  i: { key: "i", note: "C5", fz: 523 },
};

const isSpecialKey = (key) => [".", " ", "m", "n", "o", "k", "c"].includes(key);

const isPianoKey = (key) => Object.keys(FZ_TECLAS).includes(key);

/**
 * Utilizado para procesar la información que llega del servidor
 * @param {*} note
 * @returns
 */
const obtenerFrecuenciaPorNota = (note) =>
  Object.values(FZ_TECLAS).find((n) => n.note === note).fz;

/**
 * Devuelve el objeto tecla completo (note y fz).
 * @param {*} key
 * @returns
 */
const obtenerTeclaPiano = (key) => FZ_TECLAS[key]; // todo debería reemplazarse por esta última

export {
  FZ_TECLAS,
  isSpecialKey,
  isPianoKey,
  obtenerFrecuenciaPorNota,
  obtenerTeclaPiano,
};
