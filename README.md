Site de açougue com sistema de Login e Cadastro feito com HTML, CSS e Javascript com NodeJs, vinculado a um Banco de Dados MySQL.

- Evita duplicidade de conta (não é possível criar uma conta usando o mesmo e-mail).
- Aceita apenas e-mails válidos.
- A senha cadastrada é criptografada usando BCRYPT.
- O site cria sessões ao logar usando JWT, caso usuário fazer logout e tentar acessar outra página, ou a sessão expirar, ele voltará para a página de login.
