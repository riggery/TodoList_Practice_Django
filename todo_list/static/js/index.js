window.onload = function(){
    sendShowRequest();
    $('#new-item').keydown(function (e){
        if(e.keyCode == 13){
            if (/\S/.test($('#new-item').val())) {
                sendAddRequest();
            }else{
                alert("Empty!  Invalid Input")
            }
        }
    })
}