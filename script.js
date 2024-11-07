// Variáveis para o controle do movimento do pêndulo
let angle = 0;            // Ângulo inicial
let angleVelocity = 0;     // Velocidade angular
let angleAcceleration = 0; // Aceleração angular
const damping = 0.99;      // Fator de amortecimento
const gravity = 0.4;       // Gravidade que puxa o pêndulo
const length = 200;        // Comprimento do fio do pêndulo
const mass = 1;            // Massa (não utilizada diretamente, mas para efeito de visualização)
const pendulum = document.getElementById("pendulum");

// Função que atualiza a posição do pêndulo
function updatePendulum() {
    // Cálculo da aceleração angular usando a fórmula de um pêndulo simples
    angleAcceleration = (-gravity / length) * Math.sin(angle);

    // Atualizando a velocidade e o ângulo
    angleVelocity += angleAcceleration;
    angleVelocity *= damping; // Amortecimento para reduzir a energia do sistema
    angle += angleVelocity;

    // Limitar o movimento angular para evitar valores infinitos
    if (angle > Math.PI) angle -= Math.PI * 2;
    if (angle < -Math.PI) angle += Math.PI * 2;

    // Aplica a rotação ao pêndulo
    pendulum.style.transform = `rotate(${angle}rad)`;

    // Requisita o próximo frame para a animação contínua
    requestAnimationFrame(updatePendulum);
}

// Inicia a animação
updatePendulum();