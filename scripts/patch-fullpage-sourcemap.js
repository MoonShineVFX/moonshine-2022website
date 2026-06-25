/**
 * @fullpage/react-fullpage 的 dist 引用了不存在的 easings.min.js.map，
 * CRA 的 source-map-loader 會因此噴警告。補一個最小合法 map 即可。
 */
const fs = require('fs');
const path = require('path');

const mapPath = path.join(
  __dirname,
  '../node_modules/@fullpage/react-fullpage/dist/easings.min.js.map'
);

if (!fs.existsSync(mapPath)) {
  fs.writeFileSync(
    mapPath,
    JSON.stringify({
      version: 3,
      file: 'easings.min.js',
      sources: [],
      names: [],
      mappings: '',
    })
  );
}
