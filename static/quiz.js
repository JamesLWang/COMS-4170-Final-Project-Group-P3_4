let nppc = ["Phyllis", "Angela"]
let ppc = []

function itemDropped(event, ui, col, cur) {
    if (col.includes(ui.draggable.html())) {
        console.log("Dragged Item is Already here")
    } else {
        col.push(ui.draggable.html())
        let idx = cur.indexOf(ui.draggable.html())
        cur.splice(idx, 1)
        makeNames(ppc)
    }
}

function generateDraggable(index, value) {
    let name = $("<div></div>")
    name.html(value)
    name.addClass("nameRow")
    name.append('<img src="https://img.money.com/2018/02/180209-cost-olympic-figure-skater-bradie-tennell.jpg", width="100">')
    return name
}

function makeNames(names) {
    $("#nppcList").empty()

    $.each(nppc, function(index, value) {
        let person = generateDraggable(index, value)
        $("#nppcList").append(person)
    });

    $("#ppcList").empty()
    $.each(ppc, function(index, value) {
        let person = generateDraggable(index, value)
        $("#ppcList").append(person)
    });

    $(".nameRow").draggable({
        revert: true
    })

    $("#ppc").droppable({
        drop: function(event, ui) {
            itemDropped(event, ui, ppc, nppc)
            // console.log(ui.draggable.html() + " Dropped into Toe Jumps")
            console.log("Item Dropped Correctly into Toe Jumps, +1 - [TODO]: Provide Feedback and make item disappear")
            console.log("[TODO] Keep Next button disabled until all items are gone")
        },
    });

    $("#nppc").droppable({
        drop: function(event, ui) {
            itemDropped(event, ui, nppc, ppc)
            // console.log(ui.draggable.html() + " Dropped into NPPC")
            console.log("Item Dropped Correctly into NPPC")
        },
    });

    $(".nameRow").hover(
        function() {
            $(this).addClass("highlightBackground")
        },
        function() {
            $(this).removeClass("highlightBackground")
        }
    )
}

$(document).ready(function() {
    makeNames(nppc)
});