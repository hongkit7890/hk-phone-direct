const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const JSON_FILE_PATH = path.join(__dirname, "phone_directory.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/phone-directory", (req, res) => {
  fs.readFile(JSON_FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading phone directory data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/phone-directory", (req, res) => {
  const newEntry = req.body;

  fs.readFile(JSON_FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading phone directory data" });
    } else {
      let phoneDirectory = JSON.parse(data);
      const existinginfo = phoneDirectory.extensions.find(
        (extension) =>
          extension.info.toLowerCase() ===
          newEntry.info.toLowerCase()
      );

      if (existinginfo) {
        const newContact = {
          id: (existinginfo.layers.length + 1).toString(),
          name: newEntry.contactName,
        };
        existinginfo.layers.push(newContact);
      } else {
        const newinfo = {
          id: (phoneDirectory.extensions.length + 1).toString(),
          info: newEntry.info,
          layers: [
            {
              id: "1",
              name: newEntry.contactName,
            },
          ],
        };
        phoneDirectory.extensions.push(newinfo);
      }

      fs.writeFile(JSON_FILE_PATH, JSON.stringify(phoneDirectory), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Error updating phone directory data" });
        } else {
          res.json({ message: "Phone directory data updated successfully" });
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});