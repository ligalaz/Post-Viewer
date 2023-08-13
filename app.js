import Handler from "./resources/modules/Handler.js";
import StartApp from "./resources/modules/StartApp.js";
const handler = new Handler();

const app = new StartApp(document.querySelector(`.app`));
app.initialize();
