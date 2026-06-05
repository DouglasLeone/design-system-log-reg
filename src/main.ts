// SVGs for Password Toggles (Eye and Eye-Off)
const SVG_EYE = `<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const SVG_EYE_OFF = `<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

// Toast Notification Manager
class ToastManager {
  private container: HTMLElement;

  constructor() {
    let containerEl = document.getElementById('toast-container');
    if (!containerEl) {
      containerEl = document.createElement('div');
      containerEl.id = 'toast-container';
      containerEl.className = 'toast-container';
      document.body.appendChild(containerEl);
    }
    this.container = containerEl;
  }

  show(type: 'success' | 'error', title: string, message: string): void {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconSVG = type === 'success' 
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
      <span class="toast-icon">${iconSVG}</span>
      <div class="toast-content">
        <h3 class="toast-title">${title}</h3>
        <p class="toast-message">${message}</p>
      </div>
      <button type="button" class="toast-close" aria-label="Fechar notificação">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;

    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn?.addEventListener('click', () => {
      this.dismiss(toast);
    });

    this.container.appendChild(toast);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      this.dismiss(toast);
    }, 4000);
  }

  private dismiss(toast: HTMLElement): void {
    if (toast.classList.contains('toast-out')) return;
    toast.classList.add('toast-out');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }
}

const toasts = new ToastManager();

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const authCard = document.getElementById('auth-card') as HTMLElement;
  const loginContainer = document.getElementById('login-container') as HTMLElement;
  const registerContainer = document.getElementById('register-container') as HTMLElement;
  
  // Navigation buttons
  const goToRegisterBtn = document.getElementById('go-to-register') as HTMLButtonElement;
  const goToLoginBtn = document.getElementById('go-to-login') as HTMLButtonElement;
  
  // Testimonial slides
  const slideLogin = document.getElementById('slide-login') as HTMLElement;
  const slideRegister = document.getElementById('slide-register') as HTMLElement;

  // Forms
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('register-form') as HTMLFormElement;

  // Inputs - Login
  const loginEmail = document.getElementById('login-email') as HTMLInputElement;
  const loginPassword = document.getElementById('login-password') as HTMLInputElement;
  const loginRemember = document.getElementById('login-remember') as HTMLInputElement;

  // Inputs - Register
  const registerName = document.getElementById('register-name') as HTMLInputElement;
  const registerEmail = document.getElementById('register-email') as HTMLInputElement;
  const registerPassword = document.getElementById('register-password') as HTMLInputElement;
  const registerPasswordConfirm = document.getElementById('register-password-confirm') as HTMLInputElement;
  const registerTerms = document.getElementById('register-terms') as HTMLInputElement;

  // Submit Buttons
  const btnLoginSubmit = document.getElementById('btn-login-submit') as HTMLButtonElement;
  const btnRegisterSubmit = document.getElementById('btn-register-submit') as HTMLButtonElement;

  // Password Toggles
  const loginPasswordToggle = document.getElementById('login-password-toggle') as HTMLButtonElement;
  const registerPasswordToggle = document.getElementById('register-password-toggle') as HTMLButtonElement;
  const registerConfirmToggle = document.getElementById('register-confirm-toggle') as HTMLButtonElement;

  // Password Helper requirements
  const reqLength = document.getElementById('req-length') as HTMLElement;
  const reqAlphanum = document.getElementById('req-alphanum') as HTMLElement;

  // Initial focus on load
  if (loginEmail) {
    loginEmail.focus();
  }

  // State Switcher (Login <-> Register)
  function switchView(showRegister: boolean): void {
    if (showRegister) {
      authCard.classList.add('show-register');
      
      // Update form containers
      loginContainer.classList.add('hidden');
      registerContainer.classList.remove('hidden');
      
      // Update visual panel content
      slideLogin.classList.remove('active');
      slideRegister.classList.add('active');
      
      // Focus first input of register form
      setTimeout(() => {
        registerName.focus();
      }, 250); // Matches snappy switch transitions
    } else {
      authCard.classList.remove('show-register');
      
      // Update form containers
      registerContainer.classList.add('hidden');
      loginContainer.classList.remove('hidden');
      
      // Update visual panel content
      slideRegister.classList.remove('active');
      slideLogin.classList.add('active');
      
      // Focus first input of login form
      setTimeout(() => {
        loginEmail.focus();
      }, 250);
    }
  }

  goToRegisterBtn.addEventListener('click', () => {
    clearAllValidationUI();
    switchView(true);
  });
  goToLoginBtn.addEventListener('click', () => {
    clearAllValidationUI();
    switchView(false);
  });

  // Password Visibility Toggle Utility
  function setupPasswordToggle(toggleBtn: HTMLButtonElement, inputEl: HTMLInputElement): void {
    toggleBtn.addEventListener('click', () => {
      const isPassword = inputEl.type === 'password';
      inputEl.type = isPassword ? 'text' : 'password';
      toggleBtn.innerHTML = isPassword ? SVG_EYE_OFF : SVG_EYE;
      toggleBtn.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
      
      // Keep input focused after toggle
      inputEl.focus();
    });
  }

  setupPasswordToggle(loginPasswordToggle, loginPassword);
  setupPasswordToggle(registerPasswordToggle, registerPassword);
  setupPasswordToggle(registerConfirmToggle, registerPasswordConfirm);

  // Email format validation helper
  function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Set/Clear input wrapper validation classes
  function setFieldErrorState(inputEl: HTMLInputElement, errorElId: string, message: string): void {
    const wrapper = inputEl.closest('.input-wrapper');
    const errorEl = document.getElementById(errorElId);
    
    if (wrapper) {
      wrapper.classList.add('has-error');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearFieldErrorState(inputEl: HTMLInputElement, errorElId: string): void {
    const wrapper = inputEl.closest('.input-wrapper');
    const errorEl = document.getElementById(errorElId);
    
    if (wrapper) {
      wrapper.classList.remove('has-error');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function clearAllValidationUI(): void {
    const inputs = [loginEmail, loginPassword, registerName, registerEmail, registerPassword, registerPasswordConfirm];
    const errors = ['login-email-error', 'login-password-error', 'register-name-error', 'register-email-error', 'register-password-confirm-error'];
    
    inputs.forEach(input => {
      if (input) {
        const wrapper = input.closest('.input-wrapper');
        if (wrapper) wrapper.classList.remove('has-error');
      }
    });

    errors.forEach(errId => {
      const el = document.getElementById(errId);
      if (el) {
        el.textContent = '';
        el.classList.remove('visible');
      }
    });

    // Reset password checklist visually
    if (reqLength) reqLength.classList.remove('valid', 'invalid');
    if (reqAlphanum) reqAlphanum.classList.remove('valid', 'invalid');
  }

  // Validation functions
  function validateLoginEmail(blur: boolean): boolean {
    const value = loginEmail.value.trim();
    if (!value) {
      if (blur) setFieldErrorState(loginEmail, 'login-email-error', 'O e-mail é obrigatório.');
      return false;
    }
    if (!isValidEmail(value)) {
      if (blur) setFieldErrorState(loginEmail, 'login-email-error', 'Insira um e-mail corporativo válido.');
      return false;
    }
    clearFieldErrorState(loginEmail, 'login-email-error');
    return true;
  }

  function validateLoginPassword(blur: boolean): boolean {
    const value = loginPassword.value;
    if (!value) {
      if (blur) setFieldErrorState(loginPassword, 'login-password-error', 'A senha é obrigatória.');
      return false;
    }
    clearFieldErrorState(loginPassword, 'login-password-error');
    return true;
  }

  function validateRegisterName(blur: boolean): boolean {
    const value = registerName.value.trim();
    if (!value) {
      if (blur) setFieldErrorState(registerName, 'register-name-error', 'O nome completo é obrigatório.');
      return false;
    }
    clearFieldErrorState(registerName, 'register-name-error');
    return true;
  }

  function validateRegisterEmail(blur: boolean): boolean {
    const value = registerEmail.value.trim();
    if (!value) {
      if (blur) setFieldErrorState(registerEmail, 'register-email-error', 'O e-mail é obrigatório.');
      return false;
    }
    if (!isValidEmail(value)) {
      if (blur) setFieldErrorState(registerEmail, 'register-email-error', 'Insira um endereço de e-mail válido.');
      return false;
    }
    clearFieldErrorState(registerEmail, 'register-email-error');
    return true;
  }

  function validateRegisterPasswordStrength(): { lengthValid: boolean, alphaNumValid: boolean } {
    const password = registerPassword.value;
    const lengthValid = password.length >= 8;
    
    // Check for at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const alphaNumValid = hasLetter && hasNumber;

    // Update Checklist UI
    if (lengthValid) {
      reqLength.classList.add('valid');
      reqLength.classList.remove('invalid');
    } else {
      reqLength.classList.add('invalid');
      reqLength.classList.remove('valid');
    }

    if (alphaNumValid) {
      reqAlphanum.classList.add('valid');
      reqAlphanum.classList.remove('invalid');
    } else {
      reqAlphanum.classList.add('invalid');
      reqAlphanum.classList.remove('valid');
    }

    return { lengthValid, alphaNumValid };
  }

  function validateRegisterPasswordConfirm(blur: boolean): boolean {
    const password = registerPassword.value;
    const confirm = registerPasswordConfirm.value;
    if (!confirm) {
      if (blur) setFieldErrorState(registerPasswordConfirm, 'register-password-confirm-error', 'A confirmação de senha é obrigatória.');
      return false;
    }
    if (password !== confirm) {
      if (blur) setFieldErrorState(registerPasswordConfirm, 'register-password-confirm-error', 'As senhas não coincidem.');
      return false;
    }
    clearFieldErrorState(registerPasswordConfirm, 'register-password-confirm-error');
    return true;
  }

  // Enable/Disable Register Button
  function checkRegisterFormValidity(): void {
    const nameValid = registerName.value.trim().length > 0;
    const emailValid = isValidEmail(registerEmail.value.trim());
    
    const { lengthValid, alphaNumValid } = validateRegisterPasswordStrength();
    
    const passwordsMatch = registerPassword.value === registerPasswordConfirm.value && registerPasswordConfirm.value.length > 0;
    const termsChecked = registerTerms.checked;

    const allValid = nameValid && emailValid && lengthValid && alphaNumValid && passwordsMatch && termsChecked;
    btnRegisterSubmit.disabled = !allValid;
  }

  // --- LOGIN EVENT OBSERVERS ---
  loginEmail.addEventListener('blur', () => validateLoginEmail(true));
  loginEmail.addEventListener('input', () => {
    // Clear errors immediately when user starts correcting
    if (loginEmail.value.trim().length > 0) {
      clearFieldErrorState(loginEmail, 'login-email-error');
    }
  });

  loginPassword.addEventListener('blur', () => validateLoginPassword(true));
  loginPassword.addEventListener('input', () => {
    if (loginPassword.value.length > 0) {
      clearFieldErrorState(loginPassword, 'login-password-error');
    }
  });

  // --- REGISTER EVENT OBSERVERS ---
  registerName.addEventListener('blur', () => validateRegisterName(true));
  registerName.addEventListener('input', () => {
    if (registerName.value.trim().length > 0) {
      clearFieldErrorState(registerName, 'register-name-error');
    }
    checkRegisterFormValidity();
  });

  registerEmail.addEventListener('blur', () => validateRegisterEmail(true));
  registerEmail.addEventListener('input', () => {
    if (isValidEmail(registerEmail.value.trim())) {
      clearFieldErrorState(registerEmail, 'register-email-error');
    }
    checkRegisterFormValidity();
  });

  registerPassword.addEventListener('input', () => {
    validateRegisterPasswordStrength();
    checkRegisterFormValidity();
    
    // Validate matching dynamically if user already typed in confirm field
    if (registerPasswordConfirm.value.length > 0) {
      validateRegisterPasswordConfirm(false);
    }
  });
  
  registerPassword.addEventListener('blur', () => {
    const { lengthValid, alphaNumValid } = validateRegisterPasswordStrength();
    const wrapper = registerPassword.closest('.input-wrapper');
    
    if (!lengthValid || !alphaNumValid) {
      if (wrapper) wrapper.classList.add('has-error');
    } else {
      if (wrapper) wrapper.classList.remove('has-error');
    }
  });

  registerPasswordConfirm.addEventListener('blur', () => validateRegisterPasswordConfirm(true));
  registerPasswordConfirm.addEventListener('input', () => {
    if (registerPassword.value === registerPasswordConfirm.value) {
      clearFieldErrorState(registerPasswordConfirm, 'register-password-confirm-error');
    }
    checkRegisterFormValidity();
  });

  registerTerms.addEventListener('change', checkRegisterFormValidity);

  // Form Submissions With Loading Spinner States
  function toggleFormDisabledState(form: HTMLFormElement, disabled: boolean): void {
    const inputs = form.querySelectorAll('input, button:not(.toast-close)');
    inputs.forEach(el => {
      if (disabled) {
        el.setAttribute('disabled', 'true');
      } else {
        el.removeAttribute('disabled');
      }
    });
  }

  // Login Submit Handler
  loginForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    const emailValid = validateLoginEmail(true);
    const passwordValid = validateLoginPassword(true);

    if (!emailValid || !passwordValid) return;

    // Trigger Loading State
    const btnText = btnLoginSubmit.querySelector('.btn-text') as HTMLElement;
    const btnSpinner = btnLoginSubmit.querySelector('.btn-spinner') as HTMLElement;

    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    toggleFormDisabledState(loginForm, true);

    const emailValue = loginEmail.value.trim();

    // Simulate API Auth Request
    setTimeout(() => {
      // Restore Button State
      btnText.classList.remove('hidden');
      btnSpinner.classList.add('hidden');
      toggleFormDisabledState(loginForm, false);

      // Save cookie / localStorage if "Lembrar de mim" is checked
      if (loginRemember.checked) {
        localStorage.setItem('nexus_remembered_email', emailValue);
      } else {
        localStorage.removeItem('nexus_remembered_email');
      }

      toasts.show('success', 'Acesso autorizado', 'Redirecionando para o painel corporativo...');
      
      // Reset form
      loginForm.reset();
    }, 1500);
  });

  // Register Submit Handler
  registerForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    // Extra safety validate checks
    const nameValid = validateRegisterName(true);
    const emailValid = validateRegisterEmail(true);
    const confirmValid = validateRegisterPasswordConfirm(true);
    const { lengthValid, alphaNumValid } = validateRegisterPasswordStrength();
    
    if (!nameValid || !emailValid || !confirmValid || !lengthValid || !alphaNumValid || !registerTerms.checked) {
      toasts.show('error', 'Formulário inválido', 'Por favor, preencha todos os campos e siga as regras de validação.');
      return;
    }

    // Trigger Loading State
    const btnText = btnRegisterSubmit.querySelector('.btn-text') as HTMLElement;
    const btnSpinner = btnRegisterSubmit.querySelector('.btn-spinner') as HTMLElement;

    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    toggleFormDisabledState(registerForm, true);

    // Simulate API Create User Request
    setTimeout(() => {
      // Restore Button State
      btnText.classList.remove('hidden');
      btnSpinner.classList.add('hidden');
      toggleFormDisabledState(registerForm, false);

      toasts.show('success', 'Conta registrada', 'Faça login para acessar a plataforma.');
      
      // Reset form
      registerForm.reset();
      clearAllValidationUI();
      
      // Set register submit back to disabled
      btnRegisterSubmit.disabled = true;

      // Navigate back to login
      switchView(false);
    }, 1500);
  });

  // Mock social buttons behaviors
  const socialButtons = document.querySelectorAll('.btn-social');
  socialButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.textContent?.trim() || 'Provedor';
      toasts.show('success', 'Conexão iniciada', `Conectando com o provedor de identidade ${provider}...`);
    });
  });

  // Mock forgot password behavior
  const forgotPasswordBtn = document.getElementById('btn-forgot-password') as HTMLButtonElement;
  forgotPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailValue = loginEmail.value.trim();
    if (emailValue && isValidEmail(emailValue)) {
      toasts.show('success', 'E-mail de recuperação enviado', `Confira sua caixa de entrada em ${emailValue} para redefinir sua senha.`);
    } else {
      toasts.show('error', 'E-mail corporativo necessário', 'Preencha o campo de e-mail corporativo para solicitar a recuperação da senha.');
      loginEmail.focus();
    }
  });

  // Load remembered e-mail
  const rememberedEmail = localStorage.getItem('nexus_remembered_email');
  if (rememberedEmail && loginEmail) {
    loginEmail.value = rememberedEmail;
    loginRemember.checked = true;
    loginPassword.focus();
  }
});
