const { response } = require("express");
const express = require("express");
const fileupload = require("express-fileupload");
const pdfparse = require("pdf-parse");

const app = express();

app.use("/", express.static("public"));
app.use(fileupload());

app.post("/extrac-text", (req, res) =>{
    if (!req.files && !req.files.pdfFile){
        res.status(400);
        res.end();
    }

    pdfparse(req.files.pdfFile).then(result => {
        res.send(result.text);
    });
});

app.listen(3000);