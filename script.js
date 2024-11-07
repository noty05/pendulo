// Variáveis para o controle do movimento do pêndulo
let angle = Math.PI / 4;        // Ângulo inicial (45 graus)
let angleVelocity = 0;          // Velocidade angular
let angleAcceleration = 0;      // Aceleração angular
const gravity = 0.4;           // Gravidade que puxa o pêndulo
const length = 200;            // Comprimento do fio do pêndulo
const damping = 1.0;           // Fator de amortecimento (1.0 significa sem amortecimento)
const pendulum = document.getElementById("pendulum");

// Variáveis para calcular a velocidade média e o tipo de movimento
let lastTime = 0;  // Tempo do último frame
let velocitySum = 0;  // Somatório das velocidades para cálculo da média
let velocityCount = 0;  // Contador de quantos frames foram analisados

// Função para atualizar o pêndulo e calcular os dados
function updatePendulum(time) {
    // Passo do tempo (deltaTime)
    let deltaTime = (time - lastTime) / 1000;  // Em segundos
    lastTime = time;

    // Cálculo da aceleração angular usando a fórmula de um pêndulo simples
    angleAcceleration = (-gravity / length) * Math.sin(angle);

    // Atualizando a velocidade e o ângulo
    angleVelocity += angleAcceleration * deltaTime;
    angle += angleVelocity * deltaTime;

    // Aplicando a rotação ao pêndulo
    pendulum.style.transform = `rotate(${angle}rad)`;

    // Calculando a velocidade média
    velocitySum += Math.abs(angleVelocity);
    velocityCount++;
    const avgVelocity = velocitySum / velocityCount;

    // Exibindo a velocidade média
    document.getElementById("avgVelocity").textContent = avgVelocity.toFixed(2);

    // Determinando o tipo de movimento
    let movementType = "Harmônico Simples"; // Movimento harmônico simples por padrão
    if (Math.abs(angleVelocity) > 0.05) {
        movementType = "Oscilação Constante";
    } else if (Math.abs(angleVelocity) <= 0.05 && Math.abs(angleVelocity) > 0) {
        movementType = "Amortecimento visível";
    }
    document.getElementById("movementType").textContent = movementType;

    // Requisita o próximo frame para a animação contínua
    requestAnimationFrame(updatePendulum);
}

// Inicia a animação
requestAnimationFrame(updatePendulum);
