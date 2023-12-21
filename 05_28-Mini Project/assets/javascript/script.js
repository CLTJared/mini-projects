//Defined Elements that will be re-used
const formModal = $('#form-modal');
const btnModal = $('#btn-form-modal');
const formDatePicker = $('#project-due');
const formClose = $('[name="modal-btn-close"]');
const formProject = $('#project-form');
const formSave = $('#project-save');

//Global Function
const lsName = 'project-track-data'; //Sets the local storage object name to be used for read and write

function displayClock() {
    //Makes a clock, ticks by seconds
    let displayDateTime = setInterval(function() {
        var currDateTime = dayjs().format('MMM DD, YYYY') + " at " + dayjs().format('HH:MM:ss A');
        $('#date-time').text(currDateTime);
    }, 1000);
}

function compareDates(Date1, Date2) {
    //Compares dates to use in sorting function in createTable
    let d1 = new Date(Date1.due).getTime();
    let d2 = new Date(Date2.due).getTime();

    return d1 - d2;
}

function createTable() {
    //Define element to append
    const htmlTB = $("#project-data")[0];

    //reset table body data to nothing
    htmlTB.innerHTML = ''

    let tableData = readLocalStorage(lsName);

    //Sort by Date
    tableData.sort(compareDates)

    for(let i = 0; i<tableData.length; i++) {
            htmlTR = document.createElement("tr");
            htmlTR.setAttribute("scope", "row");
            htmlTR.setAttribute("data-index", i);
            htmlTB.appendChild(htmlTR);

            htmlTD = document.createElement("td");
            htmlTD.setAttribute("class", "p-2");
            htmlTD.textContent = tableData[i].project
        htmlTR.append(htmlTD);
            htmlTD = document.createElement("td");
            htmlTD.setAttribute("class", "p-2");
            htmlTD.textContent = tableData[i].type
        htmlTR.append(htmlTD);
            htmlTD = document.createElement("td");
            htmlTD.setAttribute("class", "p-2");
            htmlTD.textContent = tableData[i].due
        htmlTR.append(htmlTD);
    }
}

function readLocalStorage(storageItem) {
    //Function to read the local storage with passed object name
    let tempStorage = JSON.parse(localStorage.getItem(storageItem));
    //Debug testing for if it's an object/array
    console.log("readLocalStorage | Not an Object: " + !tempStorage);

    if(!tempStorage) { tempStorage = []; localStorage.setItem(storageItem, JSON.stringify(tempStorage)); } 
    console.log("readLocalStorage | " + JSON.stringify(tempStorage));
    //Function returns the local storage object
    return tempStorage;
}

function writeLocalStorage(storageItem, storageObject) {
    //Function to write to LocalStorage
    var currObject = readLocalStorage(lsName);

    if(typeof storageObject !== 'object') { console.log("writeLocalStorage: Invalid type submitted."); return }
    currObject.push(storageObject)

    console.log('writeLocalStorage | ' + storageItem);
    console.log('writeLocalStorage | ' + JSON.stringify(storageObject));

    localStorage.setItem(storageItem, JSON.stringify(currObject))
}

function handleProjectForm(event) {
    //Function for handling the form submitted with project information
    console.log("Clicked on " + event.target + " w/ ID: " + event.target.id + " - Text: " + event.target.textContent.trim() )
    //Prevent page refresh
    event.preventDefault();

    //Set variable names to the value of inputs
    //TODO: See if there is a way to dynamically get these to an array?
    var inputName = $('#project-name').val().trim();
    var inputType = $('#project-type').val().trim();
    var inputDue = $('#project-due').val().trim();

    //Make variables the information from form
    console.log("handleProjectForm | Project Name: " + inputName + " - Project Type: " + inputType + " - Project Due: " + inputDue);

    var tempObject = {
        project: inputName,
        type: inputType,
        due: inputDue
    }

    writeLocalStorage(lsName, tempObject)
    formProject[0].reset();
    toggleFormModal(event);

    createTable();
}


//Toggles the modal
function toggleFormModal(event) {
    //Logs to the console what was clicked - target, name, text
    console.log("Clicked on " + event.target + " w/ ID: " + event.target.id + " & Text: " + event.target.textContent.trim() )
    formModal.modal('toggle')
}

//jQuery Event Listeners for buttons
btnModal.on("click", toggleFormModal);
formClose.on("click", toggleFormModal);
formSave.on("click", handleProjectForm);

//jQueryUI datepicker for the form/date select
formDatePicker.datepicker({minDate: 0, showButtonPanel: true, showWeek: true});

//Creates initial table if there is anything in local storage
createTable()