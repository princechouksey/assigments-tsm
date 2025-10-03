       const form = document.getElementById("contactForm");

      form.addEventListener("submit", function (event) {
        event.preventDefault(); // stop submission until valid
        let isValid = true;

        // Reset errors
        document
          .querySelectorAll(".error")
          .forEach((el) => (el.textContent = ""));
        document.getElementById("successMessage").textContent = "";

        // First Name validation
        const firstName = document.getElementById("firstName").value.trim();
        if (firstName === "" || !/^[A-Za-z]+$/.test(firstName)) {
          document.getElementById("firstNameError").textContent =
            "Please enter a valid first name (only letters).";
          isValid = false;
        }

        // Email validation
        const email = document.getElementById("email").value.trim();
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
          document.getElementById("emailError").textContent =
            "Please enter a valid email.";
          isValid = false;
        }

        // Phone validation
        const phone = document.getElementById("phone").value.trim();
        if (!/^[0-9]{10}$/.test(phone)) {
          document.getElementById("phoneError").textContent =
            "Phone number must be 10 digits.";
          isValid = false;
        }

        // Message validation
        const message = document.getElementById("message").value.trim();
        if (message.length < 10) {
          document.getElementById("messageError").textContent =
            "Message must be at least 10 characters.";
          isValid = false;
        }

        // Final check
        if (isValid) {
          document.getElementById("successMessage").textContent =
            "Form submitted successfully!";
          form.reset();
        }
      });
  