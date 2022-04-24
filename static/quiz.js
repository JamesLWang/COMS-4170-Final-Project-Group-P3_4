var score = 0;

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
        //$( this )
          //.addClass( "ui-state-highlight" )
          console.log("Image dropped!")
          console.log($(this).attr('option'))
          console.log(ui.draggable.attr('correct-answer'))
          if((ui.draggable.attr('correct-answer')) == ($(this).attr('option'))) {
            $( this ).addClass( "ui-state-highlight" );
            // correct answer popup
            score++;
            console.log(score);
            //make no longer draggable
            ui.draggable( 'disable' );
          }
          else {
            // wrong answer popup
            console.log(score);
            // make no longer draggable
            ui.draggable( 'disable' );
          }
      }
    });
  } );