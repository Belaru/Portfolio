
using System;
using System.Net;
using System.Net.Sockets;
using System.IO;
using System.Text;
namespace services{
// •	UserTextSource – Use Console.ReadLine to get text from a user. (Interpret this however you like)
// •	MockTextSource – Text is set via a string passed to the constructor.
// •	WebTextSource – Use WebClient.OpenRead to get text from the web.
// •	FileTextSource – File.ReadAllLines to get text from a file.

    public interface ITextSource{
        public string ReadText();
    }

    public class UserTextSource : ITextSource{
        public string ReadText(){
            Console.WriteLine("Paste your text input below");
            string str = Console.ReadLine();
            return str;
        }
    }

    public class MockTextSource : ITextSource{
        public string str=" ";
        public MockTextSource(string str){
            this.str=str;
        }
        public string ReadText(){
            return this.str;
        }
    }
    //https://csharp.hotexamples.com/examples/-/WebClient/OpenRead/php-webclient-openread-method-examples.html
    public class WebTextSource : ITextSource{
        public string url=" ";
        public WebTextSource(string str){
            this.url=str;
        }
        public string ReadText(){
            MyWebClient client = new MyWebClient();
            Stream myStream = client.OpenRead(this.url); 
            StreamReader sr = new StreamReader(myStream);
            string str=sr.ReadToEnd();
            myStream.Close();
            return str;
        }
    }

    //https://www.geeksforgeeks.org/file-readalllinesstring-method-in-c-sharp-with-examples/
    public class FileTextSource : ITextSource{
        public string path=" ";
        public FileTextSource(string str){
            this.path=str;
        }
        public string ReadText(){
            // Calling the ReadAllLines() function
            string[] readText = File.ReadAllLines(@this.path);
            string str="";
            foreach(string s in readText)
            {
                str+=s;
            }
            return str;
        }
    }

    class WordSearcher{
        ITextSource textSource=null;
        public WordSearcher(ITextSource ts){
            this.textSource=ts;
        }
        public int Search(string keyword){
            int occurences=0;
            string text=this.textSource.ReadText();
            string[] words=text.Split(" ");
            foreach(string word in words)
            {
                if(word.Equals(keyword)){occurences++;}
            }
            return occurences;
        }

    }
}