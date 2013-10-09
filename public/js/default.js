$(document).ready(function () {
    $('.amount').keyup(function (e) {
        if (e.keyCode == 13) {
            go();
        }
    });            
    $('#go').click(function(){
        go();
    });
});
function go() {
    document.location.href = '/from/' + $('.amount').val();
}
