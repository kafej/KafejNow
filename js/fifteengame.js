$.fn.cube = function() {
	var element = $(this);
	var square=new Array(16);
	var end=0;
	var x1=0;
	var y1=0;
	var moveNumber = 0;

	function Randomize() //Draw numbers from an array
	{
		var y=16;
		tablica=new Array(16);
		
		for(i=0;i<16;i++)
		{
			tablica[i]=1;
		}
		for(i=0;i<16;i++)
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
				y1=Math.floor(i/4);
				x1=i-4*y1;
			}
			
		}
	}
	
	function ShowMoveNumber() //Show current numbers of moves
	{
		$('#msg').html('This is Your <b>'+moveNumber+'</b> move.');
	}
	
	function Check() //Check sequence and give feedback if success
	{
		end=1;
		for(i=0;i<14;i++)
		{
			if(square[i]!=i+1)
			{			
				end=0;
			}
		}
		if (square[15]) 
		{
			end=0;
		}
		if(end)
		{
			alert("CONGRATULATIONS! YOU DID IT!!");
		}
	}
	Randomize();

	function Makecub(i,j){
		// Create table with id
		$pt = $('<table id="cubetable" align="center" cellpadding="0" cellspacing="0"/>').attr('id','cubetable');

		for (var i=0; i<4; i++) {
		  var $row = $('<tr>');

		  $pt.append($row);

		  for (var j=0; j<4; j++) {
		    $row.append($('<td class="cubein">').append('<img style="cursor: pointer; margin-top: -5px;" src="img/klocki/klocek_'+square[(i*4+j)]+'.png" name="square'+(i*4+j)+'" data-i="'+i+'"data-j="'+j+'">'));
		  }
		}

		//Fetch game area.
		$(element).append('<p id="msg"style="padding-bottom:10px;text-align:center;"> This is Your <b>'+moveNumber+'</b> move.</p>');
		$(element).append($pt);
	}
	Makecub();

	$('.cubein img').click(function(e) {
		var i = $(this).data('j');
		var j = $(this).data('i');
		if(( end==0)&&(Math.abs(i-x1)+Math.abs(j-y1)==1))
		{
			xy1=x1+4*y1;
			moveNumber++;
			xy2=i+4*j;
			square[xy1]=square[xy2];
			document["square"+xy1].src = "img/klocki/klocek_"+square[xy2]+".png";
			square[xy2]=0;
			document["square"+xy2].src = "img/klocki/klocek_0.png";
			x1=i;
			y1=j;
			Check();
			ShowMoveNumber(moveNumber);
		}
	});
};