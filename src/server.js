const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer");
const { generateQrcode, generateAuthCod, isEmpty } = require("./services");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.get("/pdf", async (req, res) => {
  if (isEmpty(req.query)) {
    return res.render("error");
  }
  const { authCode } = req.query;
  const baseURL = req.protocol + "://" + req.headers.host + "/";
  const url = new URL(req.url, baseURL);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(baseURL + "preview" + url.search, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({
    printBackground: true,
    format: "A4",
    displayHeaderFooter: true,
    footerTemplate: `<span style='font-size: 8px; margin-left: 20px;'>https://lms.ev.org.br/mpls/Web/Lms/Student/PrintCertificateDialog.aspx?${authCode}</span>`,
    margin: {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50
    }
  });
  await browser.close();
  res.contentType("application/pdf");
  return res.send(pdf);
});

app.get("/preview", async (req, res) => {
  if (isEmpty(req.query)) {
    return res.render("error");
  }
  const { name, course, hours, initialDate, finalDate } = req.query;
  const authCode = generateAuthCod();
  const qrcode = await generateQrcode(authCode);
  const date = [
    new Date(initialDate).toLocaleDateString().replace(/\//g, "."),
    new Date(finalDate).toLocaleDateString().replace(/\//g, "."),
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

app.get("*", (req, res) => {
  return res.render("error");
});

app.listen(3000);
