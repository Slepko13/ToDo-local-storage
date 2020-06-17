//*****************************************************************************************************************************************
//! Header                                                                                                                         
//*****************************************************************************************************************************************
let clear = document.querySelector('.clear');
let date = document.querySelector('#date');
const options = { weekday: "long", month: "short", day: "numeric" };
// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December";
// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
// date.innerHTML=`${days[new Date().getDay()]}, ${months[new Date().getMonth()]}   ${new Date().getDate()}`;
date.innerHTML = new Date().toLocaleDateString("en-US", options);
let time = document.querySelector('.time');
setInterval(
    () => {
        time.innerHTML = new Date().toLocaleTimeString();
    }, 1000
)
//*****************************************************************************************************************************************
//! Content                                                                                                                          
//*****************************************************************************************************************************************
const list = document.getElementById('list');
let listItems = [];
let id = 0;
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThough";
const addItem = document.querySelector('.fa-plus-circle');//? Event listener
const input = document.getElementById('input');

let data = localStorage.getItem("TODO");
console.log(JSON.parse(data));
if (data) {
    listItems = JSON.parse(data);
    loadTodo(listItems);
    id = listItems.length;
} else {
    listItems = [];
    id = 0;
}

//*****************************************************************************************************************************************
//! Functions                                                                       
//*****************************************************************************************************************************************
function addTodo(todo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : null;
    const item = `<li class="item">
                <i class="fa ${DONE}"  job="complete" aria-hidden="true" id=${id}></i>
                <div class="text ${LINE}">${todo}</div>
                <i class="fa fa-trash-o" job="delete" id=${id}></i>
                </li>`
    list.insertAdjacentHTML('beforeend', item);
}
function completeTodo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    listItems[element.id].done = listItems[element.id].done ? false : true;
}
function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listItems[element.id].trash = true;
}

function loadTodo(array) {
    array.forEach(item => {
        addTodo(item.name, item.id, item.done, item.trash);
    });
}

//*****************************************************************************************************************************************
//! Event listeners  "click" on addItem,  "keyup" on document                                                                       
//*****************************************************************************************************************************************
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

addItem.addEventListener('click', () => {
    console.log(JSON.parse(data));
    const todo = input.value;
    if (todo) {
        addTodo(todo, id, false, false);
        listItems.push(
            {
                name: todo,
                id: id,
                done: false,
                trash: false
            });
        localStorage.setItem("TODO", JSON.stringify(listItems));

        id++;
    }
    input.value = "";

});
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        const todo = input.value;
        if (todo) {
            addTodo(todo, id, false, false);
            listItems.push(
                {
                    name: todo,
                    id: id,
                    done: false,
                    trash: false
                });
            localStorage.setItem("TODO", JSON.stringify(listItems));

        }
        input.value = "";
        id++;
    }
});
list.addEventListener("click", (event) => {
    const element = event.target;
    const elementJOB = event.target.attributes.job.value;
    if (elementJOB == "complete") {
        completeTodo(element);
    } else if (elementJOB == "delete") {
        removeTodo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(listItems));

})


