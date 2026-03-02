const express = require("express");
const wol = require("wakeonlan");

const app = express();
const PORT = 3000;

// CHANGE THIS
const SECRET = "1234";

// Target MAC
const TARGET_MAC = "FC:34:97:B7:1B:CC";

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Wake PC</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #111;
            color: white;
            text-align: center;
            margin-top: 100px;
          }
          input, button {
            padding: 10px;
            margin: 10px;
            font-size: 16px;
          }
          button {
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>Wake Target Computer</h1>
        <form method="POST" action="/wake">
          <input type="password" name="password" placeholder="Enter password" required />
          <br/>
          <button type="submit">Wake</button>
        </form>
      </body>
    </html>
  `);
});

app.post("/wake", async (req, res) => {
  if (req.body.password !== SECRET) {
    return res.status(403).send("Unauthorized");
  }

  try {
    await wol(TARGET_MAC, {
      address: "255.255.255.255",
      port: 9
    });

    console.log("Magic packet sent.");
    res.send("Magic packet sent successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send WOL packet.");
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://<phone-ip>:${PORT}`);
});
