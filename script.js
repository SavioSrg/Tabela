// Lista de participantes e seus dados
let participants = [];

// Adiciona novo resultado ao formulário
document.getElementById('roundForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const roundNumber = parseInt(document.getElementById('roundNumber').value);
    const participantName = document.getElementById('participantName').value;
    const position = parseInt(document.getElementById('position').value);

    // Procura pelo participante existente ou cria um novo
    let participant = participants.find(p => p.name === participantName);
    if (!participant) {
        participant = {
            name: participantName,
            totalPoints: 0,
            firstPlace: 0,
            secondPlace: 0,
            thirdPlace: 0,
            fourthFifthPlace: 0,
            sixthToTenthPlace: 0,
            totalRounds: 0
        };
        participants.push(participant);
    }

    // Atualiza dados do participante conforme a posição
    participant.totalRounds++;
    if (position === 1) {
        participant.firstPlace++;
        participant.totalPoints += 5;
    } else if (position === 2) {
        participant.secondPlace++;
        participant.totalPoints += 4;
    } else if (position === 3) {
        participant.thirdPlace++;
        participant.totalPoints += 3;
    } else if (position >= 4 && position <= 5) {
        participant.fourthFifthPlace++;
        participant.totalPoints += 2;
    } else if (position >= 6 && position <= 10) {
        participant.sixthToTenthPlace++;
        participant.totalPoints += 1;
    }

    // Atualiza a tabela de classificação
    updateTable();
});

// Função para atualizar a tabela de classificação
function updateTable() {
    const tbody = document.querySelector('#classificationTable tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de atualizar

    // Ordena os participantes pelos critérios de desempate
    participants.sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) {
            return b.totalPoints - a.totalPoints;
        } else if (b.firstPlace !== a.firstPlace) {
            return b.firstPlace - a.firstPlace;
        } else if (b.secondPlace !== a.secondPlace) {
            return b.secondPlace - a.secondPlace;
        } else if (b.thirdPlace !== a.thirdPlace) {
            return b.thirdPlace - a.thirdPlace;
        }
        return 0; // Caso de empate completo, pode adicionar confronto direto aqui
    });

    // Preenche a tabela com os participantes atualizados
    participants.forEach(participant => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${participant.name}</td>
            <td>${participant.totalPoints}</td>
            <td>${participant.firstPlace}</td>
            <td>${participant.secondPlace}</td>
            <td>${participant.thirdPlace}</td>
            <td>${participant.fourthFifthPlace}</td>
            <td>${participant.sixthToTenthPlace}</td>
            <td>${participant.totalRounds}</td>
        `;

        tbody.appendChild(row);
    });
}
