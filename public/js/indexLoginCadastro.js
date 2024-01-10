// Função responsável por mostrar os erros ao usuário
$(document).ready(function () {
    if(typeof erroLogin !== 'undefined' && erroLogin) {
        var erroL = $(".mensagemErroLogin");
        erroL.fadeIn("fast");
    }

    if(typeof erroCadastroSenha !== 'undefined' && erroCadastroSenha) {
        var erroCS = $(".mensagemErroCadastroSenha");
        erroCS.fadeIn("fast");
        toggleLogin();
    }

    if(typeof erroCadastroEmail !== 'undefined' && erroCadastroEmail) {
        var erroCE = $(".mensagemErroCadastroEmail");
        erroCE.fadeIn("fast");
        toggleLogin();
    }
    
    if(typeof erroCadastroDuplicado !== 'undefined' && erroCadastroDuplicado) {
        var erroCD = $(".mensagemErroCadastroDuplicado");
        erroCD.fadeIn("fast");
        toggleLogin();
    }
});

// Faz a troca de inputs de login e cadastro, e suas animações
function toggleLogin() {
    var box = $(".box");
    var login = $(".login");
    var signUp = $(".signUp");

    if (box.hasClass("shifted")) {
        // Se a classe "shifted" estiver presente, remova-a e mova para a direita
        box.removeClass("shifted");

        signUp.fadeOut("fast", () => {
            login.fadeIn("slow");
        });
    } else {
        // Se a classe "shifted" não estiver presente, adicione-a e mova para a esquerda
        box.addClass("shifted");

        login.fadeOut("fast", () => {
            signUp.fadeIn("slow");
        });
    }
}

// Função responsável por mostrar ou esconder a senha digitada ao usuário caso ela clicar no olho (fa-eye)
function trocarSenha(idInput, idIcon) {
    const passwordInput = document.getElementById(idInput);
    const eyeIcon = document.getElementById(idIcon);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";

        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";

        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

// Token
document.addEventListener("DOMContentLoaded", function () {
    // Adicione um ouvinte de evento ao formulário de login
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const email = loginForm.querySelector('[name="emaillogin"]').value;
        const senha = loginForm.querySelector('[name="senhalogin"]').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emaillogin: email, senhalogin: senha }),
            });

            if (response.ok) {
                const { acess_token } = await response.json();

                // Armazene o token no localStorage
                localStorage.setItem('token', acess_token.token);
                localStorage.setItem('expiresIn', acess_token.expiresIn);

                // Redirecione para a página home
                window.location.href = './home.html';
            } else {
                // Lidar com erros de login
                console.error('Erro de login:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erro:', error.message);
        }
    });
});
