// console.log("HI THERE!");
// define image names/location
// var imgLoc = "/_img/";
// var images = ["2017-05-24","2017-05-24","2017-05-24","2017-05-24"];



var folder = "/mystery/_img/";

// get image files using XHR/AJAX requests in vanilla JS
function getImages(n) {
	var request = new XMLHttpRequest();	

	request.open("GET", folder, true);
	request.send();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			// raw JSON response from server request
			var data = request.responseText;

      // match only links - which are images in server folder
      var regex = new RegExp('href="([^\'\"]+)','gi'); // for 1&1 servers
      var images = data.match(regex);
      
      images = images.filter( function(val) {
        return ( /\.(jpg|png|gif|bmp)$/gi.test(val) );
      });      
      
      images = images.map( function(val) {
        val = val.replace('"','');
        val = folder + val; // hide for localhost
        return val = val.replace(/href=/gi,"");
      });

      // console.log("files:", images);
      var re = new RegExp( folder , 'gi');
      var imageNames =  images.map( function(val) {
        val =  val.replace(re,"");
        return val.replace(/\.jpg/gi,"");
      });
      
      // console.log("image names:", imageNames);  

      showImages(n, images, imageNames);

		}
	}
}

/*
// get image files using XHR/AJAX requests in jQuery
$.ajax({
    url : folder,
    success: function (data) {
      console.log("data:", data);
        $(data).find("a").attr("href", function (i, val) {          
            if( val.match(/\.(jpg|png|gif)$/gi) ) { 
              folder = "";
              console.log("val:", val);
              $("body").append( "<img src='"+ folder + val +"'>" );
            } 
        });
    }
});
*/

function plusSlide(n) {
  getImages(slideIndex += n);
}

function currentSlide(n) {
  getImages(slideIndex = n);
}

function showImages(n, images, imageNames) {
  // get list of all images and buttons
  var imgTag = document.querySelector(".figure-img");
  var captionTag = document.querySelector(".figure-caption");
  
  // reset back to first slide 
  if (n >= images.length) { slideIndex = 0;}    
  
  // reset back to last slide
  if (n < 0) { slideIndex = images.length-1;}

  var caption = dateConvert(imageNames[slideIndex]);

  // add image scr to img element
  imgTag.src = images[slideIndex];
  imgTag.alt = caption;
  captionTag.innerHTML = caption;
  
}

function dateConvert(dateStrn) {
  var day = dateStrn.substr(8,2)*1;
  var mon = dateStrn.substr(5,2)*1;
  var year = dateStrn.substr(0,4);
  // console.log("day:",day, "mon:", mon, "year:", year);
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", " Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  /*
  new Date("Month dd, yyyy hh:mm:ss")
  new Date("Month dd, yyyy")
  new Date(yy,mm,dd,hh,mm,ss)
  new Date(yy,mm,dd)
  new Date(milliseconds)
  */

  var picDate = new Date(months[mon-1] + day + "," + year);
  // console.log("DATE:", picDate);

  var curr_day = picDate.getDay();
  var sup = "";
  if (day == 1 || day == 21 || day ==31) {
    sup = "st";
  } else if (day == 2 || day == 22) {
    sup = "nd";
  } else if (day == 3 || day == 23) {
    sup = "rd";
  } else {
    sup = "th";
  }

  var captionDate = days[curr_day] + ", " + months[mon-1] + " " + day + "<sup>" + sup  + "</sup> " + ", " + year;
  // console.log(captionDate);
  return captionDate;

}


// set first image as default and show
var slideIndex = -1;
getImages(slideIndex);
