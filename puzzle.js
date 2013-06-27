var Board = function($) {
	var BLANK = 15;
	var shuffles = 200;
	
	var id = function(x, y) {
		return 't_' + x + '_' + y;
	};

	var build = function() {
		for(var i = 0; i < 16; ++i) {
			var x = Math.floor(i/4);
			var y = i%4;
			var tile = $('<div>')
				.attr('class', 'tile')
				.attr('id', id(x, y))
				.data('x', x)
				.data('y', y)
				.appendTo('#puzzle');
			update(tile, i);
		};
	};

	var update = function(tile, num) {
		tile.data('i', num);

		var x = Math.floor(num/4);
		var y = num%4;
		tile
			.toggleClass('blank', num == BLANK)
			.css('background-position-x', '-' + y * 125 + 'px')
			.css('background-position-y', '-' + x * 125 + 'px');
	};

	var slide = function(dx, dy) {
		var x = this.data('x');
		var y = this.data('y');

		var otherId = '#' + id(x + dx, y + dy);
		var other = $(otherId);

		if (other.length > 0 && other.data('i') == BLANK) {
			var currentTile = this.data('i');
			update(this, BLANK);
			update(other, currentTile);
			shuffles--;
			return true;
		}
		return false;
	};

	var onClick = function(e) {
		var target = $(this);
		var _slide  = slide.bind(target);
		_slide(0, 1)
			|| _slide(1, 0)
			|| _slide(0, -1)
			|| _slide(-1, 0);
	}

	var setupHandler = function() {
		$('.tile').click(onClick);
	};

	var shuffle = function() {
		var blank = $('.tile.blank');
		var x = blank.data('x');
		var y = blank.data('y');
		var dx = Math.floor(3 * Math.random()) - 1;
		var dy = Math.floor(3 * Math.random()) - 1;
		$('#' + id(x + dx, y + dy)).click();
		if (shuffles) {
			window.setTimeout(shuffle, 0);
		}
	};

	var init = function() {
		build();
		setupHandler();
		window.setTimeout(shuffle, 2000);
	};
	return {
		init: init
	};
}(jQuery);

jQuery(function(){
	Board.init();
});
