/**
 * SIMULAÇÃO DE UMA TELA EM JAVASCRIPT PURO
 * 
 * Como não estamos no navegador, criamos um objeto que simula a nossa "Tela 📺"
 * e uma função para desenhar essa tela sempre que o estado mudar.
 */

let dadosDaTela = null; // Começa como null (vazia / carregando)

function renderizarTela(cenario) {
    console.log(`\n--- [RENDER DA TELA] Cenário: ${cenario} ---`);
    if (dadosDaTela === null) {
        console.log("📺 TELA: ⏳ Carregando dados... Por favor, aguarde.");
    } else {
        // Se já temos dados, podemos acessá-los sem quebrar a tela!
        console.log(`📺 TELA: ✅ Sucesso!`);
        console.log(`   └─ Informação exibida: ${JSON.stringify(dadosDaTela)}`);
    }
    console.log("------------------------------------------");
}


/**
 * CENÁRIO 1: Usando FETCH com .then()
 */
function rodarCenarioFetch() {
    // 1. Resetamos a tela para o estado inicial
    dadosDaTela = null;
    renderizarTela("FETCH + THEN"); // Vai mostrar "Carregando..."

    // 2. Disparamos o fetch assíncrono
    fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((dados) => {
            // 3. O dado chegou! Atualizamos a variável global e mandamos renderizar a tela de novo
            dadosDaTela = { origem: "Internet (Fetch)", titulo: dados.title };
            renderizarTela("FETCH + THEN"); // Agora mostra o dado real!
        });
}


/**
 * CENÁRIO 2: Usando NEW PROMISE manual com .then()
 */
function rodarCenarioPromiseManual() {
    dadosDaTela = null;
    renderizarTela("PROMISE MANUAL + THEN"); // Mostra "Carregando..."

    // Criamos a nossa Promise manual que demora 2 segundos
    const minhaPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({ produto: "Teclado Mecânico", preco: 299.90 });
        }, 2000);
    });

    // Quando o tempo passar e o resolve() for chamado, atualizamos a tela
    minhaPromise.then((dados) => {
        dadosDaTela = { origem: "Banco de Dados Manual", info: `${dados.produto} por R$${dados.preco}` };
        renderizarTela("PROMISE MANUAL + THEN"); // Agora mostra o dado real!
    });
}


/**
 * CENÁRIO 3: Usando ASYNC / AWAIT
 */
async function rodarCenarioAsyncAwait() {
    dadosDaTela = null;
    renderizarTela("ASYNC / AWAIT"); // Mostra "Carregando..."

    // Criamos a função que retorna a Promise
    const obterDadosAssincronos = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Usuário: Valmyr Tavares");
            }, 2000);
        });
    };

    // O await pausa a execução aqui até receber a resposta
    const resultado = await obterDadosAssincronos();

    // A partir desta linha, o dado já existe! Atualizamos a tela
    dadosDaTela = { origem: "Async Await", usuario: resultado };
    renderizarTela("ASYNC / AWAIT"); // Agora mostra o dado real!
}


// Executa os cenários um após o outro para vermos a tela mudando no tempo
async function iniciarTodosOsCenarios() {
    // Roda Cenário 1 (Fetch)
    rodarCenarioFetch();

    // Roda Cenário 2 após 3 segundos
    setTimeout(() => {
        rodarCenarioPromiseManual();
    }, 3000);

    // Roda Cenário 3 após 6 segundos
    setTimeout(async () => {
        await rodarCenarioAsyncAwait();
    }, 6000);
}

iniciarTodosOsCenarios();
