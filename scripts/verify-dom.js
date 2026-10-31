const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const jsFiles = ['js/memes-data.js', 'js/audio.js', 'js/canvas-editor.js', 'js/game.js', 'js/app.js'];
let missing = [];

jsFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const id = m[1];
    if (!html.includes('id="' + id + '"') && !html.includes("id='" + id + "'")) {
      missing.push({ file: f, id: id });
    }
  }
});

if (missing.length === 0) {
  console.log('SUCCESS: All getElementById references match elements in index.html!');
} else {
  console.log('Missing IDs found:', missing);
}
