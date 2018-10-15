/** 
 * Constructor function for class Goals
 * @constructor
 * @param {{personID: pos integer, Name: String, Goal: String, completed:
 * boolean
 */
function Goal(slots) {
  this.personID = slots.personID;
  this.name = slots.name;
  this.goal_des = slots.goal_des;
  this.completed = slots.completed;
}

Goal.instances = {};

Goal.convertRow2Obj = function (goalRow) {
  var goal = new Goal( goalRow);
  return goal;
}

Goal.loadAll = function () {
  var key="", keys=[], goalsString="", goals={}, i=0;
  try {
    if (localStorage.getItem("goals")) {
      goalsString = localStorage.getItem("goals");
    }
  } catch (e) {
    alert("Error when reading from local storage\n" + e);
  }
  console.log("Message to the outside world..." + goalsString);
  if (goalsString) {
    goals = JSON.parse( goalsString);
    keys = Object.keys( goals);
    console.log( keys.length + " goals loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Goal.instances[key] = Goal.convertRow2Obj( goals[key]);
    }
  }
};

Goal.add = function (slots) {
  var goal = new Goal( slots);
  Goal.instances[slots.personID] = goal;
  console.log("Goal " +goal.personID + " created.");
};

Goal.update = function (slots) {
  var goal = Goal.instances[slots.personID];
  var personID = parseInt( slots.personID);
  if (personID !== goal.personID) { goal.personID = personID; }
  if (slots.name !== goal.name) { goal.name = slots.name; }
  if (slots.goal_des !== goal.goal_des) {goal.goal_des = slots.goal_des; }
  if (slots.completed !== goal.completed) {goal.completed = slots.completed; }
  console.log("User " + slots.name + " modified a goal!");
};

Goal.saveAll = function() {
  var goalsString="", error=false,
    nmrOfGoals = Object.keys( Goal.instances).length;
  try {
    goalsString = JSON.stringify( Goal.instances);
    localStorage.setItem("goals", goalsString);
  } catch (e) {
    alert("Error when writting to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfGoals + " goals saved.");
};

/*
 * Test data.
 */
Goal.createTestData = function () {
  Goal.instances["0000"] = new Goal({personID:0000, name:"Jim", goal_des:"Sample Goal #1", completed:true});
  Goal.instances["0001"] = new Goal({personID:0001, name:"Jim", goal_des:"Sample Goal #2", completed:true});
  Goal.instances["0002"] = new Goal({personID:0002, name:"Jim", goal_des:"Sample Goal #3", completed:false});
  Goal.saveAll();
}

