var moves = 0;
var wins = 0;
var games = 0;
var gridSize;
var gameTiles;
var gridArray;
var rowSize;
var cards = [
	"<img src='img/default/monsters-01.png'>",
	"<img src='img/default/monsters-02.png'>",
	"<img src='img/default/monsters-03.png'>",
	"<img src='img/default/monsters-04.png'>",
	"<img src='img/default/monsters-05.png'>",
	"<img src='img/default/monsters-06.png'>",
	"<img src='img/default/monsters-07.png'>",
	"<img src='img/default/monsters-08.png'>",
	"<img src='img/default/monsters-09.png'>",
	"<img src='img/default/monsters-11.png'>",
	"<img src='img/default/monsters-13.png'>",
	"<img src='img/default/monsters-14.png'>",
	"<img src='img/default/monsters-15.png'>",
	"<img src='img/default/monsters-16.png'>"
];

function playAgain() {
	$('#mg-contents').html('');
	$('#mg-wrapper').removeClass('easy');
	$('#mg-wrapper').removeClass('med');
	$('#mg-wrapper').removeClass('hard');
	$('#button-bucket').toggle();
}

$(document).ready(function(){

	/* $('#play-again').click(function(){
		$('#mg-contents').html('');
		$('#mg-wrapper').removeClass('easy');
		$('#mg-wrapper').removeClass('med');
		$('#mg-wrapper').removeClass('hard');
		$('#button-bucket').toggle();
		$('#play-again').toggle();
	}); */

	$('.diff').click(function(){
		var diff = $(this).val();
		if (diff == 'easy'){
			rowSize = 5;
			gridSize = rowSize * 2;
			$('#mg-wrapper').addClass('easy');	
		} else if(diff == 'med'){
			rowSize = 5;
			gridSize = rowSize * 4;
			$('#mg-wrapper').addClass('med');	
		} else if(diff == 'hard'){
			rowSize = 7;
			gridSize = rowSize * 4;
			$('#mg-wrapper').addClass('hard');
		}
		$('#button-bucket').toggle();
		gameTiles = cards.slice(0,(gridSize/2));
		gridArray = $.merge(gameTiles, gameTiles);

		// shuffle the card positions by generating two random card positions between zero and the grid size...
        for(i=1; i<gridSize * 5; i++){
            var pos1 = Math.floor(Math.random() * gridSize);
            var pos2 = Math.floor(Math.random() * gridSize);
            var tempCard = gridArray[pos1]; // create a temp card equal the first random monster
            gridArray[pos1] = gridArray[pos2]; // make sure the two cards contain the same monster image
            gridArray[pos2] = tempCard;
        }
        console.dir(gridArray);

		// place cards in the grid
		for(i=0; i<gridArray.length; i++){
			var html = '<div class="mg-tile">';
					html += '<div class="mg-tile-inner unmatched flipped">';
						html += '<div class="mg-tile-outside"></div>';
						html += '<div class="mg-tile-inside">' + gridArray[i] + '</div>';
					html += '</div>';
				html += '</div>';
			$('#mg-contents').append(html);
		}

		setTimeout(function(){
			$('.mg-tile-inner').removeClass('flipped');
		},2000);

		$('.mg-tile').click(function(){
			$(this).find('.mg-tile-inner').addClass('flipped');
			if($('.flipped.unmatched').length == 2){
				moves++;
				var visibleCards = $('.flipped.unmatched img');
				if(visibleCards[0].src == visibleCards[1].src){
					// leave them flipped
					// add matched
					$('.flipped.unmatched').addClass('matched');
					//remove unmatched
					$('.flipped.unmatched').removeClass('unmatched');
				}else{
					// the user has flipped over 2 cards and they DO NOT match	
					setTimeout(function(){
						$('.flipped.unmatched').removeClass('flipped');	
					},500);
				}
				if($('.flipped.matched').length == gridArray.length){
					wins++;
					var wantsToPlay = confirm('You matched them all! Play again?');
					if (wantsToPlay === true){
						playAgain();
					}
					// $('#play-again').toggle();
				}
			}else{
				// only one card is flipped up
			}
			$('#move-counter').html(moves);
			$('#wins-counter').html(wins);	
		});
	});
});