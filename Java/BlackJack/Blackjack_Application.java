import java.util.Scanner;
class Blackjack_Application{
	public static void main(String[]args){
		Scanner options = new Scanner(System.in);
		Coins coins=new Coins(4,6);
		int rounds=1;
		
		DynamicCardArray player=new DynamicCardArray(); //player cards at hand
		DynamicCardArray dealer=new DynamicCardArray(); //dealer cards at hand
		DynamicCardArray deck = new DynamicCardArray(); // deck of cards
		deck.deck(); //initialize the cards inside deck
		deck.shuffle(); //shuffle cards
		
		while(gameOver(rounds,deck,coins)){
			boolean BJ=false;
			player=new DynamicCardArray(); //player cards at hand
		    dealer=new DynamicCardArray(); //dealer cards at hand
			begin(player,dealer,deck); //initialize cards values
			//boolean blackjack = false;
			
			//displays the player's cards and the dealer's fisrt card
			System.out.println('\n'+"=====ROUND "+rounds+"=====");
			System.out.println("DEALER: "+dealer.firstCard());
			System.out.println("PLAYER: "+player+'\n'+"Your total: "+player.countTotal());
			
			//Player will place a bet
			System.out.println("Place your bet, separate amount of coins by \";\" ");
			System.out.println("Hundreds: "+coins.getHundreds()+";"+" Twenties: "+coins.getTwenties()+";"+" Total: "+coins.getSum());
			String pBet=options.next();
			Bet bet=new Bet(pBet.split(";",2)); //validation
			//exception -- can finish +message
			
			while(checkCoins(coins,bet)){ //make sure the input does not exceed
				pBet=options.next();
				bet=new Bet(pBet.split(";",2));
			}
			
			//blackjack
			if(blackjack(player.countTotal())){
				 BJ=true; //player immediately has a blackjack // paid 3/2
			}else{
				//Here the player will decide their options
				System.out.println('\n'+"Choose an option:"+'\n'+"s for Stand; h for Hit; d for DoubleDown");
				String option = options.next();
				char op = option.charAt(0);
				while( op!='s'&& op!='h' && op!='d'){
					System.out.println('\n'+"Choose an option:"+'\n'+"s for Stand; h for Hit; d for DoubleDown");
					option = options.next();
					op = option.charAt(0);
				}
				if(op=='d'){ //method
					if(!bet.doubleDown(coins)){
						while( op!='s'&& op!='h'){
						System.out.println('\n'+"Choose an option:"+'\n'+"s for Stand; h for Hit");
						option = options.next();
						op = option.charAt(0);
						}
					}else{
							doubleDown(player,deck);
							//dealer will Double Down if the player does so 
							doubleDown(dealer,deck);
					}
				}
				if(op=='h'){ 
					Phit(player, deck); //new name
				}
				//dealer turn
				while(dealer.countTotal()<15 && op != 'd'){
				hit(dealer, deck);
				}
			}
			
			endRound(player,dealer,bet,coins,BJ);
			coins=coinsRecount(coins);
			rounds++;
		}
	}
	public static boolean burst (int x){
		return x>21;
	}
	public static boolean blackjack (int x){
		return x==21;
	}
	public static boolean gameOver(int x, DynamicCardArray deck,Coins coins){
		if(coins.getSum()==0){
			System.out.println("===================="+'\n'+"YOU LOST ALL YOUR COINS");
			return false;
		}
		if(deck.handLength()<10){
			deck.deck(); // renew the deck to avoid OutOfBounds
		}
		return x<11;
	}
	public static void begin(DynamicCardArray player,DynamicCardArray dealer, DynamicCardArray deck){ // regular hit
		player.addCard(deck.takeOut());
		player.addCard(deck.takeOut());
		dealer.addCard(deck.takeOut());
		dealer.addCard(deck.takeOut());
	}
	// Hits
	public static void Phit(DynamicCardArray hand, DynamicCardArray deck){ //hit for player : interactive //calls hit method
		Scanner options = new Scanner(System.in);
		String option="hit";
		char op ='h';
		while( op!='s'){
			hit(hand, deck);
			System.out.println(hand);
			System.out.println(hand.countTotal());
			if(burst(hand.countTotal())){
				break;
			}
			System.out.println("Hit again? || s for Stand h for Hit"); //prints
			option = options.next();
			op = option.charAt(0);
			while( op!='s'&& op!='h'){ //make sure the player will put h or s
				option = options.next();
				op = option.charAt(0);
			}
		}
	}
	public static void hit(DynamicCardArray hand, DynamicCardArray deck){ // regular hit
		Card c = deck.takeOut();
		hand.addCard(c);
	}
	// Double Down
	public static void doubleDown(DynamicCardArray hand, DynamicCardArray deck){
		hand.addCard(deck.takeOut());
	}
	/*Insurance+split*/
	public static void endRound(DynamicCardArray player,DynamicCardArray dealer,Bet bet, Coins coins, boolean BJ){
		
		System.out.println('\n'+"   ***Show Time***"+'\n'+"DEALER HAND:"+dealer);
		System.out.println(dealer.countTotal());
		System.out.println("PLAYER HAND:"+player);
		System.out.println(player.countTotal());
		if(BJ){
			System.out.println("Player has BlackJack!");
			bj(coins,bet);
		}
		else if(burst(player.countTotal())){ 
			System.out.println("Player looses - burst");
			loose(coins,bet);
		}else if(burst(dealer.countTotal())){ 
			System.out.println("Dealer looses - burst");
			win(coins,bet);
		}else if(dealer.countTotal()<player.countTotal()){ 
			System.out.println("Player Wins");
			win(coins,bet);
		}else if(dealer.countTotal()>player.countTotal()){ 
			System.out.println("Player looses");
			loose(coins,bet);
		}else{
			System.out.println("FAIR");
		}
	}
	public static boolean checkCoins(Coins coins, Bet bet){
		int h=coins.getHundreds();
		int t=coins.getTwenties();
		int hBet=bet.getHundreds();
		int tBet=bet.getTwenties();
		if(hBet>h && tBet>t){
			System.out.println("Number of 100s should not exceed "+h+'\n'+"Number of 20s should not exceed "+t);
			return true;
		}else if(hBet>h){
			System.out.println("Number of 100s should not exceed "+h);
			return true;
		}else if(tBet>t){
			System.out.println("Number of 20s should not exceed "+t);
			return true;
		}else{
			return false;
		}
	}
	public static void bj(Coins coins,Bet bet){
		int amount=(bet.getTotal()*3)/2;
		int h = amount/100; //coins of 100 wom
		int leftOver=amount%100;
		int t = leftOver/20; //coins of 20 won
		//update coins
		coins.reduceCoins(bet.getHundreds(),bet.getTwenties());
		coins.addCoins(h,t);
	}
	public static void win(Coins coins,Bet bet){
		int hBet=bet.getHundreds();
		int tBet=bet.getTwenties();
		coins.addCoins(hBet,tBet);
	}
	public static void loose(Coins coins,Bet bet){
		int hBet=bet.getHundreds();
		int tBet=bet.getTwenties();
		coins.reduceCoins(hBet,tBet);
	}
	//This method will make sure the user is never left with zero 20s or 100s coins (unless they have no coins at all)
	public static Coins coinsRecount(Coins coins){
		int h=coins.getHundreds();
		int t=coins.getTwenties();
		if(t>40){//balance amount of 100s and 20s coins // if 20s coins>40
			h+=4; //transform 20 20s coins to 4 100s coins 
			t-=20;
		}else if(h==0 && t>5){ 
			h=1;
			t-=5;
		}else if(t==0 && h>0){
			h-=1;
			t=5;
		}
		coins = new Coins(h,t);
		return coins;
	}
	
	
}