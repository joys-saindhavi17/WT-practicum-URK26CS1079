
/* =====================================
   PRACTICUM 9 - JAVASCRIPT ANIMATIONS
===================================== */


/* =====================================
   INFORMATION CARD INTERACTION
===================================== */

const showHighlightsBtn =
    document.getElementById("showHighlightsBtn");

const closeHighlightsBtn =
    document.getElementById("closeHighlightsBtn");

const highlightsCard =
    document.getElementById("highlightsCard");


/* Display Information Card */

showHighlightsBtn.addEventListener("click", function () {

    highlightsCard.classList.add("show-card");

    showHighlightsBtn.classList.toggle("button-active", true);

});


/* Close Information Card */

closeHighlightsBtn.addEventListener("click", function () {

    highlightsCard.classList.remove("show-card");

    showHighlightsBtn.classList.toggle("button-active", false);

});


/* =====================================
   NOTIFICATION INTERACTION
===================================== */

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


/* =====================================
   ADMISSION FORM INTERACTION
===================================== */

const admissionForm =
    document.querySelector("#admission form");

admissionForm.addEventListener("submit", function (event) {

    event.preventDefault();

    showNotification(
        "Your application details are ready for submission!"
    );

});


/* =====================================
   WELCOME NOTIFICATION
===================================== */

window.addEventListener("load", function () {

    showNotification("Welcome to JOYS UNIVERSITY!");

});
