export class ButtonToggle {
    constructor() {
        this.darkMode = true;
        this.buttonToggle = document.getElementById('toggle-mode');
        this.buttonToggle.addEventListener('click', this.toggleMode.bind(this));
    }

    toggleMode(event) {
        document.documentElement.classList.toggle('light');
        const mode = this.darkMode ? 'light' : 'dark';
        event.currentTarget.querySelector('span').textContent = `${mode} mode ativado!`;
        this.darkMode = !this.darkMode;
    }
}