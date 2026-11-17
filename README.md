[![DOI](https://zenodo.org/badge/261060164.svg)](https://zenodo.org/badge/latestdoi/261060164)

# Japanese Text Input for lab.js

半角英数モードで入力したローマ字を、ひらがなまたはカタカナに変換して表示する、lab.js用のテンプレートです。OSの日本語入力の予測変換を介さずにテキスト回答を取得できるため、記憶の再生課題などの心理学実験・調査に利用できます。

[jsPsych版はこちら](https://github.com/mklab-japan/japaneseTextInputForJsPsych)

## 新版

`japanese-text-input-new.json` には、手がかり再生などに使う **Single response** と、自由再生などに使う **Multiple responses** が含まれています。どちらも `convertType` で `hiragana`（ひらがな）または `katakana`（カタカナ）を指定できます。

### 使用方法

1. `japanese-text-input-new.json` をダウンロードし、[lab.js Builder](https://lab.js.org/) の **Open** で開きます。プレビューでは、入力確認（「てすと」）→ 自由再生 → 手がかり再生の順に試せます。
2. 既存の実験に組み込む場合は、Builderの **Import** で新版を取り込み、必要なコンポーネントを使います。実験前に入力を確認したい場合は、`DeviceCheckBlock` も組み込んでください。

WanaKanaの読み込みと点滅カーソルのスタイルは、各入力コンポーネントのScriptsで設定します。取り込み先の `index.html` や `style.css` を編集する必要はありません。WanaKanaはCDNから読み込むため、実行時にインターネット接続が必要です。

### Single response（1試行1回答）

`CuedRecallSingleResponse` は、1回の画面表示につき1件の回答を受け付けます。同梱例では、Enterまたは確定ボタンで次の試行に進みます。時間切れの場合は、その時点の入力を保存します。回答は `response` に記録されます。

| パラメータ | 設定内容 |
| --- | --- |
| `stimulus` | 手がかり。試行ごとに変える場合は、外側のLoopの刺激表に `stimulus` 列を作ります。 |
| `trialDuration` | 1試行の制限時間（ミリ秒）。同梱例は `10000`（10秒）です。 |
| `enterEndsTrial` | Enterで回答を確定し、試行を終了できるかどうか。 |
| `showButton` | 確定ボタンを表示するかどうか。 |
| `prompt` | 画面に表示する教示。 |

### Multiple responses（1画面で複数回答）

`FreeRecallWithHistory` は、制限時間内に同じ画面で複数の回答を受け付けます。1語ごとにEnterまたは確定ボタンを押すと、回答が履歴に残り、その下で次の語を入力できます。入力中の語はBackspaceまたはDeleteで末尾から修正できます。確定済みの回答は閲覧専用です。

- `phaseDuration` に、回答フェーズ全体の制限時間をミリ秒単位の正の値で指定します。同梱例は `30000`（30秒）です。
- `response` には全回答が改行区切りで記録されます。`responses_json` には、各回答の内容、画面開始からの確定時刻、確定方法が記録されます。
- 時間切れ時に入力中だった語も保存されます。この回答は、`responses_json` の `method` が `timeout` になります。

### 新版のデモ

新版のデモは、動作チェック，手がかり再生（Single response），自由再生（Multiple response）が含まれています。[新版のデモを開く](https://mklab-japan.github.io/japaneseTextInputForLab.js/newDemo/)

## 旧版

### 使用方法

`japaneseTextInputForLab.js.json` を [lab.js Builder](https://lab.js.org/) の **Open** で開きます。旧版では `index.html` でWanaKanaを読み込むため、このファイルを開いてから、必要な課題を **Import** してください。

ウィンドウからフォーカスが外れて入力できなくなった場合は、ページを再読み込みしてください。旧版はフルスクリーンでの利用を推奨します。

### テンプレートの設定

| パラメータ | 設定内容 |
| --- | --- |
| `convertType` | 変換先。`hiragana` はひらがな、`katakana` はカタカナです。 |
| `phaseDuration` | 文字入力段階全体の制限時間（ミリ秒）。 |
| `trialDuration` | 個々の試行の制限時間（ミリ秒）。 |
| `showButton` | 「次へ」ボタンを表示するかどうか。ボタンを押すと、試行の制限時間前でも次に進みます。 |
| `prompt` | 画面に表示する教示。 |
| `enterEndsTrial` | `true` にすると、Enterで制限時間前に試行を終了できます。既定値は `false` です。 |

`prompt` で試行ごとに異なる手がかりを表示する場合は、Loopの「template」のチェックを外し、既存の `prompt` パラメータを削除します。そのうえで、「Content」の刺激表に `prompt` 列を作り、各試行の手がかりを入力してください。既定のLoopは1000試行なので、課題に合わせて試行数も変更してください。

### 活用例

| 設定 | 30秒の自由再生 | 各試行5秒の手がかり再生（6試行） |
| --- | --- | --- |
| `phaseDuration` | `30000` | `30000` |
| `trialDuration` | `Never` | `5000` |
| `showButton` | `true` | `false` |
| `enterEndsTrial` | `true` | `false` |

自由再生では、30秒が経過するまで「次へ」またはEnterで新しい入力欄に進めます。手がかり再生では、各試行の手がかりを `prompt` に設定します。

### 入力確認画面つきの旧版

`japaneseTextInputForLabWithDeviceCheck.js.json` には、実験の開始前にローマ字で入力できるかを確認する画面が付属しています。

### 旧版のデモ

旧版のデモは、上記の「30秒の自由再生」と同じ設定です。30秒が経過すると終了し、データが出力されます。[旧版のデモを開く](https://mklab-japan.github.io/japaneseTextInputForLab.js/oldDemo/)

## 使用ライブラリ

ローマ字からひらがな・カタカナへの変換には [WanaKana.js](https://wanakana.com/) を使用しています。

## 引用

本テンプレートを利用した研究を発表する際は、以下の論文を引用してください。

小林 正法（2021）．再生テストに基づく記憶現象のオンライン実験による再現 心理学研究, 92, 463-472.
