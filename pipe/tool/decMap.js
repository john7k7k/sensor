const fs = require('fs');
const path = require('path')
function getDecMap(data){
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../../config/desMap.json'), (err, file) => {
            file = JSON.parse(String(file));
            resolve(file);
        })
    })
}

function updateDecMap(key, description){
    return new Promise(async (resolve, reject) => {
        let decMap = await getDecMap();
        decMap[key] = description;
        fs.writeFile(path.join(__dirname, '../../config/desMap.json'), JSON.stringify(decMap), 'utf8', (err) => {
            if (err) {
              resolve('Error writing file:' + err);
              return;
            }
        })
        resolve('success');
    })
}

updateDecMap("1", "34-12")
//(async () => console.log(await getDecMap()))();

module.exports = { updateDecMap, getDecMap };