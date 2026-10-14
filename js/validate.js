console.log("validate.js is running");


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("regForm");

    if (!form) return;

    // Get error message elements
    const fullnameError = document.getElementById("fullnameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const eventError = document.getElementById("eventError");
    const foodError = document.getElementById("foodError");
    const departmentError = document.getElementById("departmentError");
    const idCardError = document.getElementById("idCardError");
    const formMessage = document.getElementById("formMessage");

    // Clear confirmation
    form.addEventListener("reset", function (event) {
        const answer = confirm("Clear the whole form?");

        if (!answer) {
            event.preventDefault();
        } else {
            setTimeout(function () {
                clearErrors();
            }, 0);
        }
    });

    // Clear all error messages
    function clearErrors() {
        const errors = [
            fullnameError,
            emailError,
            phoneError,
            eventError,
            foodError,
            departmentError,
            idCardError
        ];

        errors.forEach(function (error) {
            if (error) error.textContent = "";
        });

        if (formMessage) {
            formMessage.textContent = "";
            formMessage.className = "mt-3";
        }
    }

    // Validate registration form
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        clearErrors();

        let valid = true;

        const fullname = document.getElementById("fullname");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const eventId = document.getElementById("event_id");
        const department = document.getElementById("department");
        const idCard = document.getElementById("id_card");

        // Validate full name
        if (!fullname.value.trim()) {
            fullnameError.textContent = "Please enter your full name.";
            valid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            emailError.textContent = "Please enter your email.";
            valid = false;
        } else if (!email.validity.valid) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }

        // Validate phone
        if (!phone.value.trim()) {
            phoneError.textContent = "Please enter your phone number.";
            valid = false;
        } else if (!/^[0-9+\-\s()]{7,20}$/.test(phone.value.trim())) {
            phoneError.textContent = "Please enter a valid phone number.";
            valid = false;
        }

        // Validate event
        if (!eventId.value) {
            eventError.textContent = "Please choose an event.";
            valid = false;
        }

        // Validate food preference
        if (!form.querySelector('input[name="food"]:checked')) {
            foodError.textContent = "Please select a food preference.";
            valid = false;
        }

        // Validate department
        if (!department.value) {
            departmentError.textContent = "Please choose your department.";
            valid = false;
        }

        // Validate student ID image, if uploaded
        if (idCard.files.length > 0) {
            const file = idCard.files[0];

            if (!file.type.startsWith("image/")) {
                idCardError.textContent = "Please upload an image file.";
                valid = false;
            } else if (file.size > 5 * 1024 * 1024) {
                idCardError.textContent = "Image size must be less than 5 MB.";
                valid = false;
            }
        }

        // Show validation result
        if (!valid) {
            if (formMessage) {
                formMessage.textContent =
                    "Please correct the errors above and try again.";
                formMessage.className = "mt-3 text-danger";
            }

            return;
        }

        if (formMessage) {
            formMessage.textContent =
                "Validation successful! Your details are ready.";
            formMessage.className = "mt-3 text-success";
        }
    });
});
