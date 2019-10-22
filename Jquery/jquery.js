$(() => {
    $(document).on("click", ".delete", deleteME);
    $(document).on("click", ".update", updateME);
    $("#btnToggle").click(showItems);
    $("#submitNew").click(submitForm);
    $("#submitUpdate").click(updateData);
    $(document).on("click", "#newData" ,()=>{
        console.log("inside");
        $("#form").css("visibility","visible");
    });
})

function updateME(){
    $('#updateForm').css("visibility","visible");
    let id = $(this).attr('data-id');
    $.ajax({
        url: 'http://localhost:3000/employees/' + id,
        method: 'GET',
        success: data => {
            $('#updateForm #id').val(data.id);
            $('#updateForm #first_name').val(data.first_name);
            $('#updateForm #last_name').val(data.last_name);
            $('#updateForm #email').val(data.email);

        }
    })
}

function updateData(e) {
    console.log("update submit");
    e.preventDefault();
    let id = $("#updateForm #id").val();
    let d = $("#updateForm").serialize();
    console.log(id);
    $.ajax({
        url: 'http://localhost:3000/employees/'+id,
        method: 'PUT',
        data: d,
        success: function () {
            console.log("success");
            showItems();
            $('#updateForm').css("visibility","hidden");
        },
        error: (data, status) => {
            console.log(data);
            console.log(status);
        }
    })
}



function showItems() {
    $.ajax({
        url: 'http://localhost:3000/employees/',
        method: 'GET',
        success: data => {
            $("#tbl-data").html(" <tr><th>Id</th><th>FirstName</th><th>LastName</th><th>Email</th></tr>");
            for (let i = 0; i < data.length; i++) {
                $("#tbl-data").append("<tr><td>" + data[i].id + "</td><td>" + data[i].first_name + "</td><td>" + data[i].last_name + "</td><td>" + data[i].email + "</td> <td><button class=" + "delete" + " data-id='" + data[i].id + "'>Delete</button></td> <td><button class=" + "update" + " data-id='" + data[i].id + "'>Update</button></td> </tr>")
            }
        }
    })
}

function submitForm(e) {
    console.log("new submit");
    e.preventDefault();
    let d = $("#form").serialize();
    $.ajax({
        url: 'http://localhost:3000/employees/',
        method: 'POST',
        data: d,
        success: function () {
            console.log("success");
        },
        error: (data, status) => {
            console.log(data);
            console.log(status);
        }
    })
}

function deleteME() {
    let id = $(this).attr('data-id');
    jQuery.ajax({
        url: 'http://localhost:3000/employees/' + id,
        type: 'DELETE',
        success: function (data) {
            showItems();
        }
    })
}
