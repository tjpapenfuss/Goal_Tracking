/*
 * Create a new Goal
 */

pl.view.createGoal = {
  setupUserInterface: function() {
    var saveButton = document.forms['Goal'].commit;

    Goal.loadAll();

    saveButton.addEventListener("click",
      pl.view.createGoal.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () {
      Goal.saveAll();
    });
  },

  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Goal'];
    var slots = { personID: formEl.personID.value,
      name: formEl.name.value,
      goal_des: formEl.goal_des.value,
      completed: formEl.completed.value};
    Goal.add(slots);
    formEl.reset();
  }
};
