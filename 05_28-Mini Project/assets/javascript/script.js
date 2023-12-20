let inputName = '';
let inputType = '';
let inputDue = '';

console.log("Start of JS doc loaded");

let displayDateTime = setInterval(function() {
    var currDateTime = dayjs().format('MMM DD, YYYY') + " at " + dayjs().format('HH:MM:ss A');
    $('#date-time').text(currDateTime);
}, 1000);


function createTable() {
    let htmlTR = document.createElement("tr")
    let htmlTD = document.createElement("tr")
}

function readLocalStorage() {
    let tempLocal = JSON.parse(localStorage.getItem('custData'));
    console.log("String: "+ tempLocal);
    console.log(typeof tempLocal);

    if(!tempLocal) {tempLocal=[];}
    console.log(tempLocal);

    // let readLocal = {
    //     name: xxx,
    //     type: xxx,
    //     due: xxx
    // }
}

const formModal = $('#form-modal');
const btnModal = $('#btn-form-modal');
const formDatePicker = $('#project-due');
const formClose = $('[name="modal-btn-close"]')

//Toggles the modal
function toggleFormModal(event) {
    //Logs to the console what was clicked - target, name, text
    console.log("Clicked on " + event.target + " w/ ID: " + event.target.id + " | Text: " + event.target.textContent.trim() )
    formModal.modal('toggle')
}

//jQuery Event Listeners for buttons
btnModal.on("click", toggleFormModal);
formClose.on("click", toggleFormModal);

formDatePicker.datepicker();

readLocalStorage();

var fs = require('fs');
var files = fs.readdirSync('/');
console.log(files);