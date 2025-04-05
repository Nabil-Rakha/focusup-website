document.addEventListener("DOMContentLoaded", function () {
   const body = document.body;
   const noteInput = document.getElementById("note");
   const streakEl = document.getElementById("streak");
   const addStreakBtn = document.getElementById("add-streak");
   const resetStreakBtn = document.getElementById("reset-streak");
 
   const taskInput = document.getElementById("task");
   const addTaskBtn = document.getElementById("add-task");
   const taskList = document.getElementById("task-list");
 
   const darkToggle = document.getElementById("dark-toggle");
 
   // --- Load from localStorage ---
   let streak = parseInt(localStorage.getItem("focusup_streak")) || 0;
   let note = localStorage.getItem("focusup_note") || "";
   let tasks = JSON.parse(localStorage.getItem("focusup_tasks")) || [];
   let isDark = localStorage.getItem("focusup_dark") === "true";
 
   // --- Apply data ---
   streakEl.textContent = streak;
   noteInput.value = note;
   if (isDark) {
     body.classList.add("dark");
   } else {
     body.classList.add("light");
   }
 
   function renderTasks() {
     taskList.innerHTML = "";
     tasks.forEach((t, i) => {
       const li = document.createElement("li");
       li.className = "todo-item" + (t.done ? " done" : "");
       li.textContent = t.text;
       li.onclick = () => {
         tasks[i].done = !tasks[i].done;
         saveData();
         renderTasks();
       };
       taskList.appendChild(li);
     });
   }
 
   // --- Save to localStorage ---
   function saveData() {
     localStorage.setItem("focusup_streak", streak);
     localStorage.setItem("focusup_note", noteInput.value);
     localStorage.setItem("focusup_tasks", JSON.stringify(tasks));
     localStorage.setItem("focusup_dark", body.classList.contains("dark"));
   }
 
   // --- Events ---
   addStreakBtn.onclick = () => {
     streak++;
     streakEl.textContent = streak;
     saveData();
   };
 
   resetStreakBtn.onclick = () => {
     streak = 0;
     streakEl.textContent = streak;
     saveData();
   };
 
   noteInput.oninput = () => {
     saveData();
   };
 
   addTaskBtn.onclick = () => {
     const text = taskInput.value.trim();
     if (text) {
       tasks.push({ text, done: false });
       taskInput.value = "";
       renderTasks();
       saveData();
     }
   };
 
   darkToggle.onchange = () => {
     body.classList.toggle("dark", darkToggle.checked);
     body.classList.toggle("light", !darkToggle.checked);
     saveData();
   };
 
   darkToggle.checked = isDark;
 
   renderTasks();
 });
 