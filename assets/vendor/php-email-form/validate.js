document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let form = event.target;

    // Check if all required fields are valid
    if (!form.checkValidity()) {
      // Display native HTML5 validation error messages
      form.reportValidity();
      return; // Stop further execution if the form is invalid
    }

    let formData = new FormData(form);

    // Hide any previous messages
    document.querySelector(".sent-message").style.display = "none";
    document.querySelector(".loading").style.display = "block";

    try {
      let response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".sent-message").style.display = "block";
      } else {
        throw new Error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      alert("There was an issue sending your message: " + error.message);
    } finally {
      document.querySelector(".loading").style.display = "none";
    }
  });
