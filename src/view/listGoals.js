/*
 * View the current goals for users
 */
pl.view.listGoals = {
  setupUserInterface: function () {
    var tableBodyE1 = document.querySelector("table#goals>tbody");
    var keys=[], key="", row={}, i=0;
    // load Goal objects
    Goal.loadAll();
    keys = Object.keys( Goal.instances);
    // for each goal, create a table row with a cell fro each attribute
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyE1.insertRow();
      row.insertCell(-1).textContent = Goal.instances[key].personID;
      row.insertCell(-1).textContent = Goal.instances[key].name;
      row.insertCell(-1).textContent = Goal.instances[key].goal_des;
      row.insertCell(-1).textContent = Goal.instances[key].completed;
    }
  }
};
