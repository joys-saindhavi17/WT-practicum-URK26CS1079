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

// Select the required HTML elements using DOM methods.

const industryNameInput = document.getElementById("industryName");
const industryDescriptionInput = document.querySelector("#industryDescription");
const industrySubmitBtn = document.getElementById("industrySubmitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const industryList = document.getElementById("industryList");
const industryMessage = document.getElementById("industryMessage");
const industryEmptyMessage = document.getElementById("industryEmptyMessage");

// Store the industry details displayed on the webpage.

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


// Display all industry information using DOM elements.

function displayIndustries() {

    // Clear the old display before adding the updated list.

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
        editButton.setAttribute("data-index", index);

        editButton.addEventListener("click", function () {
            editIndustry(index);
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("class", "industry-action-button remove-industry");
        removeButton.setAttribute("data-index", index);

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


// Add a new industry or save changes to an existing industry.

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


// Load selected industry details into the input fields for editing.

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


// Remove an industry from the list and update the webpage.

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


// Cancel editing and return the form to Add mode.

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


// Display the initial industry information when the page loads.

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


// Store the IDs of all form fields.

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


// Display a suitable error message beside the selected field.

function displayFieldError(field) {

    const errorElement =
        document.getElementById(field.id + "Error");

    if (errorElement) {
        errorElement.textContent =
            field.validity.valid ? "" : field.validationMessage;
    }
}


// Custom validation for the 10-digit mobile number.

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


// Update field error messages while the user types or changes a selection.

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


// Validate the complete form before showing the success message.

industryRegistrationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    industryFormSuccess.textContent = "";

    // Recheck the custom phone constraint before validating.

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


// Clear all validation and status messages when the form is reset.

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