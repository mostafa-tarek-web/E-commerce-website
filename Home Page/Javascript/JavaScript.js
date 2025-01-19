let slideIndex = 0;
let slideInterval;
// the slideshow function
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    slideInterval = setTimeout(showSlides, 6000); // Change image every 6 seconds
}

function plusSlides(n) {
    clearTimeout(slideInterval); // Stop the automatic slideshow
    slideIndex += n;
    if (slideIndex >= document.getElementsByClassName("mySlides").length) { slideIndex = 0 }
    if (slideIndex < 0) { slideIndex = document.getElementsByClassName("mySlides").length - 1 }
    showCurrentSlide();
}

function showCurrentSlide() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    slideInterval = setTimeout(showSlides, 6000); // Restart the slideshow
}

document.addEventListener("DOMContentLoaded", function () {
    slideIndex = 0;
    showSlides(); // Initial call to start the slideshow
})