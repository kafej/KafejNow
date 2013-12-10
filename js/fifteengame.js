$.fn.cube = function(options) {
	// Set plugin defaults
	var defaults = {
		puzzles: '15',
		MoveMSG: true,
		CustomMoveMSG: 'The movement number: ',
		VictoryMSGAlert: true,
		VictoryMSG: 'CONGRATULATIONS! YOU DID IT!!',
		image: true
	};  
	var options = $.extend(defaults, options),
	element = $(this),
	end=0,
	x1=0,
	y1=0,
	moveNumber = 0;

	if (options.puzzles == 15) {
		var square = new Array(16),
		tablica = new Array(16),
		y=16,
		fori=16,
		i7=14,
		squareCheck=square[15],
		inumber=4;
	}else if (options.puzzles == 8) {
		var square = new Array(9);
		tablica = new Array(9),
		y=9,
		fori=9,
		i7=7,
		squareCheck=square[8],
		inumber=3;
	}

	function Randomize() //Draw numbers from an array
	{
		for(i=0;i<fori;i++)
		{
			tablica[i]=1;
		}
		for(i=0;i<fori;i++)
		{		
			x=1+ Math.round ((y-1)*Math.random());
			x=Math.min(y,x);
			x=Math.max(0,x);
			y--;
			k=0;
			while(x>tablica[k])
			{
				x-=tablica[k++];
			}
			square[i]=k;
			tablica[k]=0;
			if(k==0)
			{
				y1=Math.floor(i/inumber);
				x1=i-inumber*y1;
			}
			
		}
	}
	
	function ShowMoveNumber() //Show current numbers of moves
	{
		if (options.MoveMSG){
			$('#CubeVictoryMSG').html(options.CustomMoveMSG+'<b>'+moveNumber+'</b>');
		}
	}
	
	function Check() //Check sequence and give feedback if success
	{
		end=1;
		for(i=0;i<i7;i++)
		{
			if(square[i]!=i+1)
			{
				end=0;
			}
		}
		if (squareCheck)
		{
			end=0;
		}
		if(end)
		{
			if (VictoryMSGAlert) {
				alert(options.VictoryMSG);
			}else {
				$(element).append('<div="victorymsg">'+options.VictoryMSG+'</div>');
			}
			
		}
	}
	Randomize();

	function Makecub(i,j){
		// Create table with id
		$pt = $('<table id="cubetable" align="center" cellpadding="0" cellspacing="0">').attr('id','cubetable');

		for (var i=0; i<inumber; i++) {
		  var $row = $('<tr>');

		  $pt.append($row);

		  for (var j=0; j<inumber; j++) {
		  	if (options.image) {
		  		$row.append($('<td class="cubein">').append('<img id="pz" style="cursor: pointer; margin-top: -5px;" src="img/klocki/klocek_'+square[(i*inumber+j)]+'.png" name="square'+(i*inumber+j)+'" data-i="'+i+'"data-j="'+j+'"></td>'));
		  	}else{
		  		$row.append($('<td class="cubein">').append('<div id="pz" class="cubes" name="square'+(i*inumber+j)+'" data-i="'+i+'" data-j="'+j+'">'+square[(i*inumber+j)]+'</div></td>'));
		  	}
		  }
		}
		$row.append('</tr></table>');
		//Fetch game area.
		if (options.MoveMSG){
			$(element).append('<p id="CubeVictoryMSG"style="padding-bottom:10px;text-align:center;">'+options.CustomMoveMSG+'<b>'+moveNumber+'</b></p>');
		}
		$(element).append($pt);
	}
	Makecub();

	$('.cubein #pz').click(function(e) {
		var i = $(this).data('j');
		var j = $(this).data('i');
		if(( end==0)&&(Math.abs(i-x1)+Math.abs(j-y1)==1))
		{
			xy1=x1+inumber*y1;
			moveNumber++;
			xy2=i+inumber*j;
			square[xy1]=square[xy2];
	
			if (options.image) {
				$('[name="square'+xy1+'"]').attr('src', 'img/klocki/klocek_'+square[xy2]+'.png');
				square[xy2]=0;
				$('[name="square'+xy2+'"]').attr('src', 'img/klocki/klocek_0.png');
			}else{
				$('[name="square'+xy1+'"]').html(square[xy2]);
				square[xy2]=0;
				$('[name="square'+xy2+'"]').html('<div class="zero" style="width:50px;height:50px;">0</div>');
			}

			x1=i;
			y1=j;
			Check();
			ShowMoveNumber();
		}
	});

	if (options.image == false) {
		$( ".cubein #pz" ).trigger( "click" );
		moveNumber=0;
		$('#CubeVictoryMSG').html(options.CustomMoveMSG+'<b>'+moveNumber+'</b>');
	}
};