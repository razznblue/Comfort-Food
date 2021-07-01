const profileImgContainer = document.querySelector(".profile-img-container");
const popUpUploadImgForm = document.querySelector(".upload-profile-img-form");

const profileImgInput = document.querySelector("#profile-img-input");
const profileImg = document.querySelector(".profile-img");

console.log(profileImg.src);

if (profileImg.src !== "picture1.jpg") {
    profileImg.style.height = "230%";
    profileImg.style.marginTop = "1.5rem";
}

if (profileImgContainer) {
    profileImgContainer.addEventListener("click", () => {
        console.log("clicked on profile pic");
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