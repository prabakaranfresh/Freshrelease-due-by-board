jQuery(document).ready(function(){
	setTimeout(getDueDate, 3000);
	
	jQuery(document).on('click', ".nav-primary-list__item", function() {
		if(jQuery(this).find('a[aria-label="Board"]').length)
			setTimeout(getDueDate, 1000);
	});
});


function getDueDate() {
	var sprint_id = window.location.pathname.split('/'), sprint_id = sprint_id[sprint_id.length -1];
		
	var loader = jQuery('<div class="entity-details clearfix due-by--loader" />');
	jQuery('.entity-card').append(loader);

	jQuery.ajax({
		url: "https://freshworks.freshrelease.com/FS/issues",
		type: "GET",
		data: {	"query_hash": [
				{"condition": "sprint_id", "operator": "is", "value": sprint_id},
				{"condition": "resolved", "operator": "is", "value": false}
		]},
		contentType: 'application/json',
		success: function(resp){
			jQuery('.due-by--loader').remove();
			jQuery.each(resp.issues, function(){
				if(this.due_by != null) {
					var due_date = (new Date(this.due_by)).toDateString();
					var elemContainer = jQuery('<div class="entity-details clearfix" />');
					var elem = jQuery('<span class="entity-story-points">').text("Due By: " + due_date.replace(" ", ", "));
					jQuery(elemContainer).html(elem);
					jQuery('.entity-wrap[data-entity-id="'+this.id+'"]').append(elemContainer);
				}
			});
		}
	});
}
