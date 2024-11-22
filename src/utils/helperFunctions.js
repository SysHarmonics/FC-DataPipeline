export const splitValidation = (input) => {
    if (!input || !input.trim === "") {
        console.log("invalid characters");
    }

    let inputArray = input.split(",");
    let regEx = /^[a-z0-9]+$/i;
    let validatedElements = [];
    
    for (let i = 0; i < inputArray.length; i++) {
        let element = inputArray[i].trim()
        if (regEx.test(element)) {
           validatedElements.push(element.toLowerCase()); 
        }
    }
    return validatedElements;
};