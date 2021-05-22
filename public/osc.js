let audioContext; // Se define al iniciar oscilador
const INITIAL_VOLUME = 0.5;

/**
 * Objeto Oscilador.
 *
 * Permite crear distintos osciladores fácilemente, consiguiendo un efecto polifónico.
 * */
const Oscilator = class {
  constructor(fz, type = "sine") {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    this.frequency = fz;
    this.vca = audioContext.createGain();
    this.vco = audioContext.createOscillator();
    this.vco.type = type;
  }
  start(t = 0) {
    /* VCO */
    
    this.vco.frequency.value = this.frequency;

    /* VCA */
    this.vca.gain.value = 0;

    /* connections */
    this.vco.connect(this.vca);
    this.vca.connect(audioContext.destination);

    this.vco.start();
    this.vca.gain.setTargetAtTime(INITIAL_VOLUME, audioContext.currentTime, t);
  }

  stop(t) {
    this.vca.gain.setTargetAtTime(0, audioContext.currentTime, t);
    this.vco.stop(t);
  }
};
export { Oscilator, audioContext };
