$(document).ready(function () {
    $.getJSON(document.location.pathname, function(data) {
        console.log(data);
    });
});
