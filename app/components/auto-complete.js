import Ember from 'ember';

export default Ember.Component.extend({

	url: '<endpoint>',
	selectedItem: 'N/A',
	el: Ember.$('#tags'),

	didInsertElement: function() {
		var _this = this;

		_this.get('el').autocomplete({


			source: function(request, response) {

				Ember.$.ajax({
					url: _this.get('url'),
					type: 'GET',
					headers:{
						//your headers go here
					},
					data: {
						'q': request.term
					},
					success: function(data) {
						response(data);
					},
					error: function(error) {
						console.error('[ auto-complete ] error', error);
					}
				});
			},
			response: function( event, ui ) {
				// Triggered after a search completes, before the menu is shown.
				console.log('[ auto-complete ] response', event, ui.content);
			},
			select: function( event, ui ) {
				//Triggered when an item is selected from the menu
				console.log('[ auto-complete ] select', event, ui.item);

				_this.set('selectedItem', Ember.Object.create(ui.item));
				// _this.get('targetObject').set('selectedItem', Ember.Object.create(ui.item));
			},
		});


	}

});