"use strict";

/**
 * Constructs a graph from an array of start-end elements
 *  Parameter: edges [] -> ['start-end', 'start-end', ...]
 *  Returns: {} -> {node: [connections], node: [connections], ...}
 * */
exports.buildGraph = function(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph
}