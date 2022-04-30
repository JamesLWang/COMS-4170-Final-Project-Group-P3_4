$( function() {
    console.log("OK")
    $( "#draggable" ).draggable();
  } );

 $( function() {
    $( "#draggable_parent_1" ).draggable({ containment: "parent" });
    $( "#draggable_parent_2" ).draggable({ containment: "parent" });
    $( "#draggable_parent_3" ).draggable({ containment: "parent" });
    $( "#draggable_parent_4" ).draggable({ containment: "parent" });
    $( "#draggable_1" ).draggable();
    $( "#draggable_2" ).draggable();
    $( "#draggable_3" ).draggable();
    $( "#draggable_4" ).draggable();
    $( "#draggable_5" ).draggable();
    $( "#draggable_6" ).draggable();
    $( ".droppable" ).droppable({
      drop: function( event, ui ) {
          $( this ).addClass( "ui-state-highlight" )
          console.log("Image dropped!")
          console.log($(this).attr('option'))
          console.log(ui.draggable.attr('correct-answer'))
          if((ui.draggable.attr('correct-answer')) == ($(this).attr('option'))) {
            //$( this ).addClass( "ui-state-highlight" );
            //make no longer draggable?
            //ui.draggable( 'disable' );
            
            alert("Correct Answer!")

            item = {
                "index": ui.draggable.attr('id'),
                "db": ui.draggable.attr('db'),
                "correct": 1
            }

            ui.draggable.remove()
            $( this ).removeClass( "ui-state-highlight" )
            $.ajax({
                type: "POST",
                url: "/update_correctness",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(item),
                success: function (response) {
                    console.log("success");
                },
                error: function(request, status, error){
                    console.log("Error");
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            });
          }
          else {
            // wrong answer popup
            //ui.draggable( 'disable' );

            alert("Incorrect, please try again!")

            item = {
                "index": ui.draggable.attr('id'),
                "db": ui.draggable.attr('db'),
                "correct": 0
            }
            $.ajax({
                type: "POST",
                url: "/update_correctness",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(item),
                success: function (response) {
                    console.log("success");
                },
                error: function(request, status, error){
                    console.log("Error");
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            });
          }
      }
    });
 });
