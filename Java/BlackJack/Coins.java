public class Coins {
	public int hundreds;
	public int twenties;
	
	public Coins(int h, int t){
		this.hundreds=h;
		this.twenties=t;
	}
	public int getSum(){
		return 100*hundreds+20*twenties;
	}
	public int getTwenties(){
		return twenties;
	}
	public int getHundreds(){
		return hundreds;
	}
	public void addCoins(int h, int t){
		this.hundreds=this.hundreds+h;
		this.twenties=this.twenties+t;
	}
	public void reduceCoins(int h, int t){
		this.hundreds=this.hundreds-h;
		this.twenties=this.twenties-t;
	}
}