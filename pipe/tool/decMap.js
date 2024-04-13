const fs = require('fs');
const path = require('path');
const { app } = require('electron')
function getDecMap(data){
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(app.getPath('userData'), 'SGS/config/decMap.json'), (err, file) => {
            file = JSON.parse(String(file));
            resolve(file);
        })
    })
}

function updateDecMap(key, description){
    return new Promise(async (resolve, reject) => {
        let decMap = await getDecMap();
        for(let i in decMap){
            if(decMap[i] === description){
                decMap[i] = '';
            }
        }
        decMap[key] = description;
        
        fs.writeFile(path.join(app.getPath('userData'), 'SGS/config/decMap.json'), JSON.stringify(decMap), 'utf8', (err) => {
            if (err) {
              resolve('Error writing file:' + err);
              return;
            }
        })
        resolve('success');
    })
}

//(async () => console.log(await getDecMap()))();

module.exports = { updateDecMap, getDecMap };