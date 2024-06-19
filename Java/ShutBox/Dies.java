
import java.util.Random;
class Dies{

	private int pips;
	private Random number = new Random();
	
	public Dies(){
		this.pips=1;
		this.number=new Random(); 
	}
	public int getPips(){
		return this.pips;
	}
	public Random getNumber(){
		return this.number;
	}
	public int roll(){
		this.pips=this.number.nextInt(6)+1; //range of 1 to 6
		return this.pips;
	}
	public String toString(){
		return "You got "+this.pips;
	}
}