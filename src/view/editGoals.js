/**
 * Methods to edit a Goal
 * @author: Tanner Papenfuss
 */
pl.view.editGoals = {
  setupUserInterface: function () {
    var formEl = document.forms['Goal'],
      saveButton = formEl.commit,
      selectGoalEl = formEl.selectGoal;
    var key="", keys=[], goal=null, optionEl=null, i=0;

    Goal.loadAll();

    keys = Object.keys(Goal.instances);
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      goal = Goal.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = goal.goal_des;
      optionEl.value = goal.personID;
      selectGoalEl.add( optionEl, null);
    }

    selectGoalEl.addEventListener("change", function () {
      var goal=null, key = selectGoalEl.value;
      console.log("Key value:" + key );
      if (key) {
        goal = Goal.instances[key];
        formEl.personID.value = goal.personID;
        formEl.name.value = goal.name;
        formEl.goal_des.value = goal.goal_des;
        formEl.completed.value = goal.completed;
      } else {
        formEl.reset();
      }
    });
    saveButton.addEventListener("click", 
      pl.view.editGoals.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function() {
      Goal.saveAll();
    });
  },
  // save data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Goal'];
    var slots = { personID: formEl.personID.value,
      name: formEl.name.value,
      goal_des: formEl.goal_des.value,
      completed: formEl.completed.value
    };
    Goal.update(slots);
    formEl.reset();
  }
};
