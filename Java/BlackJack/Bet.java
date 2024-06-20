public class Bet{
	public Coins bet;
	
	public Bet(String[] c){
		try{
			int h=Integer.parseInt(c[0]);
			int t=Integer.parseInt(c[1]);
		}
		catch(NumberFormatException e){
			System.out.println("The input has to be 2 numbers separated by \";\" ");
			throw new NumberFormatException(" WRONG INPUT FORMAT ");
		}
		catch(ArrayIndexOutOfBoundsException e){
			System.out.println("Missing number(s)!");
			throw new NumberFormatException(" MUST BE AT LEAST 2 NUMBERS ");
		}
		this.bet = new Coins(Integer.parseInt(c[0]),Integer.parseInt(c[1]));
		
	}
	public int getTotal(){
		return bet.getSum();
	}
	public int getHundreds(){
		return bet.getHundreds();
	}
	public int getTwenties(){
		return bet.getTwenties();
	}
	public boolean doubleDown(Coins coins){ // takes as inputer the players coins
		//in Double Down, the bet increases two times
		if(coins.getSum()<this.bet.getSum()*2){
			System.out.println("You don't have enough coins for bet, you can't DoubleDown");
			return false;
		}
		int amount=this.bet.getSum()*2;
		int coins100 = coins.getHundreds(); //amount of coins of 100 of the user
		int h = amount/100; //coins of 100 the user will input
		h=h>coins100?coins100:h;
		int leftOver=amount-(h*100);
		int t = leftOver/20; //coins of 20 the user will input
		//update bet
		this.bet=new Coins(h,t);
		return true;
		
	}
}