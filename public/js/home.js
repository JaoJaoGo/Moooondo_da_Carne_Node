function verificaToken() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if(!token) {
        return false;
    }

    if(expiresIn < Date.now()) {
        localStorage.removeItem('token');
        return false;
    }

    return true;
}

window.onload = function () {
    if(!verificaToken()) {
        window.location.href = './index.html'
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logout');

    // Adicione um ouvinte de evento ao botão de logout
    logoutButton.addEventListener('click', function () {
        // Remova o token do localStorage
        localStorage.removeItem('token');

        // Redirecione para a página de login
        window.location.href = './index.html';
    });
});