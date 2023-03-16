


const logout = document.getElementById('logout');

function mainJs() {
    logout?.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await fetch('/api/user/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        }
    });
}

export {mainJs};