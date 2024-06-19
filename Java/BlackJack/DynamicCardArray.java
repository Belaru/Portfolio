import java.util.Random;
class DynamicCardArray{
	private Card[] cards;
	private int next;
	
	public DynamicCardArray(){
		cards = new Card[2];
		next=0;
	}
	public String toString(){
		String s="";
		for(int c=next-1;c>=0;c--){
			s+=cards[c]+"; ";
		}
		return s;
	}
	//dealer shows first card
	public String firstCard(){
		return cards[0]+"; HIDDEN"+'\n'+"First Card Total: "+cards[0].getTotal();
	}
	public int handLength(){ 
		return next;
	}
	public int countTotal(){ //Cards total
		int total=0;
		int ace = 0;
		for (Card c : this.cards ){
			if(c.getValue()==Value.ACE){ 
				ace++;
			}else{
			total+=c.getTotal(); 
			}
		}
		//values from Aces
		for(int a=ace, b=ace-a;a>=0;a--,b++){ 
			if(a==0){
				total+=b; // no effect on total if ace=0
				break;
			}
			if(total+11*a+b <= 21){
				total+=11*a+b;
				break;
			}
		}				
		
		return total;
	}
	/*public boolean contains(Card c){ //FOR ACE
		for(int i=0;i<next;i++){
			if(cards[i].getSuit()==c.getSuit()
				&& cards[i].getValue()==c.getValue()){
				return true;
			}
		}
		return false;
	}*/
	public void addCard(Card c){ 
		if(next>=cards.length){
			growArray();
		}
		cards[next] = c;
		next++;
	}
	public void growArray(){
		Card[] newAr=new Card[cards.length+1];
		for(int c=0;c<next;c++){
			newAr[c]=cards[c];
		}
		cards=newAr;
	}
	/*public void insertAtFront(Card n){ 
		if(next==cards.length){
			growArray();
		}
		Card[] newAr=new Card[cards.length];
		for(int c=0;c<next+1;c++){
			if(c==0){
				newAr[c]=n;
			}
			for(int i=0;i<c;i++){
				newAr[c]=cards[i];
			}
		}
		next++;
		cards=newAr;
	}*/
	/*this method is to create a deck of cards*/
	public void deck(){
		this.cards=new Card[52];
		int i=0;
		for (Suit s: Suit.values()) {
			for (Value v: Value.values()) {
				cards[i]=new Card(v,s);
				i++;
			}
		}
		this.next = cards.length;
		
	}
	/*this method will randomly pick a card from deck*/ 
	public Card takeOut(){ //--Card
	Random rand = new Random();
		int i=this.next;
		int x=rand.nextInt(i);
		Card newCard=cards[x];
		sort(x); //call sort x
		return newCard;
		
	}
	/*Shuffle the cards*/
	public void shuffle(){
		Random ind = new Random();
		int temp=next; 
		Card[] newDeck=new Card[cards.length];
		for(int c=0; c<newDeck.length; c++){
			int i = ind.nextInt(next);
			newDeck[c]=this.cards[i];
			sort(i);
		}
		this.cards=newDeck;
		this.next=temp; //remain the used deck length
	}
	/*Sort the cards*/
	public void sort(int i){
		this.cards[i]=this.cards[next-1];
		this.next--;
	}
	
}