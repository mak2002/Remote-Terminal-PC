const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/test", function (req, res) {
  const { exec } = require("child_process");
  exec(" ls > textfile.txt", (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err);
    } else {
      // the *entire* stdout and stderr (buffered)
      res.json(stdout);
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });

  // var yourscript = exec("sh hi.sh", (error, stdout, stderr) => {
  //   console.log(stdout);
  //   console.log(stderr);
  //   if (error !== null) {
  //     console.log(`exec error: ${error}`);
  //   }
  // });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
