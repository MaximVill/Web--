const fs = require('fs');
const path = require('path');
const https = require('https');

const newMemes = [
  { name: 'gigachad.jpg', url: 'https://i.imgflip.com/5c7lwq.png' },
  { name: 'boromir.jpg', url: 'https://i.imgflip.com/1bij.jpg' },
  { name: 'trade-offer.jpg', url: 'https://i.imgflip.com/54hjww.jpg' },
  { name: 'disaster-girl.jpg', url: 'https://i.imgflip.com/23ls.jpg' },
  { name: 'two-buttons.jpg', url: 'https://i.imgflip.com/1g8my4.jpg' },
  { name: 'grus-plan.jpg', url: 'https://i.imgflip.com/26jmn4.jpg' },
  { name: 'bernie.jpg', url: 'https://i.imgflip.com/3oevdk.jpg' },
  { name: 'doge-cheems.png', url: 'https://i.imgflip.com/43a45p.png' }
];

const targetDir = path.join(__dirname, '..', 'assets', 'memes');

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
  for (const item of newMemes) {
    const dest = path.join(targetDir, item.name);
    console.log('Downloading ' + item.name + '...');
    try {
      await downloadFile(item.url, dest);
      const stat = fs.statSync(dest);
      console.log('Saved ' + item.name + ' (' + stat.size + ' bytes)');
    } catch (e) {
      console.error('Failed ' + item.name + ':', e.message);
    }
  }
}

run();
