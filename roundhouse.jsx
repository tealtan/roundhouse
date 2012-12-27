/*
* ROUNDHOUSE    
* Simple: round all objects to nearest whole number
* Caveats: •currently forces to pixels
                • probably has a likely +1px rounding issue in some circumstanes
*/

//set to false to hide annoying alerts
var debug = false;


//checks if a doc is open
if (  app.documents.length > 0 ){
    main();
} else {
    alert("Please open a file before using Roundhouse")
}


//main loop
function main() {
    var docRef = app.activeDocument;

    //set units to pixels just to be safe
    with(docRef.viewPreferences){
        //alert(docRef.viewPreferences.horizontalMeasurementUnits);
        horizontalMeasurementUnits = MeasurementUnits.pixels;
        verticalMeasurementUnits = MeasurementUnits.pixels;
    }
        
    //loop through pageItems
    var myPageItems = app.selection;
    
    for (var j = 0; j < myPageItems.length; j++ ) {

            if (!(myPageItems[j].locked)) // Skip locked objects
                {
                    if (myPageItems[j].constructor.name == "TextFrame") {
                        myPageItems[j].fit(FitOptions.frameToContent); // Fit frame to content
                    }
                    roundPageItem(myPageItems[j]); // Round object dimensions
                }
        }
    
}


//main rounding function
function roundPageItem(pageItem) {
    
    if (debug) alert('was:'+ pageItem.visibleBounds);
    
    //get and round all pageItem points
    var currY1 = pageItem.visibleBounds[0];
    var currX1 = pageItem.visibleBounds[1];
    /*
    var currY2 = pageItem.visibleBounds[2];
    var currX2 = pageItem.visibleBounds[3];
    */
    
    //calculate and round height and width
    var roundW = Math.round(pageItem.visibleBounds[3] - currX1);
    var roundH = Math.round(pageItem.visibleBounds[2] - currY1);
    
    //round upper left x,y
    var newY1 = Math.round(currY1);
    var newX1 = Math.round(currX1);
    
    //add rounded height and width
    var newY2 = newY1 + roundH;
    var newX2 = newX1 + roundW;
    
    //update pageItem points
    pageItem.visibleBounds = [newY1,newX1,newY2,newX2];
    
    if (debug) alert('now:'+ pageItem.visibleBounds);
}
