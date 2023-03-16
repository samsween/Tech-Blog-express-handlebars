
import {indexJs} from './js';
import "./styles.css"
window.onload = () => {
    const container = document.querySelector('html');
    const toggle = document.querySelector('#flexSwitchCheckDefault');
    const dark = localStorage.getItem('dark');
    if (dark === 'true') {
        container.classList.add('dark');
        toggle.checked = true;
    }
}
const container = document.querySelector('html');
const toggle = document.querySelector('#flexSwitchCheckDefault');
toggle.addEventListener('change', () => {
    localStorage.setItem('dark', toggle.checked);
    container.classList.toggle('dark');
});
indexJs();