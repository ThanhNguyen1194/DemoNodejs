const { match } = require("assert")
const fs = require("fs")

const readAllTask = () => {
    const buffer = fs.readFileSync("task.json")
    //chuyển thành chuỗi
    const taskString = buffer.toString()
    //chuyển thành Json
    const taskJson = JSON.parse(taskString)
    return taskJson
}

const createTask = (title, description) => {
    const listTask = readAllTask()

    const newId = (parseInt(listTask[listTask.length - 1].id) + 1).toString()
    // console.log(listTask[listTask.length - 1].id)
    const newTask = {
        id: newId,
        // id: Math.random().toString(),
        title,
        description
    }
    let taskList = readAllTask();
    taskList = [...taskList, newTask]
    fs.writeFileSync("task.json", JSON.stringify(taskList))
    return newTask
}

const readDetailTask = (id) => {
    const taskList = readAllTask()
    const task = taskList.find((task) => id === task.id)
    return task
}


const updateTask = (id, title, description) => {
    let taskList = readAllTask()
    const index = taskList.findIndex((task) =>
        task.id == id
    )
    // console.log(typeof (id))
    if (index !== -1) {
        const oldTask = taskList[index]
        const newTask = { ...oldTask, title, description }
        taskList[index] = newTask
        fs.writeFileSync("task.json", JSON.stringify(taskList))
        return newTask
    } else {
        return false
    }
}



module.exports = {
    readAllTask,
    createTask,
    readDetailTask,
    updateTask
}