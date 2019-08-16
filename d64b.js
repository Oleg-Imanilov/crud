const fs = require('fs');
const exec = require('child_process').exec;

function shell(str) {
    return new Promise((accept, reject)=>{
        exec(str, {}, (error, stdout, stderr) => {
            accept({error, stdout, stderr});
        });
    });
}

shell(`tar --exclude "node_modules" --exclude ".git" --exclude ".gitignore" --exclude "package-lock.json" -zcvf "_.tar.gz" .`)
.then(({error, stdout, stderr})=>{
    if(error) {
        console.log("=========== error ==============");
        console.log(error);
    } else {
        console.log(stdout);
        console.log(stderr);

        const buff = fs.readFileSync('_.tar.gz');
        fs.writeFileSync(`_.tar.gz.b64`, buff.toString('base64'));
        fs.unlinkSync('_.tar.gz');
    }
});
