"use strict";

const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];


// Village Graph
// {
//   "Alice's House": ["Bob's House", 'Cabin', 'Post Office'],
//   "Bob's House": ["Alice's House", 'Town Hall'],
//   "Cabin": ["Alice's House"],
//   'Post Office': ["Alice's House", 'Marketplace'],
//   'Town Hall': ["Bob's House", "Daria's House", 'Marketplace', 'Shop'],
//   "Daria's House": ["Ernie's House", 'Town Hall'],
//   "Ernie's House": ["Daria's House", "Grete's House"],
//   "Grete's House": ["Ernie's House", 'Farm', 'Shop'],
//   "Farm": ["Grete's House", 'Marketplace'],
//   "Shop": ["Grete's House", 'Marketplace', 'Town Hall'],
//   "Marketplace": ['Farm', 'Post Office', 'Shop', 'Town Hall'];
// }


/**
 *Converts an array of "to-from" elements to a graph.

 * Note: this graph is connected, meaning that every
 * location can be reached from all other locations.
 */
function buildGraph(edges) {
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
  return graph;
}

const roadGraph = buildGraph(roads);

/**
 * VillageState: holds state and methods for the village
 *    State:  this.place
 *            this.parcels
 *
 *    Methods:  move
 */
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  /**
   *
   * Checks whether there is a road going from current place to destination
   * Then creates new state with destination as the Robot's new location
   * Creates new parcel list, parcels that the robot is "carrying" are located
   *  at the current place, and must be moved to the new place
   * Parcels addressed to the new place are "delivered", removed from state
   *  .map handles "moving", .filter handles "delivering"
   *
   * returns a new Village state
   *
   */
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return { place: destination, address: p.address };
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState(
  "Post Office",
  [{ place: "Post Office", address: "Alice's House" }]
);

// let next = first.move("Alice's House");

// console.log(next.place);
// console.log(next.parcels);
// console.log(first.place);

/** Runs a given robot
 * Accepts state: an instance of VillageState
 *         robot: a robot function
 *         memory: array pf preplanned routes, or else empty if
 *                  robot generates routes
 *
 * Terminates when all parcels from village state have been delivered
 */
function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
      //break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }

}

/*************************************************************** Random Robot */

/** Returns a random choice from an array */
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

/** A robot who chooses its next destination at random */
function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}


VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  // console.log("Parcels: ", parcels);
  return new VillageState("Post Office", parcels);
};


VillageState.test = function (parcelCount = 5) {
  let parcels = [
    { place: 'Marketplace', address: "Ernie's House" },
    { place: 'Shop', address: "Bob's House" },
    { place: "Grete's House", address: 'Farm' },
    { place: 'Marketplace', address: "Grete's House" },
    { place: "Alice's House", address: 'Shop' }
  ];
  return new VillageState("Post Office", parcels);
};

/******************************************************* Route Oriented Robot */

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

/** A robot who follows the mail route */
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}


/******************************************************** Goal Oriented Robot */
/**
 * keeps a work list. This is an array of places that should be explored next,
 * along with the route that got us there. Then operates by taking the next
 * item in the list and exploring that.
*/

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

/**
 * When route is empty, robot moves to either pick up the parcel or
 * deliver the parcel.
 */
function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}
//runRobot(VillageState.random(), goalOrientedRobot, []);

/****************************************************************** Exercises */

/** Measuring a Robot */
//compareRobots(routeRobot, [], goalOrientedRobot, []);
function compareRobots(rounds = 100) {
  let goalBot = 0;
  let randBot = 0;
  let routBot = 0;

  for (let i = 0; i < rounds; i++) {
    let testState = VillageState.random();
    goalBot += runRobot(testState, goalOrientedRobot, []);
    randBot += runRobot(testState, randomRobot, []);
    routBot += runRobot(testState, routeRobot, mailRoute);
  }

  const randDiff = Math.round((randBot / goalBot) * 100);
  const routeDiff = Math.round((routBot / goalBot) * 100);
  const routRandDiff = Math.round((randBot / routBot) * 100);

  console.log("Goal Bot Avg:   ", goalBot / 100);
  console.log("Route Bot Avg:  ", routBot / 100);
  console.log("Random Bot Avg: ", randBot / 100);
  console.log(`Goal bot is ${randDiff}% faster than random bot`);
  console.log(`Goal bot is ${routeDiff}% faster than route bot`);
  console.log(`Route bot is ${routRandDiff}% faster than random bot`);
}

compareRobots();

function planRoute(graph, from, to) {

}
/** Robot Efficiency
 *
 * Robot considers all parcels when planning route
*/

function efficientRobot({ place, parcels }, route) {
  // write out, exactly what each argument will be and what it does
  // write out, what is returned (from this and other robot functions)
  // this will give me a better idea of what is happening in this function,
  // and what is happening in runRobot.
}

/** Persistant Group */



