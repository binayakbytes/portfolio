// Smooth Scroll
function scrollToSection(id) {
    const section = document.getElementById(id);
    window.scrollTo({
        top: section.offsetTop - 60,
        behavior: 'smooth'
    });
}

// Form Validation and Email Sending
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the default form submission

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();
    let valid = true;

    // Clear previous errors
    clearErrors();

    // Name Validation
    if (!name) {
        showError('name', 'Name is required');
        valid = false;
    }

    // Email Validation
    if (!email || !validateEmail(email)) {
        showError('email', 'Please enter a valid email');
        valid = false;
    }

    // Message Validation
    if (!message) {
        showError('message', 'Message cannot be empty');
        valid = false;
    }

    if (valid) {
        // Send email using EmailJS
        emailjs.sendForm('service_qp9wp0k', 'template_27bvmdr', this)
            .then(function(response) {
                alert('Message Sent Successfully!');
                e.target.reset();
            }, function(error) {
                alert('Failed to send message. Please try again.');
            });
    }
});

// Email Validation Function
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// Show Error Function
function showError(field, message) {
    const errorElement = document.createElement('p');
    errorElement.classList.add('error');
    errorElement.textContent = message;
    const inputField = document.getElementById(field);
    inputField.style.borderColor = 'red';
    inputField.insertAdjacentElement('afterend', errorElement);
}

// Clear Errors Function
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(msg => msg.remove());

    const formFields = document.querySelectorAll('input, textarea');
    formFields.forEach(field => field.style.borderColor = '#ccc');
}
