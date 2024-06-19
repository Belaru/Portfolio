class Students{
  
  public int studentId;
  public String name;
  public String program;
  
  public int getId(){
    return this.studentId;
    
  }
  public String name(){
    return this.name;
    
  }
  public String program(){
    return this.program;
    
  }
  public Students(int id, String name, String program){
    this.studentId=id;
    this.name=name;
    this.program=program;
    
  }
  public String toString(){
    return name+": "+studentId+", "+program;
    
  }
}