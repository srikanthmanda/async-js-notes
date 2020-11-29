"use strict";

const fs = require("fs");

function promisifiedReadFile(...args) {
  return new Promise((resolve, reject) => {
    const file = args[0];
    console.log(`promisifiedReadFile invoked for: ${file}`);
    fs.readFile(...args, (err, value) => {
      if (err) {
        console.log(`fs.readFile failed for: ${file}. Promise rejected.`);
        return reject(err);
      }
      console.log(`fs.readFile succeeded for: ${file}. Promise fulfilled.`);
      resolve(value);
      console.log(`fs.readFile succeeded for: ${file}. After resolve.`);
    });
  });
}

promisifiedReadFile("promise.js", "utf8")
  .then((value) => {
    console.log("In Then block onFulfilled handler of fulfilled promise ...");
    console.log(`File header: ${value.substr(0, 13)}`);
  })
  .finally(() => {
    console.log("In Finally block of fulfilled promise.\n");
  });

promisifiedReadFile("no-file-for-then-onRejected")
  .then(
    (value) => {
      // NOTE: This block will not run as the promise is rejected
      console.log("In Then block onFulfilled handler of rejected promise ...");
      console.log("Value:");
      console.log(value);
    },
    (err) => {
      console.log("In Then block onRejection handler of rejected promise ...");
      console.log("Error:");
      console.log(err);
    }
  )
  .finally(() => {
    console.log("In Finally block of rejected promise, following Then.\n");
  });

promisifiedReadFile("no-file-for-catch")
  .catch((err) => {
    console.log("In Catch block of rejected promise ...");
    console.log("Error:");
    console.log(err);
  })
  .finally(() => {
    console.log("In Finally block of rejected promise, following Catch.\n");
  });

promisifiedReadFile("no-file-for-then-catch")
  .then(
    (value) => {
      // NOTE: This block will not run as the promise is rejected
      console.log(
        "In Then block onFulfilled handler of rejected promise (with Catch) ..."
      );
      console.log("Value:");
      console.log(value);
    },
    (err) => {
      console.log(
        "In Then block onRejection handler of rejected promise (with Catch) ..."
      );
      console.log("Error:");
      console.log(err);
    }
  )
  .catch((err) => {
    // NOTE: This block will not run as Then block has onRejected handler
    console.log("In Catch block of rejected promise, following Then.");
    console.log("Error:");
    console.log(err);
  })
  .finally(() => {
    console.log(
      "In Finally block of rejected promise, following Then & Catch.\n"
    );
  });
