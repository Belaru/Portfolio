namespace MemoryGame{
    public class Player
    {
        public Player(String name)
        {
            Name = name;
            Points = 0;
        }

        public string Name { get; }
        public int Points { get; private set;}

        public void addPoint(){
            ++Points; //adding a point - ana
        }

    }
}