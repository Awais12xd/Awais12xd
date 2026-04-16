const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("main-nav");
const navLinks = nav ? nav.querySelectorAll("a") : [];
const year = document.getElementById("year");
const projectsInput = document.getElementById("projects");
const hoursInput = document.getElementById("hours");
const rateInput = document.getElementById("rate");
const calcBtn = document.getElementById("calc-btn");
const calcResult = document.getElementById("calc-result");
const form = document.querySelector(".contact-form");
const formResult = document.getElementById("form-result");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav) nav.classList.remove("open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  });
});

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

if (calcBtn && calcResult) {
  calcBtn.addEventListener("click", () => {
    const projects = Number(projectsInput?.value || 0);
    const hours = Number(hoursInput?.value || 0);
    const rate = Number(rateInput?.value || 0);

    if (projects <= 0 || hours < 0 || rate <= 0) {
      calcResult.textContent = "Please enter valid numbers.";
      return;
    }

    const monthlyLoss = projects * hours * rate;
    const yearlyLoss = monthlyLoss * 12;
    calcResult.textContent = `Estimated loss: $${monthlyLoss.toLocaleString()}/month ($${yearlyLoss.toLocaleString()}/year).`;
  });
}

if (form && formResult) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!name || !email) {
      formResult.textContent = "Please fill name and email.";
      return;
    }

    form.reset();
    formResult.textContent = "Thanks! You are on the waitlist.";
  });
}
