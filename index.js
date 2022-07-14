const express = require("express");
const fileupload = require("express-fileupload");
const pdfparse = require("pdf-parse");
const Tesseract = require ("tesseract.js");
const { createWorker } = require('tesseract.js');
const worker = createWorker();

const app = express();

app.use("/", express.static("public"));
app.use(fileupload({}));

//upload pdf file
app.post("/extract-text", (req, res) =>{
    if (!req.files && !req.files.pdfFile){
        res.status(400);
        res.end();
    }

    pdfparse(req.files.pdfFile).then(result => {
        res.send(result.text);
    });
});

//upload ocr file
app.post("/ocr-text", (req, res) =>{
    if (!req.files && !req.files.ocrText){
        res.status(400);
        res.end();
    }

    Tesseract.recognize(req.files.ocrText,'eng',
        { logger: m => console.log(m) }
    ).then(result => {
        res.send(result.text);
    });
});

//service
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Usando a porta: ${PORT}`));