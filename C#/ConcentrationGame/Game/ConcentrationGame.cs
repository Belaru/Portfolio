namespace MemoryGame
{
    public class ConcentrationGame
    {

        private ConcentrationGrid _grid;
        private Player _activePlayer;
        private Player _inactivePlayer;
        public static void Main(string[] args)
        {
            ConcentrationGame game = new ConcentrationGame();
            game.RunGame();
        }


        //The constructor sets up a new game of Concentration
        public ConcentrationGame()
        {
            _grid = new ConcentrationGrid();
            Console.WriteLine("Welcome to Concentration, the matching game!");
            Console.WriteLine("Player 1, enter your name:");
            _activePlayer = new Player(GetValidInput());
            Console.WriteLine("Player 2, enter your name:");
            _inactivePlayer = new Player(GetValidInput());
        }

        //Get non-null input
        private string GetValidInput()
        {
            string? input;
            do
            {
                input = Console.ReadLine();
            } while (input == null);
            return input;
        }

        private int GetValidNumber(string? input)
        {
            int position=0;
            bool valid=false;
            while(!valid)
            {
                try{
                    position=Convert.ToInt32(input);
                    if(position>=0 && position<=3){
                        valid=true;
                    }else{
                        throw new Exception("");
                    }
                }
                catch(Exception){
                    Console.WriteLine("Please enter a number from 0 to 3");
                    input=GetValidInput();
                }
            }
            return position;
        }


        private void RunGame()
        {
            while (!_grid.IsEmpty())
            {
                Boolean madeMatch = DoTurn(_activePlayer);
                if (madeMatch)
                {
                    _activePlayer.addPoint();
                    Console.WriteLine($"{_activePlayer.Name} made a match! They now have {_activePlayer.Points} points");
                }
                else
                {
                    Console.WriteLine($"Sorry, no match! It is now {_inactivePlayer.Name}'s turn.");
                    SwitchActivePlayer();

                }
                Console.ReadKey();
            }
            ShowResults();
        }

        internal Boolean DoTurn(Player p)
        {
            //Create List of Guesses;
            List<Tuple<int, int>> guesses = new List<Tuple<int, int>>();
            //Ask for first guess, add it to the list
            guesses.Add(GetGuess(p, guesses));
            //Ask for second guess, add it to the list
            guesses.Add(GetGuess(p, guesses));
            Console.Clear();
            _grid.PrintGrid(guesses);
            //Check to see if it Matches, return the result
            return _grid.CheckMatch(guesses[0], guesses[1]);
        }

        //Prompt the user to enter a guess.
        internal Tuple<int, int> GetGuess(Player p, List<Tuple<int, int>> guesses)
        {
            Console.Clear();
            Console.WriteLine($"{p.Name}, choose a row and column to guess");
            _grid.PrintGrid(guesses);
            Console.Write("Row: ");
            int row = GetValidNumber(Console.ReadLine());
            Console.Write("Col: ");
            int column = GetValidNumber(Console.ReadLine());
            return new Tuple<int, int>(row,column); //here
        }

        //Swaps the currently active player, making the inactive player active and vice versa
        internal void SwitchActivePlayer()
        {
            Player previous_player= _activePlayer; // save _activePlayer in different obj - ana
            _activePlayer = _inactivePlayer;
            _inactivePlayer = previous_player;
        }

        private void ShowResults()
        {
            Console.Clear();
            Console.WriteLine($"Game over!");
            Console.WriteLine($"{_activePlayer.Name} has {_activePlayer.Points} points");
            Console.WriteLine($"{_inactivePlayer.Name} has {_inactivePlayer.Points} points");
            if (_activePlayer.Points > _inactivePlayer.Points)
            {
                Console.WriteLine($"{_activePlayer.Name} wins!");
            }
            else if(_activePlayer.Points < _inactivePlayer.Points)
            {
                Console.WriteLine($"{_inactivePlayer.Name} wins!");
            }else{
                Console.WriteLine("Tie :)");
            }
        }
    }
}