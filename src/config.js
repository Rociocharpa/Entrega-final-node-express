import * as url from 'url';


const config = {
    PORT: 5051,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    // getter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    // MONGODB_URI: 'mongodb://127.0.0.1:27017/node-express',
    MONGODB_URI: 'mongodb+srv://jccharparin:juanki3031@cluster-jc.wb4th.mongodb.net/node-express'
};


export default config;