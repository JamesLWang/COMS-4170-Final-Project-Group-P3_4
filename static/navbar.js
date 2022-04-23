
function display_list(res, key){
    $("#main").empty()
    $("#main").html('<br> A total of <b>' +  res["res"]["res"].length + '</b> search results was found for <b>' + res["res"]["searchTerm"] + '</b>: <br><br>')

    $.each(res["res"]["res"], function(index, value){
        console.log(res["res"]["searchTerm"])
        $("#main").append(makeRow(value, res["res"]["searchTerm"]))
    })
};

// Copied from here - Case insensitive replacements
// https://stackoverflow.com/questions/29896907/bold-part-of-string 
const bold = (str, query) => {
    const n = str.toUpperCase();
    const q = query.toUpperCase();
    const x = n.indexOf(q);
    if (!q || x === -1) {
        return str; // bail early
    }
    const l = q.length;
    return str.substr(0, x) + '<b>' + str.substr(x, l) + '</b>' + str.substr(x + l);
}

const underline = (str, query) => {
    const n = str.toUpperCase();
    const q = query.toUpperCase();
    const x = n.indexOf(q);
    if (!q || x === -1) {
        return str; // bail early
    }
    const l = q.length;
    return str.substr(0, x) + '<u>' + str.substr(x, l) + '</u>' + str.substr(x + l);
}


function makeRow(x, key){
    let row = $("<div></div>")
    row.addClass("row")
    row.addClass("bg-light")
    let col_1 = $("<div></div>")
    col_1.addClass("col-sm-8")
    
    let entry = $("<div></div>")
    entry.html(
        "<h4>" +  underline(x['title'], key) +"</h4>"
    )

    let authors = $("<i></i>")

    // $.each(x["authors"], function(i, value){
    //     if(i != x["authors"].length-1){
    //     authors.append(value + ", ")
    //     }
    //     else{
    //         authors.append(value)
    //     }
    // }
    // )
    authors.html(bold(x["authors"], key))
    entry.append(authors)
    entry.append("<br>Conference/Journal & Year: " + bold(x['conference'], key) + ", " + bold(String(x['year']), key))
    entry.append("<br>")
    
    // let button= $("<a></a>")
    // button.addClass("btn btn-light")
    // button.html("Show More")
    // let t = "/view/" + x["id"]
    // button.attr("href", t)
    // entry.append("<br>")
    // entry.append(button)
    // entry.append("<br>")
    entry.append("<br>")
    col_1.append(entry)
    row.append(col_1)

    

    let col_2 = $("<div clas></div>")
    col_2.addClass("col-sm-4'")
    col_2.html("HELLO")
    
    let s_ = "<a href='/view/" + x["id"] + "'>"
    s_ = s_ + "<div><span class='hideScroll'></span>"
    console.log(x["url"])
    s_ = s_ + "<iframe frameBorder=0 src='" + x["url"] + "'scrolling='no' title='Preview of PDF for " + x['title'] + "'></iframe></div></a>"
    col_2.html(s_)
    // col_2.html(" <a href='view/'" + x['id'] + "> <div id=''> <span class='hideScroll'></span><iframe  frameBorder=0  src='" + x['id'] + "'  scrolling='no' ></iframe></div></a>")
    row.append(col_2)
    

    return row
}



function submitQuery(res){
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
                $(".welcome").hide()
                display_list(res, res["res"]["searchTerm"])
            }
        },
        error: function(res, status, error){
            console.log("Search Error Occured")
        }});
    }

function querySubmitter(){
    $("#submitSearch").click(function () {
        let key = $("#searchVal").val()
        if (key.trim().length == 0){
            $("#searchVal").val("");
            $("#searchVal").focus();
            return
        }
        let res = {
            "key": key
        }
        // Implement Warning Here    
        submitQuery(res)
        
        });

    $("#searchVal").keypress(function(e) 
        {
        let key = $("#searchVal").val()
        if (e.which == 13){
            if (key.trim().length == 0){
                $("#searchVal").val("");
                $("#searchVal").focus();
            }
            else
            {        
                let res = {
                    "key": key
                }
                // Implement Warning Here    
                submitQuery(res)
            }
        }
        });
    };
        
    
$( function() {
    $( "#draggable" ).draggable();
  } );


$(document).ready(function() {
    $("#submitSearch").click(function () {
        let key = $("#searchVal").val()
        if (key.trim().length == 0){
            $("#searchVal").val("");
            $("#searchVal").focus();
            return
        }
        let res = {
            "key": key
        }
        // Implement Warning Here    
        submitQuery(res)
        
        });

        $("#searchVal").keypress(function(e) 
        {
        let key = $("#searchVal").val()
        if (e.which == 13){
            if (key.trim().length == 0){
                $("#searchVal").val("");
                $("#searchVal").focus();
            }
            else
            {        
                let res = {
                    "key": key
                }
                // Implement Warning Here    
                submitQuery(res)
            }
        }
        });
});

