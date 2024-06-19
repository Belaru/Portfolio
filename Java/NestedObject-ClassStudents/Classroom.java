class Classroom{
  
  public String object;
  public int code;
  public Students[] student; //nested custom type
   
  public String getObject(){
    return this.object;
    
  }
  public int getCode(){
    return this.code;
    
  }
  public Students[] getArray(){
    return this.student;
    
  }
  public Classroom(String object, int code, Students[] student){
    this.object=object;
    this.code=code;
    this.student=student;
    
  }
  public String toString(){//special method
    String s="";
    for(int count=0; count < student.length; count++){
      s+="  "+this.student[count]+"\n";
    }
      
    return object+": "+code+", "+s; //print list of all students
    
  }
}