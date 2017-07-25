function start() {

var handler = {
	listeners: function() {
		// Event listeners for buttons clicked
		
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (w<500) {
			window.addEventListener( "touchend", this.btnPress );
		} else {
			window.addEventListener( "click", this.btnPress );
		}
		
		// ["click", "keydown", "touchend"].forEach( function(val) {
		// 	window.addEventListener( val, this.btnPress );
		// }, this);
	},
	btnPress: function() {
		// get element that was clicked on as an event		
		// event.preventDefault();
		var elementClicked = event.target;
		function tagClass(text) {
      // return true if "text" is in "classList"
			var test = elementClicked.classList.contains(text);
			return test;
		}
		var keyCode = event.keyCode;
		// set btnID as ID of the button clicked
		var id =  (elementClicked.id===undefined) ? 0 : elementClicked.id;	
		var className = (elementClicked.className===undefined) ? 0 : elementClicked.className ;
		var type = (elementClicked.type===undefined) ? 0 : elementClicked.type ;
		var etype = (event.type===undefined) ? 0 : event.type ;
		var checked = (elementClicked.checked===undefined) ? 0 : elementClicked.checked ;
		
		console.log(event);
		console.log("element:",
								"\n      id:", id, 
								"\n   class:", className,
								"\n    type:", type,
								"\n  e-type:", etype,
								"\n checked:", checked);

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // console.log(w, h);

		var delay;
		if (w < 500) {
      if ( tagClass("nav-btn") || tagClass("fa") ) {
        console.log("SHOW");
				delay = window.setTimeout(act.show, 200);					
      } else {
				console.log("HIDE");  
				delay = window.setTimeout(act.fade, 200);
      }
    }

		var showEvents = 0;
		if (showEvents === 1) {
			var section = document.querySelector(".secEvent");
			var eventElem = document.createElement("div");
			var eventTxt = "Event type: " + etype;
			// var eventElem = document.getElementById("eventElem");
			// section.removeChild(toDel);
			// eventElem.id = "eventElem";
			eventElem.className = "event";
			eventElem.innerHTML = eventTxt;
			section.appendChild(eventElem);
		}

		elementClicked.blur();
		
	}
}

var act = {
	show: function() {
		var btnElem = document.querySelector(".nav-btn");
		var navElem = document.querySelector(".navigation");
    
    btnElem.classList.add("hide");
    navElem.style.display = "block";
    navElem.classList.remove("hide");

	},
  fade: function() {
		var btnElem = document.querySelector(".nav-btn");
		var navElem = document.querySelector(".navigation");
    
    btnElem.classList.remove("hide");
    navElem.classList.add("hide");

  }
}

// run listeners
handler.listeners();

}

start();