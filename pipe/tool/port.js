const { SerialPort } = require('serialport');
let port = {};
let fin = 0;

SerialPort.list()
  .then(async ports => {
    console.log('COM connected:');
    ports.forEach(mport => {
        console.log(`${mport.path} - ${mport.manufacturer || 'Unknown manufacturer'}`);
    });
    for(let mport of ports){
        port = await initPort(mport.path);
        if(port) break;
    }
  })
  .catch(err => {
    console.error('no com:', err);
  });

function initPort(com){
    return new Promise((resolve, reject) => {
        let test_port = new SerialPort({ path: com, baudRate: 9600 }, async (err) => {
            console.error(err);
            if(err) return;
            // test_port.write(`0\n`);
            // test_port.on('data', (data) => {
            //     console.log(com + ' ackInit: ' + data);
            //     fin = 1;
            //     resolve(test_port);
            // });
            resolve(await port_write( `0\n`, test_port, com))
            setTimeout(() => {
                if(fin === 0) test_port._disconnected(0);
                resolve();
            }, 800);
        });
    })
}

async function port_write(params, port, test =  0) {
    return new Promise((resolve, reject) => {
        if(port){
            port.write(params);
            port.on('data', (data) => {
                if(!fin) {
                    console.log(test + ' ackInit: ' + data);
                    fin = 1;
                    resolve(port);
                }
                else {
                    resolve(String(data));
                }
            });
        }
    })
}

async function chooseSensor(select){
   return new Promise(async (resolve, reject) => {
        try{
            let mcuack = await port_write(`${select}\n`, port, test = 0);
            console.log('response: ')
            console.log(mcuack)
            resolve(mcuack);
        }catch(err){resolve(0);}
    })
}
module.exports = { chooseSensor };