const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");
const year = document.querySelector("#year");
const eligibilityForm = document.querySelector("#eligibility-form");
const eligibilityResult = document.querySelector("#eligibility-result");
const calcBtn = document.querySelector("#calc-btn");
const DEFAULT_INTEREST_RATE = 18;
const ELIGIBILITY_RATIO = 0.5;

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

function getNumberValue(selector) {
  return Number(document.querySelector(selector)?.value || 0);
}

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
    const amount = getNumberValue("#amount");
    const tenure = getNumberValue("#tenure");
    const income = getNumberValue("#income");

    if (!amount || !tenure || !income) {
      eligibilityResult.textContent = "Please enter valid details.";
      return;
    }

    const estimatedEmi = calculateEmi(amount, DEFAULT_INTEREST_RATE, tenure);
    const eligibilityThreshold = income * ELIGIBILITY_RATIO;
    eligibilityResult.textContent =
      estimatedEmi <= eligibilityThreshold
        ? "✅ Looks eligible. Continue with full application."
        : "⚠️ Eligibility may be low. Try lower amount or longer tenure.";
  });
}

function updateEmi() {
  const amount = getNumberValue("#calc-amount");
  const rate = getNumberValue("#calc-rate");
  const months = getNumberValue("#calc-months");
  const emi = calculateEmi(amount, rate, months);
  const output = document.querySelector("#emi-output");
  if (output) {
    output.textContent = Number.isFinite(emi) && emi > 0
      ? `₹ ${Math.round(emi).toLocaleString("en-IN")} / month`
      : "Please enter valid values.";
  }
}

if (calcBtn) {
  calcBtn.addEventListener("click", updateEmi);
  updateEmi();
}
