let score = 10000;
let choices = ['Bầu', 'Tôm', 'Cua', 'Cá', 'Mèo', 'Nai'];

function getRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function updateScoreDisplay() {
    document.getElementById('score').innerHTML = `Điểm hiện tại: ${score}`;
}

function playGame() {
    let bauBet = parseInt(document.getElementById('bauBet').value) || 0;
    let tomBet = parseInt(document.getElementById('tomBet').value) || 0;
    let cuaBet = parseInt(document.getElementById('cuaBet').value) || 0;
    let caBet = parseInt(document.getElementById('caBet').value) || 0;
    let meoBet = parseInt(document.getElementById('meoBet').value) || 0;
    let naiBet = parseInt(document.getElementById('naiBet').value) || 0;

    let totalBet = bauBet + tomBet + cuaBet + caBet + meoBet + naiBet;
    let betCount = [bauBet, tomBet, cuaBet, caBet, meoBet, naiBet].filter(bet => bet > 0).length;

    // Kiểm tra điều kiện cược
    if (betCount > 3) {
        document.getElementById("result").innerHTML = "Bạn chỉ được cược tối đa 3 ô.";
        return;
    }
    if (totalBet < 3000) {
        document.getElementById("result").innerHTML = "Số tiền cược tối thiểu cho mỗi ô là 3000.";
        return;
    }
    if (totalBet > score) {
        document.getElementById("result").innerHTML = "Bạn không có đủ điểm để cược số tiền này.";
        return;
    }

    // Tạo kết quả với ưu tiên cho các ô không cược
    let results = [];
    let nonBettingChoices = choices.filter((choice, index) => {
        let bet = [bauBet, tomBet, cuaBet, caBet, meoBet, naiBet][index];
        return bet === 0;
    });

    // Nếu có ô không cược, ưu tiên chọn từ các ô đó
    if (nonBettingChoices.length > 0) {
        for (let i = 0; i < 3; i++) {
            results.push(nonBettingChoices[Math.floor(Math.random() * nonBettingChoices.length)]);
        }
    } else {
        // Nếu không có ô không cược, chọn ngẫu nhiên từ tất cả
        for (let i = 0; i < 3; i++) {
            results.push(getRandomChoice());
        }
    }

    document.getElementById('result').innerHTML = `Kết quả: ${results.join(', ')}.`;

    let winnings = 0;

    // Tính số điểm thắng dựa trên kết quả (mỗi lần trùng *2 số tiền cược)
    results.forEach(result => {
        if (result === 'Bầu') winnings += bauBet * 2;
        if (result === 'Tôm') winnings += tomBet * 2;
        if (result === 'Cua') winnings += cuaBet * 2;
        if (result === 'Cá') winnings += caBet * 2;
        if (result === 'Mèo') winnings += meoBet * 2;
        if (result === 'Nai') winnings += naiBet * 2;
    });

    score = score - totalBet + winnings;
    updateScoreDisplay();

    if (winnings > 0) {
        document.getElementById('result').innerHTML += `<br>Chúc mừng! Bạn đã thắng ${winnings} điểm!`;
    } else {
        document.getElementById('result').innerHTML += "<br>Rất tiếc! Bạn đã thua!";
    }
}

updateScoreDisplay();
