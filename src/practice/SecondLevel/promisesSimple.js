/**
 * EXEMPLO 1: Usando FETCH com .then()
 * 
 * Como o fetch() funciona no tempo?
 */
function exemploFetch() {
    console.log("\n--- INÍCIO DO EXEMPLO FETCH ---");
    console.log("[1. ANTES] Vou disparar a requisição de rede agora.");

    // O fetch retorna uma Promise IMEDIATAMENTE
    const requestPromise = fetch("https://jsonplaceholder.typicode.com/todos/1");

    console.log("[2. DURANTE] A requisição foi enviada. O JS continua rodando síncrono aqui.");
    console.log("[2. DURANTE] Perceba que os dados do 'requestPromise' ainda NÃO chegaram!");

    // Agendamos o que fazer quando os dados chegarem
    requestPromise
        .then((response) => response.json())
        .then((dados) => {
            console.log("[3. DEPOIS] A internet respondeu! E o .then() foi executado.");
            console.log("[3. DEPOIS] Dados recebidos:", dados.title);
        })
        .catch((erro) => {
            console.log("[ERRO] Falha na rede:", erro.message);
        });

    console.log("[2. DURANTE] Fim da função exemploFetch(). Mas o .then() lá de cima ainda vai rodar!");
}


/**
 * EXEMPLO 2: Usando NEW PROMISE manual com .then()
 * 
 * O exato mesmo comportamento do fetch, mas nós controlamos o tempo manualmente.
 */
function exemploPromiseManual() {
    console.log("\n--- INÍCIO DO EXEMPLO PROMISE MANUAL ---");
    console.log("[1. ANTES] Vou criar e disparar a nossa Promise manual agora.");

    // Criamos a Promise manualmente usando 'new Promise'
    const minhaPromise = new Promise((resolve, reject) => {
        // Simulamos uma tarefa que leva 2 segundos (ex: ler banco de dados)
        setTimeout(() => {
            const dadosDoBanco = { id: 1, nome: "Produto A", preco: 99.90 };
            
            // O resolve() avisa o JavaScript: "Terminei com sucesso! Tome os dados"
            resolve(dadosDoBanco); 
        }, 2000);
    });

    console.log("[2. DURANTE] A Promise foi criada e o temporizador de 2s iniciou.");
    console.log("[2. DURANTE] O JS continua executando o código síncrono sem travar.");

    // Agendamos o recebimento dos dados
    minhaPromise.then((dados) => {
        console.log("[3. DEPOIS] Os 2 segundos passaram e o resolve() foi chamado!");
        console.log("[3. DEPOIS] Recebi no .then() os dados:", dados.nome);
    });

    console.log("[2. DURANTE] Fim da função exemploPromiseManual(). O .then() vai disparar daqui a pouco...");
}


/**
 * EXEMPLO 3: Usando ASYNC / AWAIT (A forma moderna)
 * 
 * Faz exatamente a mesma coisa, mas a sintaxe esconde o ".then()" para parecer linear.
 */
async function exemploAsyncAwait() {
    console.log("\n--- INÍCIO DO EXEMPLO ASYNC/AWAIT ---");
    console.log("[1. ANTES] Iniciando a função assíncrona.");

    // Criamos a Promise igual ao Exemplo 2
    const obterDados = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: "OK", timestamp: Date.now() });
            }, 1500);
        });
    };

    console.log("[1. ANTES] Vou chamar obterDados() com 'await'.");

    // O 'await' pausa a execução DESTA função até a Promise dar resolve().
    // Mas atenção: o resto do computador e do JavaScript fora desta função NÃO trava!
    const resultado = await obterDados();

    console.log("[3. DEPOIS] O await liberou a execução porque a Promise resolveu!");
    console.log("[3. DEPOIS] Resultado obtido diretamente na variável:", resultado);
}

// Para testar os exemplos em ordem cronológica
async function rodarTodosOsTestes() {
    exemploFetch();
    
    // Aguardamos um pouco para os logs não se misturarem na tela
    setTimeout(() => {
        exemploPromiseManual();
    }, 3000);

    setTimeout(async () => {
        await exemploAsyncAwait();
    }, 6000);
}

rodarTodosOsTestes();
