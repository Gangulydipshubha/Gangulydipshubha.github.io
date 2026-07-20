function toggleTheme() {
    document.body.classList.toggle("light");
}

// EmailJS
(function(){
    emailjs.init("rjfHV4TXxWcO2uCDC");
})();

document.getElementById("contact-form").addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(function(){
        alert("Message Sent Successfully!");
    }, function(error){
        alert("Failed: " + error.text);
    });
});
function openImage(img) {
    document.getElementById("imgModal").style.display = "block";
    document.getElementById("modalImg").src = img.src;
}

function closeImage() {
    document.getElementById("imgModal").style.display = "none";
}