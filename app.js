const articles = {
  hakodate: `
    <article class="article-inner">
      <p class="eyebrow">DATA 001 / HAKODATE TURF 1200m</p>
      <h2>函館芝1200m<br>3歳馬の勝ち上がり分析</h2>
      <p>2017〜2025年の函館芝1200m、3歳以上1勝クラスを対象に、3歳馬455走を分析しました。</p>
      <h3>初勝利時期別の成績</h3>
      <div class="article-table-wrap">
        <table>
          <thead><tr><th>初勝利時期</th><th>出走</th><th>勝率</th><th>連対率</th><th>複勝率</th></tr></thead>
          <tbody>
            <tr><td>2歳時</td><td>212</td><td>8.96%</td><td>17.92%</td><td>24.06%</td></tr>
            <tr><td>3歳1〜3月</td><td>98</td><td>19.39%</td><td>29.59%</td><td>41.84%</td></tr>
            <tr><td>3歳4月以降</td><td>99</td><td>13.13%</td><td>22.22%</td><td>36.36%</td></tr>
          </tbody>
        </table>
      </div>
      <div class="article-callout"><strong>結論：</strong>3歳春の勝ち上がり馬は、2歳時の勝ち上がり馬より好成績。遅い勝利を一律に低レベルとは評価できません。</div>
      <h3>函館までのキャリア数</h3>
      <div class="article-table-wrap">
        <table>
          <thead><tr><th>函館前の出走数</th><th>頭数</th><th>勝率</th><th>複勝率</th></tr></thead>
          <tbody>
            <tr><td>0〜2戦</td><td>15</td><td>20.00%</td><td>46.67%</td></tr>
            <tr><td>3〜5戦</td><td>130</td><td>13.08%</td><td>25.38%</td></tr>
            <tr><td>6〜8戦</td><td>118</td><td>9.32%</td><td>30.51%</td></tr>
            <tr><td>9戦以上</td><td>53</td><td>7.55%</td><td>28.30%</td></tr>
          </tbody>
        </table>
      </div>
      <h3>実戦での見方</h3>
      <ol>
        <li>3歳1〜3月に4戦以内で勝った馬は強く評価。</li>
        <li>3歳4月以降でも、芝短距離で勝ち上がって30日以内なら評価。</li>
        <li>総出走数だけで多走馬を消さず、勝利距離と勝利からの日数を合わせて見る。</li>
      </ol>
      <p>注意：0〜2戦は15頭と少数です。数字は傾向として利用し、個々の適性や状態と組み合わせてください。</p>
    </article>
  `,
  allowance: `
    <article class="article-inner">
      <p class="eyebrow">DATA 002 / AGE ALLOWANCE −3kg</p>
      <h2>3歳馬の3kg減<br>芝・ダート比較</h2>
      <p>2016〜2025年の古馬混合戦から、3歳馬の年齢アローワンスがちょうど3kgとなるレースだけを抽出しました。</p>
      <h3>芝・ダート別成績</h3>
      <div class="article-table-wrap">
        <table>
          <thead><tr><th>馬場</th><th>3歳出走</th><th>勝率</th><th>連対率</th><th>複勝率</th><th>単勝回収率</th></tr></thead>
          <tbody>
            <tr><td>芝</td><td>9,454</td><td>12.11%</td><td>21.58%</td><td>30.74%</td><td>73.69%</td></tr>
            <tr><td>ダート</td><td>8,869</td><td>11.13%</td><td>20.32%</td><td>28.70%</td><td>83.11%</td></tr>
          </tbody>
        </table>
      </div>
      <div class="article-callout"><strong>結論：</strong>的中率は芝が少し上。単勝回収率はダートが上。ただし両方とも、同じレースの4歳以上馬より大幅に高成績です。</div>
      <h3>集計上の重要事項</h3>
      <p>3歳馬の減量幅は、月だけではなく距離とオープン・非オープンで異なります。本分析は各年の規定に合わせ、1kg・2kg減のレースを混ぜていません。</p>
      <p>古馬混合戦へ出走する3歳馬は世代内で選抜された馬でもあるため、成績差のすべてを斤量だけの効果とは扱いません。</p>
    </article>
  `,
};

const searchInput = document.querySelector("#search-input");
const surfaceFilter = document.querySelector("#surface-filter");
const classFilter = document.querySelector("#class-filter");
const clearFilters = document.querySelector("#clear-filters");
const cards = [...document.querySelectorAll(".data-card")];
const resultCount = document.querySelector("#result-count");
const emptyMessage = document.querySelector("#empty-message");
const dialog = document.querySelector("#article-dialog");
const articleContent = document.querySelector("#article-content");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");

function updateCards() {
  const query = searchInput.value.trim().toLowerCase();
  const surface = surfaceFilter.value;
  const raceClass = classFilter.value;
  let visible = 0;

  cards.forEach((card) => {
    const matchesSearch = !query || card.dataset.search.toLowerCase().includes(query);
    const matchesSurface =
      surface === "all" ||
      card.dataset.surface === surface ||
      card.dataset.surface === "芝・ダート";
    const matchesClass =
      raceClass === "all" ||
      card.dataset.class === raceClass ||
      card.dataset.class === "全クラス";
    const show = matchesSearch && matchesSurface && matchesClass;
    card.hidden = !show;
    if (show) visible += 1;
  });

  resultCount.textContent = `${visible}件のデータを表示しています`;
  emptyMessage.hidden = visible !== 0;
}

[searchInput, surfaceFilter, classFilter].forEach((control) => {
  control.addEventListener("input", updateCards);
});

clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  surfaceFilter.value = "all";
  classFilter.value = "all";
  updateCards();
  searchInput.focus();
});

document.querySelectorAll(".article-open").forEach((button) => {
  button.addEventListener("click", () => {
    articleContent.innerHTML = articles[button.dataset.article];
    dialog.showModal();
    dialog.scrollTop = 0;
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

updateCards();
