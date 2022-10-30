// import yargs from "yargs"; ES6

const yargs = require("yargs");
const fs = require("fs")
const { readAllTask, createTask, readDetailTask, updateTask } = require("../model/task")


// console.log('demo')


//node app/index.js test
// yargs.command({
//     command: "test",
//     handler: () => {
//         console.log("first")
//     }
// });

//create  -  node app/index.js create --title="Demo create" --description="hoc nodejs"
yargs.command({
    command: "create",
    builder: {
        title: {
            type: "string",
        },
        description: {
            type: "string"
        }
    },
    handler: (args) => {
        const { title, description } = args;
        const newTask = createTask(title, description)
        console.log(newTask)
    }
});

//read-all -  node app/index.js read-all
yargs.command({
    command: "read-all",
    handler: () => {
        const result = readAllTask()
        console.log(result)
        console.log("read-all")
    }
});
//read-detail -  node app/index.js read-detail --id="123"
yargs.command({
    command: "read-detail",
    builder: {
        id: {
            type: "string",
        },

    },
    handler: (agrs) => {
        const { id } = agrs
        const task = readDetailTask(id)
        if (task) {
            console.log("task :", task)
        } else {
            console.log("Not found")
        }
    }
});
//update -  node app/index.js update --id="1" --title="Demo update" --description="hoc nodejs updates"
yargs.command({
    command: "update",
    handler: (agrs) => {
        const { id, title, description } = agrs
        const task = updateTask(id, title, description)
        // console.log(typeof (id))
        if (task) {
            console.log(task)
        } else {
            console.log("Not Found")
        }
    }
});
//delete -  node app/index.js delete
yargs.command({
    command: "delete",
    handler: () => {
        console.log("delete")
    }
});
//lưu lại các lệnh vừa tạo
yargs.parse();