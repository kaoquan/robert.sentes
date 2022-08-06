class colorSchemeToggle {

    constructor(element) {
        this.toogle = document.querySelector(element);
        this.detectColorScheme(); // determines if the user has a set theme
        this.toogle.addEventListener('change', this.switchTheme, false);
    }

    switchTheme(event) { // function that changes the theme, and sets a localStorage variable to track the theme between page loads
        let theme = 'dark';
        if (event.target.checked) {
            theme = 'light'
        }
        localStorage.setItem('color-scheme', theme);
    }

    detectColorScheme(){
        let theme='dark'; // default to dark

        if(localStorage.getItem('color-scheme')){  // local storage is used to override OS theme settings
            if(localStorage.getItem('color-scheme') == 'light'){
                theme = 'light';
            }
        } /* else if(!window.matchMedia) { // matchMedia method not supported
            return false;
        } else if(window.matchMedia('(prefers-color-scheme: light)').matches) { // OS theme setting detected as dark
            theme = 'light';
        } */

        if (theme == 'light'){
            this.toogle.checked = true;
        }
    }
}