/* =====================================
   PRACTICUM 9 - ANIMATED USER INTERACTIONS
===================================== */

const showHighlightsBtn = document.getElementById("showHighlightsBtn");
const closeHighlightsBtn = document.getElementById("closeHighlightsBtn");
const highlightsCard = document.getElementById("highlightsCard");

showHighlightsBtn.addEventListener("click", function () {
    highlightsCard.classList.add("show-card");
    showHighlightsBtn.classList.add("button-active");
});

closeHighlightsBtn.addEventListener("click", function () {
    highlightsCard.classList.remove("show-card");
    showHighlightsBtn.classList.remove("button-active");
});

const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notificationMessage");
const closeNotificationBtn = document.getElementById("closeNotificationBtn");

function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.add("show-notification");

    setTimeout(function () {
        notification.classList.remove("show-notification");
    }, 4000);
}

closeNotificationBtn.addEventListener("click", function () {
    notification.classList.remove("show-notification");
});

const admissionForm = document.querySelector("#admission form");

admissionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    showNotification("Your application details are ready for submission!");
});

window.addEventListener("load", function () {
    showNotification("Welcome to JOYS UNIVERSITY!");
});


/* =====================================
   PRACTICUM 10 - DOM MANIPULATION
===================================== */

const industryNameInput = document.getElementById("industryName");
const industryDescriptionInput = document.querySelector("#industryDescription");
const industrySubmitBtn = document.getElementById("industrySubmitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const industryList = document.getElementById("industryList");
const industryMessage = document.getElementById("industryMessage");
const industryEmptyMessage = document.getElementById("industryEmptyMessage");

let industries = [
    {
        name: "Information Technology",
        description: "Develops software, digital services and computer-based solutions."
    },
    {
        name: "Healthcare",
        description: "Provides medical services, healthcare technology and patient support."
    }
];

let editingIndex = -1;

function displayIndustries() {
    industryList.innerHTML = "";

    industries.forEach(function (industry, index) {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "industry-item");
        listItem.setAttribute("data-index", index);

        const details = document.createElement("div");

        const title = document.createElement("strong");
        title.textContent = industry.name;

        const description = document.createElement("p");
        description.textContent = industry.description;

        details.appendChild(title);
        details.appendChild(description);

        const actions = document.createElement("div");
        actions.setAttribute("class", "industry-actions");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("type", "button");
        editButton.setAttribute("class", "industry-action-button edit-industry");

        editButton.addEventListener("click", function () {
            editIndustry(index);
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("class", "industry-action-button remove-industry");

        removeButton.addEventListener("click", function () {
            removeIndustry(index);
        });

        actions.appendChild(editButton);
        actions.appendChild(removeButton);

        listItem.appendChild(details);
        listItem.appendChild(actions);

        industryList.appendChild(listItem);
    });

    industryEmptyMessage.hidden = industries.length !== 0;
}

industrySubmitBtn.addEventListener("click", function () {
    const name = industryNameInput.value.trim();
    const description = industryDescriptionInput.value.trim();

    if (name === "" || description === "") {
        industryMessage.textContent =
            "Please enter both industry name and description.";
        return;
    }

    if (editingIndex === -1) {
        industries.push({
            name: name,
            description: description
        });

        industryMessage.textContent =
            "Industry information added successfully.";
    } else {
        industries[editingIndex] = {
            name: name,
            description: description
        };

        industryMessage.textContent =
            "Industry information updated successfully.";

        editingIndex = -1;
        industrySubmitBtn.textContent = "Add Industry";
        cancelEditBtn.hidden = true;
    }

    industryNameInput.value = "";
    industryDescriptionInput.value = "";

    displayIndustries();
});

function editIndustry(index) {
    industryNameInput.value = industries[index].name;
    industryDescriptionInput.value = industries[index].description;

    editingIndex = index;

    industrySubmitBtn.textContent = "Update Industry";
    cancelEditBtn.hidden = false;

    industryMessage.textContent =
        "Edit the details and click Update Industry.";

    industryNameInput.focus();
}

function removeIndustry(index) {
    industries.splice(index, 1);

    if (editingIndex === index) {
        resetIndustryForm();
    } else if (editingIndex > index) {
        editingIndex--;
    }

    industryMessage.textContent = "Industry information removed.";

    displayIndustries();
}

function resetIndustryForm() {
    industryNameInput.value = "";
    industryDescriptionInput.value = "";

    editingIndex = -1;

    industrySubmitBtn.textContent = "Add Industry";
    cancelEditBtn.hidden = true;
}

cancelEditBtn.addEventListener("click", function () {
    resetIndustryForm();
    industryMessage.textContent = "Editing cancelled.";
});

displayIndustries();


/* =====================================
   PRACTICUM 11 - FORM VALIDATION
===================================== */

const industryRegistrationForm =
    document.getElementById("industryRegistrationForm");

const industryFormError =
    document.getElementById("industryFormError");

const industryFormSuccess =
    document.getElementById("industryFormSuccess");

const registrationFields = [
    "applicantName",
    "applicantEmail",
    "applicantPhone",
    "industryType",
    "companyName",
    "jobRole",
    "experience",
    "industryDescriptionForm"
];

function displayFieldError(field) {
    const errorElement =
        document.getElementById(field.id + "Error");

    if (errorElement) {
        errorElement.textContent =
            field.validity.valid ? "" : field.validationMessage;
    }
}

const applicantPhone =
    document.getElementById("applicantPhone");

applicantPhone.addEventListener("input", function () {
    if (
        applicantPhone.value !== "" &&
        !/^[6-9][0-9]{9}$/.test(applicantPhone.value)
    ) {
        applicantPhone.setCustomValidity(
            "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
        );
    } else {
        applicantPhone.setCustomValidity("");
    }

    displayFieldError(applicantPhone);
});

registrationFields.forEach(function (fieldId) {
    const field = document.getElementById(fieldId);

    field.addEventListener("input", function () {
        if (field.id !== "applicantPhone") {
            field.setCustomValidity("");
        }

        displayFieldError(field);

        industryFormError.textContent = "";
        industryFormSuccess.textContent = "";
    });

    field.addEventListener("change", function () {
        displayFieldError(field);
    });
});

industryRegistrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    industryFormSuccess.textContent = "";

    if (
        applicantPhone.value !== "" &&
        !/^[6-9][0-9]{9}$/.test(applicantPhone.value)
    ) {
        applicantPhone.setCustomValidity(
            "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
        );
    } else {
        applicantPhone.setCustomValidity("");
    }

    let formIsValid = industryRegistrationForm.checkValidity();

    registrationFields.forEach(function (fieldId) {
        displayFieldError(document.getElementById(fieldId));
    });

    if (!formIsValid) {
        industryFormError.textContent =
            "Please correct the highlighted fields before submitting the form.";

        industryRegistrationForm.reportValidity();
        return;
    }

    industryFormError.textContent = "";

    industryRegistrationForm.reset();

    industryFormSuccess.textContent =
        "Registration submitted successfully! Thank you for providing your industry details.";

    registrationFields.forEach(function (fieldId) {
        const field = document.getElementById(fieldId);

        field.setCustomValidity("");
        displayFieldError(field);
    });
});

industryRegistrationForm.addEventListener("reset", function () {
    industryFormError.textContent = "";
    industryFormSuccess.textContent = "";

    registrationFields.forEach(function (fieldId) {
        const errorElement =
            document.getElementById(fieldId + "Error");

        if (errorElement) {
            errorElement.textContent = "";
        }

        const field = document.getElementById(fieldId);
        field.setCustomValidity("");
    });
});


/* =====================================
   PRACTICUM 12 - API INTEGRATION
===================================== */

const apiIndustrySelect =
    document.getElementById("apiIndustrySelect");

const fetchIndustryBtn =
    document.getElementById("fetchIndustryBtn");

const apiLoading =
    document.getElementById("apiLoading");

const apiError =
    document.getElementById("apiError");

const apiErrorMessage =
    document.getElementById("apiErrorMessage");

const apiInitialMessage =
    document.getElementById("apiInitialMessage");

const apiTableContainer =
    document.getElementById("apiTableContainer");

const apiIndustryTableBody =
    document.getElementById("apiIndustryTableBody");

const apiResultHeading =
    document.getElementById("apiResultHeading");

async function fetchIndustryData() {
    const industry = apiIndustrySelect.value;

    if (industry === "") {
        apiError.hidden = false;
        apiErrorMessage.textContent =
            "Please select an industry before fetching data.";
        return;
    }

    apiLoading.hidden = false;
    apiError.hidden = true;
    apiTableContainer.hidden = true;
    apiInitialMessage.hidden = true;

    fetchIndustryBtn.disabled = true;
    apiIndustryTableBody.innerHTML = "";

    try {
        const apiURL =
            "https://api.github.com/search/repositories?q=" +
            encodeURIComponent(industry) +
            "&sort=stars&order=desc&per_page=10";

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(
                "Unable to retrieve data. HTTP Status: " + response.status
            );
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            apiInitialMessage.hidden = false;
            apiInitialMessage.textContent =
                "No information found for the selected industry.";
            return;
        }

        apiResultHeading.textContent =
            "Industry Information: " + industry.toUpperCase();

        data.items.forEach(function (repository) {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = repository.name;

            const descriptionCell = document.createElement("td");
            descriptionCell.textContent =
                repository.description || "No description available";

            const languageCell = document.createElement("td");
            languageCell.textContent =
                repository.language || "Not specified";

            const starsCell = document.createElement("td");
            starsCell.textContent = repository.stargazers_count;

            const linkCell = document.createElement("td");
            const repositoryLink = document.createElement("a");

            repositoryLink.textContent = "View Repository";
            repositoryLink.href = repository.html_url;
            repositoryLink.target = "_blank";
            repositoryLink.rel = "noopener noreferrer";

            linkCell.appendChild(repositoryLink);

            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(languageCell);
            row.appendChild(starsCell);
            row.appendChild(linkCell);

            apiIndustryTableBody.appendChild(row);
        });

        apiTableContainer.hidden = false;

    } catch (error) {
        apiError.hidden = false;
        apiErrorMessage.textContent =
            "Error fetching industry information: " + error.message;

    } finally {
        apiLoading.hidden = true;
        fetchIndustryBtn.disabled = false;
    }
}

fetchIndustryBtn.addEventListener("click", fetchIndustryData);
/* =====================================
   PRACTICUM 13 - TASK MANAGER
   CRUD OPERATIONS WITH LOCAL STORAGE
===================================== */

// Select HTML elements.

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskIndustry = document.getElementById("taskIndustry");
const taskDueDate = document.getElementById("taskDueDate");
const taskStatus = document.getElementById("taskStatus");

const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelTaskEditBtn = document.getElementById("cancelTaskEditBtn");
const taskFormHeading = document.getElementById("taskFormHeading");
const taskMessage = document.getElementById("taskMessage");

const taskTableBody = document.getElementById("taskTableBody");
const taskFilter = document.getElementById("taskFilter");
const noTasksMessage = document.getElementById("noTasksMessage");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const progressTasks = document.getElementById("progressTasks");
const completedTasks = document.getElementById("completedTasks");


// Retrieve saved tasks from Local Storage.

let tasks = JSON.parse(localStorage.getItem("industryTasks")) || [];


// Store the ID of the task currently being edited.

let editingTaskId = null;


// Save the current task list in Local Storage.

function saveTasksToStorage() {
    localStorage.setItem("industryTasks", JSON.stringify(tasks));
}


// Display all tasks in the table.

function displayTasks() {
    taskTableBody.innerHTML = "";

    const selectedFilter = taskFilter.value;

    let filteredTasks;

    if (selectedFilter === "All") {
        filteredTasks = tasks;
    } else {
        filteredTasks = tasks.filter(function (task) {
            return task.status === selectedFilter;
        });
    }

    noTasksMessage.hidden = filteredTasks.length !== 0;

    filteredTasks.forEach(function (task) {
        const row = document.createElement("tr");

        // Task title.

        const titleCell = document.createElement("td");
        titleCell.textContent = task.title;

        // Task description.

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;

        // Industry.

        const industryCell = document.createElement("td");
        industryCell.textContent = task.industry;

        // Due date.

        const dateCell = document.createElement("td");
        dateCell.textContent = task.dueDate;

        // Task status dropdown.

        const statusCell = document.createElement("td");
        const statusSelect = document.createElement("select");

        statusSelect.className = "task-status-select";

        const statusOptions = [
            "Pending",
            "In Progress",
            "Completed"
        ];

        statusOptions.forEach(function (status) {
            const option = document.createElement("option");

            option.value = status;
            option.textContent = status;

            if (task.status === status) {
                option.selected = true;
            }

            statusSelect.appendChild(option);
        });

        statusSelect.addEventListener("change", function () {
            updateTaskStatus(task.id, statusSelect.value);
        });

        statusCell.appendChild(statusSelect);

        // Action buttons.

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.type = "button";
        editButton.className = "task-action-button";

        editButton.addEventListener("click", function () {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "task-action-button delete-task";

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        // Add all cells to the row.

        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        row.appendChild(industryCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        taskTableBody.appendChild(row);
    });

    updateTaskSummary();

    // Refresh Practicum 14 task explorer whenever tasks change.

    displayTaskExplorer();
}


// Update task count summary.

function updateTaskSummary() {
    totalTasks.textContent = tasks.length;

    pendingTasks.textContent = tasks.filter(function (task) {
        return task.status === "Pending";
    }).length;

    progressTasks.textContent = tasks.filter(function (task) {
        return task.status === "In Progress";
    }).length;

    completedTasks.textContent = tasks.filter(function (task) {
        return task.status === "Completed";
    }).length;
}


// Add a new task or update an existing task.

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const industry = taskIndustry.value;
    const dueDate = taskDueDate.value;
    const status = taskStatus.value;

    if (
        title === "" ||
        description === "" ||
        industry === "" ||
        dueDate === ""
    ) {
        taskMessage.textContent =
            "Please complete all task details.";
        return;
    }

    if (editingTaskId === null) {

        // CREATE: Add a new task.

        const newTask = {
            id: Date.now(),
            title: title,
            description: description,
            industry: industry,
            dueDate: dueDate,
            status: status
        };

        tasks.push(newTask);

        taskMessage.textContent = "Task added successfully!";

    } else {

        // UPDATE: Find and update the selected task.

        const taskToUpdate = tasks.find(function (task) {
            return task.id === editingTaskId;
        });

        if (taskToUpdate) {
            taskToUpdate.title = title;
            taskToUpdate.description = description;
            taskToUpdate.industry = industry;
            taskToUpdate.dueDate = dueDate;
            taskToUpdate.status = status;

            taskMessage.textContent = "Task updated successfully!";
        }

        editingTaskId = null;
    }

    saveTasksToStorage();

    taskForm.reset();

    taskFormHeading.textContent = "Add New Task";
    saveTaskBtn.textContent = "Add Task";
    cancelTaskEditBtn.hidden = true;

    displayTasks();
});


// READ: Find a task and load its details into the form.

function editTask(id) {
    const selectedTask = tasks.find(function (task) {
        return task.id === id;
    });

    if (selectedTask) {
        taskTitle.value = selectedTask.title;
        taskDescription.value = selectedTask.description;
        taskIndustry.value = selectedTask.industry;
        taskDueDate.value = selectedTask.dueDate;
        taskStatus.value = selectedTask.status;

        editingTaskId = id;

        taskFormHeading.textContent = "Update Task";
        saveTaskBtn.textContent = "Update Task";
        cancelTaskEditBtn.hidden = false;

        taskMessage.textContent =
            "Edit the task details and click Update Task.";

        taskTitle.focus();
    }
}


// UPDATE: Change the status of a task.

function updateTaskStatus(id, newStatus) {
    const selectedTask = tasks.find(function (task) {
        return task.id === id;
    });

    if (selectedTask) {
        selectedTask.status = newStatus;

        saveTasksToStorage();
        displayTasks();

        taskMessage.textContent =
            "Task status updated successfully!";
    }
}


// DELETE: Remove a task from the list.

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    if (editingTaskId === id) {
        resetTaskForm();
    }

    saveTasksToStorage();
    displayTasks();

    taskMessage.textContent = "Task deleted successfully!";
}


// Cancel the current editing operation.

function resetTaskForm() {
    taskForm.reset();

    editingTaskId = null;

    taskFormHeading.textContent = "Add New Task";
    saveTaskBtn.textContent = "Add Task";

    cancelTaskEditBtn.hidden = true;
    taskMessage.textContent = "";
}


// Cancel Edit button.

cancelTaskEditBtn.addEventListener("click", function () {
    resetTaskForm();
});


// Filter tasks by their status.

taskFilter.addEventListener("change", function () {
    displayTasks();
});


/* =====================================
   PRACTICUM 14 - INTERACTIVE TASK EXPLORER
===================================== */

// Select Practicum 14 HTML elements.

const explorerSearch =
    document.querySelector("#explorerSearch");

const explorerIndustry =
    document.querySelector("#explorerIndustry");

const explorerStatus =
    document.querySelector("#explorerStatus");

const resetExplorerBtn =
    document.querySelector("#resetExplorerBtn");

const explorerTaskList =
    document.querySelector("#explorerTaskList");

const explorerResultCount =
    document.querySelector("#explorerResultCount");

const explorerEmptyMessage =
    document.querySelector("#explorerEmptyMessage");

const explorerControls =
    document.querySelector(".explorer-controls");


// Populate industry filter using the industries available in tasks.

function populateIndustryFilter() {
    const selectedIndustry = explorerIndustry.value;

    const industryNames = [];

    tasks.forEach(function (task) {
        if (!industryNames.includes(task.industry)) {
            industryNames.push(task.industry);
        }
    });

    explorerIndustry.innerHTML =
        '<option value="All">All Industries</option>';

    industryNames.forEach(function (industry) {
        const option = document.createElement("option");

        option.value = industry;
        option.textContent = industry;

        explorerIndustry.appendChild(option);
    });

    if (industryNames.includes(selectedIndustry)) {
        explorerIndustry.value = selectedIndustry;
    } else {
        explorerIndustry.value = "All";
    }
}


// Display the matching tasks.

function displayTaskExplorer() {
    if (!explorerTaskList) {
        return;
    }

    // Update industry filter options.

    populateIndustryFilter();

    // Get values entered by the user.

    const searchValue = explorerSearch.value.trim().toLowerCase();
    const selectedIndustry = explorerIndustry.value;
    const selectedStatus = explorerStatus.value;

    // Filter tasks based on search, industry and status.

    const matchingTasks = tasks.filter(function (task) {
        const title = (task.title || "").toLowerCase();
        const description = (task.description || "").toLowerCase();

        const matchesSearch =
            title.includes(searchValue) ||
            description.includes(searchValue);

        const matchesIndustry =
            selectedIndustry === "All" ||
            task.industry === selectedIndustry;

        const matchesStatus =
            selectedStatus === "All" ||
            task.status === selectedStatus;

        return matchesSearch && matchesIndustry && matchesStatus;
    });

    // Clear previous task cards.

    explorerTaskList.innerHTML = "";

    // Update the result count.

    explorerResultCount.textContent =
        "Showing " + matchingTasks.length +
        " of " + tasks.length + " tasks";

    // Display empty message when no tasks match.

    explorerEmptyMessage.hidden = matchingTasks.length !== 0;

    // Create a card for every matching task.

    matchingTasks.forEach(function (task) {
        const listItem = document.createElement("li");

        listItem.classList.add("explorer-task-card");

        // Task title.

        const title = document.createElement("h4");
        title.textContent = task.title;

        // Task industry.

        const industryText = document.createElement("p");
        industryText.textContent = "Industry: " + task.industry;

        // Task status.

        const statusText = document.createElement("span");
        statusText.classList.add("explorer-status");

        statusText.textContent = task.status;

        if (task.status === "Pending") {
            statusText.classList.add("pending");
        } else if (task.status === "In Progress") {
            statusText.classList.add("in-progress");
        } else {
            statusText.classList.add("completed");
        }

        // Task details accordion.

        const details = document.createElement("details");

        const summary = document.createElement("summary");
        summary.textContent = "View Task Details";

        const description = document.createElement("p");
        description.textContent =
            "Description: " + task.description;

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date: " + task.dueDate;

        const fullStatus = document.createElement("p");
        fullStatus.textContent = "Current Status: " + task.status;

        details.appendChild(summary);
        details.appendChild(description);
        details.appendChild(dueDate);
        details.appendChild(fullStatus);

        // Find the selected task when the accordion is opened.

        details.addEventListener("toggle", function () {
            const selectedTask = tasks.find(function (item) {
                return item.id === task.id;
            });

            if (selectedTask && details.open) {
                listItem.classList.add("task-explorer-open");
            } else {
                listItem.classList.remove("task-explorer-open");
            }
        });

        // Add elements to the task card.

        listItem.appendChild(title);
        listItem.appendChild(industryText);
        listItem.appendChild(statusText);
        listItem.appendChild(details);

        explorerTaskList.appendChild(listItem);
    });

    // Highlight the filter area when filters are active.

    const filtersAreActive =
        searchValue !== "" ||
        selectedIndustry !== "All" ||
        selectedStatus !== "All";

    explorerControls.classList.toggle("filters-active", filtersAreActive);

    // Select all task accordions and add toggle interaction.

    const taskAccordions =
        explorerTaskList.querySelectorAll("details");

    taskAccordions.forEach(function (accordion) {
        accordion.addEventListener("click", function () {
            const card = accordion.closest(".explorer-task-card");

            if (card) {
                card.classList.toggle(
                    "task-explorer-open",
                    accordion.open
                );
            }
        });
    });
}


// Search tasks when the user types.

explorerSearch.addEventListener("input", function () {
    displayTaskExplorer();
});


// Filter tasks by industry.

explorerIndustry.addEventListener("change", function () {
    displayTaskExplorer();
});


// Filter tasks by status.

explorerStatus.addEventListener("change", function () {
    displayTaskExplorer();
});


// Reset all filters.

resetExplorerBtn.addEventListener("click", function () {
    explorerSearch.value = "";
    explorerIndustry.value = "All";
    explorerStatus.value = "All";

    explorerControls.classList.remove("filters-active");

    displayTaskExplorer();
});


// Display saved tasks and explorer results when the page loads.

displayTasks();
