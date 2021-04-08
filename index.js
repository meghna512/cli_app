const readline = require('readline');
const eventEmitter = require('events');
const os = require('os');
const { commands } = require('./helper/cmd');

const cli = {};
const myEmitter = new eventEmitter();
cli.responder = {};

myEmitter.on('help', (arg) => { cli.responder.help(arg); });
myEmitter.on('man', (arg) => { cli.responder.man(arg); });
myEmitter.on('exit', (arg) => { cli.responder.exit(arg); });
myEmitter.on('stats', (arg) => { cli.responder.stats(arg); });
myEmitter.on('list users', (arg) => { cli.responder.listUsers(arg); });
myEmitter.on('more user info', (arg) => { cli.responder.moreUserInfo(arg); });
myEmitter.on('url', (arg) => { cli.responder.url(arg); });

cli.responder.help = function (arg = null) {
    let flag = true;
    let arr = Object.keys(commands);
    for (a of arr) {
        if (a.startsWith(arg)) {
            flag = false;
            console.log(commands[a]);
        }
    }
    if (flag) {
        console.log(" Please enter a valid command");
    }
}

cli.responder.man = function (arg = null) {
    for (c in commands) {
        console.log(`${c} : ${commands[c]} `);
    }
}

cli.responder.exit = function (arg = null) {
    process.exit(0);
}

cli.responder.stats = function (arg = null) {

    console.log(`
    Total number of cpus: ${os.cpus().length}
    Model: ${os.cpus()[0].model}
    Version: ${os.version()}`);
}

cli.responder.listUsers = function (arg = null) {

    console.log(`
        Username : ${os.userInfo().username}
        UID : ${os.userInfo().uid}
    `);
}

cli.responder.moreUserInfo = function (arg = null) {
    if (arg == os.userInfo().uid) {
        console.log(`
        Username : ${os.userInfo().username}
        UID : ${os.userInfo().uid}
        GID : ${os.userInfo().gid}
        Shell : ${os.userInfo().shell}
        Homedir : ${os.userInfo().homedir}
    `);
    } else {
        console.log('Please enter a valid uid');
    }
}

cli.responder.url = function (arg = null) {
    const spliturl = arg.split(' ');
    const myURL = new URL(`${spliturl[1]}`);

    switch (spliturl[0]) {
        case 'host':
            console.log(myURL.host);
            break;
        case 'port': console.log(myURL.port);
            break;
        case 'protocol': console.log(myURL.protocol);
            break;
        default:
            console.log(`Invalid flag`);
    }

}

cli.processInput = function (cmd) {
    let cmdsplit = [];
    cmdsplit = cmd.split(' --');
    let flag = true;
    let arr = Object.keys(commands);
    for (a of arr) {
        if (a.split(' --')[0].startsWith(cmdsplit[0])) {
            flag = false;
            myEmitter.emit(cmdsplit[0], cmdsplit[1]);
        }
    }
    if (flag) {
        console.log(" Please enter a valid command");
    }
}


function init() {
    console.log("cli app is running");
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    interface.prompt(); //for next line

    interface.on('line', (cmd) => {
        cli.processInput(cmd);
    });

    interface.on('close', () => {
        process.exit(0);
    });
}
init();