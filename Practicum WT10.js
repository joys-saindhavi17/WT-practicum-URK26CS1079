/* =====================================
   PRACTICUM 9 - JAVASCRIPT ANIMATIONS
===================================== */

/* INFORMATION CARD INTERACTION */

const showHighlightsBtn =
    document.getElementById("showHighlightsBtn");

const closeHighlightsBtn =
    document.getElementById("closeHighlightsBtn");

const highlightsCard =
    document.getElementById("highlightsCard");


/* Display Information Card */

showHighlightsBtn.addEventListener("click", function () {
    highlightsCard.classList.add("show-card");
    showHighlightsBtn.classList.add("button-active");
});


/* Close Information Card */

closeHighlightsBtn.addEventListener("click", function () {
    highlightsCard.classList.remove("show-card");
    showHighlightsBtn.classList.remove("button-active");
});


/* NOTIFICATION INTERACTION */

const notification =
    document.getElementById("notification");

const notificationMessage =
    document.getElementById("notificationMessage");

const closeNotificationBtn =
    document.getElementById("closeNotificationBtn");


/* Display Notification */

function showNotification(message) {
    notificationMessage.textContent = message;

    notification.classList.add("show-notification");

    setTimeout(function () {
        notification.classList.remove("show-notification");
    }, 4000);
}


/* Close Notification Button */

closeNotificationBtn.addEventListener("click", function () {
    notification.classList.remove("show-notification");
});


/* ADMISSION FORM INTERACTION */

const admissionForm =
    document.querySelector("#admission form");

admissionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    showNotification(
        "Your application details are ready for submission!"
    );
});


/* WELCOME NOTIFICATION */

window.addEventListener("load", function () {
    showNotification("Welcome to JOYS UNIVERSITY!");
});


/* =====================================
   PRACTICUM 10 - DOM MANIPULATION
   INDUSTRY INFORMATION MANAGER
===================================== */


/* GET HTML ELEMENTS */

const industryName =
    document.getElementById("industryName");

const industryDescription =
    document.getElementById("industryDescription");

const industrySubmitBtn =
    document.getElementById("industrySubmitBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

const industryList =
    document.querySelector("#industryList");

const industryMessage =
    document.getElementById("industryMessage");

const industryEmptyMessage =
    document.getElementById("industryEmptyMessage");


/* STORE EDITING INFORMATION */

let editingItem = null;


/* ADD OR UPDATE INDUSTRY */

industrySubmitBtn.addEventListener("click", function () {

    const name = industryName.value.trim();

    const description = industryDescription.value.trim();

    if (name === "" || description === "") {
        industryMessage.textContent =
            "Please enter both industry name and description.";

        return;
    }


    /* UPDATE EXISTING INDUSTRY */

    if (editingItem !== null) {

        editingItem.querySelector("strong").textContent = name;

        editingItem.querySelector("p").textContent = description;

        industryMessage.textContent =
            "Industry information updated successfully!";

        editingItem = null;

        industrySubmitBtn.textContent = "Add Industry";

        cancelEditBtn.hidden = true;

        showNotification("Industry information updated!");

    }

    /* ADD NEW INDUSTRY */

    else {

        const newItem = document.createElement("li");

        newItem.classList.add("industry-item");

        const itemContent = document.createElement("div");

        const itemName = document.createElement("strong");

        const itemDescription = document.createElement("p");

        itemName.textContent = name;

        itemDescription.textContent = description;

        itemContent.appendChild(itemName);

        itemContent.appendChild(itemDescription);


        /* CREATE ACTION BUTTONS */

        const actionButtons = document.createElement("div");

        actionButtons.classList.add("industry-actions");


        /* EDIT BUTTON */

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.classList.add("edit-industry-btn");

        editButton.setAttribute("type", "button");


        /* REMOVE BUTTON */

        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.classList.add("remove-industry-btn");

        removeButton.setAttribute("type", "button");


        /* EDIT INDUSTRY */

        editButton.addEventListener("click", function () {

            industryName.value = itemName.textContent;

            industryDescription.value =
                itemDescription.textContent;

            editingItem = newItem;

            industrySubmitBtn.textContent = "Update Industry";

            cancelEditBtn.hidden = false;

            industryMessage.textContent =
                "Edit the details and click Update Industry.";

            industryName.focus();

        });


        /* REMOVE INDUSTRY */

        removeButton.addEventListener("click", function () {

            if (editingItem === newItem) {
                editingItem = null;

                industrySubmitBtn.textContent = "Add Industry";

                cancelEditBtn.hidden = true;

                industryName.value = "";

                industryDescription.value = "";
            }

            newItem.remove();

            updateEmptyMessage();

            industryMessage.textContent =
                "Industry information removed successfully!";

            showNotification("Industry removed successfully!");

        });


        /* ADD BUTTONS TO THE CARD */

        actionButtons.appendChild(editButton);

        actionButtons.appendChild(removeButton);

        newItem.appendChild(itemContent);

        newItem.appendChild(actionButtons);


        /* ADD NEW ITEM TO THE LIST */

        industryList.appendChild(newItem);

        industryMessage.textContent =
            "New industry added successfully!";

        showNotification("New industry added!");

    }


    /* CLEAR INPUT FIELDS */

    industryName.value = "";

    industryDescription.value = "";

    updateEmptyMessage();

});


/* CANCEL EDITING */

cancelEditBtn.addEventListener("click", function () {

    editingItem = null;

    industryName.value = "";

    industryDescription.value = "";

    industrySubmitBtn.textContent = "Add Industry";

    cancelEditBtn.hidden = true;

    industryMessage.textContent =
        "Editing cancelled.";

});


/* DISPLAY EMPTY MESSAGE */

function updateEmptyMessage() {

    if (industryList.children.length === 0) {

        industryEmptyMessage.hidden = false;

    }

    else {

        industryEmptyMessage.hidden = true;

    }

}


/* CHECK INITIAL INDUSTRY LIST */

updateEmptyMessage();