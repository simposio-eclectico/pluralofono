
const lightFreqRedLower = 400000000000000;
const speedOfLightVacuum = 299792458; // m/sec

// Determining RGB Color from a wavelength
// To convert a particular wavelength of light into a colour that can
//  be displayed on a computer monitor, an algorithm is necessary
//  to generate RGB values (the amplitude of Red, Green and Blue
//  signals) used by the computer display. The code is based on an
//  algorithm from Dan Bruton's Color Science Page.  The conversion
//  process from wavelength to RGB values is shown graphically below,
//  together with the resulting display of spectrum from 380 to 700 nm.
//  The Bruton algorithm is obviously a simplification of a complex process.
// === End of Phillip Laven documentation.

/**
 * Dado un largo de onda en nanometros en el rango 350-780nm, retorna el color RGB HEX equivalente.
 * @param {*} wavelength
 * @returns
 */
 const getColorFromWaveLength = (wavelength) => {
  const GAMMA = 1.0;
  const MAX_INTENSITY = 255;

  let factor;

  // Color values in the range -1 to 1
  let blue;
  let green;
  let red;

  if (wavelength >= 350 && wavelength < 440) {
    // From Purple (1, 0, 1) to Blue (0, 0, 1), with increasing intensity (set below)
    red = -(wavelength - 440) / (440 - 350);
    green = 0.0;
    blue = 1.0;
  } else if (wavelength >= 440 && wavelength < 490) {
    // From Blue (0, 0, 1) to Cyan (0, 1, 1)
    red = 0.0;
    green = (wavelength - 440) / (490 - 440);
    blue = 1.0;
  } else if (wavelength >= 490 && wavelength < 510) {
    // From  Cyan (0, 1, 1)  to  Green (0, 1, 0)
    red = 0.0;
    green = 1.0;
    blue = -(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    // From  Green (0, 1, 0)  to  Yellow (1, 1, 0)
    red = (wavelength - 510) / (580 - 510);
    green = 1.0;
    blue = 0.0;
  } else if (wavelength >= 580 && wavelength < 645) {
    // From  Yellow (1, 1, 0)  to  Red (1, 0, 0)
    red = 1.0;
    green = -(wavelength - 645) / (645 - 580);
    blue = 0.0;
  } else if (wavelength >= 645 && wavelength <= 780) {
    // Solid Red (1, 0, 0), with decreasing intensity (set below)
    red = 1.0;
    green = 0.0;
    blue = 0.0;
  } else {
    red = 0.0;
    green = 0.0;
    blue = 0.0;
  }

  // Intensity factor goes through the range:
  // 0.1 (350-420 nm) 1.0 (420-645 nm) 1.0 (645-780 nm) 0.2

  if (wavelength >= 350 && wavelength < 420) {
    factor = 0.1 + (0.9 * (wavelength - 350)) / (420 - 350);
  } else if (wavelength >= 420 && wavelength < 645) {
    factor = 1.0;
  } else if (wavelength >= 645 && wavelength <= 780) {
    factor = 0.2 + (0.8 * (780 - wavelength)) / (780 - 645);
  } else {
    factor = 0.0;
  }

  const r = factorAdjust(red, factor, MAX_INTENSITY, GAMMA);
  const g = factorAdjust(green, factor, MAX_INTENSITY, GAMMA);
  const b = factorAdjust(blue, factor, MAX_INTENSITY, GAMMA);

  return { r, g, b };
}

function factorAdjust(color, factor, intensityMax, gamma) {
  if (color == 0.0) {
    return 0;
  }
  return Math.round(intensityMax * Math.pow(color * factor, gamma));
}

/**
 * Según la velocidad del sonido y su frecuencia, devuelve su color.
 * @param {*} frequency
 * @param {*} speedOfSound
 * @returns
 */
const wavelength = (frequency, speedOfSound) => speedOfSound / frequency;

/**
 * Retorna un arreglo de información dada una frecuencia:
 * 0: lightFrequency (Hertz)
 * 1: lightFrequencyTHz
 * 2: lightWavelength (meters)
 * 3: lightWavelengthNM
 * 4: lightOctave (number of octaves above the supplied sound).
 * 5: lightRGB ({ r, g,b } object)
 * @param {*} soundFrequency
 * @returns
 */
const resonantColor = (soundFrequency) => {
  const answer = new Array(6);

  let lightFrequency = soundFrequency;
  let lightOctave = 0;

  while (lightFrequency < lightFreqRedLower) {
    lightFrequency *= 2;
    ++lightOctave;
  }

  // Scale to THz and Nanometers

  const lightFrequencyTHz = lightFrequency / 1000000000000;
  const lightWavelength = wavelength(lightFrequency, speedOfLightVacuum);
  const lightWavelengthNM = lightWavelength * 1000000000;

  const lightRGB = getColorFromWaveLength(lightWavelengthNM);

  answer[0] = lightFrequency;
  answer[1] = lightFrequencyTHz;
  answer[2] = lightWavelength;
  answer[3] = lightWavelengthNM;
  answer[4] = lightOctave;
  answer[5] = lightRGB;

  return answer;
};

export { resonantColor };
