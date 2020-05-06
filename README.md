[![DOI](https://zenodo.org/badge/261060164.svg)](https://zenodo.org/badge/latestdoi/261060164)
# Japanese text input for lab.js
lab.jsを用いて，半角入力時にひらがなまたはカタカナを画面に表示するテンプレートです（注：ローマ字入力限定）。心理学実験・調査を行う際に活用してください。    
（jsPsych版：https://github.com/mklab-japan/japaneseTextInputForJsPsych)

## 特徴
半角入力によってひらがな/カタカナを入力するため，推測変換無効にした上でテキスト入力での反応取得が可能です。記憶の再生課題などで，推測変換の影響をなくした状況で実験を行いたい場合に有用です。

## 使用方法
japaneseTextInputForLab.js.jsonを，lab.js Bulider (https://lab.js.org/) で読み込んでください。テンプレートのパラメータを設定することで，色々な実験で用いることができます。

### テンプレートの設定
 * convertType：入力された文字の変換先の指定（hiragana→ひらがな入力; katakana→カタカナ入力）
 * phaseDuration：文字入力段階の制限時間
 * trialDuration：個々の試行の制限時間
 * showButton：「次へ」のボタンを表示するかどうか(a)
 * prompt: 教示(b)


a.「次へ」ボタンを表示させる場合は，個々の試行制限時間が設定してあっても，押すと当該試行は終了    
b.手がかり再生などでpromptに試行ごとに変化する刺激（手がかりなど）を表示したい場合などは「template」のチェックを外し,templateパラメータのprompt（このページの下から2番目）を削除し，「Content」にpromptという名前で変数を追加し，そこに手がかりを入れてください。また，デフォルトで1000試行のループになっているので，適宜変更が必要です。

### 活用例
1. 30秒の自由再生（30秒経つまでは「次へ」のボタンを押すと新しい入力が可能）
 * phaseDuration = 30000
 * trialDuration = Never
 * showButton = true

2. 活用例. 6試行で各試行5秒の制限時間の手がかり再生（手がかりは別途parametersとしてpromptに設定する必要あり。）
 * phaseDuration = 30000
 * showButton = false
 * trialDuration = 5000

## 使用ライブラリ
ひらがな/カタカナ入力用のライブラリとしてWanaKana.jsを利用しています。    
https://wanakana.com/

## デモ
https://mklab-japan.github.io/japaneseTextInputForLab.js/    
デモは活用例1と同じ設定です。30秒経つと終了し,データが出力されます。

### 引用時の表記
Masanori Kobayashi (2020). Japanese text input for lab.js. doi: [10.5281/zenodo.3783884](https://doi.org/10.5281/zenodo.3783884)
