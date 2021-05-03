var state = {
    entries: [], 
    count: 0, 
    update: NaN,
    isAddEnabled: true,
}

$(document).ready(function(){
updateDOM();           
}); 

function getId() {
    return state.count++;
}

function getEntry(event) {
const entry = {}
event.preventDefault();
entry.name= $("#inputName").val();
entry.gender = $("input[name='gender']:checked").val();
entry.age = parseInt($("#inputAge").val());
entry.city = $("#inputCity").children("option:selected").val();

return entry;
}


$("#my-form").submit(() => {
addEntry();
})
addEntry = () => {

state.entries = [...state.entries, getEntry(event)]
console.log(state.entries);
updateDOM();
}

function updateDOM(){
    
    clearTable();
    clearForm();
    $("#updateBtn").attr('disabled', state.isAddEnabled);
    $("#addBtn").attr('disabled', !state.isAddEnabled);
    state.entries.map((entry,i) => {
        const newEntry = `
            <tr id="${i}">
                <td>${entry.name}</td>
                <td>${entry.gender}</td>
                <td>${entry.age}</td>
                <td>${entry.city}</td>
                <td>
                    <a data-id="${i}" href="#" onclick="fillForm()">Update </a>/ 
                    <a data-id="${i}" href="#" onclick="removeEntry()">Remove</a>
                </td>
            </tr>
        `
        $("#entryData").append(newEntry);
    });
}


function clearTable() {
    
    $("#entryData").empty();
}

removeEntry = () => {
    let i = event.target.dataset.id;
    const newEntries = [...state.entries]
    newEntries.splice(i, 1);

    state.entries = newEntries;
    updateDOM();
}

function clearForm() {
    document.querySelector("#inputName").focus();
    $("#inputGender").val("");
    $("#my-form").trigger("reset");
}

fillForm = () => {
    state.update = event.target.dataset.id;
    state.isAddEnabled = false;
    updateDOM();
    const e = state.entries[event.target.dataset.id];
    $("#inputName").val(e.name);
    $(`#radio-${e.gender}`).attr('checked', true);
    $("#inputAge").val(e.age);
    $(`option[value='${e.city}'`).attr("selected", true);
}


updateEntry = () => {
    state.entries[state.update] = getEntry(event);
    state.isAddEnabled = true;
    updateDOM();
}

resetForm = () => {
    event.preventDefault();
    state.update = NaN; 
    clearForm();
    state.isAddEnabled = true;
    updateDOM();
}
