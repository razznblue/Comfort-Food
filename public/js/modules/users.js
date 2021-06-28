$(document).ready(() => {
    let username = "";
    $('.delete-user').on("click", (e) => {
        $target = $(e.target);
        username = $target.attr("data-id");
        console.log("username: " + username);
        $.ajax({
            type: 'DELETE',
            url: '/users/' + username + "/delete",
            success: (response) => {
                alert("Deleting User " + username + "..." );
                window.location.href = "/users";
            },
            error: (err) => { console.log(err); }
        });
    });
});


