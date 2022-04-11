function submitEditPayload(payload){
    console.log("SUBMITTED")
    console.log("/edit/" + payload["id"])
    console.log(payload)
    $.ajax({
        type: "POST",
        url: "/edit/" + payload["id"],
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(payload),
        success: function(res){
            let out = res["res"]["out"]
            location.href = '/view/' + out;
        },
        error: function(res, status, error){
            console.log("Payload Error")
        }});
    }

function querySubmitter(){
    $("#submitEdit").click(function () {
        console.log("Edit Button Clicked")
        let paperTitle = $("#paperTitle").val()
        let paperAuthors = $("#paperAuthors").val()
        let paperConference = $("#paperConference").val()
        let paperYear = $("#paperYear").val()
        let paperURL = $("#paperURL").val()
        let paperAbstract = $("#paperAbstract").val()
        let ID = $("#entryID").text().trim()

        let a = checkAbstract(paperAbstract);
        let b = checkURL(paperURL);
        let c = checkYear(paperYear);
        let d = checkConference(paperConference);
        let e = checkAuthors(paperAuthors);
        let f = checkTitle(paperTitle);

        if(a && b && c && d && e && f){
            console.log("SUCCEWSS")

            let payload = {
                "id": ID,
                "title": paperTitle,
                "authors": paperAuthors,
                "conference": paperConference,
                "year": paperYear,
                "url": paperURL,
                "abstract": paperAbstract,
            }

            console.log(payload['id'])

            submitEditPayload(payload)

        }
        });
    }
    
$(document).ready(function() {
    
    querySubmitter()
    $("#submitDiscard").click(function () {
        console.log("OKA")
        $( function() {
            $('#dialog').css('display','visible');
            $( "#dialog" ).dialog();
          } );
    })

    $("#confirmDiscard").click(function () {
        location.href = "/view/" + $("#entryID").text().trim()
    })

    $("#closeModal").click(function () {
        $( "#dialog" ).dialog("close");

    })


})

$("#submitDiscard").click(function () {
    console.log("OKA")
})


querySubmitter()

