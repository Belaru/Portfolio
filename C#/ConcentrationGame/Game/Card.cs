namespace MemoryGame{
    public class Card{
        public Card(CardValue value){
            Value = value;
        }

        //The Value property is the symbol on it, defined by CardValue
        public CardValue Value { get; }

        //Method to check that two cards Match
        public Boolean Match(Card c){
            return c.Value == this.Value;
        }

        public override string ToString()
        {
            return Value.ToString();
        }
        
        public override bool Equals(Object obj)
        {
            if (obj == null || !(obj is Card))
                return false;
            else
                return this.Value == ((Card) obj).Value;
        }

        public override int GetHashCode()
        {
            return this.Value.GetHashCode();
        }
    }

    public enum CardValue{
        A,
        B,
        C,
        E,
        F,
        G,
        H
    }
}