const fs = require('fs');
const exec = require('child_process').exec;

function shell(str) {
    return new Promise((accept, reject)=>{
        exec(str, {}, (error, stdout, stderr) => {
            accept({error, stdout, stderr});
        });
    });
}

const b = fs.readFileSync('_.tar.gz.b64');
let buff = Buffer.from(b.toString(), 'base64');
fs.writeFileSync('_.tar.gz', buff);

shell('mkdir _').then(()=>{
    shell('tar -xvzf _.tar.gz -C _')
    .then(({error, stdout, stderr})=>{
        if(error) {
            console.log("=========== error ==============");
            console.log(error);
        } else {
            console.log(stdout);
            console.log(stderr);
        }
        fs.unlinkSync('_.tar.gz');
    });
}) 
