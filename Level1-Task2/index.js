document.addEventListener("DOMContentLoaded", function() {
document.getElementById("submit-btn").addEventListener("click", function () {
    // Get the form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Display the loader
    document.getElementById("submit-btn").classList.add("loading");
    document.getElementById("loader").classList.remove("hidden");

    // Use EmailJS to send the email
    emailjs.send("service_iy75nog", "template_d521mib", {
        to_name: name,
        from_name: email,
        message: message
    }).then(function () {

        // Hide the loader after sending email
        document.getElementById("submit-btn").classList.remove("loading");
        document.getElementById("loader").classList.add("hidden");
        // Show alert message
        alert("Email sent successfully!");
        // Reset the form
        document.getElementById("contact-form").reset();
    }).catch(function (error) {
        // Handle error here (e.g., show an error message)
        console.error("Error sending email:", error);

        // Hide the loader on error
        document.getElementById("submit-btn").classList.remove("loading");
        document.getElementById("loader").classList.add("hidden");
    });
});
});
