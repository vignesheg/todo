document.addEventListener("DOMContentLoaded", function() {
    let taskList = document.getElementById("taskList");
    let addButton = document.getElementById("addButton");
    let saveButton = document.getElementById("saveButton");
    let formPopup = document.getElementById("formPopup");
    let closeButton = document.getElementById("closeButton");
    let newItemInput = document.getElementById("newItemInput");

    // Load existing tasks from localStorage
    loadTasks();

    // Show the popup form
    addButton.addEventListener("click", function() {
        formPopup.style.display = "flex";
    });

    // Hide the popup form
    closeButton.addEventListener("click", function() {
        formPopup.style.display = "none";
    });

    // Save tasks to CSV file
    saveButton.addEventListener("click", function() {
        saveToCSV();
    });

    // Add a new item to the list
    window.addNewItem = function() {
        let newItemText = newItemInput.value.trim();
        if (newItemText) {
            addItemToList(newItemText);
            saveTasks();
            newItemInput.value = "";
            formPopup.style.display = "none";
        }
    };

    // Add item to the list
    function addItemToList(itemText) {
        let li = document.createElement("li");
        li.textContent = itemText;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "btn-remove";
        removeButton.addEventListener("click", function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    // Save tasks to localStorage
    function saveTasks() {
        let tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addItemToList(task));
    }

    // Save tasks to CSV file
    function saveToCSV() {
        let tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        let csvContent = "data:text/csv;charset=utf-8," + tasks.join("\n");
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "tasks.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
    }

    // Hide the popup if user clicks outside of it
    window.onclick = function(event) {
        if (event.target == formPopup) {
            formPopup.style.display = "none";
        }
    };
});
