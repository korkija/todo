window.onload = function () {

    let main = document.querySelector(".main");
    let footer = document.querySelector(".footer");
    let new_todo = document.querySelector(".new-todo");
    let todo_list = document.querySelector(".todo-list");
    let toggle_all = document.querySelector(".toggle-all");
    let clear_completed = document.querySelector(".clear-completed");
    let todo_count = document.querySelector(".todo-count");
    let filters = document.querySelector(".filters");
    let editing = document.querySelector(".editing");

    // console.log(event.target.parentElement);
    function checkEditing(elementEditing) {
        console.log(elementEditing);
        elementEditing.addEventListener("focusout", includEvent);
    }

    function includEvent(event) {
        //console.log(
        event.target.parentElement.classList.remove('editing');
        event.target.parentElement.firstChild.childNodes[1].textContent = event.target.value;
        //console.log( event.target.value);
    }

    todo_list.addEventListener("click", checkedItem);
    filters.addEventListener("click", filters3Case);

    function filters3Case(event) {
        let arrCompleted = [];
        let oldSelected = document.querySelector('.selected');
        if (oldSelected) {
            oldSelected.classList.remove('selected');
        }
        switch (event.srcElement.innerHTML) {
            case `All`:
                event.target.className = 'selected';
                addListLi(listTODO);
                break;
            case `Active`:
                event.target.className = 'selected';
                for (let i = 0; i < listTODO.length; i++) {
                    if (listTODO[i].status === false) {
                        arrCompleted.push(listTODO[i]);
                    }
                }
                addListLi(arrCompleted);
                break;
            case `Completed`:
                event.target.className = 'selected';
                for (let i = 0; i < listTODO.length; i++) {
                    if (listTODO[i].status === true) {
                        arrCompleted.push(listTODO[i]);
                    }
                }
                addListLi(arrCompleted);
                break;
            default :
                console.log("not yet");
                break;
        }
    }

    // двойной клик на поле. происходит херня, схлопывается поле
    todo_list.addEventListener("dblclick", function (event) {
        // console.log(event.target.localName);
        if (event.target.localName === "label") {
            event.target.parentElement.parentElement.classList.add("editing");
            editing = event.target.parentElement.parentElement;
            event.target.parentElement.parentElement.lastChild.focus();
            //console.log(event.target.parentElement.parentElement.lastChild);
            checkEditing(event.target.parentElement.parentElement);
        }

    });


    function changeCount() {
        let count = 0;// = listTODO.length - completedThereAll.length;
        for (let i = 0; i < listTODO.length; i++) {
            if (listTODO[i].status === false) {
                count++;
            }
        }
        if (count === 1) {
            todo_count.innerHTML = `<strong>${count}</strong> item left`;
        } else {
            todo_count.innerHTML = `<strong>${count}</strong> items left`;
        }

    }

    function checkedItem(event) {
        if (event.target.classList[0] === "toggle") {
            let completedThereAll = document.querySelectorAll(".completed");
            for (let i = 0; i < listTODO.length; i++) {
                if (listTODO[i].id === Number(event.target.parentElement.parentElement.id)) {
                    if (event.target.checked) {
                        event.target.parentElement.parentElement.classList.add("completed");
                        clear_completed.style.display = "block";
                        if ((completedThereAll.length + 1) === listTODO.length) {
                            toggle_all.checked = true;
                        }
                        // listTODO[i].status = true;
                        //changeCount();
                    } else {
                        event.target.parentElement.parentElement.classList.remove("completed");
                        if (!(completedThereAll.length - 1)) {
                            clear_completed.style.display = "none";
                            toggle_all.checked = false;
                        }
                        //listTODO[i].status = false;
                    }
                    listTODO[i].status = event.target.checked;

                    i = listTODO.length;
                }

            }
            changeCount();
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
                    document.getElementById(completedList[i].id).remove();
                    ii = listTODO.length;
                }
            });
        }
        checkAll();
        changeCount();
        if (listTODO.length === 0) {
            main.style.display = "none";
            footer.style.display = "none";
            clear_completed.style.display = "none";
        }
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
            changeStatus(toggle_all.checked);
            changeCount();
        }
    }

    function changeStatus(status) {
        for (let i = 0; i < listTODO.length; i++) {
            listTODO[i].status = status;
        }
    }

    let listTODO = [];

    function ClassTODO(message, id, status) {
        this.id = id || listTODO.length > 0 ? listTODO[listTODO.length - 1].id + 1 : Date.now();
        this.message = message;
        this.status = status || false;
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
                changeCount();
            }
        }
    };

    function addListLi(arrItems) {
        todo_list.innerHTML = "";
        if (arrItems) {
            for (let i = 0; i < arrItems.length; i++) {
                addNewLi(arrItems[i]);
            }
        }
    }


// add new TODO into <LI>
    function addNewLi(item) {
        let todoLi = document.createElement('li');
        todoLi.id = item.id;
        if (item.status) {
            todoLi.classList.add("completed");
        }
        let todoLiDiv = document.createElement('div');
        todoLiDiv.classList.add("view");

        let todoLiDivInputCheck = document.createElement('input');
        todoLiDivInputCheck.classList.add("toggle");
        todoLiDivInputCheck.type = "checkbox";
        todoLiDivInputCheck.checked = item.status;


        let todoLiDivLabel = document.createElement('label');
        todoLiDivLabel.innerText = item.message;

        let todoLiDivButton = document.createElement('button');
        todoLiDivButton.classList.add("destroy");

        let todoLiDivInputEdit = document.createElement('input');
        todoLiDivInputEdit.classList.add("edit");
        todoLiDivInputEdit.value = item.message;

        todoLiDiv.appendChild(todoLiDivInputCheck);
        todoLiDiv.appendChild(todoLiDivLabel);
        todoLiDiv.appendChild(todoLiDivButton);
        todoLi.appendChild(todoLiDiv);
        todoLi.appendChild(todoLiDivInputEdit);
        todo_list.appendChild(todoLi);

//        localStorage.setItem("html", divTable.innerHTML);
    }
};

