/*GET show request and listen xml response*/
function sendShowRequest() {
    $.ajax({
        type:"GET",
        url:"/todolist/get-list",
        success:showSuccess,
        dataType:'xml'
    });
}

function showSuccess(xml){
    var items = $(xml).find('item');
    //alert(items.length);
    var list = document.getElementById("todo-list");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    
    for (var i = 0; i < items.length; ++i) {
        // Parses the item id and text from the DOM
        var item_text = $(items[i]).find('text').text();
        var item_id = $(items[i]).find('id').text();
        console.log(item_text);
        // Builds a new HTML list item for the todo-list item
        var newItem = document.createElement("tr");
        newItem.innerHTML = "<td id="+item_id+"><div class='show-item row-fluid'>"
        + "<span class='todo-content'>"+item_text+"</span>"
        
        +"<div class='pull-right item-buttons'>"
            +"<span class='todo-edit' onclick='switchMode("+item_id+")'></span>"
            +"<span class='todo-destroy' onclick='sendDeleteRequest("+item_id+")'></span>"
        +"</div>"
        
        +"</div><div class='edit-item input-append hidden'>"
            +"<input id='edit"+item_id+"' type='text' class='todo-input input-medium' value='"+item_text+"' /><button type='submit' class='btn' onclick='sendEditRequest("+item_id+")'>Create</button></div></td>";
        list.appendChild(newItem);
    }
    
    
    var counter = document.getElementById("todo-stats");
    var count ="<span class='todo-count'>"
                    +"<span class='badge'>"+items.length+"</span>"
                    +" items left.</span>";
    counter.innerHTML=count;
                    
  }   


/*POST add request and listen html response*/
function sendAddRequest() {
    $.ajax({
        type:"POST",
        url:"/todolist/add-item",
        data:{
            'item':$('#new-item').val(),
            'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()
        },
        success:addSuccess,
        dataType:'html'
    });
}


function addSuccess(data){
    //Empty input space
    $('#new-item').val('');
    //Get total number of things after adding
    var num = $(data).find('#num').attr('value');
    var counter = document.getElementById("todo-stats");
    var count ="<span class='todo-count'>"
                    +"<span class='badge'>"+num+"</span>"
                    +" items left.</span>";
    counter.innerHTML=count;
    //Append new item to the top of list in DOM
    var list = document.getElementById("todo-list");
    var newItem = document.createElement("tr");
    newItem.innerHTML = data;
    list.insertBefore(newItem,list.childNodes[0]);
    
}

/*POST delete request and listen json response*/
function sendDeleteRequest(item_id) {
    $.ajax({
        type:"POST",
        url:"/todolist/delete-item/"+item_id,
        data:{
            'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()
        },
        success:deleteSuccess,
        dataType: "json",
    });
}

function deleteSuccess(data){
    //Get deleted item id, Update dom
    var item_id = data["item_id"]
    var num = data["num"]
    var counter = document.getElementById("todo-stats");
    var count ="<span class='todo-count'>"
                    +"<span class='badge'>"+num+"</span>"
                    +" items left.</span>";
    counter.innerHTML=count;
    $('#'+item_id).parent().remove();
}

function sendEditRequest(item_id) {
    //alert($('#edit'+item_id).val())
    $.ajax({
        type:"POST",
        url:"/todolist/edit-item/"+item_id,
        data:{
            'item':$('#edit'+item_id).val(),
            'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()
        },
        success:editSuccess,
        dataType:'json'
    });
}

function editSuccess(data){
    var update_id = data["item_id"];
    var update_item = data["item"];
    //alert(update_item);
    $('#'+update_id).children().children().first().text(update_item);
    $('#'+update_id).children().removeClass('hidden');
    $('#'+update_id).children().next().addClass('hidden');
    
}

function switchMode(item_id) {
    //sendShowRequest();
    $('#'+item_id).children().addClass('hidden');
    $('#'+item_id).children().next().removeClass('hidden');
}
