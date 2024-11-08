// lister for button seting and info 
const basicInfo = document.querySelector('.basic-info-btn')
const personalInfo = document.querySelector('.personal-info-btn')
const editProfileBtn = document.querySelector('#edit-profile')
const addDetailsBtn = document.querySelector('#add-details')
const changePasswordBtn = document.querySelector('.change-password')
const setting = document.querySelector('.setting')
const infoDetails = document.querySelector('#info-details')
const infoBasic = document.querySelector('#info-basic')
const editBasicForm=  document.querySelector('.edit-basci-modal')
const personalFornmEdit =  document.querySelector('.personal-form-edit')
const changePasswordForm =  document.querySelector('.change-password-modal')

basicInfo.addEventListener('click', (e) => {
    e.preventDefault()
    infoBasic.style.display = 'block'
    infoDetails.style.display = 'none'
    editProfileBtn.style.display = 'none';
   addDetailsBtn.style.display = 'none';
    changePasswordBtn.style.display = 'none';
    editBasicForm.style.display = 'none';
    personalFornmEdit.style.display = 'none';
    changePasswordForm.style.display = 'none';


})
personalInfo.addEventListener('click', (e) => {
    e.preventDefault()
    infoBasic.style.display = 'none'
    infoDetails.style.display = 'block'
    editProfileBtn.style.display = 'none';
    addDetailsBtn.style.display = 'none';
    changePasswordBtn.style.display = 'none';
    editBasicForm.style.display = 'none';
    personalFornmEdit.style.display = 'none';
    changePasswordForm.style.display = 'none';

})
setting.addEventListener('click', (e) => {
     editProfileBtn.style.display = 'block';
     addDetailsBtn.style.display = 'block';
     changePasswordBtn.style.display = 'block';


})
editProfileBtn.addEventListener('click',() => {
  editBasicForm.style.display = 'block';
    infoBasic.style.display = 'none';
    infoDetails.style.display = 'none';
    personalFornmEdit.style.display = 'none';
    changePasswordForm.style.display = 'none';


    
})
addDetailsBtn.addEventListener('click', () => {
  personalFornmEdit.style.display = 'block';
    infoBasic.style.display = 'none';
    infoDetails.style.display = 'none';
    editBasicForm.style.display = 'none';
    changePasswordForm.style.display = 'none';

})
changePasswordBtn.addEventListener('click', () => {
    changePasswordForm.style.display = 'block';
    infoBasic.style.display = 'none';
    infoDetails.style.display = 'none';
    editBasicForm.style.display = 'none';
    personalFornmEdit.style.display = 'none';


})

// links 
const bioLink = document.getElementById("bio");
const settingLink = document.getElementById("setting");

// Select the bio and setting sections
const bioSection = document.getElementsByClassName("bio-section")[0]; 
const settingSection = document.getElementsByClassName("setting-section")[0]; 
bioLink.addEventListener("click", () => {
// Display bio section and hide setting section
bioSection.style.display = "block"; 
settingSection.style.display = "none";

// Manage active class
bioLink.classList.add('active');
settingLink.classList.remove('active');
});

settingLink.addEventListener("click", () => {
// Display setting section and hide bio section
bioSection.style.display = "none"; 
settingSection.style.display = "block";

// Manage active class
bioLink.classList.remove('active');
settingLink.classList.add('active');
});
// edit bio buuton
const editBioBtn = document.querySelector('.edit-bio-btn');
editBioBtn.addEventListener('click', () => {
    // Show the textarea form and hide the bio text
    const textAreaEditBio = document.querySelector('.text-edit');
    textAreaEditBio.style.display = 'block';

    const bioText = document.getElementById('bio-text');
    bioText.style.display = 'none';
});

// Function to close the bio form
function closeBio() {
    const textAreaEditBio = document.querySelector('.text-edit');
    textAreaEditBio.style.display = 'none';

    const bioText = document.getElementById('bio-text');
    bioText.style.display = 'block';
}


// images
const imagesInput = document.getElementById('images');
const previewContainer = document.getElementById('preview-container-more');
const moreBtn = document.querySelector('.more-btn');

imagesInput.addEventListener('change', function (event) {
    const files = event.target.files;
    previewContainer.innerHTML = ''; 

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            previewContainer.appendChild(imgElement);
        };

        reader.readAsDataURL(file);
    }

    moreBtn.style.display = 'block';
});

// Cancel the image preview and reset the input
function cancelImage() {
    imagesInput.value = ''; 
    previewContainer.innerHTML = ''; 
    moreBtn.style.display = 'none'; 
}



// profile image



function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.querySelector('#image-profile-pic img').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    document.querySelector("#upload-icon").click()
    document.querySelector(".button-container").style.display = 'flex';

}
// cover image   

function previewImageCover(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.querySelector('.cover-contaner img').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    document.querySelector(".button-container-cover").style.display = 'flex';
    document.querySelector(".file-upload-button").style.display = 'none';

}




    
function canclingaddingDetails(){
    window.location.reload();

}

const closeSettings = () => {
    settingsModal.style.display = 'none';
    infoSection.style.display = 'block';
    window.location.reload();
};



function cancelBioChanging() {
    const bioForm = document.querySelector('.bio-form');
    if (bioForm) {
        bioForm.remove();
    }
    const bioText = document.getElementById('bio-text');
    if (bioText) {
        bioText.style.visibility = 'visible';
    }
}



const closePassword = (button) => {
    const passwordForm = button.parentElement; 
    if (passwordForm) {
        passwordForm.remove();
    }
};
