# NumberAma API

A simple API trivia facts on numbers. Great for learning and fun.

## Usage

1. Clone the repo
2. Install dependencies with `pnpm install`
3. Copy the `.example.env` file to `.env` and fill/change the values if needed
4. Run `pnpm dev` or `pnpm start` to start the backend app server
5. Open `http://localhost:8888/docs` to see the API docs
6. Use the API with the example(s) in the docs or see below

## Example

Calling the API with a number like 42

```bash
curl -s "https://api.numberama.dev/api/trivia/42" \
-H "Content-Type: application/json" | jq
```

will return something like

```json
  {
    "text": "The number 42 is the answer to the question Life, the Universe and Everything",
    "number": 42,
    "found": true,
    "type": "trivia"
  }
```

PS: `/api/:num` is a shorthand for `/api/trivia/:num`

You can also just go to `http://localhost:8888/api/42` on the browser to get the same result in the above example.



