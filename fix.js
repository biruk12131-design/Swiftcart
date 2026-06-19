const fs = require("fs");
const path = require("path");

function fixFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (let entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      fixFiles(res);
    } else if (res.endsWith(".ts") || res.endsWith(".tsx")) {
      let content = fs.readFileSync(res, "utf8");
      let updated = content.replace(/\\`/g, "\`").replace(/\\\$/g, "$");
      if (content !== updated) {
        fs.writeFileSync(res, updated);
        console.log("Fixed", res);
      }
    }
  }
}

fixFiles(path.join(__dirname, "app"));
fixFiles(path.join(__dirname, "lib"));
fixFiles(path.join(__dirname, "components"));
