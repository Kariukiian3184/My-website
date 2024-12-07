function showDownloadMessage() {
    Swal.fire({
        title: 'Notice',
        text: 'The download is currently unavailable. Please check back later or contact support for assistance.',
        icon: 'info',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#0ef',
    });
}

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle Navbar for Mobile
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close Navbar When Link Is Clicked (Mobile)
let navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

/*====== Scroll Section Active Link =====*/
let sections = document.querySelectorAll('section');

window.onscroll = () => {
    let scrollPosition = window.scrollY;
    sections.forEach(section => {
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (scrollPosition >= offset && scrollPosition < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`.navbar a[href*=${id}]`).classList.add('active');
            });
        }
    });

    // Sticky Header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', scrollPosition > 100);
};

// Contact Form Validation and Success Message
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    let isValid = true;
    let fields = ['fullName', 'email', 'mobileNumber', 'emailSubject', 'message'];
    fields.forEach(field => {
        let input = document.getElementById(field);
        if (!input.value.trim() || (field === 'email' && !validateEmail(input.value.trim()))) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    if (isValid) {
        Swal.fire({
            title: 'Success!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonText: 'Close',
        });

        // Reset the form fields after submission
        document.getElementById('contactForm').reset();
    }
});

// Email Validation Function
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Function to send the email via EmailJS (not used in this update, but kept here for reference)
function sendEmail(fullName, email, mobileNumber, emailSubject, message) {
    emailjs.send("service_rlkk54i", "template_xjs852v", {
        full_name: fullName,
        email: email,
        mobile: mobileNumber,
        subject: emailSubject,
        message: message
    }, 'cuhPP7oIr1RWLx-Nz')
    .then(function(response) {
        console.log("SUCCESS!", response);
    }, function(error) {
        console.log("FAILED...", error);
    });
}
