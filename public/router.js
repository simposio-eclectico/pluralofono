import { printUsers, processTone } from "./interface.js";
/**
 * Enrutador
 * @param {*} event
 * @returns
 */
const routerMessage = (event) => {
  let data = JSON.parse(event.data);
  if (!data.user) {
    printUsers(data);
    return;
  }

  processTone(data);
};

export { routerMessage };
