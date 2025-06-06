const charm = require("./charm");
const wwurm = require("./wwurm");

const templt = "CHARM"; //process.env.NEXT_PUBLIC_TEMPLATE;
if (templt === "CHARM" ) {
  module.exports = charm
} else {
  module.exports = wwurm;
}

