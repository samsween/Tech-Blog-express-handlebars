
const form = document.querySelector('.login-form');
const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim().toLowerCase();
    const confirm = document.getElementById('confirm').value.trim().toLowerCase();
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    console.log(username, password, confirm);
    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const error = await response.json();
            const errorDiv = document.getElementById('error');
            errorDiv.innerHTML = error.message;
        }
    }
}

function signupJs() {
    form?.addEventListener('submit', signupFormHandler);

}

export  {signupJs}
