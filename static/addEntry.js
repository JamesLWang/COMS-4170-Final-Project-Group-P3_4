function addEntry(res){
    console.log("SUBMITTED")
    $.ajax({
        type: "POST",
        url: "/search",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(res),
        success: function(res){
            let out = res["res"]
            if(out["res"] == 0){
                $("#main").html('<br>No results found for <b>' + res["res"]["searchTerm"] + '</b>.')
            }
            else{
                display_list(res)
            }
        },
        error: function(res, status, error){
            console.log("Search Error Occured")
        }});
    }

function isValidHttpUrl(string) {
    let url;
    
    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    
    return url.protocol === "http:" || url.protocol === "https:";
    }

function checkAbstract(s){
    if(s.trim().length == 0){
        console.log("Abstract too short")
        $("#abstractError").html("Abstract cannot be blank")
        $("#paperAbstract").focus()
        return 0
    }
    $("#abstractError").html("")
    return 1
}

function checkAuthors(s){
    if(s.trim().length == 0){
        console.log("Abstract too short")
        $("#authorError").html("Paper Authors cannot be blank")
        $("#paperAuthors").focus()
        return 0
    }
    $("#authorError").html("")
    return 1
}

function checkURL(s){
    if(s.trim().length == 0){
        console.log("URL Cannot be blank!")
        $("#URLError").html("URL cannot be blank")
        $("#paperURL").focus()
        return 0
    }
    if (!isValidHttpUrl(s)){
        console.log("Invalid URL!")
        $("#URLError").html("Invalid URL")
        $("#paperURL").focus()
        return 0
    }
    $("#URLError").html("")
    return 1
}

function checkYear(s){
    if(s.trim().length == 0){
        console.log("Conference Year Cannot be Blank!")
        $("#yearError").html("Conference year cannot be blank")
        $("#paperYear").focus()
        return 0
    }
    if(isNaN(s)){
        console.log("Conference Year Cannot be Blank!")
        $("#yearError").html("Conference year not valid")
        $("#paperYear").focus()
        return 0
    }
    if(!isNaN(s) && parseInt(s) > 2022){
        console.log("Conference Year Cannot be Blank!")
        $("#yearError").html("Conference year cannot be in the future")
        $("#paperYear").focus()
        return 0
    }
    $("#yearError").html("")
    return 1
}

let CONFERENCES = ['icml', 'ieee','neurips', 'cvpr', 'eccv', 'arxiv', 'none', 'iclr', 'iccv']
function checkConference(s){
    if(s.trim().length == 0){
        console.log("Abstract too short!")
        $("#conferenceError").html("Conference Name cannot be blank")
        $("#paperConference").focus()
        return 0
    }
    if(CONFERENCES.indexOf(s.toLowerCase()) == -1){
        $("#conferenceError").html("Invalid Conference Name. Must be either ICML, NeurIPS, CVPR, ECCV, ICLR, ICCV, or None, or arXiv")
        $("#paperConference").focus()
        return 0
    }
    $("#conferenceError").html("")
    return 1
}

function checkTitle(s){
    if(s.trim().length == 0){
        $("#titleError").html("Paper Title cannot be blank")
        $("#paperTitle").focus()
        return 0
    }
    $("#titleError").html("")
    return 1
}

function submitPayload(payload){
    console.log("SUBMITTED")
    $.ajax({
        type: "POST",
        url: "/create",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(payload),
        success: function(res){
            let out = res["res"]["newItem"]
            console.log("OEFHOEFH")
            console.log(res)
            console.log(out)
            $("#paperTitle").val("")
            $("#paperAuthors").val("")
            $("#paperConference").val("")
            $("#paperYear").val("")
            $("#paperURL").val("")
            $("#paperAbstract").val("")
        
            $("#submitSuccess").addClass("success")
            $("#submitSuccess").html("New item successfully created. See it <a href='" +  out + "'>here</a>")
            $("#paperTitle").focus()
            // TODO HERE
        },
        error: function(res, status, error){
            console.log("Payload Error")
        }});
    }

function querySubmitter(){
    $("#submitAdd").click(function () {
        let paperTitle = $("#paperTitle").val()
        let paperAuthors = $("#paperAuthors").val()
        let paperConference = $("#paperConference").val()
        let paperYear = $("#paperYear").val()
        let paperURL = $("#paperURL").val()
        let paperAbstract = $("#paperAbstract").val()
        
        let a = checkAbstract(paperAbstract);
        let b = checkURL(paperURL);
        let c = checkYear(paperYear);
        let d = checkConference(paperConference);
        let e = checkAuthors(paperAuthors);
        let f = checkTitle(paperTitle);

        if(a && b && c && d && e && f){
            let payload = {
                "paperTitle": paperTitle,
                "paperAuthors": paperAuthors,
                "paperConference": paperConference,
                "paperYear": paperYear,
                "paperURL": paperURL,
                "paperAbstract": paperAbstract,
            }

            submitPayload(payload)

        }

        
        });
    };
    
$(document).ready(function() {
    $("#submitAdd").click(function () {
        let paperTitle = $("#paperTitle").val()
        let paperAuthors = $("#paperAuthors").val()
        let paperConference = $("#paperConference").val()
        let paperYear = $("#paperYear").val()
        let paperURL = $("#paperURL").val()
        let paperAbstract = $("#paperAbstract").val()
        
        let a = checkAbstract(paperAbstract);
        let b = checkURL(paperURL);
        let c = checkYear(paperYear);
        let d = checkConference(paperConference);
        let e = checkAuthors(paperAuthors);
        let f = checkTitle(paperTitle);

        if(a && b && c && d && e && f){
            let payload = {
                "paperTitle": paperTitle,
                "paperAuthors": paperAuthors,
                "paperConference": paperConference,
                "paperYear": paperYear,
                "paperURL": paperURL,
                "paperAbstract": paperAbstract,
            }

            submitPayload(payload)

        }

        
        });
    

    
})

