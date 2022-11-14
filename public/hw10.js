function getAllEntries(){
	let list = $("/api/entrees").get();
	let i = 0;
	$("#menu").html(function(i, origVal)){
		while(i < list.length){
		return "<option value = " + "'" + list[i].id + "'" + ">" + list[i].name + "</option>";
		++i;	
		}
	}
}
function delete(){
	$("#Delete").click(function(){
		let rid;
		$("#menu option").click(function(){
			rid = document.getElementById(this.id);
		});
		$.ajax({
    		type: "DELETE",
    		url: "/api/entrees/id",
    		data: "id = rid",
    		success: function(){
        		window.location.reload();
    		}
    		error: function(){
    			console.log("The entree could not be deleted");
    		}
		});
	});
}
function add(){
	$("#Add").click(function(){
		const entree = {
        id: $("#entreeId").val(),
        name: $("#entreeName").val()
		};
		let value = JSON.stringify(entree);
		$.ajax({
			type: "POST",
			url: "/api/entrees",
			data: "data = value",
			success: function(){
				document.getElementById('#entries').reset();
				list.push(value);
				getAllEntries();
			}
			error: function(){
				console.log("The entree could not be added.");
			}
		});
	});
}