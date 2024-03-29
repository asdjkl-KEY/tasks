const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { getEncryptedLocalListDBClass } = require('bbel-simple-db');

let d = __dirname.split('\\');
let dir = path.join(d[0], d[1], d[2], 'AppData', 'Roaming', process.env.NODE_ENV === 'development'? '.task-dev':'.task');
if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
let listDirRoot = path.join(process.env.APPDATA, process.env.NODE_ENV === 'development'? '.task-dev':'.task', 'data', 'list');
let EncryptedLocalListDB = getEncryptedLocalListDBClass(listDirRoot, 'Cq7#xY2p!4a8$b', '.tsk');

class DB {
    constructor(filename){
        this.filename = filename
        this.file = path.join(dir, filename+'.tsk');
        this.create();
    }
    create(){
        if(!fs.existsSync(this.file)){
            fs.writeFileSync(this.file, this.cipher({}), 'utf8');
        }
    }
    read(){
        let data = fs.readFileSync(this.file, 'utf8');
        return data;
    }
    write(data){
        fs.writeFileSync(this.file, this.cipher(data), 'utf8')
    }
    cipher(data){
        return jwt.sign({data:JSON.stringify(data)}, 'secret')
    }
    parse(data){
        try {
            return JSON.parse(jwt.verify(data, 'secret').data);
        } catch (error) {
            return false;
        }
    }
    async get(key, defaultValue){
        if(!key) return;
        let raw = this.read();
        let data = this.parse(raw);
        if(!data) return;
        if(!data[key]) {
            this.set(key, defaultValue);
            return defaultValue;
        }
        return data[key];
    }
    set(key, value=null){
        if(!key) return;
        let raw = this.read();
        let data = this.parse(raw);
        if(!data) return;
        data[key] = value;
        this.write(data);
    }
}

module.exports = {
    DB,
    EncryptedLocalListDB
}

