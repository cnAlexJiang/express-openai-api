const express = require("express");
const cors = require('cors')

const app = express();
const gpt3 = require("./api/gpt3");


app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/api/gpt3", gpt3);

app.get('/',  (req, res) => {
  res.send('success')
})
const PORT = process.env.PORT || 8100;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
