/**
 * @function getFormatedDate
 * This function returns today date with a special format for file names
 */
export const getFormatedDate = () => {
    let time = new Date(); // get today date
    // initialize a dictionary with the short months names 
    let monthsDictionary = [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
    // returns the date in the format "month-day-year_hour:minute:miliseconds"
    return `${monthsDictionary[time.getMonth()]}-${((time.getDate()+'').length === 1 ? '0' : '') + time.getDate()}-${time.getFullYear()}_${time.getHours()}${time.getMinutes()}${time.getMilliseconds()}`;
}
/**
 * @function generateQueryParamsString
 * This function generates query params in string format
 * @param originalParams = object with the original params
 * @param colorWord = word that will be used to identify the color field
 */
export const generateQueryParamsString = (originalParams, colorWord) => {
    let params = {}; // initialize the final object
    for (const category in originalParams) { // iterate over the categories
        if(Array.isArray(originalParams[category])) { // check if is an array
            if(category.toLowerCase().includes(colorWord)) { // then check if is the color field
                if(originalParams[category].length !== 0) // check if the array is not empty and sets the color param
                    params[category] = originalParams[category][0]?.['hex'].replaceAll("#","").toUpperCase();
            } else {
                // if is not the color field
                if(originalParams[category].length !== 0) // then check if the array is no empty and sets the param
                    params[category] = originalParams[category].map((item => (`${item.code}${item.value ? `|${item.value}` : ""}`))).join("'")
            }
        } else { // if is not an array (is a object with subcategories like 'suspension' > 'tires')
            for(const subCategory in originalParams[category]) { // runs the object keys
                if(originalParams[category][subCategory].length !== 0) // check if the array is not empty and sets the param with his subcategory 
                    params[`${category}>${subCategory}`] = originalParams[category][subCategory].map((item => (`${item.code}${item.value ? `|${item.value}` : ""}`))).join("'")
            }
        }
    }
    return params; //return the params
}