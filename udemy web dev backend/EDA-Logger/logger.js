const fs=require("fs")
const os=require("os")
const EventEmitter=require("events")

class Logger extends EventEmitter{
    log(message){
        this.emit("message",{message})
    }
}

const logger=new Logger()
const logfile="./eventlog.txt"
const logtofile=(event)=>{
    const logMessage=`${new Date().toString()}-${event.message}\n`
    fs.appendFileSync(logfile, logMessage, { encoding: "utf8" })

}

logger.on("message",logtofile)


setInterval(()=>{
const memoryusage=(os.freemem()/os.totalmem())*100
logger.log(`Current memory usage is ${memoryusage.toFixed(2)}`)
},3000)


logger.log("Application Started....")
logger.log("Application event occured....")
