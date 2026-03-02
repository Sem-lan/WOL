const express = require("express");
const wol = require("wakeonlan");

const app = express();
const PORT = 3000;

// Replace with your own simple secret check
const SECRET = "1234";

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Wake PC</title>
      </head>
      <body>
        <h2>Wake Target PC</h2>
        <form method="POST" action="/wake">
          <input type="password" name="password" placeholder="Enter password" required />
          <button type="submit">Wake Computer</button>
        </form>
      </body>
    </html>
  `);
});

app.post("/wake", (req, res) => {
  if (req.body.password !== SECRET) {
    return res.status(403).send("Unauthorized");
  }

  wol.wake("FC:34:97:B7:1B:CC", function(error) {
    if (error) {
      console.error(error);
      return res.send("Failed to send WOL packet.");
    } else {
      return res.send("Magic packet sent successfully.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
