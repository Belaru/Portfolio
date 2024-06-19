class ShutTheBox{
	public static void main (String[]args){
		System.out.println("Welcome to Shut The Box Game!");
		Board board=new Board();
		boolean gameOver=false;
		
		while(!gameOver){
			System.out.println("Player 1's turn");
			System.out.println(board);
			if(board.playATurn()){
				System.out.println("Player 2 won");
				gameOver=true;
			}else{
				System.out.println("Player 2's turn");
				System.out.println(board);
					if(board.playATurn()){
						System.out.println("Player 1 won");
						gameOver=true;
					}
			}
		}
	}
}