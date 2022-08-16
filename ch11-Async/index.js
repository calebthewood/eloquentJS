"use strict";


/** */
function requestType(name, handler) {
  defineRequestType(name, (nest, content, source,
                          callback) => {
    try {
      Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response),
                          failure => callback(failure));
    } catch (exceptipon) {
      callback(exception);
    }
  });
}

//requestType("ping", () => "pong");

function availableNeighbors(nest) {
  let requests = nest.neighbors.map(neighbor => {
    return requestType(nest, neighbor, "ping")
    .then( () => true, () => false);
  });

  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
}

let fifteen = Promise.resolve(15);
// fifteen.then(value => console.log("Got ", value));

