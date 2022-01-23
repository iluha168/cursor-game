class Command {
    constructor(aliases,description,parameters,callback) {
        if(!aliases instanceof Array) aliases = [aliases];
        if(!parameters instanceof Array) parameters = [parameters];

        this.aliases = aliases;
        this.description = description;
        this.parameters = parameters;
        this.callback = callback;
    }
    call(...args) {
        if(args.length < this.parameters.length) return "Not enough parameters";
        if(args.length > this.parameters.length) return "Too many parameters";
        
        return this.callback(...args);
    }
}

class CommandHandler {
    static commands = {};
    static registerCommand(aliases,description,parameters,callback) {
        
    }
}

module.exports = CommandHandler;