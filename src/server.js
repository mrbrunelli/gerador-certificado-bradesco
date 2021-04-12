const express = require("express");
const path = require("path");
const { generateQrcode, generateAuthCod } = require("./services");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.get("*", (req, res) => {
  return res.render("error");
});

app.post("/pdf", async (req, res) => {
  if (!req.body) {
    return res.render("error");
  }
  const { name, course, hours, initialDate, finalDate } = req.body;
  const authCode = generateAuthCod();
  const qrcode = await generateQrcode(authCode);
  //value.replace(/( )+/g, "_");
  const date = [
    new Date(initialDate).toLocaleDateString().replace(/\//g, "."), 
    new Date(finalDate).toLocaleDateString().replace(/\//g, ".")
  ];
  return res.render(
    "pdf",
    {
      data: {
        qrcode,
        authCode,
        name,
        course,
        hours,
        date,
      },
    },
  );
});

app.listen(3000);
