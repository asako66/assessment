"user strict";
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
 function removeAllChildren(element){
   while(element.firstChild){//子供の要素が有る限り削除
     element.removeChild(element.firstChild);
   }
 }

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0){//名前がからの時、処理を終了する
    return;
  }
  console.log(userName);
  // //TODO 診断結果エリアの作成
  // while (resultDivided.firstChild) {
    // resultDivided.removeChild(resultDivided.firstChild);
  // }
  removeAllChildren(resultDivided);
  removeAllChildren(tweetDivided);

  const header = document.createElement("h3");
  header.innerText = "診断結果";
  resultDivided.appendChild(header);

  const paragragh = document.createElement("p");
  const result = assessment(userName);
  paragragh.innerText = result;
  resultDivided.appendChild(paragragh);

  // //TODO ツイートエリアの作成
  const anchor = document.createElement("a");
  const hrefValue = "https://twitter.com/intent/tweet?button_hashtag="+encodeURIComponent("あなたのいいところ")+"&ref_src=twsrc%5Etfw"

  anchor.setAttribute("href",hrefValue);
  anchor.className = "twitter-hashtag-button";
  anchor.setAttribute("data-text",result);
  anchor.innerText = "Tweet #あなたのいいところ";

  tweetDivided.appendChild(anchor);

  // widgets.jsの設定
  const script = document.createElement("script");
  script.setAttribute("src","https://platform.twitter.com/widgets.js");
  tweetDivided.appendChild(script);
}

userNameInput.onkeydown = (event) => {
  if (event.key === "Enter"){
    // //TODOボタンのonclick()処理を呼び出す
    assessmentButton.onclick();
  }
}
const answers = [
  "{userName}のいいところは声です。{userName}の特徴的な声はみんなを惹きつけ、心に残ります。",
  "{userName}のいいところはまなざしです。{userName}に見つめられた人は気になってしょうがないでしょう。",
  "{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。",
  "{userName}のいいところは厳しさです。{userName}の厳しさがいつも物事を成功に導きます。",
  "{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。",
  "{userName}のいいところはユニークさです。{userName}だけのその特徴がみんなを楽しくさせます。",
  "{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。",
  "{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を引かれます。",
  "{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。",
  "{userName}のいいところは思いやりです。{userName}にきにかけてもらった多くの人が感謝しています。",
  "{userName}のいいところは感受性です。{userName}が感じたことにみんなが共感し、わかり合うことができます。",
  "{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。",
  "{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。",
  "{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。",
  "{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。",
　"{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。",
 　"{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。"
]

/**
 *名前の文字列を渡すと診断結果を返す関数
 *@param  {string} userName ユーザーの名前
 *@return {string} 診断結果
 */
function assessment(userName){
  // //TODO　診段処理を実装する
  // 全文字のコードを番号を取得して足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length;i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(1);
  }
  // 文字コードの合計を回答の数で割って添字の数値を決める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  // //TODO　{userName}をユーザーの名前に置き換える
  result = result.replace(/\{userName}/g,userName);
  return result;
}

// console.log(assessment("太郎"));
// console.log(assessment("tarou"));
// console.log(assessment("太郎"));

console.assert(
  assessment("太郎") === "太郎のいいところは好奇心です。新しいことに向かっていく太郎の心構えが多くの人に魅力的に映ります。",
  "診断結果の文言が正しく有りません。"
)
console.assert(
  assessment("太郎") === assessment("太郎"),
  "入力する名前が同じなら診断結果も同じであるべきです"
)
