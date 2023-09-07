const addPostLink = document.getElementById('editProfileLink');
const closeModal = document.getElementById('closeModal');
const closeModalButton = document.getElementById('closeModalButton');
const postModal = document.getElementById('postModal');
const fileInput = document.getElementById('fileInput');
const selectedFileName = document.getElementById('selectedFileName');

addPostLink.addEventListener('click', () => {
    postModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    postModal.classList.add('hidden');
});

closeModalButton.addEventListener('click', () => {
    postModal.classList.add('hidden');
});

// Handle file selection and update the display element
fileInput.addEventListener('change', () => {
    const fileName = fileInput.files[0] ? fileInput.files[0].name : 'No file selected';
    selectedFileName.textContent = fileName;
});