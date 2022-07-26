Notes on robots,
- Robot fns are called at each iteration of the loop in runRobot

goalOrientedRobot
args: {place, parcels}, route
- Place: string
    - a like 'Farm', 'Daria's House', etc...
    - the robot's location before movement
- Parcels: { place: 'Town Hall', address: "Grete's House }
    - place is parcel pick-up location
    - address is parcel drop-off location
- Route: ["Town Hall", "Daria's House"]
    - next stop to make, can be empty
    - comes from memory, or

returns: { direction: "Alice's House", memory: [ "Bob's House" ] }
- direction is the next move
- memory is subsequent moves

should look at what it knows and then re