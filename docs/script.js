// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "japanesetextinput",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "JapaneseTextInput",
    "description": "",
    "repository": "",
    "contributors": "Masanori Kobayashi (Yamagata University)"
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "trial": "textInput",
          "": ""
        }
      ],
      "sample": {
        "mode": "draw-shuffle",
        "n": "1000"
      },
      "files": {},
      "responses": {},
      "parameters": {
        "convertType": "hiragana",
        "phaseDuration": "30000",
        "trialDuration": "Never",
        "prompt": "キーボードを押すと文字が入力されます。 回答の入力を終えたら，「次ヘ」を押してください。 新しい入力欄が表示されます。",
        "showButton": true
      },
      "messageHandlers": {},
      "title": "JapaneseTextInput",
      "timeout": "${this.parameters.phaseDuration}",
      "notes": "半角入力時にひらがなまたはカタカナを画面に表示するテンプレートです。\n\n・convertType：入力された文字の変換先の指定\n　　hiragana→ひらがな入力\n   　 katakana→カタカナ入力\n・phaseDuration：文字入力段階の制限時間\n・trialDuration：個々の試行の制限時間\n・showButton：次へのボタン表示するかどうか*\n・prompt: 教示**\n\n*「次へ」ボタンを表示させる場合は，個々の試行制限時間が設定してあっても，押すと当該試行は終了\n**手がかり再生などのpromptを変化させたい場合は「template」のチェックを外し,templateパラメータのprompt（このページの下から2番目）を削除し，「Content」にpromptという名前で変数を追加し，そこに手がかりを入れてください。また，デフォルトで1000試行のループになっているので，適宜変更が必要です。\n\n活用例. 30秒の自由再生（30秒経つまでは「次へ」のボタンを押すと新しい入力が可能）\nphaseDuration = 30000\ntrialDuration = Never\nshowButton = true\n\n活用例. 6試行で各試行5秒の制限時間の手がかり再生（手がかりは別途parametersとしてpromptに設定する必要あり。）\nphaseDuration = 30000\nshowButton = false\ntrialDuration = 5000\n\n**************************************************\nJapanseTextInput.json\nCopyright(c) 2020 Masanori Kobayashi\nReleased under the MIT license\n\nMade by lab.js Builder\nhttps:\u002F\u002Flab.js.org\u002F\n\nInclude WanaKana.js \nhttps:\u002F\u002Fwanakana.com\u002F\nCopyright (c) 2013 WaniKani Community Github\nReleased under the MIT license\n**************************************************",
      "shuffleGroups": [],
      "template": {
        "type": "lab.html.Page",
        "items": [
          {
            "required": true,
            "type": "text",
            "title": "",
            "content": "${this.parameters.prompt}"
          },
          {
            "required": true,
            "type": "html",
            "content": "\u003Cdiv class=\"w-m alert content-horizontal-center\"\u003E\u003Cspan style = \"animation: blink 0.5s linear infinite alternate;\" id=\"inputWindow\"\u003E|\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
            "name": ""
          },
          {
            "required": true,
            "type": "divider"
          },
          {
            "required": true,
            "type": "html",
            "content": "${this.parameters.showButton? '\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cbutton type =\"submit\", form=\"page-form\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E' : ''}",
            "name": ""
          }
        ],
        "scrollTop": true,
        "submitButtonText": "次へ",
        "submitButtonPosition": "hidden",
        "files": {},
        "responses": {},
        "parameters": {},
        "messageHandlers": {
          "before:prepare": function anonymous(
) {
let inputArray =[]
let text;

//初期カーソルの点滅用のCSSを追加
const css = document.createElement('style')
css.media = 'screen'
css.type = 'text/css'

const cssKeyframes ='@keyframes blink{ 0% {opacity: 0} 100% {opacity: 1.0}}';
const rules = document.createTextNode(cssKeyframes)
css.appendChild(rules)

document.getElementsByTagName('head')[0].appendChild(css);

//キー入力時
this.options.events['keydown'] = function(e) {
  //点滅をやめる
  if(inputArray.length <= 0)
  {
    document.getElementById('inputWindow').style = ' ';
  }
  //削除時
  if(e.key == 'Backspace' || e.key == 'Delete'){
      //1文字のみの時はカーソルを表示
      if(inputArray.length == 1)
      {
        inputArray =['|']
        document.getElementById('inputWindow').style = 'animation: blink 0.5s linear infinite alternate;';
      }
      else{
        inputArray.pop();
      }
  }

  //押されたキーが1文字の時
  else if(e.key.length == 1){
    //最後まで消していた場合
    if(inputArray[0] == '|')
    {
      inputArray.pop()
      document.getElementById('inputWindow').style = ' ';
    }
    inputArray.push(e.key);
  }
  //配列を1つにまとめる
  convertText = inputArray.join('');

  //アルファベットをひらがな/カタカナに変換
  if(this.parameters.convertType == 'katakana')
  {
    convertText = wanakana.toKatakana(convertText, {customKanaMapping: { n: 'n', nn: 'ン'}});
  }
  else if(this.parameters.convertType == 'hiragana')
  {
    convertText = wanakana.toHiragana(convertText, {customKanaMapping: { n: 'n', nn: 'ん'}});
  }
  //変換したテキストを表示
  document.getElementById('inputWindow').textContent = convertText;
  //変換したテキストを反応として保存
  this.data.response = convertText;
}
}
        },
        "title": "inputWindow",
        "timeout": "${this.parameters.trialDuration}"
      }
    }
  ]
})

// Let's go!
study.run()