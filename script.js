class usuario{

    constructor(id, nome, email, senha){

        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    autenticar(email, senha){

        return this.email.toLowerCase() === email.toLowerCase() && this.senha === senha;

    }
}

class produto{
constructor(id, nome, preco){
    this.id = id;
    this.nome = nome;
    this.preco = preco;

}
}

class carrinho {
    constructor() {
        this.itens =[];
    
    }
    adicionar ( produto, quantidade = 1 ){

        this.itens.push({produto, quantidade})
    }
    total(){
        return this.itens.reduce((soma, i ) => soma +  i.produto.preco * i.quantidade, 0 );
    }
}

class Cliente extends usuario{
    constructor(id, nome, email, senha){
        SourceBuffer(id, nome, email, senha);
        this.carrinho = new carrinho();
    }
}

// DADOS PARA EXEMPLO 

const clientes = [ 
new Cliente (1, "Rodrigo", "rodrigo@loja.com", "1234"),
new Cliente(2, "Marco","marco@loja.com", "abcd"),
];

// LOGIN

const form = document.getElementById("form-login");

if(form){

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const  email = document.getElementById("email").value.trim();
        const  senha = document.getElementById("senha").value;
        const  erro = document.getElementById("erro");

        if(!email || !senha){
            erro.textContent = "Preencha o email e a senha.";
            return;
        }
        
        const cliente = clientes.find((c) => c.autenticar(email, senha));
        
        if(!cliente){
            erro.textContent = "E-Mail ous enha invalidos ou incorretos. ";
            return;
        }

        sessionStorage.setItem("UsuarioLogado", cliente.nome);
        window.location.href = " home.html"; //Puxando a pagina Home
    });
}

// Pagina Inicial //

const boasVindas = document.getElementById("Boas-Vindas");

if(boasVindas){

    const nome = sessionStorage.getItem("UsuarioLogado")

    if(!nome){
        window.location.href = "login.html"; // sem o login volta para tela inicial
    } else{
        boasVindas.textContent = " Ola," + nome + "!";
    }

    document.getElementById("Sair"). addEventListener("click", () => {
        sessionStorage.removeItem("UsuarioLogado");
        window.location.href= "login.html"
    });
}