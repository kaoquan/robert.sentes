class googleAnalyticsTraking {

    constructor(banner, gaID) {
        this.gaID = gaID;
        this.cookieBanner = document.querySelector(banner);
        this.acceptButton = document.querySelector(banner + '-accept');
        this.declineButton = document.querySelector(banner + '-decline');

        switch (localStorage.getItem('google-analytics')) {
            case 'enable':
                this.hideBanner();
                this.enableTracking();
                break;

            case 'disable':
                this.hideBanner();
                this.disableTracking();
                break;

            default:
                this.showBanner();
                this.disableTracking();
                break;
        }

        this.tracking();
        this.addEventListeners();
    }

    hideBanner() {
        this.cookieBanner.classList.remove('cookie-banner--show');
    }

    showBanner() {
        this.cookieBanner.classList.add('cookie-banner--show');
    }

    enableTracking() {
        window['ga-disable-' + this.gaID] = false;
    }

    disableTracking() {
        window['ga-disable-' + this.gaID] = true;
    }

    tracking() {
        window.dataLayer = window.dataLayer || [];
        this.gtag('js', new Date());

        this.gtag('config', this.gaID);
    }

    gtag() { dataLayer.push(arguments); }


    addEventListeners() {

        this.acceptButton.addEventListener('click', () => {
            localStorage.setItem('google-analytics', 'enable');
            this.hideBanner();
            this.enableTracking();
            this.tracking();
        }, false);

        this.declineButton.addEventListener('click', () => {
            localStorage.setItem('google-analytics', 'disable');
            this.hideBanner();
            this.disableTracking();
        }, false);

        /* let hoverTitme = 0;
        let hoverStart = new Date();
        let hoverEnd   = new Date();

        let terminal = document.querySelector('.js-terminal');
        terminal.addEventListener('mouseover', () => {
            hoverStart = new Date();
        }, false);

        terminal.addEventListener('mouseout', () => {
            hoverEnd   = new Date();
            hoverTitme = Math.floor((hoverEnd.getTime() - hoverStart.getTime()) / 1000);
            this.gtag('event', 'terminal_hover', {
                'event_category': 'interface',
                'event_label': 'terminal',
                'value': hoverTitme
            });
        }, false); */

        document.querySelector('.js-terminal').addEventListener('mouseenter', () => {
            this.gtag('event', 'hover_terminal', {
                'event_category': 'interface',
                'event_label': 'terminal'
            });
        }, false);

        document.querySelector('.js-avatar').addEventListener('mouseenter', () => {
            this.gtag('event', 'hover_avatar', {
                'event_category': 'interface',
                'event_label': 'terminal'
            });
        }, false);

        document.querySelector('.js-server').addEventListener('mouseenter', () => {;
            this.gtag('event', 'hover_server', {
                'event_category': 'interface',
                'event_label': 'server'
            });
        }, false);

        document.querySelector('.js-avatar').addEventListener('click', () => {
            this.gtag('event', 'click_freeze', {
                'event_category': 'interface',
                'event_label': 'terminal'
            });
        }, false);

        document.querySelector('.js-linkedin').addEventListener('click', () => {
            this.gtag('event', 'click_linkedin', {
                'event_category': 'interface',
                'event_label': 'terminal'
            });
        }, false);

        document.querySelector('.js-color_scheme_toggle').addEventListener('click', (event) => {
            this.gtag('event', 'switch_theme', {
                'event_category': 'interface',
                'event_label': 'theme',
                'value': (event.target.checked == true ? 'light' : 'dark')
            });
        }, false);
    }
}