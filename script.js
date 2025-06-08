 <script>
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
      bee: "你非常自律，適合目標導向式規劃！建議你使用行事曆做詳細排程。",
      cloud: "你喜歡自由彈性，可以嘗試設定每日重點目標，保持彈性又有方向！",
      tea: "你充滿熱情但容易分心，可以利用「5 分鐘啟動法」來啟動行動力。",
      ice: "你可能常常拖延，建議建立微習慣，例如每天寫下一件想做的事。",
      wood: "你可能對時間管理較沒自信，建議從簡單的每日提醒開始建立信心。"
    };

    let scores = {bee:0, cloud:0, tea:0, ice:0, wood:0};
    let current = 0;

    const quizDiv = document.getElementById("quiz");
    const resultDiv = document.getElementById("result");

    function showQuestion() {
      const [question, options] = quizData[current];
      let html = `<div class="question">
          <div class="question-header">  <h2>${question}</h2>
            <img src="gif貓貓走路.gif" alt="題目示意動畫" class="question-gif"> </div>
      `;
      options.forEach((opt, index) => {
        html += `<button class="option" onclick="selectAnswer(${index})">${opt[0]}</button>`;
      });
      html += `</div>`;
      quizDiv.innerHTML = html;
    }

    function selectAnswer(index) {
      const selected = quizData[current][1][index][1];
      selected.forEach(cat => scores[cat]++);
      current++;
      if (current < quizData.length) {
        showQuestion();
      } else {
        showResult();
      }
    }

    function showResult() {
      let max = Math.max(...Object.values(scores));
      let topCats = Object.keys(scores).filter(cat => scores[cat] === max);
      let html = `<h2>你最像的貓貓是：</h2>`;
      topCats.forEach(cat => {
        html += `<h3>${emoji[cat]}</h3><img src="${cat}.png" alt="${emoji[cat]}"><p>${advice[cat]}</p>`;
      });
      quizDiv.innerHTML = "";
      resultDiv.innerHTML = html;
    }

    showQuestion();
  </script>
