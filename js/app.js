window.onload = function () {

    let main = document.querySelector(".main");
    let footer = document.querySelector(".footer");
    let new_todo = document.querySelector(".new-todo");
    let todo_list = document.querySelector(".todo-list");
    let toggle_all = document.querySelector(".toggle-all");
    let clear_completed = document.querySelector(".clear-completed");

    todo_list.addEventListener("click", checkedItem);

    // двойной клик на поле. происходит херня, схлопывается поле
    todo_list.addEventListener("dblclick", function (event) {
        if (event.target.toString() === "[object HTMLLabelElement]") {
            event.target.parentElement.parentElement.classList.add("editing");

        }
    });

    function checkedItem(event) {
        if (event.target.classList[0] === "toggle") {
            let completedThereAll = document.querySelectorAll(".completed");
            if (event.target.checked) {
                event.target.parentElement.parentElement.classList.add("completed");
                clear_completed.style.display = "block";
                if ((completedThereAll.length + 1) === listTODO.length) {
                    toggle_all.checked = true;
                }
            } else {
                event.target.parentElement.parentElement.classList.remove("completed");
                if (!(completedThereAll.length - 1)) {
                    clear_completed.style.display = "none";
                    toggle_all.checked = false;
                }
            }
        }
    }

    toggle_all.addEventListener("click", checkAll);
    clear_completed.addEventListener("click", function () {
        toggle_all.checked = false;
        let completedList = document.querySelectorAll('.completed');
        for (let i = 0; i < completedList.length; i++) {
            listTODO.forEach((element, ii) => {
                if (element.id === Number(completedList[i].id)) {
                    listTODO.splice(ii, 1);
                    console.log(completedList[i].id);
                    document.getElementById(completedList[i].id).remove();
                }
            });
        }
        checkAll();
    });

    function checkAll() {
        let CheckboxList = document.querySelectorAll('.toggle');
        for (let i = 0; i < CheckboxList.length; i++) {
            CheckboxList[i].checked = toggle_all.checked;
            if (toggle_all.checked) {
                CheckboxList[i].parentElement.parentElement.classList.add("completed");
                clear_completed.style.display = "block";
            } else {
                CheckboxList[i].parentElement.parentElement.classList.remove("completed");
                clear_completed.style.display = "none";
            }
        }
    }


    let listTODO = [];

    function ClassTODO(message, id, status) {
        this.id = id || listTODO.length > 0 ? listTODO[listTODO.length - 1].id + 1 : Date.now();
        this.message = message;
        this.status = status || "true";
        return this;
    }

    // we don't have TODO
    main.style.display = "none";
    footer.style.display = "none";
    clear_completed.style.display = "none";

    new_todo.autofocus = true;

    document.onkeyup = function (e) {
        e = e || window.e;
        if (e.keyCode === 13) { //  что за прикол с этим параметром keyCode? мне его вебшторм перечеркивает.
            if (new_todo.value.trim()) {
                let newItem = new ClassTODO(new_todo.value.trim());
                addNewLi(newItem);
                listTODO.push(newItem);
                new_todo.value = "";
                main.style.display = "block";
                footer.style.display = "block";
            }
            console.log(listTODO);
        }
    };


// add new TODO into <LI>
    function addNewLi(item) {
        let todoLi = document.createElement('li');
        todoLi.id = item.id;

        let todoLiDiv = document.createElement('div');
        todoLiDiv.classList.add("view");

        let todoLiDivInputCheck = document.createElement('input');
        todoLiDivInputCheck.classList.add("toggle");
        todoLiDivInputCheck.type = "checkbox";

        let todoLiDivLabel = document.createElement('label');
        todoLiDivLabel.innerText = item.message;

        let todoLiDivButton = document.createElement('button');
        todoLiDivButton.classList.add("destroy");

        let todoLiDivInputEdit = document.createElement('input');
        todoLiDivInputEdit.classList.add("edit");
        todoLiDivInputEdit.type = "checkbox";

        todoLiDiv.appendChild(todoLiDivInputCheck);
        todoLiDiv.appendChild(todoLiDivLabel);
        todoLiDiv.appendChild(todoLiDivButton);
        todoLi.appendChild(todoLiDiv);
        todoLi.appendChild(todoLiDivInputEdit);
        todo_list.appendChild(todoLi);

//        localStorage.setItem("html", divTable.innerHTML);
    }
};

//     <li>
//     <div class="view">
//     <input class="toggle" type="checkbox">
//     <label>Buy a unicorn</label>
// <button class="destroy"></button>
//     </div>
//     <input class="edit" value="Rule the web">
//     </li>