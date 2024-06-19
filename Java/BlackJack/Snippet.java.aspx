import java.util.Scanner;

class Snippets{

public static void main(String[]args){
Scanner user=new Scanner(System.in);

/*ACTIVITY 1 - BRACKET MATCHING*/


System.out.println("Delimiter");//takes delimiter length as input
int delimiter=user.nextInt();

int[] lining = {2,3,4,5,7,8,2,4,5,6,2,3,4};//new array

System.out.println(printInteger(lining, delimiter));//prints number between two first delimiters

/*ACTIVITY 2 - COLLISION DETECT*/

int[][] gridworld={{0,1,0,0},{1,1,0,0},{1,0,0,0},{0,1,0,0}};
/* GRID
0,1,0,0
1,1,0,0
1,0,0,0
0,1,0,0

Robot moves up - 1 is an obstacle
*/

//robot position
System.out.println("Array number: 0 to 3");
int x=user.nextInt();//takes array in a list

System.out.println("Index number: 0 to 3");
int y=user.nextInt();//takes index in array

if(moveUp(gridworld,x,y)){//prints collision if there is an obstacle above robot's position
System.out.println("Collision");
}else{
System.out.println("No obstacle above");
}

/*ACTIVITY 3 - DISTANCE BETWEEN POINTS*/

double[] pointA={2,4,5};//stores 3D position of point A
double[] pointB={-2,3.5,7};//stores 3D position of point A

/* axises x,y,i */

System.out.println("The distance is "+findDistance(pointA, pointB));

/*ACTIVITY 4 - MATRIX TRANSPOSE*/


int[][] matrixArrays={{1,2,3},{4,5,6},{7,8,9}};//new matrix array
int[][] matrixArrays2={{0,1,2,3},{4,5,6,7},{8,9,10,11},{12,13,14,15}};

printMat(matrixArrays);//prints matrix
System.out.println("============");//separate the Matrixes
printMat_2(matrixArrays);//prints matrix with swapped values
System.out.println("Longer matrix");
printMat(matrixArrays2);//prints matrix
System.out.println("============");//separate the Matrixes
printMat_2(matrixArrays2);

/*ACTIVITY 5 - ARRAY DELETION*/

//PartA
int[]array={2,4,4,4,5,6,2,3,4,1,8,7};//creates new array
for ( int a : array){
System.out.print(a+" ");
}
System.out.println('\n'+"Value to delete");
int target=user.nextInt();//stores number to remove in array

deleteVal(array, target);//delets target numbers in array

for ( int a : array){
System.out.print(a+" ");
}

//PartB
System.out.println('\n'+"PartB first array: ");
int[]array_1={9,9,1,8,7,6,5,2,9,1,2,8};
for ( int a : array_1){
System.out.print(a+" ");
}
System.out.println('\n'+"PartB second array: ");
int[]array_2={9,2,8};
for ( int a : array_2){
System.out.print(a+" ");
}
System.out.println('\n'+"Fisrt array update: ");
deleteVals(array_1, array_2);//deletes values from array_2 in array_1
for ( int a : array_1){
System.out.print(a+" ");
}

}
public static int printInteger(int[] lining, int delimiter){//returns values inside two delimiters as integer

	int number=0;//resulting number between two first delimiters
	int foundDelimiter1=0;//first delimiter in array
	int foundDelimiter2=0;//second delimiter in array

	for (int count = 0; count<=lining.length; count++){//goes througth values in array
	if(count==lining.length){//if the second (or first) delimiter is not found in the rest of array
	return 0;//returns 0 if second (or first) delimiter is not found
	}
	if(lining[count]==delimiter){//compares array value to delimiter
	foundDelimiter1=count;//if delimiter is found, stores index where the first delimiter is
	break;//leaves the code when delimiter is found
	}
	}

	for (int count = (foundDelimiter1+1); count<=lining.length; count++){//goes througth values after fist delimiter in array
	if(lining[count]==delimiter){//compare array value to delimiter
	foundDelimiter2=count;//if delimiter is found, stores index where the second delimiter is
	break;//leaves the code when next delimiter is found
	}
	}

	int sum=0;//will update decimal position of numbers inside delimiters
	for(int value=(foundDelimiter2-1); value>foundDelimiter1; value--){//goes throught values between delimiters in array
	number+=lining[value]*(int)Math.pow(10,sum);//stores values inside delimiters as single integer //gives appropriate decimal positions to values
	sum++;//updates decimal position higher for next values
	}

	return number;

}
public static boolean moveUp(int[][] gridworld, int x,int y){//returns true if there is an obstacle above the robot

if (x<=0||x>gridworld.length||y<0||y>
	=gridworld.length){//Out of Bounds
	return true;//returns true if the robot will collide because of lack of bounds
	}else{
	x--;//move position up
	return (gridworld[x][y]==1);//returns true if there is an object blocking the way up
	}
	}
	public static double findDistance(double[] pointA, double[] pointB){//returns distance between points
	double squareAxisDifference=0;//difference between values on sames axis of two points
	//array index
	for(int index=0;index<pointA.length;index++){//goes throught all axises
	squareAxisDifference+=Math.pow(pointA[index]-pointB[index],2);//sums square values of axis differences
	}

	return Math.sqrt(squareAxisDifference); //return square root of the sum

	}
	public static void printMat(int[][] matrix){//prints matrix

	for (int array=0; array<matrix.length;array++){//goes thought rows in order
	for(int index=0; index<matrix[0=""].length;index=""++){//goes throught values in order
	System.out.print(matrix[array][index]+"  ");//prints value in index and row
	}
	System.out.println("");
	}
	}
	public static void printMat_2(int[][] matrix){//prints matrix with swapped values

	for (int array=0; array<matrix.length;array++){//goes thought rows in order
	for(int index=0; index<matrix[0=""].length;index=""++){//goes throught values in order
	System.out.print(matrix[index][array]+"  ");//prints swapped value
	}
	System.out.println("");
	}
	}
	public static void deleteVal(int[] array,int target){//removes target value in array

	for(int index=0; index<array.length;index
        if=""(array=""[index=""]==target=""
          array=""[index=""]=0="";//replaces target value by 0
	}
	}
	}
	public static void deleteVals(int[] array,int[] array2){//removes values in array2 from array

	for(int count=0; count<array2.length;count++){//goes throught all array2 values
	for(int index=0; index<array.length;index++){//checks each array value
	int target=array2[count];
	if(array[index]==target){//common values between array and array2
	array[index]=0; //replaces common values by 0 //removes array values
	}
	}
	}

	}
}
