namespace application{

    class MainApplication{
        public void main(string[]args){

            ITextSource iTextSource=new UserTextSource();
            WordSearcher searcher = new WordSearcher(iTextSource);
            Console.WrriteLine("Occurrences are equal to" ,searcher.Search("ana"));

        }
    }

}