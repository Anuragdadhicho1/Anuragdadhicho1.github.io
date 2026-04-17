const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");
const year = document.querySelector("#year");
const eligibilityForm = document.querySelector("#eligibility-form");
const eligibilityResult = document.querySelector("#eligibility-result");
const calcBtn = document.querySelector("#calc-btn");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

if (eligibilityForm && eligibilityResult) {
  eligibilityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(document.querySelector("#amount")?.value || 0);
    const tenure = Number(document.querySelector("#tenure")?.value || 0);
    const income = Number(document.querySelector("#income")?.value || 0);

    if (!amount || !tenure || !income) {
      eligibilityResult.textContent = "Please enter valid details.";
      return;
    }

    const estimatedEmi = amount / tenure;
    const eligibilityThreshold = income * 0.5;
    eligibilityResult.textContent =
      estimatedEmi <= eligibilityThreshold
        ? "✅ Looks eligible. Continue with full application."
        : "⚠️ Eligibility may be low. Try lower amount or longer tenure.";
  });
}

function calculateEmi(principal, annualRate, months) {
  if (!principal || !annualRate || !months || months <= 0) {
    return 0;
  }
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) {
    return principal / months;
  }
  return (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
}

if (calcBtn) {
  calcBtn.addEventListener("click", () => {
    const amount = Number(document.querySelector("#calc-amount")?.value || 0);
    const rate = Number(document.querySelector("#calc-rate")?.value || 0);
    const months = Number(document.querySelector("#calc-months")?.value || 0);
    const emi = calculateEmi(amount, rate, months);
    const output = document.querySelector("#emi-output");
    if (output) {
      output.textContent = Number.isFinite(emi) && emi > 0
        ? `₹ ${Math.round(emi).toLocaleString("en-IN")} / month`
        : "Please enter valid values.";
    }
  });
}
