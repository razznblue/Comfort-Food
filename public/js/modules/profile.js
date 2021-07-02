const profileImgContainer = document.querySelector(".profile-img-container");
const popUpUploadImgForm = document.querySelector(".upload-profile-img-form");

const profileImgInput = document.querySelector("#profile-img-input");
const profileImg = document.querySelector(".profile-img");
const deleteBtn = document.querySelector(".btn-danger");

if (profileImg.src !== "picture1.jpg") {
    profileImg.style.height = "230%";
    profileImg.style.marginTop = "1.5rem";
}

if (profileImgContainer) {
    profileImgContainer.addEventListener("click", () => {
        popUpUploadImgForm.style.display = "block";
        popUpUploadImgForm.style.opacity = "1";
        popUpUploadImgForm.style.zIndex = "1";
        setTimeout(() => { popUpUploadImgForm.style.opacity = "1" });
        
        const exitBtn = document.querySelector(".exit-btn");
        exitBtn.addEventListener("click", () => {
            popUpUploadImgForm.style.opacity = "0";
            popUpUploadImgForm.style.zIndex = "-1";
        });
    });
}

if (profileImgInput) {
    profileImgInput.addEventListener("change", () => {
        const newProfileImg = profileImgInput.files[0];
        console.log(newProfileImg);
        profileImg.src = URL.createObjectURL(newProfileImg);
        profileImg.style.height = "230%";
        profileImg.style.marginTop = "1.5rem";
    });
}

if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        console.log("clicked on delete btn");
        confirm("Danger. This action will delete your account and any associated data including pictures, menus, and foods currently in your account. Are you sure you want to delete your account?");
    });
}