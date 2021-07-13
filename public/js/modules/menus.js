$(document).ready(() => {
    let menuNick = "";
    $('.delete-menu').on("click", () => {
        menuNick = $('.delete-menu').attr("data-id");
        const username = getUserName(location.href);
        $.ajax({
            type: 'DELETE',
            url: '/users/' + username + "/" + menuNick + "/delete",
            success: (response) => {
                alert("Deleting Menu " + menuNick + "..." );
                window.location.href = "/users/" + username + "/menus";
            },
            error: (err) => { console.log(err); }
        });
    });
});

const getUserName = (url) => {
    url = url.split("/");
    return url[4];
}
