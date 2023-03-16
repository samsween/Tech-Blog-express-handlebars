



const form = document.querySelector('.login-form');
// post login


function loginJs() {
    form?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            const error = await response.json();
            const errorDiv = document.getElementById('error');
            errorDiv.innerHTML = error.message;
        }
    });
}


export {loginJs}
