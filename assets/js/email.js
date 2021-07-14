function sendMail(contactForm) {
    emailjs.send("service_imbql8k","intoTheWild", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.feedback.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        });
        return false;  // To block from loading a new page
}

