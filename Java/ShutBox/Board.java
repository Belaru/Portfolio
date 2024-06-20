
class Board{

	private Dies firstDie;
	private Dies secondDie;
	private boolean[] closedTiles;

	public Board(){
		this.firstDie=new Dies();
		this.secondDie=new Dies();
		this.closedTiles=new boolean[12];
	}
	public String toString(){
		String message="";
		int count=0;
		for( ; count< closedTiles.length; count++){
			if(!(closedTiles[count])){
				message+=count+1+"  ";
			}
			else{
				message+="X  ";
			}
		}
		return message;
	}
	public boolean playATurn(){
		this.firstDie.roll();
		this.secondDie.roll();
		System.out.println(firstDie);
		System.out.println(secondDie);
		int sum=this.firstDie.getPips()+this.secondDie.getPips();
		int index=sum;
		if(!(this.closedTiles[index-1])){ 
			this.closedTiles[index-1]=true;
			System.out.println("Closing tile: "+sum);
			return false;
		}	
		else{
			System.out.println("Tile is already shut");
			return true;
		}
	}

}