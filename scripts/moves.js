function R(n){
	for(let i=0;i<n;i++){
		let pom=cube[1];
		cube[1]=cube[4];
		cube[4]=cube[9];
		cube[9]=cube[5];
		cube[5]=pom;
	}
}
function U(n){
	for(let i=0;i<n;i++){
		let pom=cube[1];
		cube[1]=cube[2];
		cube[2]=cube[3];
		cube[3]=cube[0];
		cube[0]=pom;
	}
}
function F(n){
	for(let i=0;i<n;i++){
		let pom=cube[0];
		cube[0]=cube[7];
		cube[7]=cube[8];
		cube[8]=cube[4];
		cube[4]=pom;
		
		cube[0][1]++;
	    cube[4][1]++;
	    cube[8][1]++;
	    cube[7][1]++;
	}
}
function L(n){
	for(let i=0;i<n;i++){
		let pom=cube[3];
		cube[3]=cube[6];
		cube[6]=cube[11];
		cube[11]=cube[7];
		cube[7]=pom;
	}
}
function D(n){
	for(let i=0;i<n;i++){
		let pom=cube[8];
		cube[8]=cube[11];
		cube[11]=cube[10];
		cube[10]=cube[9];
		cube[9]=pom;
	}
}
function B(n){
	for(let i=0;i<n;i++){
		let pom=cube[2];
		cube[2]=cube[5];
		cube[5]=cube[10];
		cube[10]=cube[6];
		cube[6]=pom;
		
		cube[2][1]++;
		cube[5][1]++;
		cube[10][1]++;
		cube[6][1]++;
	}
}
function M(n){
	for(let i=0;i<n;i++){
		let pom=cube[2];
		cube[2]=cube[10];
		cube[10]=cube[8];
		cube[8]=cube[0];
		cube[0]=pom;
		
		cube[2][1]++;
		cube[8][1]++;
		cube[10][1]++;
		cube[0][1]++;
	}
}
function S(n){
	for(let i=0;i<n;i++){
		let pom=cube[1];
		cube[1]=cube[9];
		cube[9]=cube[11];
		cube[11]=cube[3];
		cube[3]=pom;
		
		cube[1][1]++;
	    cube[9][1]++;
	    cube[3][1]++;
	    cube[11][1]++;
	}
}
function E(n){
	for(let i=0;i<n;i++){
		let pom=cube[7];
		cube[7]=cube[6];
		cube[6]=cube[5];
		cube[5]=cube[4];
		cube[4]=pom;
		
		cube[6][1]++;
	    cube[4][1]++;
	    cube[5][1]++;
	    cube[7][1]++;
	}
}



function Uc(n){
	for(let i=0;i<n;i++){
		let pom=corn[0];
		corn[0]=corn[1];
		corn[1]=corn[2];
		corn[2]=corn[3];
		corn[3]=pom;
	}
}
function Dc(n){
	for(let i=0;i<n;i++){
		let pom=corn[4];
		corn[4]=corn[5];
		corn[5]=corn[6];
		corn[6]=corn[7];
		corn[7]=pom;
	}
}
function Rc(n){
	for(let i=0;i<n;i++){
		let pom=corn[0];
		corn[0]=corn[7];
		corn[7]=corn[6];
		corn[6]=corn[1];
		corn[1]=pom;
		
		corn[0][1]--;
		corn[7][1]++;
		corn[6][1]--;
		corn[1][1]++;
	}
}
function Lc(n){
	for(let i=0;i<n;i++){
		let pom=corn[2];
		corn[2]=corn[5];
		corn[5]=corn[4];
		corn[4]=corn[3];
		corn[3]=pom;
		
		corn[2][1]--;
		corn[5][1]++;
		corn[4][1]--;
		corn[3][1]++;
	}
}
function Fc(n){
	for(let i=0;i<n;i++){
		let pom=corn[3];
		corn[3]=corn[4];
		corn[4]=corn[7];
		corn[7]=corn[0];
		corn[0]=pom;
		
		corn[3][1]--;
		corn[4][1]++;
		corn[7][1]--;
		corn[0][1]++;
	}
}
function Bc(n){
	for(let i=0;i<n;i++){
		let pom=corn[1];
		corn[1]=corn[6];
		corn[6]=corn[5];
		corn[5]=corn[2];
		corn[2]=pom;
		
		corn[1][1]--;
		corn[6][1]++;
		corn[5][1]--;
		corn[2][1]++;
	}
}