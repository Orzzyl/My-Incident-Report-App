import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDt359BEU-aq_SjWSniNIbsQyDPa2lxhuU",
    authDomain: "signup-my-application.firebaseapp.com",
    databaseURL: "https://signup-my-application-default-rtdb.firebaseio.com",
    projectId: "signup-my-application",
    storageBucket: "signup-my-application.firebasestorage.app",
    messagingSenderId: "942108452259",
    appId: "1:942108452259:web:856275450cd7430ad6a616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
    const displayNameElement = document.getElementById("username");
    const logoutBtn = document.getElementById("logoutBtn");

    // Listen for auth state changes

function toSentenceCase(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

    onAuthStateChanged(auth, (user) => {
        if (user) {
            displayNameElement.textContent = toSentenceCase(user.displayName);
        } else {
            window.location.href = "index.html";
        }
    });

    // Logout functionality
    logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    });
});

// function for profile picture upload
let profilePic = document.getElementById("profilePictureImage");
let inputFile = document.getElementById("profilePictureInput");

inputFile.onchange = function (){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}

//buttons functionality
document.getElementById('reportOption').addEventListener('click', () => {
    window.location.href = "report.html";
});
document.getElementById('postOption').addEventListener('click', () => {
    window.location.href = "post.html";
});
document.getElementById('incidentbookOption').addEventListener('click', ()=> {window.location.href = "incidentbook.html"})

        // Slideshow logic
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;

        function showNextSlide() {
            slides[currentSlideIndex].classList.remove('active');
            indicators[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            slides[currentSlideIndex].classList.add('active');
            indicators[currentSlideIndex].classList.add('active');
        }
        setInterval(showNextSlide, 4000);