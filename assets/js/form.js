const form = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const btnReset = document.getElementById("btn-reset");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---- Validators ----
function validateName(value) {
  if (!value.trim()) return "Nome é obrigatório.";
  if (value.trim().length < 2) return "Nome deve ter pelo menos 2 caracteres.";
  return "";
}
function validateEmail(value) {
  if (!value.trim()) return "E-mail é obrigatório.";
  if (!EMAIL_REGEX.test(value)) return "Insira um e-mail válido.";
  return "";
}
function validateMessage(value) {
  if (!value.trim()) return "Mensagem é obrigatória.";
  if (value.trim().length < 10)
    return "Mensagem deve ter pelo menos 10 caracteres.";
  return "";
}

function validateField(input, errorEl, validatorFn) {
  const msg = validatorFn(input.value);
  if (msg) {
    input.classList.add("error");
    errorEl.textContent = msg;
    return false;
  }
  input.classList.remove("error");
  errorEl.textContent = "";
  return true;
}

// ---- Real-time feedback ----
nameInput.addEventListener("blur", () =>
  validateField(nameInput, nameError, validateName),
);
emailInput.addEventListener("blur", () =>
  validateField(emailInput, emailError, validateEmail),
);
messageInput.addEventListener("blur", () =>
  validateField(messageInput, messageError, validateMessage),
);

[nameInput, emailInput, messageInput].forEach((el) => {
  el.addEventListener("input", () => {
    if (el.classList.contains("error")) {
      if (el === nameInput) validateField(nameInput, nameError, validateName);
      if (el === emailInput)
        validateField(emailInput, emailError, validateEmail);
      if (el === messageInput)
        validateField(messageInput, messageError, validateMessage);
    }
  });
});

// ---- Submit ----
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ok1 = validateField(nameInput, nameError, validateName);
  const ok2 = validateField(emailInput, emailError, validateEmail);
  const ok3 = validateField(messageInput, messageError, validateMessage);

  if (!ok1) {
    nameInput.focus();
    return;
  }
  if (!ok2) {
    emailInput.focus();
    return;
  }
  if (!ok3) {
    messageInput.focus();
    return;
  }

  // evita double submit
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  form.classList.add("hidden");
  formSuccess.classList.remove("hidden");
  formSuccess.focus();

  // reabilita botão caso usuário volte
  setTimeout(() => {
    submitBtn.disabled = false;
  }, 500);
});

// ---- Reset ----
btnReset.addEventListener("click", () => {
  form.reset();
  [nameInput, emailInput, messageInput].forEach((i) =>
    i.classList.remove("error"),
  );
  [nameError, emailError, messageError].forEach((e) => (e.textContent = ""));

  formSuccess.classList.add("hidden");
  form.classList.remove("hidden");
  nameInput.focus();
});
