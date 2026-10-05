
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", String(!menu.classList.contains("hidden")));
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Password visibility toggles
  document.querySelectorAll("[data-password-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.passwordToggle);
      if (!target) return;
      const visible = target.type === "text";
      target.type = visible ? "password" : "text";
      button.textContent = visible ? "Show" : "Hide";
      button.setAttribute("aria-label", visible ? "Show password" : "Hide password");
    });
  });

  // Password strength
  const password = document.querySelector("#password");
  const strength = document.querySelector("#password-strength");
  const strengthText = document.querySelector("#password-strength-text");
  if (password && strength && strengthText) {
    password.addEventListener("input", () => {
      const value = password.value;
      let score = 0;
      if (value.length >= 8) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[a-z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;
      const labels = ["Enter a password", "Very weak", "Weak", "Fair", "Strong", "Very strong"];
      strength.style.width = `${score * 20}%`;
      strengthText.textContent = labels[score];
      strength.className = "h-full rounded-full transition-all " + (score <= 2 ? "bg-rose-500" : score === 3 ? "bg-amber-500" : "bg-emerald-500");
    });
  }

  // Generic demo sign-in/sign-up
  document.querySelectorAll("[data-demo-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = form.dataset.success || "✓ Demo action completed successfully.";
        status.className = "mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-700";
      }
    });
  });

  // Confirm password validation
  const signupForm = document.querySelector("#signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      const p = signupForm.querySelector("#password");
      const cp = signupForm.querySelector("#confirm-password");
      const err = signupForm.querySelector("#password-error");
      if (p && cp && p.value !== cp.value) {
        e.preventDefault();
        if (err) err.textContent = "Passwords do not match.";
        cp.focus();
      } else if (err) {
        err.textContent = "";
      }
    });
  }

  // Contact form uses the configured Formspree endpoint in contact.html.

});
