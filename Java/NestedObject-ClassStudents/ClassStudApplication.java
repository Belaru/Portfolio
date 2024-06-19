
class ClassStudApplication{
  
  public static void main(String[]args){
    
    Students[] student=new Students[2];
    student[0]=new Students(2135698,"Anastasia Bondarenko", "CS");
    student[1]=new Students(2131123,"Emma Conlan", "Writting");
    
    Classroom classr=new Classroom("Dawson",786,student);
    
    System.out.print(classr);
  }
}