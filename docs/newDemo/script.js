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
      "filePrefix": "japanese-text-input:-single-multiple-responses",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "Japanese text input: Single \u002F Multiple responses",
    "description": "",
    "repository": "https:\u002F\u002Fgithub.com\u002Fmklab-japan\u002FjapaneseTextInputForLab.js",
    "contributors": "Masanori Kobayashi (Yamagata University)"
  },
  "notes": "共通の入力操作確認の後、選択した入力コンポーネントを実行。元ファイルの著作権・MITライセンス表示はDevice checkのnotesに保持。",
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Sequence",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "DeviceCheckBlock",
      "content": [
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "trial": "deviceCheck"
            }
          ],
          "sample": {
            "mode": "draw-shuffle",
            "n": 1
          },
          "files": {},
          "responses": {},
          "parameters": {
            "convertType": "hiragana",
            "prompt": "キーボードを押すと文字が入力されます。 回答の入力を終えたら，「次ヘ」を押してください。 新しい入力欄が表示されます。",
            "showButton": true,
            "enterEndsTrial": true
          },
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
const ms = Number(this.parameters.phaseDuration);
this.options.timeout = Number.isFinite(ms) && ms > 0 ? ms : null;
}
          },
          "title": "DeviceCheckLoop",
          "notes": "半角入力時にひらがなまたはカタカナを画面に表示するテンプレートです。\n\n・convertType：入力された文字の変換先の指定\n　　hiragana→ひらがな入力\n   　 katakana→カタカナ入力\n・phaseDuration：文字入力段階の制限時間\n・trialDuration：個々の試行の制限時間\n・showButton：次へのボタン表示するかどうか*\n・prompt: 教示**\n・enterEndsTrial: trueでEnterを押すと制限時間前でも当該試行を終了\n\n*「次へ」ボタンを表示させる場合は，個々の試行制限時間が設定してあっても，押すと当該試行は終了\n**手がかり再生などのpromptを変化させたい場合は「template」のチェックを外し,templateパラメータのprompt（このページの下から2番目）を削除し，「Content」にpromptという名前で変数を追加し，そこに手がかりを入れてください。また，デフォルトで1000試行のループになっているので，適宜変更が必要です。\n\n活用例. 30秒の自由再生（30秒経つまでは「次へ」のボタンを押すと新しい入力が可能）\nphaseDuration = 30000\ntrialDuration = Never\nshowButton = true\n\n活用例. 6試行で各試行5秒の制限時間の手がかり再生（手がかりは別途parametersとしてpromptに設定する必要あり。）\nphaseDuration = 30000\nshowButton = false\ntrialDuration = 5000\n\n**************************************************\nJapanseTextInput.json\nCopyright(c) 2020 Masanori Kobayashi\nReleased under the MIT license\n\nMade by lab.js Bulider\n\nUse WanaKana.js \nhttps:\u002F\u002Fwanakana.com\u002F\nCopyright (c) 2013 WaniKani Community Github\nReleased under the MIT license\n**************************************************\n\n改善版: 実際のinput欄とWanaKana.bindを使用。responseに確定回答を記録。試行時間・全体時間は空欄で無制限。元の自由再生設定（最大1000試行・全体30秒）は維持。動作確認は入力操作の確認であり、PC限定判定ではありません。\nキー入力版: input\u002Fcontenteditable不使用。半角英数モードで実施。ローマ字キーを直接収集してかなを表示する。編集は末尾の削除のみ。Ctrl\u002FCmdショートカットや貼り付けは回答へ反映しない。",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.html.Page",
            "items": [
              {
                "required": true,
                "type": "text",
                "title": "キーボード入力テスト",
                "content": "\u003Cp\u003E本実験ではキーボードでのローマ字入力で文字を入力していただきます。実験にあたって，文字入力が可能かどうかの動作確認を行います。\u003C\u002Fp\u003E\n\u003Cp style = \"font-size: 2vh\"\u003Eてすと\u003C\u002Fp\u003E\n\u003Cp\u003E↑に表示された単語をキーボードで入力してください。入力し終えたら，「次へ」をクリックしてください。\u003C\u002Fp\u003E\n\u003Cp style = \"font-size: 1vh\"\u003E日本語入力をONにしなくてもキーボードを押すと文字が入力されます\u003C\u002Fp\u003E"
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cdiv id=\"kana-display\" class=\"alert\" tabindex=\"0\"\n  role=\"group\" aria-label=\"回答表示欄\"\n  style=\"max-width:36rem;margin:1rem auto;min-height:2em;font-size:1.5rem;text-align:center;white-space:pre-wrap;overflow-wrap:anywhere;\"\u003E\u003Cspan id=\"kana-text\"\u003E\u003C\u002Fspan\u003E\u003Cspan id=\"kana-cursor\" aria-hidden=\"true\"\u003E｜\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\n\u003Cp style=\"text-align:left;\"\u003E半角英数モードでローマ字を入力してください。自動でかなを表示します。\u003Cbr\u003EBackspaceやDeleteで末尾の1文字を消すことができます。\u003C\u002Fp\u003E",
                "name": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "${(parameters.showButton === true || parameters.showButton === 'true') ? '\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cbutton type=\"submit\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E' : ''}",
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
              "before:prepare": async function anonymous(
) {
// before:prepareで実行。HTML/CSSファイルへの手動設定を不要にする。
// WanaKana本体はCDNから取得するため、通信は必要。
const kanaAssetKey = '__labKanaAssets402';
if (!document.getElementById('lab-kana-component-style')) {
  const style = document.createElement('style');
  style.id = 'lab-kana-component-style';
  style.textContent = '@keyframes lab-kana-cursor-blink{0%,49%{opacity:1}50%,100%{opacity:0}} #kana-cursor,#recall-cursor{display:inline-block;animation:lab-kana-cursor-blink 1s step-end infinite} #recall-history{font-size:1rem;line-height:1.35} #recall-history li{padding:.1rem 0}';
  document.head.appendChild(style);
}
if (typeof window.wanakana === 'undefined') {
  if (!window[kanaAssetKey]) {
    window[kanaAssetKey] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      let settled = false;
      const finish = error => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.onload = script.onerror = null;
        if (error) {
          script.remove();
          reject(error);
        } else resolve();
      };
      const timer = setTimeout(() => finish(new Error('WanaKanaの読み込みがタイムアウトしました。通信環境を確認してください。')), 15000);
      script.src = 'https://cdn.jsdelivr.net/npm/wanakana@4.0.2/umd/wanakana.min.js';
      script.async = true;
      script.onload = () => finish(typeof window.wanakana === 'undefined' ? new Error('WanaKanaを初期化できませんでした') : null);
      script.onerror = () => finish(new Error('WanaKanaを読み込めません。CDNへの通信を確認してください。'));
      document.head.appendChild(script);
    });
  }
  try {
    await window[kanaAssetKey];
  } catch (error) {
    delete window[kanaAssetKey]; // 次の読み込みでは再試行できるようにする。
    throw error;
  }
}


// before:prepare: 通常のinputやcontenteditableを作らず、キーを直接処理する。
// OSの予測候補を使わせないため、教示では半角英数モードを指定する。
const ms = Number(this.parameters.trialDuration);
this.options.timeout = Number.isFinite(ms) && ms > 0 ? ms : null;
let text = '';
const component = this;
const convert = (value, final = false) => {
  if (typeof wanakana === 'undefined') {
    throw new Error('WanaKanaが読み込まれていません');
  }
  const fn = component.parameters.convertType === 'katakana'
    ? wanakana.toKatakana : wanakana.toHiragana;
  return fn(value, { IMEMode: !final });
};
const paint = () => {
  const display = document.getElementById('kana-text');
  if (display) display.textContent = text;
  // CSSアニメーションを再開し、入力直後はカーソルを見える状態にする。
  const cursor = document.getElementById('kana-cursor');
  if (cursor) {
    cursor.style.animation = 'none';
    void cursor.offsetWidth;
    cursor.style.animation = '';
  }
  component.data.response = text;
};
this._kanaPaint = paint;
this._kanaFinalize = () => {
  text = convert(text, true);
  paint();
  return text;
};
this.options.events = this.options.events || {};
this.options.events.keydown = function(event) {
  // OSやブラウザのショートカットを文字として取り込まない。
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    if (event.isComposing || event.keyCode === 229 || event.repeat) return;
    if (this.parameters.enterEndsTrial === true || this.parameters.enterEndsTrial === 'true') {
      this._kanaFinalize();
      this.end('enter');
    }
    return;
  }
  if (event.key === 'Backspace' || event.key === 'Delete') {
    event.preventDefault();
    // 既に変換されたかなを保持しているので、見えている末尾の1文字を削除する。
    text = Array.from(text).slice(0, -1).join('');
    paint();
    return;
  }
  // IMEの変換途中のキーは収集しない。半角英数モードで回答する。
  if (event.isComposing || event.keyCode === 229) return;
  if (event.key.length !== 1 || !/^[a-zA-Z '\-,.]$/.test(event.key)) return;
  event.preventDefault();
  text = convert(text + event.key.toLowerCase());
  paint();
};
this.data.response = '';

},
              "run": function anonymous(
) {
if (this._kanaPaint) this._kanaPaint();
const display = document.getElementById('kana-display');
if (display) display.focus();
},
              "end": function anonymous(
) {
// end: ボタン・Enter・時間切れのすべてで、末尾nなどを確定して保存する。
const response = this._kanaFinalize ? this._kanaFinalize() : '';
this.data.response = response;
if (this.parameters.trial === 'deviceCheck') {
  this.state.device_check_response = response;
  this.state.device_check_passed = response === 'てすと';
}

},
              "after:end": function anonymous(
) {
delete this._kanaPaint;
delete this._kanaFinalize;
}
            },
            "title": "DeviceCheckInput",
            "tardy": true,
            "notes": "\nこのPageを別studyへコピーして使用できる。CSSは自動追加。WanaKanaはCDNから自動ロードするため通信が必要。ローカルへのライブラリ本体の埋め込みではない。"
          }
        },
        {
          "type": "lab.html.Page",
          "items": [
            {
              "type": "text",
              "title": "動作確認が完了しました！",
              "content": "「次へ」をクリックして次に進んで下さい。"
            },
            {
              "required": true,
              "type": "html",
              "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cbutton type =\"submit\", form=\"page-form\"\u003E次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
              "name": ""
            }
          ],
          "scrollTop": true,
          "submitButtonText": "Continue →",
          "submitButtonPosition": "hidden",
          "files": {},
          "responses": {},
          "parameters": {},
          "messageHandlers": {},
          "title": "pass",
          "skip": "${state.device_check_passed !== true}",
          "tardy": true
        },
        {
          "type": "lab.html.Page",
          "items": [
            {
              "type": "text",
              "title": "動作が確認できませんでした。",
              "content": "お使いのデバイスでは実験を実施できません。ウィンドウを閉じて終了してください。\n\u003Cbr\u003E*パソコンの場合はESCキーを押して，フルスクリーンを解除した後，ウィンドウを閉じてください。"
            }
          ],
          "scrollTop": true,
          "submitButtonText": "Continue →",
          "submitButtonPosition": "hidden",
          "files": {},
          "responses": {},
          "parameters": {},
          "messageHandlers": {},
          "title": "reject",
          "tardy": true,
          "skip": "${state.device_check_passed === true}"
        }
      ]
    },
    {
      "type": "lab.html.Page",
      "title": "FreeRecallWithHistory",
      "tardy": true,
      "scrollTop": true,
      "width": "m",
      "files": {},
      "responses": {},
      "parameters": {
        "phaseDuration": "30000",
        "convertType": "hiragana"
      },
      "submitButtonPosition": "hidden",
      "submitButtonText": "終了",
      "items": [
        {
          "type": "text",
          "title": "テスト",
          "content": "制限時間：${Number(parameters.phaseDuration) \u002F 1000}秒"
        },
        {
          "type": "html",
          "content": "\u003Cp\u003E回答済み：\u003Cspan id=\"recall-count\"\u003E0\u003C\u002Fspan\u003E語\u003C\u002Fp\u003E\n\u003Cdiv id=\"recall-viewport\" tabindex=\"0\" role=\"group\" aria-label=\"回答履歴と入力位置\"\n style=\"max-height:45vh;overflow-y:auto;border:1px solid #aaa;padding:1rem;font-size:1.4rem;overflow-wrap:anywhere;\"\u003E\n \u003Col id=\"recall-history\" style=\"margin:0 0 .5rem;padding-left:2rem;\"\u003E\u003C\u002Fol\u003E\n \u003Cdiv style=\"padding:.5rem;background:#f3f3f3;min-height:2em;white-space:pre-wrap;\"\u003E\u003Cspan id=\"recall-text\"\u003E\u003C\u002Fspan\u003E\u003Cspan id=\"recall-cursor\" aria-hidden=\"true\"\u003E｜\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003Cp style=\"text-align:left;\"\u003EEnterキーまたは以下のボタンを押すと，この回答を確定し、次の行が追加されます。\u003C\u002Fp\u003E\n\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cbutton id=\"recall-save\" type=\"button\"\u003E回答を送信して次を入力する\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E",
          "name": ""
        }
      ],
      "messageHandlers": {
        "before:prepare": async function anonymous(
) {
// before:prepareで実行。HTML/CSSファイルへの手動設定を不要にする。
// WanaKana本体はCDNから取得するため、通信は必要。
const kanaAssetKey = '__labKanaAssets402';
if (!document.getElementById('lab-kana-component-style')) {
  const style = document.createElement('style');
  style.id = 'lab-kana-component-style';
  style.textContent = '@keyframes lab-kana-cursor-blink{0%,49%{opacity:1}50%,100%{opacity:0}} #kana-cursor,#recall-cursor{display:inline-block;animation:lab-kana-cursor-blink 1s step-end infinite} #recall-history{font-size:1rem;line-height:1.35} #recall-history li{padding:.1rem 0}';
  document.head.appendChild(style);
}
if (typeof window.wanakana === 'undefined') {
  if (!window[kanaAssetKey]) {
    window[kanaAssetKey] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      let settled = false;
      const finish = error => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.onload = script.onerror = null;
        if (error) {
          script.remove();
          reject(error);
        } else resolve();
      };
      const timer = setTimeout(() => finish(new Error('WanaKanaの読み込みがタイムアウトしました。通信環境を確認してください。')), 15000);
      script.src = 'https://cdn.jsdelivr.net/npm/wanakana@4.0.2/umd/wanakana.min.js';
      script.async = true;
      script.onload = () => finish(typeof window.wanakana === 'undefined' ? new Error('WanaKanaを初期化できませんでした') : null);
      script.onerror = () => finish(new Error('WanaKanaを読み込めません。CDNへの通信を確認してください。'));
      document.head.appendChild(script);
    });
  }
  try {
    await window[kanaAssetKey];
  } catch (error) {
    delete window[kanaAssetKey]; // 次の読み込みでは再試行できるようにする。
    throw error;
  }
}


// 1つのPageを制限時間いっぱい表示し、Enterごとに回答履歴へ追加する。
// input/contenteditableは使わない。確定後の回答は編集しない。
const duration = Number(this.parameters.phaseDuration);
this.options.timeout = Number.isFinite(duration) && duration > 0 ? duration : null;
const component = this;
let text = '';
const answers = [];
let started;
let ended = false;
const convert = (value, final) => {
  if (typeof wanakana === 'undefined') throw new Error('WanaKanaが読み込まれていません');
  const fn = component.parameters.convertType === 'katakana' ? wanakana.toKatakana : wanakana.toHiragana;
  return fn(value, { IMEMode: !final });
};
const saveData = () => {
  // JSONには各回答の文字列、開始後の確定時刻、確定方法を保存する。
  component.data.responses_json = JSON.stringify(answers);
  component.data.response_count = answers.length;
  component.data.response = answers.map(a => a.response).join('\n');
  component.data.pending_response = text;
};
const paint = () => {
  const display = document.getElementById('recall-text');
  if (display) display.textContent = text;
  const count = document.getElementById('recall-count');
  if (count) count.textContent = String(answers.length);
  const cursor = document.getElementById('recall-cursor');
  if (cursor) {
    cursor.style.animation = 'none';
    void cursor.offsetWidth;
    cursor.style.animation = '';
  }
  saveData();
};
const append = method => {
  if (ended) return;
  const response = convert(text, true).trim();
  if (!response) return; // 空Enterでは行を増やさない。
  answers.push({ response, time_ms: Math.round(performance.now() - started), method });
  const list = document.getElementById('recall-history');
  if (list) {
    const row = document.createElement('li');
    row.textContent = response; // HTMLとして解釈させない。
    list.appendChild(row);
  }
  text = '';
  paint();
  const viewport = document.getElementById('recall-viewport');
  if (viewport) viewport.scrollTop = viewport.scrollHeight;
};
this._recallStart = () => {
  started = performance.now();
  paint();
  const area = document.getElementById('recall-viewport');
  if (area) area.focus();
};
this._recallEnd = () => {
  if (ended) return;
  // 最後に入力中だった単語も保存。Enter済みの回答とはmethodで区別する。
  if (text.trim()) append(component.data.ended_on === 'timeout' ? 'timeout' : 'end');
  ended = true;
  saveData();
};
this.options.events = this.options.events || {};
this.options.events['click #recall-save'] = event => {
  event.preventDefault();
  append('button');
};
this.options.events.keydown = event => {
  if (ended || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    if (event.repeat || event.isComposing || event.keyCode === 229) return;
    append('enter');
    return;
  }
  if (event.key === 'Backspace' || event.key === 'Delete') {
    event.preventDefault();
    text = Array.from(text).slice(0, -1).join('');
    paint();
    return;
  }
  if (event.isComposing || event.keyCode === 229) return;
  if (event.key.length !== 1 || !/^[a-zA-Z '\-,.]$/.test(event.key)) return;
  event.preventDefault();
  text = convert(text + event.key.toLowerCase(), false);
  paint();
};
saveData();

this.data.response_mode = 'multiple';
},
        "run": function anonymous(
) {
this._recallStart();
},
        "end": function anonymous(
) {
if (this._recallEnd) this._recallEnd();
},
        "after:end": function anonymous(
) {
delete this._recallStart;
delete this._recallEnd;
}
      },
      "notes": "phaseDuration: 自由再生テスト全体の制限時間（ミリ秒）。デフォルトは30000ms（30秒）。\nconvertType: hiragana OR katakana→平仮名か片仮名"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "stimulus": "り＿＿？",
          "": ""
        },
        {
          "stimulus": "み＿＿？",
          "": ""
        }
      ],
      "sample": {
        "mode": "draw-shuffle"
      },
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "CueRecall",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "Trial",
        "content": [
          {
            "type": "lab.html.Page",
            "items": [
              {
                "required": true,
                "type": "html",
                "content": "\u003Ch1 class = \"content-horizontal-center\"\u003E${parameters.stimulus || \"\"}\u003C\u002Fh1\u003E",
                "name": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cdiv id=\"kana-display\" class=\"alert\" tabindex=\"0\"\n  role=\"group\" aria-label=\"回答表示欄\"\n  style=\"max-width:36rem;margin:1rem auto;min-height:2em;font-size:1.5rem;text-align:center;white-space:pre-wrap;overflow-wrap:anywhere;\"\u003E\u003Cspan id=\"kana-text\"\u003E\u003C\u002Fspan\u003E\u003Cspan id=\"kana-cursor\" aria-hidden=\"true\"\u003E｜\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\n\u003Cp\u003E${parameters.prompt}\u003C\u002Fp\u003E",
                "name": ""
              },
              {
                "required": true,
                "type": "divider"
              },
              {
                "required": true,
                "type": "html",
                "content": "${(parameters.showButton === true || parameters.showButton === 'true') ? '\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cbutton type=\"submit\"\u003Eこの回答を確定して次へ\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E' : ''}",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "次へ",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {
              "convertType": "hiragana",
              "trialDuration": "10000",
              "enterEndsTrial": true,
              "showButton": true,
              "prompt": "回答を1語入力してください。Enterまたはボタンで確定すると、次へ進みます。"
            },
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
// before:prepareで実行。HTML/CSSファイルへの手動設定を不要にする。
// WanaKana本体はCDNから取得するため、通信は必要。
const kanaAssetKey = '__labKanaAssets402';
if (!document.getElementById('lab-kana-component-style')) {
  const style = document.createElement('style');
  style.id = 'lab-kana-component-style';
  style.textContent = '@keyframes lab-kana-cursor-blink{0%,49%{opacity:1}50%,100%{opacity:0}} #kana-cursor,#recall-cursor{display:inline-block;animation:lab-kana-cursor-blink 1s step-end infinite} #recall-history{font-size:1rem;line-height:1.35} #recall-history li{padding:.1rem 0}';
  document.head.appendChild(style);
}
if (typeof window.wanakana === 'undefined') {
  if (!window[kanaAssetKey]) {
    window[kanaAssetKey] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      let settled = false;
      const finish = error => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.onload = script.onerror = null;
        if (error) {
          script.remove();
          reject(error);
        } else resolve();
      };
      const timer = setTimeout(() => finish(new Error('WanaKanaの読み込みがタイムアウトしました。通信環境を確認してください。')), 15000);
      script.src = 'https://cdn.jsdelivr.net/npm/wanakana@4.0.2/umd/wanakana.min.js';
      script.async = true;
      script.onload = () => finish(typeof window.wanakana === 'undefined' ? new Error('WanaKanaを初期化できませんでした') : null);
      script.onerror = () => finish(new Error('WanaKanaを読み込めません。CDNへの通信を確認してください。'));
      document.head.appendChild(script);
    });
  }
  try {
    await window[kanaAssetKey];
  } catch (error) {
    delete window[kanaAssetKey]; // 次の読み込みでは再試行できるようにする。
    throw error;
  }
}


// before:prepare: 通常のinputやcontenteditableを作らず、キーを直接処理する。
// OSの予測候補を使わせないため、教示では半角英数モードを指定する。
const ms = Number(this.parameters.trialDuration);
this.options.timeout = Number.isFinite(ms) && ms > 0 ? ms : null;
let text = '';
const component = this;
const convert = (value, final = false) => {
  if (typeof wanakana === 'undefined') {
    throw new Error('WanaKanaが読み込まれていません');
  }
  const fn = component.parameters.convertType === 'katakana'
    ? wanakana.toKatakana : wanakana.toHiragana;
  return fn(value, { IMEMode: !final });
};
const paint = () => {
  const display = document.getElementById('kana-text');
  if (display) display.textContent = text;
  // CSSアニメーションを再開し、入力直後はカーソルを見える状態にする。
  const cursor = document.getElementById('kana-cursor');
  if (cursor) {
    cursor.style.animation = 'none';
    void cursor.offsetWidth;
    cursor.style.animation = '';
  }
  component.data.response = text;
};
this._kanaPaint = paint;
this._kanaFinalize = () => {
  text = convert(text, true);
  paint();
  return text;
};
this.options.events = this.options.events || {};
this.options.events.keydown = function(event) {
  // OSやブラウザのショートカットを文字として取り込まない。
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    if (event.isComposing || event.keyCode === 229 || event.repeat) return;
    if (this.parameters.enterEndsTrial === true || this.parameters.enterEndsTrial === 'true') {
      this._kanaFinalize();
      this.end('enter');
    }
    return;
  }
  if (event.key === 'Backspace' || event.key === 'Delete') {
    event.preventDefault();
    // 既に変換されたかなを保持しているので、見えている末尾の1文字を削除する。
    text = Array.from(text).slice(0, -1).join('');
    paint();
    return;
  }
  // IMEの変換途中のキーは収集しない。半角英数モードで回答する。
  if (event.isComposing || event.keyCode === 229) return;
  if (event.key.length !== 1 || !/^[a-zA-Z '\-,.]$/.test(event.key)) return;
  event.preventDefault();
  text = convert(text + event.key.toLowerCase());
  paint();
};
this.data.response = '';

this.data.response_mode = 'single';
},
              "run": function anonymous(
) {
if (this._kanaPaint) this._kanaPaint();
const display = document.getElementById('kana-display');
if (display) display.focus();
},
              "end": function anonymous(
) {
// end: ボタン・Enter・時間切れのすべてで、末尾nなどを確定して保存する。
const response = this._kanaFinalize ? this._kanaFinalize() : '';
this.data.response = response;
if (this.parameters.trial === 'deviceCheck') {
  this.state.device_check_response = response;
  this.state.device_check_passed = response === 'てすと';
}

},
              "after:end": function anonymous(
) {
delete this._kanaPaint;
delete this._kanaFinalize;
}
            },
            "title": "CuedRecallSingleResponse",
            "tardy": true,
            "notes": "convertType: hiragana OR katakana→平仮名か片仮名\ntrialDuration: 1試行の制限時間（ミリ秒）。空欄または0は無制限\nconvertType: hiragana \u002F katakana。\nenterEndsTrial: Enterによる確定を許可するか\nshowButton: 確定ボタンを表示するか。\nprompt: 教示。\n\n手がかりはthis.parameters.stimulusのLoopパラメータとして定義してください。"
          }
        ]
      }
    }
  ]
})

// Let's go!
study.run()