function init(){
    let convertBtn=document.getElementById("get_data_btn");
    formBtn.disabled=true;

    /*SUBMIT BUTTON*/

    /**
     * addEventListener for convert button when clicked
     * gets an absolute url by getAbsoluteRequestURL()
     * and generates new table row with getData(url)
     */
    convertBtn.addEventListener('click', function(){
        let url=getAbsoluteRequestURL();
        getData(url);

    });

    /**
     * addEventListener for each input when changed
     * enables the convert button if all fields are valid
     * disables the convert button if all fields are invalid
     * with validInputs()
     */

    inputs.forEach((input)=>{input.addEventListener("change",validInputs)});
}

init();