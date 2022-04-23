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
        $( this )
          .addClass( "ui-state-highlight" )
          console.log("Image dropped!")
      }
    });
  } );