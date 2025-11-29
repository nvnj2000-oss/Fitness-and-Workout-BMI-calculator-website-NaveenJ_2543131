// handle sidebar toggle on mobile
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Dark mode
  const themeBtn = document.getElementById('themeToggle');
  const current = localStorage.getItem('theme') || 'light';
  if (current === 'dark') {
    document.body.classList.add('dark');
    setThemeIcon(true);
  } else {
    setThemeIcon(false);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      setThemeIcon(isDark);
    });
  }

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
});

function setThemeIcon(isDark) {
  const icon = document.querySelector('#themeToggle i');
  const label = document.querySelector('#themeToggle span');
  if (!icon || !label) return;
  if (isDark) {
    icon.className = 'fa-solid fa-moon';
    label.textContent = 'Dark mode';
  } else {
    icon.className = 'fa-regular fa-sun';
    label.textContent = 'Light mode';
  }
}

/* ---- Simple auth helpers using localStorage ---- */

function registerUser(username, password) {
  if (!username || !password) return { ok: false, message: 'Fill all fields' };
  if (localStorage.getItem('user_' + username)) {
    return { ok: false, message: 'User already exists' };
  }
  localStorage.setItem('user_' + username, password);
  return { ok: true, message: 'Account created! You can login now.' };
}

function loginUser(username, password) {
  if (!username || !password) return { ok: false, message: 'Fill all fields' };
  const stored = localStorage.getItem('user_' + username);
  if (stored && stored === password) {
    localStorage.setItem('loggedInUser', username);
    return { ok: true, message: 'Welcome, ' + username + '!' };
  }
  return { ok: false, message: 'Incorrect username or password' };
}

function getLoggedInUser() {
  return localStorage.getItem('loggedInUser') || null;
}

function saveProgress(entry) {
  const user = getLoggedInUser();
  if (!user) return { ok: false, message: 'You must login first' };
  if (!entry) return { ok: false, message: 'Write something first' };

  const key = 'progress_' + user;
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  list.push(entry);
  localStorage.setItem(key, JSON.stringify(list));
  return { ok: true, message: 'Progress saved', list };
}

function getProgress() {
  const user = getLoggedInUser();
  if (!user) return [];
  const key = 'progress_' + user;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

/* BMI helper */
function calculateBMI(weightKg, heightCm) {
  const h = heightCm / 100;
  if (!weightKg || !heightCm || h <= 0) return null;
  const bmi = weightKg / (h * h);
  return Math.round(bmi * 10) / 10;
}
