namespace ConcentrationGameTest0;

using MemoryGame;
[TestClass] 
public class ConcentrationGridTest 
{
    private ConcentrationGrid grid =new ConcentrationGrid();
    [TestMethod]
    public void CheckMatchTest(){  
        Tuple<int,int> position = new Tuple<int, int>(1,1);
        bool check = grid.CheckMatch(position, position);
        Assert.AreEqual(true,check);
    }
    [TestMethod]
    public void CheckDontMatchTest(){  //CheckMatchTest calls Match() method. Test mismatch
        Card c1= new Card(CardValue.A);
        Card c2= new Card(CardValue.B);
        bool check = c1.Match(c2);
        Assert.AreEqual(false,check);
    }
    [TestMethod]
    public void FillGridTest(){  //this.grid is filled in constructor by object initialization
        Assert.AreEqual(true,grid.IsFull()); //IsFull returns true if the grid is full
    }

    [TestMethod]
    public void NotFillGridTest(){  //FillGrid method call IsFull method. Test false.
        grid._grid[0,0]=null;
        Assert.AreEqual(false,grid.IsFull()); //IsFull returns false if the grid has at least one empty cell
    }
    
    [TestMethod]
    public void CreateCardsTest(){
        Card[] cardsDeck = {new Card(CardValue.A), new Card(CardValue.A),new Card(CardValue.A),
        new Card(CardValue.B), new Card(CardValue.B),new Card(CardValue.B),
        new Card(CardValue.C), new Card(CardValue.C),new Card(CardValue.C),
        new Card(CardValue.E), new Card(CardValue.E),new Card(CardValue.E),
        new Card(CardValue.F), new Card(CardValue.F),new Card(CardValue.F),
        new Card(CardValue.G), new Card(CardValue.G),new Card(CardValue.G),
        new Card(CardValue.H), new Card(CardValue.H),new Card(CardValue.H)};
        CollectionAssert.AreEqual(cardsDeck,grid.CreateCards());
    }
    [TestMethod]
    public void IsNotEmptyTest(){ //IsEmpty should return false when the grid has at least one not empty cell
        Assert.AreEqual(false,grid.IsEmpty());
    }
    [TestMethod]
    public void IsEmptyTest(){ //IsEmpty should return true if all grid cells are empty
        for (int i = 0; i < grid._grid.GetLength(0); i++)
        {
            for (int j = 0; j < grid._grid.GetLength(1); j++){
                grid._grid[i, j] = null;
            }
        }
       Assert.AreEqual(true,grid.IsEmpty());
    }
    
}