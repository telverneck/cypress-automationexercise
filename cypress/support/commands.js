import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

Cypress.Commands.add('login', (email, password) => {
    HomePage.clickSignupLogin();
    LoginPage.login(email, password);
});
