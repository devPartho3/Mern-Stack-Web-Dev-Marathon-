document.addEventListener('DOMContentLoaded', () => {
    const todoinput = document.getElementById('todoinput')
    const addbtn = document.getElementById('addbtn')
    const todolist = document.getElementById('todolist')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
//load existing tasks
    tasks.forEach((task) => rendertasks(task))

//add new task
    addbtn.addEventListener('click', () => {
        const tasktext = todoinput.value.trim()
        if (tasktext === "")
            return

        const newtask = {
            id: Date.now(),
            text: tasktext,
            completed: false
        }
        tasks.push(newtask)
        savetasks()
        rendertasks(newtask)
        todoinput.value = ""
    })

    function rendertasks(task) {
        const li = document.createElement("li")
        li.setAttribute("data-id", task.id)

        if (task.completed)
            li.classList.add("completed")

        li.innerHTML = `<span>${task.text}</span>
    <button>Delete</button>`

//toggle when clicking on the text
        li.addEventListener('click', (e) => {
            if (e.target.tagName === "Button")
                return
            task.completed = !task.completed
            li.classList.toggle("completed")
            savetasks()
        });



        li.querySelector("button").addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            savetasks();

        });


        todolist.appendChild(li)
    }

    function savetasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})
