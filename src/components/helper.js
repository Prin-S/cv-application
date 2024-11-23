const yearRegex = /^(19|20)([0-9]{2})$/;

function checkStart(e) {
    if (!e.target.value.match(yearRegex)) {
        return e.target.setCustomValidity('Value must be 1900-2099.');
    }
    return e.target.setCustomValidity('');
}

function checkEnd(e) {
    if (e.target.value == 'present') {
        return e.target.setCustomValidity('');
    } else if (!e.target.value.match(yearRegex)) {
        return e.target.setCustomValidity('Value must be 1900-2099. Enter "present" if this is current.');
    }
    return e.target.setCustomValidity('');
}

function editInfo(item) { // Hide the displayed information while it is being edited.
    document.getElementById(item.id + '-1').style.display = 'none';
    document.getElementById(item.id + '-2').style.display = 'block';
}

function hideAfterEditInfo(e) { // Hide the form and display the information.
    document.getElementById(e.target.id + '-1').style.display = 'block';
    document.getElementById(e.target.id + '-2').style.display = 'none';
}

function cancelEditInfo(item) { // Hide the form and display the information.
    document.getElementById(item.id + '-1').style.display = 'block';
    document.getElementById(item.id + '-2').style.display = 'none';
}

export { checkStart, checkEnd, editInfo, hideAfterEditInfo, cancelEditInfo };