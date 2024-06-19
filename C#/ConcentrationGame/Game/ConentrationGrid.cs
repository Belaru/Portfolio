namespace MemoryGame
{
    public class ConcentrationGrid
    {
        public Card?[,] _grid;
        public ConcentrationGrid()
        {
            _grid = new Card?[4, 4];
            SetupGrid();
        }

        //GRID SETUP METHODS

        //Method responsible for creating cards, shuffling them and then
        //dealing them out into the grid.
        internal void SetupGrid()
        {
            List<Card> deck = CreateCards();
            //Use Enumable.OrderBy with Random to "shuffle" the cards.
            //Don't worry about this, no bugs on these 2 lines.
            Random rand = new Random();
            deck = deck.OrderBy(_ => rand.Next()).ToList();
            //Use the shuffled deck to fill out the grid.
            FillGrid(deck);

        }

        //Creates a list containing 2 copies of each card value A-H
        public List<Card> CreateCards() ///test
        {
            List<Card> deck = new List<Card>();
            foreach (CardValue val in Enum.GetValues<CardValue>())
            {
                deck.Add(new Card(val));
                deck.Add(new Card(val));
                deck.Add(new Card(val));
            }
            return deck;
        }

        //Deals out each pair of cards randomly into the 4x4 grid.
        public void FillGrid(List<Card> deck) //test
        {      
            //this works just takes too long
            while(!IsFull())
            {
                Random rand = new Random();
                Card letter=deck[rand.Next(0,21)];
                for(int count=0;count<2;)
                {
                    int row = rand.Next(0,4);
                    int col = rand.Next(0,4);
                    if(_grid[row, col] == null)
                    {
                        _grid[row, col]=letter;
                        count++;
                    }
                }
            }
        }


        //GRID GAME METHODS

        //Match checks to see if two positions in the grid match.
        //If they do, the two cards are removed from the grid, returns true
        //If not, returns false
        public Boolean CheckMatch(Tuple<int, int> position1, Tuple<int, int> position2) //test
        { 
            //checks if one of the provided
            try{
                Card c1 = _grid[position1.Item1, position1.Item2];
                Card c2 = _grid[position2.Item1, position2.Item2]; 
                if (c1.Match(c2))
                {
                    _grid[position1.Item1, position1.Item2] = null;
                    _grid[position2.Item1, position2.Item2] = null;
                    return true;
                }
                else
                {
                    return false;
                }

            }catch(NullReferenceException e){
                Console.WriteLine($"Empty Cell! {e.Message}");
                return false;
            }
        }
        public Boolean CheckNull(Tuple<int, int> position){
            
            return _grid[position.Item1, position.Item2] == null;
        }

        //Returns true if the grid is empty (IE: All cards have been matched)
        public Boolean IsEmpty() //test
        {
            for (int i = 0; i < _grid.GetLength(0); i++)
            {
                for (int j = 0; j < _grid.GetLength(1); j++)
                {
                    //if at least one element is not null, grid is not empty.
                    if (_grid[i, j] != null)
                    {
                        return false;
                    }
                }
            }
            return true; //only returns true if all cells are empty - ana
        }

        public Boolean IsFull()
        {
            for (int i = 0; i < _grid.GetLength(0); i++)
            {
                for (int j = 0; j < _grid.GetLength(1); j++)
                {
                    //if at least one element is not null, grid is not empty.
                    if (_grid[i, j] == null)
                    {
                        return false;
                    }
                }
            }
            return true; //only returns true if all cells are used - ana
        }

        //GRID PRINTING METHODS

        //Print the grid revealing no cards
        public void PrintGrid()
        {
            PrintGrid(new List<Tuple<int, int>>());
        }

        //Print the grid, revealing cards at all positions indicated via a list of tuples
        public void PrintGrid(List<Tuple<int, int>> revealed)
        {
            Console.WriteLine("    0 1 2 3\n");
            for (int i = 0; i < _grid.GetLength(0); i++)
            {
                Console.Write($"{i}   ");
                for (int j = 0; j < _grid.GetLength(1); j++)
                {
                    PrintGridPosition(i, j, revealed);
                }
                Console.WriteLine();
            }
        }

        //Prints the card at position i,j in the grid, showing it if it has been revealed.
        public void PrintGridPosition(int i, int j, List<Tuple<int, int>> revealed)
        {

            if (revealed.Contains(new Tuple<int, int>(i, j)))
            {
                Console.Write($"{_grid[i, j]} ");
            }
            else if (_grid[i, j] == null)
            {
                Console.Write("  ");
            }
            else
            {
                Console.Write("? ");
            }
        }
    }
}