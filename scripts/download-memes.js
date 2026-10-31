const fs = require('fs');
const path = require('path');
const https = require('https');

const memes = [
  { name: 'this-is-fine.jpg', url: 'https://i.imgflip.com/wxica.jpg' },
  { name: 'harold.jpg', url: 'https://i.imgflip.com/gk5el.jpg' },
  { name: 'drake.jpg', url: 'https://i.imgflip.com/30b1gx.jpg' },
  { name: 'roll-safe.jpg', url: 'https://i.imgflip.com/1h7in3.jpg' },
  { name: 'pikachu.jpg', url: 'https://i.imgflip.com/2kbn1e.jpg' },
  { name: 'monkey-puppet.jpg', url: 'https://i.imgflip.com/2gnnjh.jpg' },
  { name: 'gatsby.jpg', url: 'https://i.imgflip.com/26jxvz.jpg' },
  { name: 'woman-cat.jpg', url: 'https://i.imgflip.com/345v97.jpg' },
  { name: 'fry.jpg', url: 'https://i.imgflip.com/1bgw.jpg' },
  { name: 'distracted-boyfriend.jpg', url: 'https://i.imgflip.com/1ur9b0.jpg' }
];

const targetDir = path.join(__dirname, '..', 'assets', 'memes');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP status ' + res.statusCode + ' for ' + url));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of memes) {
    const dest = path.join(targetDir, item.name);
    console.log('Downloading ' + item.name + ' from ' + item.url + '...');
    try {
      await downloadFile(item.url, dest);
      const stat = fs.statSync(dest);
      console.log('Saved ' + item.name + ' (' + stat.size + ' bytes)');
    } catch (e) {
      console.error('Failed to download ' + item.name + ':', e.message);
    }
  }
  console.log('All downloads processed.');
}

run();
