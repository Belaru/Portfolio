/* Images from:
Dawson College
Photo by Markus Spiske from Pexels
Pixabay
Photo by Tim Gouw from Pexels
Photo by Tima Miroshnichenko from Pexels
Photo by Pavel Danilyuk from Pexels
Photo by cottonbro from Pexels
Photo by ThisIsEngineering from Pexels
Photo by olia danilevich from Pexels
Photo by Lukas from Pexels
Photo by Christina Morillo from Pexels
Photo by Christina Morillo from Pexels
Photo by Julien BRION from Pexels
Photo by Andrea Piacquadio from Pexels
Photo by Christina Morillo from Pexels
Photo by Christina Morillo from Pexels
Photo by ChPhoto by cottonbro from Pexels
Photo by Jorge Jesus from Pexels
Photo by Djordje Petrovic from Pexels
Pixabay
Photo by Antonio Batinić from Pexels
Photo by Designecologist from Pexels
Photo by ThisIsEngineering from Pexels
Photo by Christina Morillo from Pexels
Photo by Tranmautritam from Pexels
Photo by Format from Pexels
Photo by Sabrina Gelbart: https://www.pexels.com/photo/full-frame-shot-of-abstract-pattern-249798/
*/

const courses = [{
  name: 'Programming I - Java I',
  number: '420-110-DW',
  calendar: '1st semester (Fall)',
  desc: `The course will introduce the student to the basic building blocks
           (sequential, selection and repetitive control structures) and modules 
            (methods and classes) used to write a program. The student will use 
            the Java 
            programming language to implement the algorithms studied. The array data 
            structure is introduced, and student will learn how to program with objects.`,
  image: null
},
{
  name: 'Programming II - Java II',
  number: '420-210-DW',
  calendar: '2nd semester (Winter)',
  desc: `The course will introduce the student to basic object-oriented methodology
           in order to design, implement, use and modify classes, to write programs in the 
           Java language that perform interactive processing, array and string processing, 
           and data validation. Object-oriented features such as encapsulation and inheritance
            will be explored.`,
  image: 'img/17.jpg'
}, {
  name: 'Programming III - Java III',
  number: '420-310-DW',
  calendar: '3rd semester (Fall)',
  desc: `The course will introduce the student to the basic building blocks
           (sequential, selection and repetitive control structures) and modules 
            (methods and classes) used to write a program. The student will use the Java 
            programming language to implement the algorithms studied. The array data 
            structure is introduced, and student will learn how to program with objects.`,
  image: null
}, {
  name: 'Programming IV - Individual Project',
  number: '420-410-DW',
  calendar: '4th semester (Winter)',
  desc: `The course will focus on the construction of stand-alone applications
           that requires the design and implementation of multiple classes. The student
            will study standard data structures and their relevant use in the manipulation
             and management of data in applications. The student will learn to use databases
              from within an application and will work individually on a project to develop
               a complete software application.`,
  image: null
}, {
  name: 'Programming V - Simulations',
  number: '420-510-DW',
  calendar: '5th semester (Fall)',
  desc: `The course will focus on the use of algorithms and data structures to simulate
           real-life phenomena using an appropriate gaming framework. Projects are implemented
            using an object-oriented language.`,
  image: null
}, {
  name: 'Mobile Development - Android',
  number: '420-511-DW',
  calendar: '5th semester (Fall)',
  desc: `The course will focus on the development of applications within the Android 
          environment. Students will learn how to analyze, design, construct, and implement
           an effective mobile application using the Android mobile development environment.`,
  image: null
}, {
  name: 'Web Development I - HTML, CSS, JavaScript',
  number: '420-120-DW',
  calendar: '1st semester (Fall)',
  desc: `The course will introduce foundational web development skills while exploring
           the role of Web browsers and servers, protocols of the Web, and Web domains. Students
            will learn to apply HTML, CSS, and basic JavaScript to develop Web applications 
            containing various media and publish them using Web development tools.`,
  image: null
}, {
  name: 'Web Development II - JavaScript',
  number: '420-320-DW',
  calendar: '3rd semester (Fall)',
  desc: `The course will build upon the students’ knowledge of HTML5, CSS and JavaScript
           to create interactive web applications with AJAX and web APIs. This course focuses on
            the fundamental concepts of the JavaScript language.`,
  image: 'img/14.jpg'
}, {
  name: 'Web Development III - Server-side with Python',
  number: '420-420-DW',
  calendar: '4th semester (Winter)',
  desc: `The course will introduce concepts and techniques of server-side Web programming.
           The student will implement applications that run on the server, the client, and use a
            database to create dynamic Web applications, and Web APIs to respond to AJAX and mobile
             application queries.`,
  image: null
}, {
  name: 'Web Development IV - Scalable Web Applications',
  number: '420-520-DW',
  calendar: '5th semester (Fall)',
  desc: `The course will examine Web performance from the end-user perspective. Students are
           introduced to factors that impact browser loading and rendering time, tools that help in 
           measuring performance, and patterns and tips to improve performance. 
           Students will design 
           and build a full-stack application using JavaScript, with an emphasis on modern 
           best-practices
           for scalable Web applications, including algorithm optimization and 
           server-side/client-side
           performance considerations.`,
  image: null
}, {
  name: 'Web Development V - Team Project',
  number: '420-620-DW',
  calendar: '6th semester (Winter)',
  desc: `The course will teach teach students how to use Java to develop web server based 
          applications. Students will learn to code basic web applications, as well as applications
           that adhere to the web interpretation of the MVC design pattern. Students will work on a
            project in a group, designing, implementing and documenting a commercial website.`,
  image: null
}, {
  name: 'Infrastructure I - Computer System Organization',
  number: '420-140-DW',
  calendar: '1st semester (Fall)',
  desc: `The course will examine the layers of computer systems - hardware, operating system,
           and application software. This course will have the student gain hands-on experience 
           using
            hardware components that comprise a computer to assemble a complete system. The student
             will learn to install, maintain, configure and troubleshoot operating systems and 
             application 
             software. This course explores the concepts, terminology, and fundamental features of 
             operating systems, and students are introduced to both the Windows and Linux operating 
             systems.`,
  image: null
}, {
  name: 'Infrastructure II - Linux I',
  number: '420-240-DW',
  calendar: '2nd semester (Winter)',
  desc: `This course will explore the Linux operating system in detail. The 
    student will interact
           with Linux operating system via command-line interface, with emphasis 
           on bash shell commands,
            the vi editor, utilities and bash scripts to construct and use 
            command sequences to manipulate
             data and perform basic system administration tasks. The student 
             will install, configure and
              manage Linux.`,
  image: null
}, {
  name: 'Infrastructure III - Linux II',
  number: '420-440-DW',
  calendar: '4th semester (Winter)',
  desc: `The course will use Linux to reinforce student understanding of web development and
           distributed systems. The characteristics of a multi-user, multi-tasking, multi-threaded 
           operating system will be examined. Topics related to networking, security, monitoring, 
           industry best practice authentication and directory services operations will be covered.
            Aspects of connectivity using TCP/IP protocols, and application services such as DNS, 
            DHCP, SSH, and web servers with HTTP will be introduced. The students will also be 
            introduced to virtual machine concepts and creation.`,
  image: null
}, {
  name: 'Infrastructure IV - Delivery and Operations',
  number: '420-640-DW',
  calendar: '6th semester (Winter)',
  desc: `The course will provide an understanding on how to deploy and manage a system
           that is cloud based, through the use of tools to automate configuration and deployment.
            Management of systems includes monitoring of a live system, and software modification
             of an existing codebase. The course is framed from the point of view of a development
              team who need to fix code and deploy in a robust manner.`,
  image: null
}, {
  name: 'Administration',
  number: '401-910-DW',
  calendar: '1st semester (Fall)',
  desc: `The course will introduce office productivity software. It will include word 
          processing, spreadsheet, and presentation software, as well as cloud applications 
          commonly used to share and synchronize documents. Basic business concepts and terminology
           are introduced.`,
  image: null
}, {
  name: 'Applied Mathematics for Computer Science',
  number: '201-920-DW',
  calendar: '2nd semester (Winter)',
  desc: `This course will help students to acquire the necessary fundamental mathematical
           knowledge which represents the foundation for several courses in the Computer Science
            Program including the Linear Algebra course. For that purpose the goals of the course
             are: to review some important concepts of algebra and to ensure competency in proper
              algebraic manipulations, to introduce the concept of function, to ensure competency
               in the notation, properties and operations of functions in general, and of linear,
                quadratic, exponential and logarithmic functions in particular, to introduce the
                 trigonometric functions and to ensure competency in interpreting their properties
                  and applications.`,
  image: null
}, {
  name: 'Database I - SQL',
  number: '420-231-DW',
  calendar: '2nd semester (Winter)',
  desc: `The course will teach tools and techniques for database design and the use of 
          Structured Query Language (SQL). This course will cover the fundamental concepts of 
          the relational data model; the use of selected data modeling methodologies; and data 
          normalization techniques to create robust relations. The syntax and semantics of SQL, 
          to create and maintain relational databases will be studied.`,
  image: null
}, {
  name: 'Database II - Oracle',
  number: '420-331-DW',
  calendar: '3rd semester (Fall)',
  desc: `This course will introduce the student to the Oracle environment for building,
           deploying, hosting, and managing enterprise-class applications. The student will use
            SQL and PL/SQL to build and manage a database. In addition, the student will complete
             a case study which involves requirements analysis and data modeling, implemented
              using PL/SQL and Java.`,
  image: null
}, {
  name: 'Linear Algebra',
  number: '201-NYC-05',
  calendar: '3rd semester (Fall)',
  desc: `Systems of linear equations and elementary operations, matrices and determinants,
           vectors, lines, planes and vector spaces are studied in this course.`,
  image: null
}, {
  name: 'Data Communications and Networking',
  number: '420-540-DW',
  calendar: '5th semester (Fall)',
  desc: `This course is designed to familiarize the student with modern data communications
           theory, concepts, and terminology, including the various communications media and 
           protocols
            used to transmit and share information over various types of networks. Students will
             acquire sufficient knowledge of networks to be able to operate comfortably as 
             programmers
              in a network environment. Students will define and implement applications that make
               use
               of data exchange services. The services will use TCP/IP sockets programs that the 
               students will implement to demonstrate an understanding of the underlying protocols
                of the Internet.`,
  image: null
}, {
  name: 'Working in the Profession',
  number: '420-652-DW',
  calendar: '6th semester (Winter)',
  desc: `The course will cover various topics relevant to the profession: ethical dilemmas
           in computing, understanding the profession and work environment, intellectual property,
            different levels of technical communication targeting different audiences, case studies
             in data security and privacy. Students are expected to research and express opinions on
              technical topics.`,
  image: null
}, {
  name: 'Internship',
  number: '420-653-DW',
  calendar: '6th semester (Winter)',
  desc: `The Internship course will provide the student with an experiential basis for 
          learning how to apply the theoretical skills they acquired in the 
          Computer Science Technology
           Program in order to be better able to successfully pursue a career as 
           a software developer.`,
  image: null
}];

export default courses;