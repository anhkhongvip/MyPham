$(document).ready(function() {
    getListCategories();
})

function getListCategories(){
    $.ajax({
        type: "GET",
        url: location.protocol + '//' + location.host + `/api/category`,
        dataType: "json",
    })
    .done(function (response) {
        
    })
    .fail(function (response) {

    })
} 