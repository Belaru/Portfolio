class Card{
	private Value value;
	private Suit suit;
	
	public Card(Value v, Suit s){
		this.value=v;
		this.suit=s;
	}
	public Value getValue(){
		return this.value;
	}
	public Suit getSuit(){
		return this.suit;
	}
	public String toString(){
		return value+" "+suit;
	}
	public int getTotal(){
		return this.value.getTotal();
	}
}