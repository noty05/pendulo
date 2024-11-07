// Variáveis para o controle do movimento do pêndulo
const g = 9.81;        // Gravidade (m/s²)
const L = 200;         // Comprimento do fio (em pixels, mas aqui vai ser usado como uma constante proporcional)
const theta0 = Math.PI / 4; // Amplitude inicial (45 graus ou PI/4 rad)
const omega = Math.sqrt(g / L); // Frequência angular
let t = 0; // Tempo em segundos
let pendulum = document.getElementById("pendulum");

// Variáveis para calcular a velocidade média e o tipo de movimento
let lastTime = 0;  // Tempo do último frame
let velocitySum = 0;  // Somatório das velocidades para cálculo da média
let velocityCount = 0;  // Contador de quantos frames foram analisados

// Função para atualizar o pêndulo e calcular os dados
function updatePendulum(time) {
    // Passo do tempo (deltaTime)
    let deltaTime = (time - lastTime) / 1000;  // Em segundos
    lastTime = time;

    // Calcular o ângulo do pêndulo usando a fórmula do Movimento Harmônico Simples (MHS)
    let angle = theta0 * Math.cos(omega * t);  // Movimento harmônico simples
    t += deltaTime;  // Atualiza o tempo

    // Aplica a rotação ao pêndulo
    pendulum.style.transform = `rotate(${angle}rad)`;

    // Calculando a velocidade média (derivada do ângulo)
    let angularVelocity = -theta0 * omega * Math.sin(omega * t);
    velocitySum += Math.abs(angularVelocity);
    velocityCount++;
    const avgVelocity = velocitySum / velocityCount;

    // Exibindo a velocidade média
    document.getElementById("avgVelocity").textContent = avgVelocity.toFixed(2);

    // O movimento é sempre harmônico simples (MHS), então esse é o tipo de movimento
    document.getElementById("movementType").textContent = "Harmônico Simples";

    // Requisita o próximo frame para a animação contínua
    requestAnimationFrame(updatePendulum);
}

// Inicia a animação
requestAnimationFrame(updatePendulum);
