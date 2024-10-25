class Game {
    constructor() {
        this.score = 10000;
        this.choices = ['Bầu', 'Tôm', 'Cua', 'Cá', 'Mèo', 'Nai'];
    }

    // Phương thức để cập nhật điểm hiện tại trên giao diện
    updateScoreDisplay() {
        document.getElementById('score').innerHTML = `Điểm hiện tại: ${this.score}`;
    }

    // Phương thức để lấy kết quả ngẫu nhiên
    getRandomChoice() {
        return this.choices[Math.floor(Math.random() * this.choices.length)];
    }

    // Phương thức chính để chơi game
    playGame() {
        let bauBet = parseInt(document.getElementById('bauBet').value) || 0;
        let tomBet = parseInt(document.getElementById('tomBet').value) || 0;
        let cuaBet = parseInt(document.getElementById('cuaBet').value) || 0;
        let caBet = parseInt(document.getElementById('caBet').value) || 0;
        let meoBet = parseInt(document.getElementById('meoBet').value) || 0;
        let naiBet = parseInt(document.getElementById('naiBet').value) || 0;

        let totalBet = bauBet + tomBet + cuaBet + caBet + meoBet + naiBet;

        if (totalBet > this.score) {
            document.getElementById("result").innerHTML = "Bạn không có đủ điểm để cược số tiền này.";
            return;
        }

        // Xoá giá trị trong tất cả các ô cược sau khi quay
        this.clearAllBets();

        // Quay kết quả
        let result1 = this.getRandomChoice();
        let result2 = this.getRandomChoice();
        let result3 = this.getRandomChoice();

        document.getElementById('result').innerHTML = `Kết quả: ${result1}, ${result2}, ${result3}.`;

        let winnings = 0;

        // Tính số điểm thắng dựa trên kết quả (mỗi lần trùng *2 số tiền cược)
        if (result1 === 'Bầu') winnings += bauBet * 2;
        if (result2 === 'Bầu') winnings += bauBet * 2;
        if (result3 === 'Bầu') winnings += bauBet * 2;

        if (result1 === 'Tôm') winnings += tomBet * 2;
        if (result2 === 'Tôm') winnings += tomBet * 2;
        if (result3 === 'Tôm') winnings += tomBet * 2;

        if (result1 === 'Cua') winnings += cuaBet * 2;
        if (result2 === 'Cua') winnings += cuaBet * 2;
        if (result3 === 'Cua') winnings += cuaBet * 2;

        if (result1 === 'Cá') winnings += caBet * 2;
        if (result2 === 'Cá') winnings += caBet * 2;
        if (result3 === 'Cá') winnings += caBet * 2;

        if (result1 === 'Mèo') winnings += meoBet * 2;
        if (result2 === 'Mèo') winnings += meoBet * 2;
        if (result3 === 'Mèo') winnings += meoBet * 2;

        if (result1 === 'Nai') winnings += naiBet * 2;
        if (result2 === 'Nai') winnings += naiBet * 2;
        if (result3 === 'Nai') winnings += naiBet * 2;

        // Cập nhật điểm sau khi chơi
        this.score = this.score - totalBet + winnings;
        this.updateScoreDisplay();

        if (winnings > 0) {
            document.getElementById('result').innerHTML += `<br>Chúc mừng! Bạn đã thắng ${winnings - 1000} điểm!`;
        } else {
            document.getElementById('result').innerHTML += "<br>Rất tiếc! Bạn đã thua!";
        }
    }

    // Phương thức xoá tất cả các cược
    clearAllBets() {
        document.getElementById('bauBet').value = '';
        document.getElementById('tomBet').value = '';
        document.getElementById('cuaBet').value = '';
        document.getElementById('caBet').value = '';
        document.getElementById('meoBet').value = '';
        document.getElementById('naiBet').value = '';
    }
}

// Thêm điểm vào một ô cược
function addBet(betId) {
    let betInput = document.getElementById(betId);
    let currentBet = parseInt(betInput.value) || 0;
    betInput.value = currentBet + 1000;
}

// Xoá giá trị cược trong một ô
function clearBet(betId) {
    document.getElementById(betId).value = '';
}

// Khởi tạo game khi trang tải
const game = new Game();
game.updateScoreDisplay();

// Gắn sự kiện click vào nút quay
document.getElementById('spinButton').addEventListener('click', function() {
    game.playGame();
});
