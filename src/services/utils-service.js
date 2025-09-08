'use client' // Renders on client side
import messages from '@/jsons/translations/en.json';

/**
 * Function to clone a JavaScript object.
 * `cloneObject` is a function that clones the original object and
 *  forces it to be stored in a different memory space.
 * @param {object} obj - Object to clone.
 * @returns {object} - Returns the cloned object in another memory space.
*/
const cloneObject = (obj) => JSON.parse(JSON.stringify(obj));
// END: cloneObject
/**
 * Function to convert `camelCase` to `normal case`.
 * `formatCamelCaseToNormalCase` is a function that converts a `camelCase` 
 *  string to  to `normal case` string.
 * @param {string} s - String to convert to normal case.
 * @returns {string} - Returns the converted string.
*/
const formatCamelCaseToNormalCase = (s) => {
    if (!s) return s;
    const isOnlyDigits = /^-?\d+$/.test(s);

    if (isOnlyDigits) {
        const num = parseInt(s, 10);
        return `#${num + 1}`;
    }
    const normalizedString = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const result = normalizedString.replace(/([A-Z])|(_+)/g, (match, p1, p2) => {
        if (p1) { // If an uppercase letter was matched
            return ` ${p1.toLowerCase()}`;
        } else if (p2) { 
            return ' ';
        }
        return match; 
    }).trim()
    return result.charAt(0).toLowerCase() + result.slice(1);
};
// END: formatCamelCaseToNormalCase
/**
 * Function to convert `kebab-case` to `camelCase`.
 * `formatKebabCaseToCamelCase` is a function that converts a `kebab-case` 
 *  string to  to `camelCase` string.
 * @param {string} s - String to convert to normal case.
 * @returns {string} - Returns the converted string.
*/
const formatKebabCaseToCamelCase = s => s.replace(/-./g, x=>x[1].toUpperCase())
// END: formatKebabCaseToCamelCase
/**
 * Function to format an array to a string.
 * `formatPropsToLimits` is a function that converts an array 
 *  of string to a string, adding a special format. This works
 *  for products item props and another places of products.
 * @param {string[]} arr - List with the items to convert.
 * @param {string} symbol - Symbol to add to the converted string.
 * @returns {Object} - Returns the converted string.
*/
const formatPropsToLimits = (arr, symbol = ", ") => {
    if(Array.isArray(arr)) {
        if(arr.length > 4) {
            let last = arr.length - 1;
            return `${arr[0]} - ${arr[last]}`
        } 
        return arr.join(symbol)
    }
    return arr;
}
// END: formatPropsToLimits
/**
 * Function to format a number to currency format.
 * `currencyFormat` is a function that converts a number 
 *  to currency format. 
 * @param {number} num - Number to convert to currency.
 * @returns {string} - Returns the converted number in string.
*/
const currencyFormat = (num) =>  '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' (USD)';
// END: currencyFormat
/**
 * Function to convert a webp image to png.
 * `convertWebpToPng` is a function that converts a `.webp` image file
 *  to `png` format.
 * @param {string} srcFile - Source of the image file to convert.
 * @param {number} scale - Scale factor to apply to the image.
 * @returns {HTMLImageElement} - Returns the image element converted to png.
*/
const convertWebpToPng = (srcFile, scale = 0.5, callback = () => {}) => {
    if(srcFile !== undefined) {
        let image = new Image();
        image.src = srcFile;
        image.onload = () => {
            var canvas = document.createElement('canvas');
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;
            canvas.getContext('2d').drawImage(image, 0, 0, image.width * scale, image.height * scale);
            
            callback(canvas.toDataURL('image/png'));
        };
        return image;
    }
    return false;
}
// END: convertWebpToPng
/**
 * Function to resize a base64 image to a desired image size.
 * `resizeDataURL` is a function that converts a base64 image file
 *  to a desired size.
 * @param {string} datas - Base 64 image.
 * @param {number} wantedWidth - A number of which width do you need.
 * @param {number} wantedHeight - A number of which width do you need.
 * @param {function} result - A callback function to return the result.
*/
function resizedataURL(datas, wantedWidth, wantedHeight, result = (val) => {}) {
    var img = document.createElement("img");
    img.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;
        ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);
        var dataURI = canvas.toDataURL("image/png");
        result(dataURI);
    };
    img.src = datas;
}
// END: resizedataURL
/**
 * Promise to resize a base64 image to a desired image size.
 * `resizedataURLProm` is a promise that converts a base64 image file
 *  to a desired size.
 * @param {string} datas - Base 64 image.
 * @param {number} wantedWidth - A number of which width do you need.
 * @param {number} wantedHeight - A number of which width do you need.
 * @returns {string} - Resized base 64 image or error.
*/
function resizedataURLProm(datas, wantedWidth, wantedHeight) {
    return new Promise((resolve, reject) => {
        try {
            var img = document.createElement("img");
            img.onload = function () {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = wantedWidth;
                canvas.height = wantedHeight;
                ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);
                var dataURI = canvas.toDataURL("image/png");
                resolve(dataURI);
            };
            img.src = datas;
        } catch (error) {
            reject(error)
        }
    });
}
// END: resizedataURLProm
/**
 * Promise to resize a base64 image to a desired file size.
 * `resizeBase64Image` is a promise that converts a base64 image file
 *  to a desired file size in Mb.
 * @param {string} base64Image - Base 64 image.
 * @param {number} maxSizeInMB - A number of file size (Mb).
 * @returns {string} - Resized base 64 image or error.
*/
const resizeBase64Image = (base64Image, maxSizeInMB = 4)  => {
    return new Promise((resolve, reject) => {
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      const img = new Image();
      img.src = base64Image;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d');
        const width = img.width;
        const height = img.height;
        const aspectRatio = width / height;
        const newWidth = Math.sqrt(maxSizeInBytes * aspectRatio);
        const newHeight = Math.sqrt(maxSizeInBytes / aspectRatio);
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        let quality = 0.8;
        let dataURL = canvas.toDataURL('image/jpeg', quality);
        resolve(dataURL);
      };
    });
}
// END: resizeBase64Image
/**
 * Function to check if translation exists.
 * `checkIfTranslationExists` is a promise that converts a base64 image file
 *  to a desired file size in Mb.
 * @param {string} fatherKey - Father key refeers to the PageName or reference key.
 * @param {string} childKey - Child element refeers to the translation we're looking for.
 * @returns {boolean} - Confirmation if the traduction exists on the file.
*/
const checkIfTranslationExists = (fatherKey, childKey) =>  JSON.stringify(messages[fatherKey]).includes(childKey);
// END: checkIfTranslationExists


/* Decoder */
// Regex for match special characters and convert to cod
const escapeRegExp = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
// Generate array of special characters
const chars = '.$[]#/%'.split('');
// Generate array of special characters codes
const charCodes = chars.map((c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
// Generate dictionaries for mapping characters to codes and vice versa
const charToCode = {};
const codeToChar = {};
// Populate dictionaries
chars.forEach((c, i) => {
  charToCode[c] = charCodes[i];
  codeToChar[charCodes[i]] = c;
});
// Generate regular expressions for matching characters
const charsRegex = new RegExp(`[${escapeRegExp(chars.join(''))}]`, 'g');
// Generate regular expression for matching codes
const charCodesRegex = new RegExp(charCodes.join('|'), 'g');

const encodeStringToURI = (str) => str.replace(charsRegex, (match) => charToCode[match]);
const decodeURIToString = (str) => str.replace(charCodesRegex, (match) => codeToChar[match]);

const includesSimilarWords = (s1, s2) => {
    let counter = 0;
    let ts1 = s1.split(' ');
    let ts2 = s2.split(' ');
    ts1.forEach(word => {
        if(ts2.includes(word)) {
            counter ++;
        }
    });
    // 
    
    return counter > 0
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d.toFixed(2);
}

export const formatText = (textToFormat)=>{
    let formatedText = ""
    let arrayOfWords = textToFormat.trim().split(" ")
    if(arrayOfWords.length> 1)
        formatedText = arrayOfWords.map((word) => { 
            let text =""
             if(word !== "" && word !==" ")
               text = word[0].toUpperCase() + word.substring(1); 
            return text
        }).join(" ");
    else
     formatedText = textToFormat.trim();
    return formatedText
}

export const normalizeCharacters = (str) => {
    return str.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}


/**
 * Reduce a numerator and denominator to it's smallest, integer ratio using Euclid's Algorithm
*/
function reduceRatio(numerator, denominator) {
    var gcd, temp, divisor;
    gcd = function (a, b) { 
    if (b === 0) return a;
    return gcd(b, a % b);
    }

    // take care of some simple cases
    if (!isInteger(numerator) || !isInteger(denominator)) return '? : ?';
    if (numerator === denominator) return '1 : 1';

    // make sure numerator is always the larger number
    if (+numerator < +denominator) {
    temp        = numerator;
    numerator   = denominator;
    denominator = temp;
    }

    divisor = gcd(+numerator, +denominator);
    return 'undefined' === typeof temp ? (numerator / divisor) + ' : ' + (denominator / divisor) : (denominator / divisor) + ' : ' + (numerator / divisor);
};
// END: reduceRatio

/**
 * Determine whether a value is an integer (ie. only numbers)
 */
function isInteger(value) {
    return /^[0-9]+$/.test(value);
};
// END: isInteger

/**
 * Solve for the 4th value
 * @param int num2 Numerator from the right side of the equation
 * @param int den2 Denominator from the right side of the equation
 * @param int num1 Numerator from the left side of the equation
 * @param int den1 Denominator from the left side of the equation
 * @return int
*/
function solve(width, height, numerator, denominator) {
    var value;

    // solve for width
    if ('undefined' !== typeof width) {
    value = round() ? Math.round(width / (numerator / denominator)) : width / (numerator / denominator);
    }

    // solve for height
    else if ('undefined' !== typeof height) {
    value = round() ? Math.round(height * (numerator / denominator)) : height * (numerator / denominator);
    }

    return value;
};
// END: solve






/* Exportation of the functions */
export { 
    cloneObject, formatCamelCaseToNormalCase, currencyFormat, convertWebpToPng, 
    resizedataURL, resizedataURLProm, resizeBase64Image, formatPropsToLimits, 
    formatKebabCaseToCamelCase, checkIfTranslationExists, encodeStringToURI,
    decodeURIToString, includesSimilarWords, 
}