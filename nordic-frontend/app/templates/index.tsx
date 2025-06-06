import { APP_TEMPLATE } from "../config";

const charm = require("./charm");
const wwurm = require("./wwurm");

if (APP_TEMPLATE === "CHARM" ) {
  module.exports = charm
} else {
  module.exports = wwurm;
}

