let cubeStencil=[[0,0],[1,0],[2,0],[3,0],
				 [4,0],[5,0],[6,0],[7,0],
				 [8,0],[9,0],[10,0],[11,0]],
	cornersStencil=[[0,0],[1,0],[2,0],[3,0],
				 [4,0],[5,0],[6,0],[7,0]],	  
	lookup=[4,3,1,2,-1,-1,-1,-1,5,-1,0,-1],
	cube=JSON.parse(JSON.stringify(cubeStencil)),
	corn=[],
	scrambles=[],
	scramble='',
	noScramble=0,
	name='cmlls',
	drawCMLL=true,
	drawEO=true,
	drawEP=true,
	ctx,
	canvas,
	comments=[],
	premove=false;
$(document).ready(()=>{
	$("#generate").click(()=>{
			generate();
		});
	$("#pdf").click(()=>{
			pdf();
		});	
		
	$("#next").click(()=>{
			next();
		});
		
	$("#previous").click(()=>{
			prev();
		});
	$('body').keydown((e)=>{
			if ($(e.target).is('textarea')||$(e.target).is('input'))
				return;
			e.preventDefault();
			switch(e.keyCode){
				case 39:
					next();
					break;
				case 37:
					prev();
					break;
				case 13:
					generate();
					break;
				case 45:
					pdf();
					break;
			}
		});
	
	canvas = document.getElementById("state");
	ctx= canvas.getContext("2d");
	canvas.width=4*tile;
	$('#output').outerWidth(4*tile+20+'px');
	canvas.height=6*tile+lineWidth;
	restore();
});
function next(){
	noScramble=(noScramble+scrambles.length+1)%scrambles.length;
	generateState();
}
function prev(){
	noScramble=(noScramble+scrambles.length-1)%scrambles.length;
	generateState();
}
function pdf(){
	toast();
	getScrambles();
	createPDF();
}
function generate(){
	getScrambles();
	generateState();
}
function generateState(){
	if(scrambles.length==0)
		return false;
	scramble=scrambles[noScramble].replace(/[()]/g,'');
	restore();
	applyScramble(scramble);
	updateDesc();
}
function updateDesc(){
	$("#scramble").text(scramble);
	$("#number").text((noScramble+1)+"/"+scrambles.length);
}
function applyScramble(scramble){
	decodeScramble(scramble);
	if(ifCMLL()){
		let lse=decodeState();
		drawState(lse);
		return true;
	}
	drawCross();
	return false;
}
function drawState(lse){
	if(drawEO){
		for(let i=0;i<6;i++){
			if(lse[i][1]%2)
				fillTile(lse[i][0]);
		}
	}
	if(drawCMLL){
		for(let i=0;i<corners.length;i++){
			cp[i]=corn[i][0];
			cor[cp[i]][1]=(3333+corn[i][1])%3;
		}
		for(let i=0;i<corners.length;i++){
			fillCorner(i);
		}
	}
	if(drawEP){
		for(let i=0;i<6;i++){
			if(lse[i][0]!=i)
				drawArrow(lse[i][0],i);
		}
	}
}
function decodeState(){
	let lse=[];
	for(let i=0;i<6;i++)
		lse[i]=[];
	lse[0][0]=lookup[cube[10][0]];
	lse[1][0]=lookup[cube[2][0]];
	lse[2][0]=lookup[cube[3][0]];
	lse[3][0]=lookup[cube[1][0]];
	lse[4][0]=lookup[cube[0][0]];
	lse[5][0]=lookup[cube[8][0]];
	
	lse[0][1]=cube[10][1];
	lse[1][1]=cube[2][1];
	lse[2][1]=cube[3][1];
	lse[3][1]=cube[1][1];
	lse[4][1]=cube[0][1];
	lse[5][1]=cube[8][1];
	
	return lse;
}
function decodeScramble(scramble){
	let moves=scramble.split(" "),
		cScr=[];
	for(let i=0;i<moves.length;i++){
		if(moves[i].includes('//'))
			break;
		if(moves[i][0]=='['&&moves[i].substr(-1)==']'){
			moves[i]=moves[i].substr(1,moves[i].length-2);
			premove=true;
		}
		let num=1;
		if(moves[i].length>1){
			if(!isNaN(parseInt(moves[i][1])))
				num=parseInt(moves[i][1])%4;
			if(isNaN(parseInt(moves[i].substr(-1))))
				num=4-num;
		}
		if(premove)
		{
			num=4-num;
			premove=false;
		}
		switch(moves[i][0]){
			case "r":
				M(4-num);
				break;
			case "l":
				M(num);
				break;
			case "b":
				S(num);
				break;
			case "u":
				E(4-num);
				break;
			case "f":
				S(4-num);
				break;
			case "d":
				E(num);
				break;
			case "y":
				U(num);
				E(4-num);
				D(4-num);
				cScr.splice(0,0,'y'+(4-num));
				break;
			case "x":
				R(num);
				M(4-num);
				L(4-num);
				cScr.splice(0,0,'x'+(4-num));
				break;
			case "z":
				F(num);
				S(4-num);
				B(4-num);
				cScr.splice(0,0,'z'+(4-num));
				break;	
		}
		switch(moves[i][0].toUpperCase()){
			case "R":
				R(num);
				cScr.splice(0,0,'R'+(4-num));
				break;
			case "L":
				L(num);
				cScr.splice(0,0,'L'+(4-num));
				break;
			case "B":
				B(num);
				cScr.splice(0,0,'B'+(4-num));
				break;
			case "U":
				U(num);
				cScr.splice(0,0,'U'+(4-num));
				break;
			case "F":
				F(num);
				cScr.splice(0,0,'F'+(4-num));
				break;
			case "D":
				D(num);
				cScr.splice(0,0,'D'+(4-num));
				break;
			case "M":
				M(num);
				break;
			case "S":
				S(num);
				break;
			case "E":
				E(num);
				break;
		}
	}
	doCorners(cScr);
}
function ifCMLL(){
	for(let i=0;i<cube.length;i++){
		if(((i<8&&i>3)||i==11||i==9)&&cube[i][0]!=i&&cube[i][1]%2!=0)
			return false;
	}
	for(let i=0;i<corn.length;i++){
		if((i>3)&&corn[i][0]!=i&&corn[i][1]%3!=0)
			return false;
	}
	return true;
}

function getScrambles(){
	scrambles=($("#scrambles").val()).replace(new RegExp(String.fromCharCode(parseInt(2019,16)),'g'),"'")
									 .split('\n')
									 .map((s)=>s.trim())
									 .filter((value)=>{return value!=''});
}
function createPDF(){
	name=$('#filename').val();
	name=(name==''||name==undefined)?$('#filename').attr("placeholder"):name;
	var doc = new jsPDF('p','px','a4',true);
	doc.setFontSize(12);
	let x=43,
		y=35,
		xOffset=210,
		yOffset=200,
		imageYOffset=20;
	for(let i=0;i<scrambles.length;i++){
		if(i!=0){
			if(i%6==0){
				doc.addPage('a4','p');
				x=43;
			}
			if(i%2==0){
				y=(y+yOffset)%(3*yOffset);
			}
		}
		noScramble=i;
		generateState();
		doc.setFontStyle('normal');
		centeredText((scrambles[i].includes('//'))?scrambles[i].split('//')[1].trim():'',y+15,doc,i%2);
		doc.setFontStyle('bold');
		centeredText(scrambles[i].split('//')[0].trim(),y,doc,i%2);
		addImage(canvas,x+30+16.5*(i%2),y+imageYOffset+10,doc);
		
		x=(x+xOffset)%(2*xOffset);
	}
	doc.save(name+'.pdf');

}
var centeredText = function(text, y,doc,even) {
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.getWidth()/2 - textWidth) / 2+doc.internal.pageSize.getWidth()/2*even;
    doc.text(textOffset, y, text);
}
function addImage(canvas,x,y,doc){
	let img=canvas.toDataURL("image/jpg");
	doc.addImage(img,'jpg',x,y,tile,3/2*tile,undefined,'FAST');
}
function doCorners(scr){
	corn=JSON.parse(JSON.stringify(cornersStencil));
		for(let i=0;i<scr.length;i++){
		let num=parseInt(scr[i][1]);
		switch(scr[i][0]){
			case "R":
				Rc(num);
				break;
			case "L":
				Lc(num);
				break;
			case "B":
				Bc(num);
				break;
			case "U":
				Uc(num);
				break;
			case "F":
				Fc(num);
				break;
			case "D":
				Dc(num);
				break;
			case "y":
				Uc(num);
				Dc(4-num);
				break;
			case "z":
				Fc(num);
				Bc(4-num);
				break;
			case "x":
				Rc(num);
				Lc(4-num);
				break;
		}
	}
}