const hostname = window.location.hostname;


export const environment = {
    production: false,
    apiBaseUrl: hostname === 'localhost' ? 'http://localhost:8000' : 'http://80.65.208.178',
};