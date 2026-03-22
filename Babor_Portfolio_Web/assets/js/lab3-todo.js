document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("todoForm");
  var input = document.getElementById("todoInput");
  var list = document.getElementById("todoList");
  var totalTasks = document.getElementById("totalTasks");
  var completedTasks = document.getElementById("completedTasks");

  var tasks = [];
  var taskIdCounter = 0;

  function updateStats() {
    var total = tasks.length;
    var completed = tasks.filter(function (t) { return t.completed; }).length;
    totalTasks.textContent = "Total: " + total;
    completedTasks.textContent = "Completed: " + completed;
  }

  function renderTasks() {
    if (tasks.length === 0) {
      list.innerHTML = "<p class='todo-empty'>No tasks yet. Add one above to get started!</p>";
      updateStats();
      return;
    }

    list.innerHTML = "";
    tasks.forEach(function (task) {
      var item = document.createElement("div");
      item.className = "todo-item" + (task.completed ? " completed" : "");
      item.innerHTML = 
        "<label class='todo-checkbox-label'>" +
        "<input type='checkbox' class='todo-checkbox' " + (task.completed ? "checked" : "") + " data-id='" + task.id + "' />" +
        "<span class='todo-text'>" + escapeHtml(task.text) + "</span>" +
        "</label>" +
        "<button class='todo-delete' data-id='" + task.id + "' aria-label='Delete task'>×</button>";
      list.appendChild(item);
    });

    var checkboxes = list.querySelectorAll(".todo-checkbox");
    checkboxes.forEach(function (cb) {
      cb.addEventListener("change", function () {
        var id = parseInt(cb.getAttribute("data-id"));
        var task = tasks.find(function (t) { return t.id === id; });
        if (task) {
          task.completed = cb.checked;
          var item = cb.closest(".todo-item");
          if (task.completed) {
            item.classList.add("completed");
          } else {
            item.classList.remove("completed");
          }
          updateStats();
        }
      });
    });

    var deleteBtns = list.querySelectorAll(".todo-delete");
    deleteBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = parseInt(btn.getAttribute("data-id"));
        tasks = tasks.filter(function (t) { return t.id !== id; });
        renderTasks();
      });
    });

    updateStats();
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (text === "") return;

      tasks.push({
        id: taskIdCounter++,
        text: text,
        completed: false
      });

      input.value = "";
      renderTasks();
    });
  }

  renderTasks();
});
