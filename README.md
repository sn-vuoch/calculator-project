# Calculator App

A browser calculator built with HTML, CSS, and vanilla JavaScript. It evaluates **one pair of numbers at a time** (for example `12 + 3 = 15`). To keep going, use the result as the next first number: `15 + 4 = 19`.

This is intentional. The app does **not** chain `12 + 3 + 4` in one expression, and it does **not** apply operator precedence (`12 + 3 × 2` is not computed as `18`). You press `=` after each pair.

## Features

- Addition, subtraction, multiplication, and division
- Decimal numbers
- Divide by zero shows `ERROR`
- Results rounded to 6 decimal places (so `0.1 + 0.2` is `0.3`)
- Two-line display: the expression on top, the current number / answer below
- Mouse and keyboard input
- Clear, Delete / Backspace
- Continue from a result (`12 + 3 =` then `+ 4 =` → `19`)
- Swap the operator before the second number (`12 +` then `-` becomes `12 -`)

## How to run

No build step. Open the files in a browser:

1. Put `index.html`, `style.css`, and `script.js` in the same folder.
2. Open `index.html` (double-click, or “Open with Live Server” in your editor).

That is all. The script is loaded with `defer`, so the DOM is ready before any listeners run.

## How to use

### On-screen buttons

| Control | What it does |
|---|---|
| `0`–`9` | Enter a number |
| `.` | Decimal point (one per number) |
| `+` `-` `×` `÷` | Choose an operation |
| `=` | Compute the current pair |
| `Delete` | Remove the last character |
| `Clear` | Reset everything |

### Keyboard

| Key | Same as |
|---|---|
| `0`–`9` | digits |
| `.` | decimal |
| `+` `-` | add / subtract |
| `*` `/` | multiply / divide (`×` / `÷`) |
| `Enter` or `=` | equals |
| `Backspace` | Delete |
| `Escape` | Clear |

### Typical flow

1. Type the first number (`12`).
2. Press an operator (`+`).
3. Type the second number (`3`).
4. Press `=`. The display shows `12+3=` and `15`.
5. To reuse `15`, press an operator and a new number (`+` `4` `=` → `19`).
6. To start over, type a new digit (or press Clear).

## Project structure

```text
.
├── index.html   # markup and button layout
├── style.css    # layout and typography
├── script.js    # calculator logic and events
└── README.md    # this file
```

### `script.js` in short

| Piece | Role |
|---|---|
| `add` `subtract` `multiply` `divide` | The four operations |
| `operate(operator, num1, num2)` | Picks the right function (`÷` by 0 returns `"ERROR"`) |
| `addOperator` | Appends an operator, or replaces the last one |
| `deleteCharacter` | Backspace on both display lines |
| `resetState` | Clears `firstNumber`, `secondNumber`, and `operator` |
| Left-container click | Digits, `.`, and Clear |
| Right-container click | Operators, Delete, and `=` |
| `keydown` | Same behavior from the keyboard |

State is four values: `firstNumber`, `secondNumber`, `operator`, and `answer`.

## Design notes

- **One pair at a time.** A second operator is ignored until you press `=`. That avoids mixed-precedence mistakes such as treating `12 + 3 × 2` as `30`.
- **Floats.** The raw JS result is shown with `parseFloat(value.toFixed(6))` so tiny binary errors are less visible.
- **Fonts.** [Montserrat](https://fonts.google.com/specimen/Montserrat) from Google Fonts.

## License

Personal / learning project. Use and modify as you like.
