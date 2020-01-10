
$( document ).ready(function() {
    // put current day
    let curMoment = moment();
    let curDate = curMoment.format('MMMM Do YYYY');
    $("#curDate").text("Current date: " + curDate);

    // populate text areas from local storage
    for (i = 1; i < 10; i++){
        let v = localStorage.getItem(i);
        if (v){
            $("[data-text-block="+i+"]").val(v);
        }
    }

    // set hour block colors according to before, during or after current hour
    let hourBlocks = $("[data-hour-block]");
    hourBlocks.each(function (i){
        let hbJQ = $(this);
        if (hbJQ.data("hourBlock")){
            let tie = $("[data-text-block="+(i+1)+"]");

            //get the hour from the left-hand div (9AM, 10AM, etc.)
            let timeText = this.firstElementChild.textContent.trim();
            
            // if it is currently earlier than that hour today
            if (curMoment.isBefore(moment(timeText,"HHa"))){
                    tie.css("background","rgba(0, 255, 0, 0.25)");
            }
            // if currently later than that hour today
            else{
                // if current hour is the same as the specified hour
                if (curMoment.hour() === moment(timeText,"hha").hour()){
                    tie.css("background","rgba(0, 0, 255, 0.25)");
                }
                else{
                    tie.css("background","rgba(255, 0, 0, 0.25)");
                }
            }
            //console.log(moment().subtract(moment(timeText,"hha").hours(),"hours").format("dd hh:mm"));
            //if (moment().subtract(moment(timeText,"hha").hours(),"hours").day() === moment().day());
        }
    });

    // set data block attributes 
    // let hbs = $(".hour-block");
    // for (i = 0; i < hbs.length; i++){
    //     hbs[i].attr("data-hour",i)
    // }

    // Save action
    $("[data-hour-block]").on("click",function(event){
        // if clicked in save button
        let t = event.target;
        // have to check both image and button since image overlays the button
        if (t.matches(".save") || t.parentElement.type === "button"){
            let e;
            
            // if clicked image, go to parent (button)
            if (t.tagName === "IMG"){
                e = t.parentElement;
            }
            else{
                e = t;
            }

            // get hour index
            let hour = $(e).parents().eq(3).data("hourBlock");

            // get text from text area (text area child of 2 parents up from button)
            let rowText = $(e).parents().eq(1).children("textArea")[0].value;
            
            // store the text for that hour
            localStorage.setItem(hour,rowText);
        }
    })

});
