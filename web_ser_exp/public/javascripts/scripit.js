$(() => {
    $("#btnToggle").click(fetchWeather);
})


function fetchWeather() {
    $('#place').html(`Loading...`);
    setEmpty();
    let address = $('#add').val()
    // http://localhost:3000
    // http://localhost:3000
    let url = '/weather?address='+address
    console.log(url);
    $.ajax({
        url: url,
        method: 'GET',
        success: data => {
            if(data.error){
                $('#place').html(`Unable To Find Weather For This Location`);
                setEmpty();
            }

            $('#place').html(data.place);
            $('#forecast').html(data.summary);
            $('#tempe').html(data.temperature); 
            $('#rain').html(data.rainProbability);
            
        },
        error: error =>{
           
        }
    })
}

function setEmpty(){
    $('#forecast').html(``);
    $('#tempe').html(``); 
    $('#rain').html(``);
}
