// Se asegura de que la variable tasks nunca este vacía
if (localStorage.getItem("tasks") == null) {
  localStorage.setItem("tasks", []);
}

let localTasks = getTasks();

function getTasks() {
  return localStorage.getItem("tasks").split(",");
}

function updateTasks(tasks) {
  localStorage.setItem("tasks", tasks);
}

function removeIndexOf(array, string) {
  let index = array.indexOf(string);
  array.splice(index, 1);
}

function removeTask(value, confirmation = true) {
  if (confirmation == false || confirm("De verdad quiere eliminar la tarea?")) {
    removeIndexOf(localTasks, value);
    updateTasks(localTasks);
    location.reload();
  }
}

// Cuando el DOM carga
window.addEventListener("DOMContentLoaded", () => {
  let showTasks = document.getElementById("tasks-container");

  localTasks.forEach((task) => {
    addAppTask(task, false);
  });

  const form = document.querySelector("form");

  const formInput = form.querySelector("input");
  const formButton = form.querySelector("button");

  formButton.addEventListener("click", () => {
    let text = formInput.value;

    addAppTask(text);
  });

  function addAppTask(taskText, append = true) {
    if (taskText != "") {
      showTasks.innerHTML += `<task class='task flex text-center min-w-fit flex-col gap-3 justify-between transition ease-in-out delay-75 dark:bg-dark-950 dark:hover:bg-dark-500 bg-bright-500 hover:bg-bright-850 hover:text-white hover:-translate-y-1 hover:scale-105 duration-300 border-2 border-slate-900'><select class="text-sm bg-bright-500 dark:bg-dark-500"><option value="1" class="text-xs">Completada</option><option value="0.5" class="text-xs">A medias</option><option value="0" class="text-xs" selected>Sin Completar</option></select><p>${taskText}</p><div class="flex justify-around"><button><i class='bx bxs-edit'></i></button><button><i class='bx bx-task-x'></i></button></div></task>`;

      if (append) {
        localTasks.push(taskText);
        updateTasks(localTasks);
      }
    }
  }

  function add_event_listeners() {
    showTasks.querySelectorAll("task").forEach((tarea) => {
      let editButton = tarea.querySelector("div").querySelectorAll("button")[0];
      let deleteButton = tarea
        .querySelector("div")
        .querySelectorAll("button")[1];
      let taskContent = tarea.querySelector("p");

      deleteButton.addEventListener("click", () => {
        removeTask(taskContent.innerText);
      });

      editButton.addEventListener("click", () => {
        let response = prompt("Editar tarea: ");
        if (response != null) {
          removeTask(taskContent.innerText, false);
          addAppTask(response);
        }
      });
    });
  }

  add_event_listeners();
});
