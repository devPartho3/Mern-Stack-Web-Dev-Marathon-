const fs = require('fs');

const filepath = "./task.json";


const command = process.argv[2];
const argument = process.argv[3];



const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}


function saveTasks(tasks) {
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(filepath, dataJSON);
}

function addtask(task) 
{
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task Added!", task);
}

function removetask(index) {
    const tasks = loadTasks();
    if (index > 0 && index <= tasks.length) {
        const removedTask = tasks.splice(index - 1, 1);
        saveTasks(tasks);
        console.log("Removed task:", removedTask[0].task);
    } else {
        console.log("Invalid task index");
    }
}

const listTasks = () => {
const tasks=loadTasks();
tasks.forEach((task,index) => {
    console.log(`${index + 1}. ${task.task}`);
});
}

    if (command === 'add') {
        addtask(argument)
    }
    else if (command === 'list') {
        listTasks();
    } else if (command === 'remove') {
        removetask(parseInt(argument));
    } else {
        console.log("Invalid command");

    }