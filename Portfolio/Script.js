function toggleTheme() {
    document.body.classList.toggle("light");
}

// EmailJS
(function(){
    emailjs.init("rjfHV4TXxWcO2uCDC");
})();

document.getElementById("contact-form").addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.sendForm("service_gsprepk", "template_cqnimto", this)
    .then(function(){
        alert("Message Sent Successfully!");
    }, function(error){
        alert("Failed: " + error.text);
    });
});
function openImage(img) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";   // VERY IMPORTANT
    modalImg.src = img.src;
}
function closeImage() {
    document.getElementById("imgModal").style.display = "none";
}