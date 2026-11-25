/* =====================================
   JOYS UNIVERSITY
   PRACTICUM 9 - 15
   COMPLETE JAVASCRIPT
===================================== */


/* =====================================
   PRACTICUM 9 - ANIMATED INTERACTIONS
===================================== */

// Select HTML elements

const showHighlightsBtn =
    document.getElementById("showHighlightsBtn");

const closeHighlightsBtn =
    document.getElementById("closeHighlightsBtn");

const highlightsCard =
    document.getElementById("highlightsCard");

const notification =
    document.getElementById("notification");

const notificationMessage =
    document.getElementById("notificationMessage");

const closeNotificationBtn =
    document.getElementById("closeNotificationBtn");


// Show university highlights

if (showHighlightsBtn && highlightsCard) {
    showHighlightsBtn.addEventListener("click", function () {
        highlightsCard.classList.add("show");
        showNotification("Discover JOYS UNIVERSITY highlights!");
    });
}


// Close university highlights

if (closeHighlightsBtn && highlightsCard) {
    closeHighlightsBtn.addEventListener("click", function () {
        highlightsCard.classList.remove("show");
    });
}


// Display notification

function showNotification(message) {

    if (!notification || !notificationMessage) {
        return;
    }

    notificationMessage.textContent = message;

    notification.classList.add("show");
}


// Close notification

if (closeNotificationBtn && notification) {
    closeNotificationBtn.addEventListener("click", function () {
        notification.classList.remove("show");
    });
}


/* =====================================
   PRACTICUM 10 - INDUSTRY INFORMATION
   DOM MANIPULATION
===================================== */

const industryName =
    document.getElementById("industryName");

const industryDescription =
    document.getElementById("industryDescription");

const industrySubmitBtn =
    document.getElementById("industrySubmitBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

const industryList =
    document.getElementById("industryList");

const industryMessage =
    document.getElementById("industryMessage");

const industryEmptyMessage =
    document.getElementById("industryEmptyMessage");


let industries = [];

let editingIndustryIndex = -1;


// Display industries

function displayIndustries() {

    if (!industryList) {
        return;
    }

    industryList.innerHTML = "";

    industries.forEach(function (industry, index) {

        const li = document.createElement("li");

        const heading = document.createElement("h3");
        heading.textContent = industry.name;

        const description = document.createElement("p");
        description.textContent = industry.description;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        editButton.addEventListener("click", function () {
            editIndustry(index);
        });

        deleteButton.addEventListener("click", function () {
            deleteIndustry(index);
        });

        li.appendChild(heading);
        li.appendChild(description);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        industryList.appendChild(li);

    });

    if (industryEmptyMessage) {
        industryEmptyMessage.hidden = industries.length !== 0;
    }
}


// Add or update industry

if (industrySubmitBtn) {

    industrySubmitBtn.addEventListener("click", function () {

        const name = industryName.value.trim();

        const description = industryDescription.value.trim();

        if (name === "" || description === "") {

            industryMessage.textContent =
                "Please enter both industry name and description.";

            return;
        }

        if (editingIndustryIndex === -1) {

            industries.push({
                name: name,
                description: description
            });

            industryMessage.textContent =
                "Industry added successfully!";

        } else {

            industries[editingIndustryIndex] = {
                name: name,
                description: description
            };

            industryMessage.textContent =
                "Industry updated successfully!";

            editingIndustryIndex = -1;

            industrySubmitBtn.textContent = "Add Industry";

            if (cancelEditBtn) {
                cancelEditBtn.hidden = true;
            }
        }

        industryName.value = "";
        industryDescription.value = "";

        displayIndustries();

    });

}


// Edit industry

function editIndustry(index) {

    industryName.value = industries[index].name;

    industryDescription.value = industries[index].description;

    editingIndustryIndex = index;

    industrySubmitBtn.textContent = "Update Industry";

    if (cancelEditBtn) {
        cancelEditBtn.hidden = false;
    }
}


// Delete industry

function deleteIndustry(index) {

    industries.splice(index, 1);

    displayIndustries();

    industryMessage.textContent =
        "Industry deleted successfully!";
}


// Cancel industry editing

if (cancelEditBtn) {

    cancelEditBtn.addEventListener("click", function () {

        editingIndustryIndex = -1;

        industryName.value = "";
        industryDescription.value = "";

        industrySubmitBtn.textContent = "Add Industry";

        cancelEditBtn.hidden = true;

        industryMessage.textContent =
            "Industry editing cancelled.";

    });

}


// Initial industry display

displayIndustries();


/* =====================================
   PRACTICUM 11 - FORM VALIDATION
===================================== */

const industryRegistrationForm =
    document.getElementById("industryRegistrationForm");


// Validate individual field

function validateField(field, errorElement, message) {

    if (!field || !errorElement) {
        return true;
    }

    if (!field.checkValidity()) {

        errorElement.textContent =
            message || field.validationMessage;

        field.classList.add("invalid-field");

        return false;
    }

    errorElement.textContent = "";

    field.classList.remove("invalid-field");

    return true;
}


// Registration form submission

if (industryRegistrationForm) {

    industryRegistrationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const applicantName =
            document.getElementById("applicantName");

        const applicantEmail =
            document.getElementById("applicantEmail");

        const applicantPhone =
            document.getElementById("applicantPhone");

        const industryType =
            document.getElementById("industryType");

        const companyName =
            document.getElementById("companyName");

        const jobRole =
            document.getElementById("jobRole");

        const experience =
            document.getElementById("experience");

        const description =
            document.getElementById("industryDescriptionForm");


        let isValid = true;


        // Name validation

        if (!validateField(
            applicantName,
            document.getElementById("applicantNameError"),
            "Please enter a valid name."
        )) {
            isValid = false;
        }


        // Email validation

        if (!validateField(
            applicantEmail,
            document.getElementById("applicantEmailError"),
            "Please enter a valid email address."
        )) {
            isValid = false;
        }


        // Phone validation

        if (!validateField(
            applicantPhone,
            document.getElementById("applicantPhoneError"),
            "Enter a valid 10-digit mobile number."
        )) {
            isValid = false;
        }


        // Industry validation

        if (!validateField(
            industryType,
            document.getElementById("industryTypeError"),
            "Please select an industry."
        )) {
            isValid = false;
        }


        // Company validation

        if (!validateField(
            companyName,
            document.getElementById("companyNameError"),
            "Enter a valid company name."
        )) {
            isValid = false;
        }


        // Job role validation

        if (!validateField(
            jobRole,
            document.getElementById("jobRoleError"),
            "Please enter your job role."
        )) {
            isValid = false;
        }


        // Experience validation

        if (!validateField(
            experience,
            document.getElementById("experienceError"),
            "Enter experience between 0 and 40 years."
        )) {
            isValid = false;
        }


        // Description validation

        if (!validateField(
            description,
            document.getElementById("industryDescriptionFormError"),
            "Description must contain at least 20 characters."
        )) {
            isValid = false;
        }


        const errorMessage =
            document.getElementById("industryFormError");

        const successMessage =
            document.getElementById("industryFormSuccess");


        if (!isValid) {

            errorMessage.textContent =
                "Please correct the highlighted fields.";

            successMessage.textContent = "";

            return;
        }


        errorMessage.textContent = "";

        successMessage.textContent =
            "Registration submitted successfully!";


        showNotification("Industry registration successful!");

        industryRegistrationForm.reset();

    });

}


// Clear validation messages when the form is reset

if (industryRegistrationForm) {

    industryRegistrationForm.addEventListener("reset", function () {

        setTimeout(function () {

            document.querySelectorAll(".validation-error")
                .forEach(function (element) {
                    element.textContent = "";
                });

            document.querySelectorAll(".invalid-field")
                .forEach(function (element) {
                    element.classList.remove("invalid-field");
                });

            document.getElementById("industryFormError").textContent = "";

            document.getElementById("industryFormSuccess").textContent = "";

        }, 0);

    });

}


/* =====================================
   PRACTICUM 12 - API INTEGRATION
   GITHUB API
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

const apiResultHeading =
    document.getElementById("apiResultHeading");

const apiIndustryTableBody =
    document.getElementById("apiIndustryTableBody");


// Fetch industry information from GitHub

async function fetchIndustryData() {

    const selectedIndustry = apiIndustrySelect.value;

    if (selectedIndustry === "") {

        apiError.hidden = false;

        apiErrorMessage.textContent =
            "Please select an industry first.";

        return;
    }


    apiLoading.hidden = false;

    apiError.hidden = true;

    apiTableContainer.hidden = true;

    apiInitialMessage.hidden = true;

    apiIndustryTableBody.innerHTML = "";


    try {

        const url =
            "https://api.github.com/search/repositories?q=" +
            encodeURIComponent(selectedIndustry) +
            "&sort=stars&order=desc&per_page=10";


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error("Unable to retrieve industry data.");

        }


        const data = await response.json();


        apiLoading.hidden = true;


        if (!data.items || data.items.length === 0) {

            apiError.hidden = false;

            apiErrorMessage.textContent =
                "No repositories found for this industry.";

            return;
        }


        apiResultHeading.textContent =
            "GitHub Results for " + selectedIndustry;


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

            const link = document.createElement("a");

            link.href = repository.html_url;

            link.textContent = "View Repository";

            link.target = "_blank";

            link.rel = "noopener noreferrer";

            linkCell.appendChild(link);


            row.appendChild(nameCell);

            row.appendChild(descriptionCell);

            row.appendChild(languageCell);

            row.appendChild(starsCell);

            row.appendChild(linkCell);


            apiIndustryTableBody.appendChild(row);

        });


        apiTableContainer.hidden = false;


    } catch (error) {

        apiLoading.hidden = true;

        apiError.hidden = false;

        apiErrorMessage.textContent =
            "Error fetching data: " + error.message;

    }

}


// API button event

if (fetchIndustryBtn) {

    fetchIndustryBtn.addEventListener(
        "click",
        fetchIndustryData
    );

}


/* =====================================
   PRACTICUM 13 - TASK MANAGER
   CRUD OPERATIONS
===================================== */

// Select task manager elements

const taskForm =
    document.getElementById("taskForm");

const taskTitle =
    document.getElementById("taskTitle");

const taskDescription =
    document.getElementById("taskDescription");

const taskIndustry =
    document.getElementById("taskIndustry");

const taskDueDate =
    document.getElementById("taskDueDate");

const taskStatus =
    document.getElementById("taskStatus");

const taskTableBody =
    document.getElementById("taskTableBody");

const taskMessage =
    document.getElementById("taskMessage");

const saveTaskBtn =
    document.getElementById("saveTaskBtn");

const cancelTaskEditBtn =
    document.getElementById("cancelTaskEditBtn");

const taskFormHeading =
    document.getElementById("taskFormHeading");


// Task summary elements

const totalTasks =
    document.getElementById("totalTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const progressTasks =
    document.getElementById("progressTasks");

const completedTasks =
    document.getElementById("completedTasks");

const taskFilter =
    document.getElementById("taskFilter");

const noTasksMessage =
    document.getElementById("noTasksMessage");


// Retrieve saved tasks

let tasks = JSON.parse(
    localStorage.getItem("industryTasks")
) || [];


// Track the task being edited

let editingTaskId = null;


// Save tasks in Local Storage

function saveTasks() {

    localStorage.setItem(
        "industryTasks",
        JSON.stringify(tasks)
    );

}


// Update task summary

function updateTaskSummary() {

    const pending = tasks.filter(function (task) {
        return task.status === "Pending";
    }).length;


    const inProgress = tasks.filter(function (task) {
        return task.status === "In Progress";
    }).length;


    const completed = tasks.filter(function (task) {
        return task.status === "Completed";
    }).length;


    totalTasks.textContent = tasks.length;

    pendingTasks.textContent = pending;

    progressTasks.textContent = inProgress;

    completedTasks.textContent = completed;

}


// Display tasks

function displayTasks() {

    taskTableBody.innerHTML = "";


    const selectedFilter = taskFilter.value;


    let filteredTasks = tasks;


    if (selectedFilter !== "All") {

        filteredTasks = tasks.filter(function (task) {

            return task.status === selectedFilter;

        });

    }


    filteredTasks.forEach(function (task) {

        const row = document.createElement("tr");


        // Task title

        const titleCell = document.createElement("td");

        titleCell.textContent = task.title;


        // Description

        const descriptionCell = document.createElement("td");

        descriptionCell.textContent = task.description;


        // Industry

        const industryCell = document.createElement("td");

        industryCell.textContent = task.industry;


        // Due date

        const dateCell = document.createElement("td");

        dateCell.textContent = task.dueDate;


        // Status

        const statusCell = document.createElement("td");

        const statusSelect = document.createElement("select");

        ["Pending", "In Progress", "Completed"].forEach(
            function (status) {

                const option = document.createElement("option");

                option.value = status;

                option.textContent = status;

                statusSelect.appendChild(option);

            }
        );


        statusSelect.value = task.status;


        statusSelect.addEventListener("change", function () {

            updateTaskStatus(task.id, statusSelect.value);

        });


        statusCell.appendChild(statusSelect);


        // Actions

        const actionCell = document.createElement("td");


        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {

            editTask(task.id);

        });


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {

            deleteTask(task.id);

        });


        actionCell.appendChild(editButton);

        actionCell.appendChild(deleteButton);


        row.appendChild(titleCell);

        row.appendChild(descriptionCell);

        row.appendChild(industryCell);

        row.appendChild(dateCell);

        row.appendChild(statusCell);

        row.appendChild(actionCell);


        taskTableBody.appendChild(row);

    });


    noTasksMessage.hidden = filteredTasks.length !== 0;


    updateTaskSummary();

    displayExplorerTasks();

}


// Add or update task

if (taskForm) {

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
                "Please complete all task fields.";

            return;
        }


        if (editingTaskId === null) {

            const newTask = {

                id: Date.now(),

                title: title,

                description: description,

                industry: industry,

                dueDate: dueDate,

                status: status

            };


            tasks.push(newTask);


            taskMessage.textContent =
                "Task added successfully!";

            showTaskNotification("New task added successfully!");


        } else {

            const taskIndex = tasks.findIndex(function (task) {

                return task.id === editingTaskId;

            });


            if (taskIndex !== -1) {

                tasks[taskIndex] = {

                    id: editingTaskId,

                    title: title,

                    description: description,

                    industry: industry,

                    dueDate: dueDate,

                    status: status

                };

            }


            taskMessage.textContent =
                "Task updated successfully!";

            showTaskNotification("Task updated successfully!");


            editingTaskId = null;

            saveTaskBtn.textContent = "Add Task";

            taskFormHeading.textContent = "Add New Task";

            cancelTaskEditBtn.hidden = true;

        }


        saveTasks();

        taskForm.reset();

        displayTasks();

    });

}


// Edit task

function editTask(id) {

    const task = tasks.find(function (item) {

        return item.id === id;

    });


    if (!task) {
        return;
    }


    taskTitle.value = task.title;

    taskDescription.value = task.description;

    taskIndustry.value = task.industry;

    taskDueDate.value = task.dueDate;

    taskStatus.value = task.status;


    editingTaskId = id;


    saveTaskBtn.textContent = "Update Task";

    taskFormHeading.textContent = "Edit Task";

    cancelTaskEditBtn.hidden = false;


    taskMessage.textContent =
        "Edit the task details and click Update Task.";

}


// Update task status

function updateTaskStatus(id, newStatus) {

    const task = tasks.find(function (item) {

        return item.id === id;

    });


    if (!task) {
        return;
    }


    task.status = newStatus;


    saveTasks();

    displayTasks();


    taskMessage.textContent =
        "Task status updated successfully!";

    showTaskNotification("Task status changed to " + newStatus + "!");

}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();


    taskMessage.textContent =
        "Task deleted successfully!";

    showTaskNotification("Task deleted successfully!");

}


// Reset task form

function resetTaskForm() {

    taskForm.reset();

    editingTaskId = null;

    saveTaskBtn.textContent = "Add Task";

    taskFormHeading.textContent = "Add New Task";

    cancelTaskEditBtn.hidden = true;

    taskMessage.textContent = "";

}


// Cancel task editing

if (cancelTaskEditBtn) {

    cancelTaskEditBtn.addEventListener(
        "click",
        resetTaskForm
    );

}


// Filter tasks

if (taskFilter) {

    taskFilter.addEventListener("change", function () {

        displayTasks();

    });

}


/* =====================================
   PRACTICUM 14 - INTERACTIVE TASK EXPLORER
===================================== */

// Select explorer elements

const explorerSearch =
    document.getElementById("explorerSearch");

const explorerIndustry =
    document.getElementById("explorerIndustry");

const explorerStatus =
    document.getElementById("explorerStatus");

const resetExplorerBtn =
    document.getElementById("resetExplorerBtn");

const explorerTaskList =
    document.getElementById("explorerTaskList");

const explorerResultCount =
    document.getElementById("explorerResultCount");

const explorerEmptyMessage =
    document.getElementById("explorerEmptyMessage");


// Display filtered explorer tasks

function displayExplorerTasks() {

    if (!explorerTaskList) {
        return;
    }


    explorerTaskList.innerHTML = "";


    const searchText =
        explorerSearch.value.toLowerCase().trim();

    const selectedIndustry =
        explorerIndustry.value;

    const selectedStatus =
        explorerStatus.value;


    // Filter tasks using search, industry and status

    const filteredTasks = tasks.filter(function (task) {

        const matchesSearch =
            task.title.toLowerCase().includes(searchText) ||
            task.description.toLowerCase().includes(searchText);

        const matchesIndustry =
            selectedIndustry === "All" ||
            task.industry === selectedIndustry;

        const matchesStatus =
            selectedStatus === "All" ||
            task.status === selectedStatus;


        return (
            matchesSearch &&
            matchesIndustry &&
            matchesStatus
        );

    });


    // Create task cards

    filteredTasks.forEach(function (task) {

        const listItem = document.createElement("li");

        listItem.classList.add("explorer-task-card");


        const heading = document.createElement("h3");

        heading.textContent = task.title;


        const industryText = document.createElement("p");

        industryText.textContent =
            "Industry: " + task.industry;


        const statusText = document.createElement("p");

        statusText.textContent =
            "Status: " + task.status;


        const dateText = document.createElement("p");

        dateText.textContent =
            "Due Date: " + task.dueDate;


        const descriptionText = document.createElement("p");

        descriptionText.textContent =
            task.description;


        const details = document.createElement("details");

        const summary = document.createElement("summary");

        summary.textContent = "View Task Details";


        const fullDetails = document.createElement("div");

        fullDetails.classList.add("explorer-task-details");

        fullDetails.appendChild(descriptionText);

        fullDetails.appendChild(dateText);

        details.appendChild(summary);

        details.appendChild(fullDetails);


        listItem.appendChild(heading);

        listItem.appendChild(industryText);

        listItem.appendChild(statusText);

        listItem.appendChild(details);


        explorerTaskList.appendChild(listItem);

    });


    // Update result count

    explorerResultCount.textContent =
        "Showing " + filteredTasks.length +
        " of " + tasks.length + " tasks";


    // Show empty message when no tasks match

    explorerEmptyMessage.hidden =
        filteredTasks.length !== 0;

}


// Search event

if (explorerSearch) {

    explorerSearch.addEventListener("input", function () {

        displayExplorerTasks();

    });

}


// Industry filter event

if (explorerIndustry) {

    explorerIndustry.addEventListener("change", function () {

        displayExplorerTasks();

    });

}


// Status filter event

if (explorerStatus) {

    explorerStatus.addEventListener("change", function () {

        displayExplorerTasks();

    });

}


// Reset explorer filters

if (resetExplorerBtn) {

    resetExplorerBtn.addEventListener("click", function () {

        explorerSearch.value = "";

        explorerIndustry.value = "All";

        explorerStatus.value = "All";


        displayExplorerTasks();

    });

}


/* =====================================
   PRACTICUM 15 - CUSTOM TOGGLE SWITCH
   LOCAL STORAGE SETTINGS
===================================== */

// Select toggle switch elements

const taskNotificationToggle =
    document.getElementById("taskNotificationToggle");

const taskNotificationStatus =
    document.getElementById("taskNotificationStatus");

const toggleStateText =
    document.getElementById("toggleStateText");


// Retrieve the saved notification setting

const savedNotificationSetting =
    localStorage.getItem("taskNotificationsEnabled");


// Set default value or retrieve saved value

if (savedNotificationSetting === null) {

    taskNotificationToggle.checked = true;

} else {

    taskNotificationToggle.checked =
        savedNotificationSetting === "true";

}


// Update notification setting

function updateTaskNotificationSetting() {

    const notificationsEnabled =
        taskNotificationToggle.checked;


    // Save setting in Local Storage

    localStorage.setItem(
        "taskNotificationsEnabled",
        notificationsEnabled
    );


    // Update ON and OFF text

    if (notificationsEnabled) {

        toggleStateText.textContent = "ON";

        taskNotificationStatus.textContent =
            "Task notifications are enabled.";

        taskNotificationStatus.classList.toggle(
            "setting-disabled",
            false
        );

        document.body.classList.toggle(
            "task-notifications-disabled",
            false
        );

    } else {

        toggleStateText.textContent = "OFF";

        taskNotificationStatus.textContent =
            "Task notifications are disabled.";

        taskNotificationStatus.classList.toggle(
            "setting-disabled",
            true
        );

        document.body.classList.toggle(
            "task-notifications-disabled",
            true
        );

    }

}


// Listen for toggle changes

taskNotificationToggle.addEventListener(
    "change",
    updateTaskNotificationSetting
);


// Display task notifications only when enabled

function showTaskNotification(message) {

    if (taskNotificationToggle.checked) {

        showNotification(message);

    }

}


// Apply saved settings when the page loads

updateTaskNotificationSetting();


// Initial task display

displayTasks();


// Initial explorer display

displayExplorerTasks();