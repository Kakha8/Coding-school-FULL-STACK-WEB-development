function showUpdateOptions(username) {
    document.getElementById('updateUser').value = username;
    document.getElementById('updateModal').style.display = 'block';
}

function hideUpdateOptions() {
    document.getElementById('updateModal').style.display = 'none';
}

function submitUpdateOptions() {
    const form = document.getElementById('updateOptionsForm');
    const field = document.querySelector('input[name="field"]:checked').value;
    form.action = `/update/${document.getElementById('updateUser').value}/${field}`;
    form.submit();
}

function confirmDelete() {
    return confirm('Are you sure you want to delete this user?');
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === document.getElementById('updateModal')) {
        hideUpdateOptions();
    }
}