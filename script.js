const carouselImages = [
    {
        src: 'img/banner1.jpg',
        title: 'Welcome to SoftLogix',
        description: 'Ildy is a great one-page theme, perfect for developers and designers.'
    },
    {
        src: 'img/banner2.jpg',
        title: 'Energy Efficient Lighting',
        description: 'Eco-friendly solutions for a brighter future.'
    }, {
        src: 'img/banner3.jpg',
        title: 'Energy Efficient Lighting',
        description: 'Eco-friendly solutions for a brighter future.'
    }
];

const transformClasses = ["rotate-in", "scale-in", "translate-in"];

let currentImage = 0;

function changeImage() {
    const carouselInner = document.getElementById('carouselImages');
    const currentDiv = carouselInner.children[currentImage];

    // Remove 'active' and any transformation classes from the current image
    currentDiv.classList.remove('active', ...transformClasses);
    currentDiv.classList.add('reset-transform'); // Reset transform

    // Move to the next image
    currentImage = (currentImage + 1) % carouselImages.length;
    const nextDiv = carouselInner.children[currentImage];

    // Update content for next image
    nextDiv.querySelector('img').src = carouselImages[currentImage].src;
    nextDiv.querySelector('h1').textContent = carouselImages[currentImage].title;
    nextDiv.querySelector('p').textContent = carouselImages[currentImage].description;


    const transformClass = transformClasses[currentImage % transformClasses.length];
    nextDiv.classList.add(transformClass, 'active');

    // Remove reset-transform class after transform starts
    setTimeout(() => {
        currentDiv.classList.remove('reset-transform');
    }, 20);
}


setInterval(changeImage, 6000);


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".heading").classList.add("typewriter");
  });
  

  document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.counter');
    
    function animateCounter(counter) {
        let target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = 15000; 
        const increment = target / (speed / 50); 

        const interval = setInterval(function () {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            counter.innerText = Math.ceil(count);
        }, 50);
    }

    counters.forEach(function (counter) {
        animateCounter(counter);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const services = document.querySelectorAll(".service, .service-right");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        {
            threshold: 0.2, // Trigger when 20% of the element is in view
        }
    );

    services.forEach(service => {
        observer.observe(service);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const heading = document.querySelector(".section-heading");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        {
            threshold: 0.5, // Trigger when 50% of the heading is in view
        }
    );

    observer.observe(heading);
});


document.addEventListener("DOMContentLoaded", () => {
    const contactSection = document.querySelector("#contact-section");

    // Intersection Observer options
    const observerOptions = {
        threshold: 0.1 // Start animation when 10% of the section is visible
    };

    // Define the observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when the contact section is in view
                contactSection.classList.add("animate-contact");
                observer.unobserve(contactSection); // Remove observer after animation triggers
            }
        });
    }, observerOptions);

    // Start observing the contact section
    observer.observe(contactSection);
});




// const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm('service_syad7ce', 'template_m3zsinr', form.current, {
//         publicKey: 's-1MhU0EF4h4hy1ke',
//       })
//       e.target.reset();
//   };
let requestCount = 0; // Variable to track the number of requests made

function sendEmail() {
    // Check if the request limit has been reached
    if (requestCount >= 200) {
        Swal.fire({
            icon: 'error',
            title: 'Limit Reached',
            text: 'You have reached the maximum number of requests (200). Please try again later.',
            confirmButtonText: 'OK'
        });
        return; // Exit the function to prevent further requests
    }

    let parms = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_r8g59wh", "template_p8bjwm9", parms)
        .then(function(response) {
            requestCount++; // Increment the request count on successful send
            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your message has been successfully sent!',
                confirmButtonText: 'OK'
            });
        }, function(error) {
            // Check if the error is due to exceeding the request limit
            let errorMessage = 'Something went wrong! Please try again later.';
            
            // Customize error messages based on the error response
            if (error.status === 429) {
                errorMessage = 'You have exceeded the number of allowed requests. Please try again later.';
            } else if (error.status === 400) {
                errorMessage = 'There was an issue with your request. Please check your input and try again.';
            } else if (error.status >= 500) {
                errorMessage = 'Server error. Please try again later.';
            }

            // Show error message using SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        });
}