

function addSlider(id){

  $('<p>state ' + id+':</p>').appendTo('#sliders');
  var iDiv = document.createElement('slider' + id);
  var sliderName = 'slider' + id;
  iDiv.id = sliderName;
  iDiv.class = sliderName;

  
  document.getElementById("node_info").appendChild(iDiv);


  var slider = d3.select(".sliders").append("p").append("input")
  .datum({})
  .attr("type", "range");
  
  //.on("input", slided);


}


function MenuManeger () {
	

	this.prepareNodeMenu = function(node){
		document.getElementById('sliders').innerHTML = "";



		document.getElementById("node_name").innerHTML = node.id;
		console.log(node);
		console.log()

  		$(".node_info").show();

  		for (i = 0; i < node.states.length ; i++){
  			addSlider(node.states[i]);
  		}


		return null;
	}
}