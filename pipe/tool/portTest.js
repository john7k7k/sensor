const { SerialPort } = require('serialport');
let port = {};
let fin = 0;
// SerialPort.list()
//   .then(async ports => {
//     console.log('COM connected:');
//     ports.forEach(mport => {
//         console.log(`${mport.path} - ${mport.manufacturer || 'Unknown manufacturer'}`);
//     });
//     for(let mport of ports){
//         port = await initPort(mport.path);
//         if(port) break;
//     }
//   })
//   .catch(err => {
//     console.error('no com:', err);
//   });

// function initPort(com){
//     return new Promise((resolve, reject) => {
//         let test_port = new SerialPort({ path: com, baudRate: 9600 },(err) => {
//             console.error(err);
//             if(err) return;
//             test_port.write(`0\n`);
//             test_port.on('data', (data) => {
//                 console.log('ackInit: ' + data);
//                 fin = 1;
//                 resolve(test_port);
//             });
//             setTimeout(() => {
//                 if(fin === 0)test_port._disconnected(0);
//                 resolve();
//             }, 1000);
//         });
//     })
// }

// async function chooseSensor(select){
//    return new Promise((resolve, reject) => {
//         try{
//             port.write(`${select}\n`);
//             port.on('data', (data) => {
//                 console.log('ack: ' + data);
//                 resolve(data);
//             })
//         }catch(err){resolve(0);}
//     })
// }

// module.exports = { chooseSensor };

let test_port = new SerialPort({ path: 'COM11', baudRate: 9600 },(err) => {
    console.log(err)
})

test_port.on('data', (data) => {
    console.log('ackInit: ' + data);
    fin = 1;
    console.log(test_port);
});
setTimeout(() => {
    test_port._disconnected(0);
}, 1000);
console.log('a')