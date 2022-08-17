const cors = require('cors');
const { response } = require('express');
const express = require('express')
const fileupload = require("express-fileupload")
const pdfparse = require('pdf-parse')
const app = express();

const url = "http://localhost:8080/peticoes"
//BKP "https://triagemhomol.jfpe.jus.br/peticoes"

app.use(cors())

app.use("/", express.static("public"));
app.use("/triagem", express.static("public/triagem.html"));
app.use("/stopwords", express.static("public/stopwords.html"));

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

//service
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server ok! Acesse: http://localhost:${PORT}/`));