const quizData = [
    ["1.你是否容易拖延？", [
        ["幾乎每天都這樣", ["ice"]],
        ["有時候會，特別是無聊的任務", ["cloud", "tea"]],
        ["偶爾，通常還是會安排好時間", ["bee"]],
        ["幾乎不會，喜歡提早完成", ["bee"]]
    ]],
    ["2.安排行程時你偏好緊湊還是彈性？", [
        ["緊湊有條理、時間規劃詳細", ["bee"]],
        ["只安排一兩件重點，其他自由發揮", ["cloud"]],
        ["靈感來時全速衝刺、平常不太規律", ["tea"]],
        ["嘗試安排，但常常做不到", ["wood", "ice"]]
    ]],
    ["3.你會紀錄每日行程嗎？", [
        ["每天都有，而且會檢查完成度", ["bee"]],
        ["偶爾記錄，但不一定照做", ["tea"]],
        ["幾乎不記，或只記重要約定", ["cloud", "wood"]],
        ["沒有這個習慣，也不太想做", ["ice"]]
    ]],
    ["4.當計畫中斷時，你是否有能力調整？", [
        ["立刻調整，改排其他可行方案", ["bee", "cloud"]],
        ["有點焦慮，但會努力適應", ["tea"]],
        ["會覺得失控或索性放棄", ["wood", "ice"]]
    ]],
    ["5.你是否相信自己能堅持計畫？", [
        ["只要有目標，就能堅持到底", ["bee"]],
        ["靠熱情支持，但有時中途放棄", ["tea"]],
        ["需要他人提醒或陪伴才比較有動力", ["wood"]],
        ["總是很難持續超過幾天", ["ice", "cloud"]]
    ]],
    ["6.你是否常因誘惑改變計畫？", [
        ["非常大，很容易分心", ["cloud", "ice"]],
        ["有時會分心，但能收回來", ["tea"]],
        ["幾乎不會受影響", ["bee"]]
    ]],
    ["7.你是否有每天預定行程？", [
        ["非常穩定，每天差不多時間", ["bee"]],
        ["大致規律，但會隨心情調整", ["cloud", "tea"]],
        ["完全隨意，常常日夜顛倒", ["ice"]]
    ]],
    ["8.你設定目標是為了自己成長還是他人期待？", [
        ["自己的成長與夢想", ["bee", "tea"]],
        ["符合別人期望（父母/老師）", ["wood"]],
        ["我也不太清楚，就是跟著做", ["wood", "ice"]]
    ]]
];

const emoji = {
    bee: "🐝 蜜蜂貓貓",
    cloud: "☁️ 棉花糖貓貓",
    tea: "🍵 熱茶貓貓",
    ice: "🍦 冰淇淋貓貓",
    wood: "🪵 木頭貓貓"
};

const advice = {
    bee: {
        text: "你非常自律，適合目標導向式規劃！建議你使用行事曆做詳細排程。",
        image: "bee.png"
    },
    cloud: {
        text: "你喜歡自由彈性，可以嘗試設定每日重點目標，保持彈性又有方向！",
        image: "cloud.png"
    },
    tea: {
        text: "你充滿熱情但容易分心，可以利用「5 分鐘啟動法」來啟動行動力。",
        image: "tea.png"
    },
    ice: {
        text: "你可能常常拖延，建議建立微習慣，例如每天寫下一件想做的事。",
        image: "ice.png"
    },
    wood: {
        text: "你可能對時間管理較沒自信，建議從簡單的每日提醒開始建立信心。",
        image: "wood.png"
    }
};

let scores = {bee:0, cloud:0, tea:0, ice:0, wood:0};
let currentQuestionIndex = 0; // 使用更清晰的變數名稱

const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");

function showQuestion() {
    const [questionText, options] = quizData[currentQuestionIndex];
    let html = `
        <div class="question">
            <div class="question-header">
                <h2>${questionText}</h2>
            </div>
    `;
    options.forEach((opt, index) => {
        html += `<button class="option" onclick="selectAnswer(${index})">${opt[0]}</button>`;
    });
    html += `</div>`;
    quizDiv.innerHTML = html;
}

function selectAnswer(optionIndex) {
    const selectedCatTypes = quizData[currentQuestionIndex][1][optionIndex][1];
    selectedCatTypes.forEach(cat => {
        if (scores[cat] !== undefined) { // 確保類型有效，避免對不存在的類型加分
            scores[cat]++;
        }
    });
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizDiv.style.display = 'none'; // 隱藏問題區塊

    let maxScore = -1;
    let resultCatType = '';
    let tiedResults = [];

    // 找到最高分
    for (const type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultCatType = type;
            tiedResults = [type]; // 重置平手結果
        } else if (scores[type] === maxScore && maxScore > 0) {
            tiedResults.push(type); // 加入平手結果
        }
    }

    // 如果有多個最高分，隨機選擇一個
    if (tiedResults.length > 1) {
        resultCatType = tiedResults[Math.floor(Math.random() * tiedResults.length)];
    } else if (maxScore === 0) {
        // 如果都沒有得分（例如用戶沒有選擇任何選項，雖然在此邏輯下不太可能），給一個預設結果
        resultCatType = 'cloud'; // 預設為棉花糖貓貓
    }

    // 正確顯示結果文字和圖片
    let html = `<h2>你最像的貓貓是：</h2>`;
    html += `<h3>${emoji[resultCatType]}</h3>`;
    html += `<img src="${advice[resultCatType].image}" alt="${emoji[resultCatType]}" class="result-image">`;
    html += `<p>${advice[resultCatType].text}</p>`;

    html += `<button class="restart-button" onclick="restartQuiz()">重新測驗</button>`; // 新增重新測驗按鈕

    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block'; // 顯示結果區塊
}

function restartQuiz() {
    currentQuestionIndex = 0;
    scores = { bee: 0, cloud: 0, tea: 0, ice: 0, wood: 0 }; // 重置所有分數
    quizDiv.style.display = 'block'; // 重新顯示問題區塊
    resultDiv.style.display = 'none'; // 隱藏結果區塊
    showQuestion(); // 顯示第一個問題
}

// 網頁載入後立即顯示第一個問題
document.addEventListener('DOMContentLoaded', showQuestion);
