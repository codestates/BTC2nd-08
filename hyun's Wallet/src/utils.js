/*global chrome*/

const crypto = require("crypto");
const apiSecret = "HyunAndHyeon";

export const hashed = (data) => {
  return crypto.createHmac("sha256", apiSecret).update(data).digest("hex");
};

const log = function (obj) {
  if (chrome && chrome.runtime) {
    chrome.runtime.sendMessage({ type: "console.log", obj: obj });
  }
  console.log(obj);
};

export default log;
