'use client' // Renders on client side
import React, { createContext, useContext, useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../fonts/vfs_fonts";
import { formatCamelCaseToNormalCase, currencyFormat, convertWebpToPng } from "../../services/utils-service";
import RequestModelDialog from "../../components/product-configurator/request_model_dialog";
import { useTranslations } from "next-intl";
import { getFormatedDate, generateQueryParamsString } from "./auxiliar_functions";

const ConfiguratorContext = createContext(); // creates the context for the configurator
const ConfiguratorCContext = ({children}) => {
    const kT = useTranslations('ProductsJson'); // loads translations of products json
    const cmT = useTranslations('ConfigureModel'); // loads translations of configure model component

    pdfMake.vfs = pdfFonts; // loads pdf fonts from file with encoded fonts
    pdfMake.fonts = { // loads every font into pdf make
        Teko: {
            normal:"Teko-Regular.ttf",
            bold: "Teko-Bold.ttf",
            italics: "Teko-SemiBold.ttf",
            bolditalics: "Teko-Bold.ttf"
        },
        ChakraPetch: {
            normal:"ChakraPetch-Regular.ttf",
            bold:"ChakraPetch-Bold.ttf",
            italics:"ChakraPetch-Italic.ttf",
            bolditalics:"ChakraPetch-SemiBold.ttf",
        },
    };

    /* States area */
    const [product, setProduct] = useState({});
    const [configParams, setConfigParams] = useState({});
    const [selectedProps, setSelectedProps] = useState({});
    const [selectedBaseModel, setSelectedBaseModel] = useState({});
    const [formatedProps, setFormatedProps] = useState({});
    const [totals, setTotals] = useState({subtotal:0, options:0, total:0})
    const [pngImage, setPngImage] = useState(undefined);
    const [isShowingDialog, setShowDialog] = useState(false);
    const [base64pdf, setBase64pdf] = useState(undefined);
    /* End of States area */
    /**
     * @function generatePDFBody
     * This function generates the body (entire parts list with prices) for pdf make
     */
    const generatePDFBody = () => {
        let arr = []; // start the first object 
        (Object.keys(formatedProps || {})).forEach((keyName, keyIndex) => {
            let internalItems = [];
            if(Array.isArray(formatedProps[keyName])) {
                (formatedProps[keyName]).forEach((item) => {
                    internalItems.push(
                        [   
                            
                            {
                                columns: [
                                    ...(item.hex ? 
                                        [
                                            {text:"", width:'auto'},
                                            { 
                                                width:"auto",
                                                margin:[4,0,0,0],
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0, y: 0, w: 40, h: 16, r: 2.5,
                                                        color: item.hex
                                                    }
                                                ]
                                            },
                                        ]
                                    : [{text:"", width:'auto'}]),
                                    {text:item.code, alignment:'left', color:"#4d4d4d", width:"auto"}, 
                                    {text:item.name, alignment:'left', width:"auto"}, 
                                ],
                                columnGap:8
                            },
                            {
                                stack:[
                                    {text:`${item.price ? currencyFormat(item.price) : ""} ${(formatCamelCaseToNormalCase(item.priceAddon) || '').toUpperCase()} ${item.value && item.price ? `x ${item.value} ${cmT('summary.units')}` : ""}`, alignment:'right', italics:true, bold:true},
                                    {text:`${item.value && item.price ? `= ${currencyFormat(item.price * item.value)}` : ""}`, alignment:'right', italics:true, bold:true}
                                ]
                            }
                            // {text:`${item.price ? currencyFormat(item.price) : ""} ${(formatCamelCaseToNormalCase(item.priceAddon) || '').toUpperCase()} ${item.value && item.price ? `x${item.value} UNITS` : ""} ${item.value && item.price ? `= ${currencyFormat(item.price * item.value)}` : ""}`, alignment:'right', italics:true, bold:true} 
                        ]
                    );
                });
            } else {
                for (const subkey in (formatedProps[keyName] || {}) ) {
                    internalItems.push(
                        [
                            {
                                columns: [
                                    {text:"", width:'auto'},
                                    {text:formatCamelCaseToNormalCase(subkey).toUpperCase(), italics:true, bold:true, alignment:"left"},
                                ],
                                columnGap:8
                            },
                            {text:""}
                        ]
                    );
                    (formatedProps[keyName][subkey]).forEach((item) => {
                        internalItems.push(
                            [ 
                                {
                                    margin:[8,0,0,0],
                                    columns: [
                                        (item.hex ? 
                                            { 
                                                width:"auto",
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0, y: 0, w: 40, h: 16, r: 2.5,
                                                        color: item.hex
                                                    }
                                                ]
                                            }
                                        : {text:"", width:'auto'}),
                                        {text:item.code, alignment:'left', color:"#4d4d4d", width:"auto"}, 
                                        {text:item.name, alignment:'left', width:"auto"}, 
                                    ],
                                    columnGap:8
                                },
                                {
                                    stack:[
                                        {text:`${item.price ? currencyFormat(item.price) : ""} ${(formatCamelCaseToNormalCase(item.priceAddon) || '').toUpperCase()} ${item.value && item.price ? `x ${item.value} ${cmT('summary.units')}` : ""}`, alignment:'right', italics:true, bold:true},
                                        {text:`${item.value && item.price ? `= ${currencyFormat(item.price * item.value)}` : ""}`, alignment:'right', italics:true, bold:true}
                                    ]
                                }
                                // {text:`${item.price ? currencyFormat(item.price) : ""} ${(formatCamelCaseToNormalCase(item.priceAddon) || '').toUpperCase()} ${item.value && item.price ? `(x${item.value} UNITS)` : ""} ${item.value && item.price ? `= $${currencyFormat(item.price * item.value)}` : ""}`, alignment:'right', italics:true, bold:true} 
                            ]
                        );
                    });
                }
            }

            let object = {
                stack: [
                    {
                        layout:'noBorders',
                        margin:[16,0,16,0],
                        alignment:'center',
                        table: {
                            widths: [ 'auto', '*', 'auto' ],
                            body: [
                                [
                                    {text:formatCamelCaseToNormalCase(keyName).toUpperCase(), italics:true, bold:true, alignment:"left"},
                                    {text:""},
                                    {text:""},
                                ],
                            ]
                        }
                    },
                    {
                        layout:'noBorders',
                        margin:[16,8,16,0],
                        alignment:'center',
                        table: {
                            widths: [ '*', 'auto' ],
                            body: internalItems.length > 0 ? internalItems : 
                            [
                                [ 
                                    {
                                        columns: [
                                            {text:"", width:'auto'},
                                            {text:cmT('summary.nothingSelected').toUpperCase(), alignment:'left', fontSize:10}, 
                                        ] 
                                    },
                                    {text:``, alignment:'right'} 
                                ]
                            ]
                        }
                    },
                ],
                // optional space between columns
                columnGap: 0
            };

            arr.push(object)
            
            if( keyIndex < ((Object.keys(formatedProps || {})).length - 1)  ) {
                
                arr.push(
                    ...[
                        {text:"", margin:[0,8,0,0]},//spacer
                        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 563.28, y2: 0, lineWidth: 0.5, lineColor:"#bdc3c7" } ] },
                        {text:"", margin:[0,8,0,0]},//spacer
                    ]
                )
            }
        });
        return arr;
    };
    /**
     * @function generatePDFObject
     * This function generates the object used for pdf make library
     */
    const generatePDFObject = () => (
        {
            info: {
                title: `Horizon Trailers - ${cmT('file.name')}`,
                author: 'Horizon Trailers LLC',
                creator:"Horizon Trailers LLC",
                producer:"Horizon Trailers LLC",
            },
            permissions: {
                printing: 'highResolution', //'lowResolution'
                modifying: false,
                copying: false,
                annotating: true,
                fillingForms: true,
                contentAccessibility: true,
                documentAssembly: true
              },
            pageMargins: [ 0, 64, 0, 64 ],
            background: function () {
                return {
                    canvas: [
                        {
                            type: 'rect',
                            x: 0, y: 0, w: 595.28, h: 64,
                            color: '#1c1c1e'
                        }
                    ]
                };
            },
            header: {
                margin:16,
                layout: 'noBorders',
                fontSize: 9,
                table: {
                widths: [ '40%',  '60%'],
                body: [
                    [ 
                        {
                            layout:'noBorders',
                            alignment:'left',
                            margin:[0,0,0,0],
                            table: {
                                widths: [ '100%'],
                                body: [
                                    [{
                                        link:"https://horizontrailers.com",
                                        image: "htLogo",
                                        width: 120,
                                    }],
                                ]
                            }
                        },
                        {
                            layout:'noBorders',
                            alignment:'right',
                            margin:[0,0,0,0],
                            table: {
                            widths: [ '100%'],
                            body: [
                                [{text:cmT('file.name').toUpperCase(), alignment:'right', color:"#808080", fontSize:14, lineHeight:0.8}],    
                                [{text:"HORIZON TRAILERS LLC 1163 HORIZON BLV EL PASO, TX. 79927 US", alignment:'right', color:"#808080"}],    
                            ]
                            }
                        }
                    ]
                ]
                },
            },
            content: [
                {
                layout: 'noBorders', // optional
                fillColor:'#f3f3f3',
                table: {
                    headerRows: 3,
                    widths: [ '100%' ],
                    margin:16,
                    body: [
                    [{text:"", margin:[0,8,0,0]}],
                    [ { text: cmT('isAlmostYours.title', {name: product.name || '-'}).toUpperCase(), bold: false, font:"Teko", fontSize:24, } ],
                    [ { text: cmT('isAlmostYours.subtitle'), bold: false } ],
                    [
                        {
                            image: pngImage,
                            width: 175,
                        }
                    ],
                    [{text:"", margin:[0,8,0,0]}],//line
                    ]
                }
                },
                {text:"", margin:[0,8,0,0]},//spacer
                {text:cmT('summary.title').toUpperCase(), font:"Teko", fontSize:24,},
                {text:"", margin:[0,8,0,0]},//spacer
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 563.28, y2: 0, lineWidth: 0.5, lineColor:"#bdc3c7" } ]},
                {text:"", margin:[0,8,0,0]},//spacer
                {text:cmT('summary.yourModelConfig', {name: product.name || '-'}).toUpperCase(), alignment:'left', margin:[16,0,0,16], italics:true, bold:true},
                {
                    columns: [
                      {
                        layout:'noBorders',
                        // fillColor:'#ff0000',
                        margin:[16,0,16,0],
                        alignment:'center',
                        table: {
                          widths: [ '50%', '50%' ],
                          body: [
                            [ {text:cmT('summary.basePrice'), alignment:'left'}, {text:`${currencyFormat(totals.subtotal)}`, alignment:'right'} ],
                            [ {text:cmT('summary.selectedOptions'), alignment:'left'}, {text:`${currencyFormat(totals.options)}`, alignment:'right'} ],
                            [ {text:cmT('summary.totalPrice'), alignment:'left', italics:true, bold:true}, {text:`${currencyFormat(totals.total)}`, alignment:'right', italics:true, bold:true} ],
                          ]  
                        }
                      },
                  ],
                    // optional space between columns
                    columnGap: 10
                },
                {text:"", margin:[0,8,0,0]},//spacer
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 563.28, y2: 0, lineWidth: 0.5, lineColor:"#bdc3c7" } ]},
                {text:"", margin:[0,8,0,0]},//spacer
                // bodyProps,
                generatePDFBody(),
                {text:"", margin:[0,8,0,0]},//spacer
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 563.28, y2: 0, lineWidth: 0.5, lineColor:"#bdc3c7" } ]},
                {text:"", margin:[0,8,0,0]},//spacer
                {text:cmT('summary.notes.title').toUpperCase(), font:"Teko", fontSize:24,},
                {text:"", margin:[0,8,0,0]},//spacer
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 563.28, y2: 0, lineWidth: 0.5, lineColor:"#bdc3c7" } ]},
                {text:"", margin:[0,8,0,0]},//spacer
                {
                    columns: [
                      {
                        layout:'noBorders',
                        margin:[16,0,16,0],
                        alignment:'left',
                        ol:[
                            cmT('summary.notes.n1'),
                            cmT('summary.notes.n2'),
                            cmT('summary.notes.n3'),
                            cmT('summary.notes.n4'),
                            cmT('summary.notes.n5'),
                        ],
                      }
                    ]
                },
                {
                    margin:16,
                    alignment:'center',
                    layout: 'noBorders',
                    fontSize: 9,
                    table: {
                    widths: [ '*','60%', '*'],
                    body: [
                        [ 
                            "",
                            {
                                width:50,
                                alignment:'center',
                                link: window.location.href,
                                stack: [
                                    { canvas:[
                                        { 
                                            type: 'rect',
                                            x: 0, 
                                            y: 0, 
                                            w:240, 
                                            h: 24, 
                                            r: 2,
                                            color: '#6897d8',
                                            lineColor: '#6897d8',
                                        }
                                    ] },
                                    {
                                        text:cmT('file.checkConfigOnPage').toUpperCase(), 
                                        color: '#FFFFFF',
                                        alignment:'center',
                                        fontSize:12,
                                        noWrap: true, 
                                        maxHeight: 16,
                                        relativePosition:{y:-20 }
                                    }
                                ]
                            },
                            "",
                        ]
                    ]
                    },
                },
                
            ],
            footer: function(currentPage, pageCount) { return {
                margin:16,
                layout: 'noBorders',
                fontSize: 9,
                table: {
                widths: [ '40%',  '60%'],
                body: [
                    [ 
                        {
                            layout:'noBorders',
                            alignment:'left',
                            margin:[0,0,0,0],
                            table: {
                            widths: [ '100%'],
                            body: [
                                [{text:cmT('file.checkMoreProducts').toUpperCase(), link:"https://horizontrailers.com/products", alignment:'left', color:"#808080", lineHeight:0.8}],    
                                [{text:`COPYRIGHT © HORIZON TRAILERS LLC ${new Date().getFullYear()}`, link:"https://horizontrailers.com/about-us", alignment:'left', color:"#808080"}],    
                            ]
                            }
                        },
                        {
                            layout:'noBorders',
                            alignment:'right',
                            margin:[0,0,0,0],
                            table: {
                            widths: [ '100%'],
                            body: [
                                [{text: cmT('file.pageOf', {page: currentPage.toString(), total: pageCount}).toUpperCase(), alignment:'right', color:"#808080", lineHeight:0.8}],    
                                [{text:cmT('file.goToPage').toUpperCase(), link:"https://horizontrailers.com/", alignment:'right', color:"#808080"}],    
                            ]
                            }
                        },
                    ]
                ]
                },
                }; 
            },
            styles: {
                body: {
                    fillColor:'#ffffff'
                }
            },
            images: {
                htLogo: `data:image/png;base64,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`
            },
            defaultStyle: {
                alignment: 'center',
                font:"ChakraPetch"
            }
        }
    );

    const downloadPDF = () => pdfMake.createPdf(generatePDFObject()).download(`${(product.name || '-').replaceAll(" ", "_")}_CONFIG_HT${getFormatedDate()}.pdf`);
    const getBase64Pdf = (callback = () => {}) => pdfMake.createPdf(generatePDFObject()).getBase64(callback);
    const setSelectedPropsInContext = (value) => setSelectedProps(value);
    const setProductInContext = (params) => setProduct(params);

    const isColorAndBaseModelEmpty = () => {
        if(JSON.stringify(formatedProps) === "{}" || formatedProps === undefined) {
            return true;
        } else {
            if(( formatedProps[kT('baseModel')].length === 0 || formatedProps[kT('baseModel')] === undefined ) ||
            (formatedProps.hasOwnProperty(kT('color')) ? (formatedProps[kT('color')].length === 0 || formatedProps[kT('color')] === undefined) : false) ||
            (formatedProps.hasOwnProperty(kT('dumpColor')) ? (formatedProps[kT('dumpColor')].length === 0 || formatedProps[kT('dumpColor')] === undefined) : false) ||
            (formatedProps.hasOwnProperty(kT('deckColor')) ? (formatedProps[kT('deckColor')].length === 0 || formatedProps[kT('deckColor')] === undefined) : false) ||
            (formatedProps.hasOwnProperty(kT('chassisColor')) ? (formatedProps[kT('chassisColor')].length === 0 || formatedProps[kT('chassisColor')] === undefined) : false)
            ) {
                return true;
            }
        }
        return false;
    }

    const setFormatedPropsList = (fullListOfOptions, selectedProps) => {
        let { baseModel, color, options } = selectedProps;

        if(baseModel !== "") {
            let baseItem = fullListOfOptions["baseModel"].find((item) => item.code === baseModel);
            setSelectedBaseModel(baseItem)
            // 
            setFormatedProps((prev) => ({...prev, baseModel: {...baseItem}}));
        } else {
            setFormatedProps((prev) => ({...prev, baseModel: {}}));
        }

        if(color) {
            setFormatedProps((prev) => ({...prev, color}))
        }
        
        if(Object.keys(options).length !== 0) {
            Object.keys(options).forEach((propName) => {
                if(Array.isArray(options[propName])) {
                    //array
                    let newObj = {};
                    let arr = [];
                    options[propName].forEach((propItem) => {
                        let subcategory = propItem['subcategory'];
                        let code = propItem['code'];
                        let array = (subcategory ? fullListOfOptions[propName][subcategory] : fullListOfOptions[propName]);
                        let item =  {...array.find((item) => item.code === code)};
                        item.value ??= item.priceAddon === "each" && 1;
                        
                        
                        arr.push(item);
                        newObj[propName] = subcategory ? {[subcategory]:arr} : arr;
                    });
                    setFormatedProps((prev) => ({...prev, options: {...newObj}}))
                } else {
                    //object
                    let subcategory = options[propName]['subcategory'];
                    let code = options[propName]['code'];
                    let array = (subcategory ? fullListOfOptions[propName][subcategory] : fullListOfOptions[propName]);
                    
                    let item =  {...array.find((item) => item.code === code)};
                    item.value ??= item.priceAddon === "each" && 1;
                    
                    setFormatedProps((prev) => ({...prev, options: {[propName]: subcategory ? {[subcategory]:item} : [{...item}]}}))
                } 
            });
        } 
    }

    const convertWebpImageToPng = () => {
        let src = product?.descriptions?.gallery?.[0];
        
        convertWebpToPng(src, 0.5, (imageData) => {
            if(imageData) {
                setPngImage(imageData)
            }
        })
    }

    const filterToOnlySelectedItems = (params) => {
        let newObj = {};
        for (const category in params) {
            if(Array.isArray(params[category])) {
                let newArr = params[category].filter((item) => item.checked).map((item) => ({ ...item, value: item.value || (item.priceAddon === "each" && 1) })); 
                newObj[category] = newArr;
            } else {
                newObj[category] ??= {};
                for (const subcategory in params[category]) {
                    let newArr = params[category][subcategory].filter((item) => item.checked).map((item) => ({ ...item, value: item.value || (item.priceAddon === "each" && 1) }));
                    if(newArr.length > 0) {
                        newObj[category][subcategory] = newArr;
                    }
                }
            }
        }
        const resParams = generateQueryParamsString(newObj, kT('color'));
        setConfigParams(resParams);
        return newObj;
    }
    
    const initContext = (params) => {
        if(JSON.stringify(params) !== '{}' && params !== undefined) {
            setFormatedProps(filterToOnlySelectedItems(params))
        }
    }

    const setContextAndCalculate = (options, selectedProps) => {
        setSelectedPropsInContext(selectedProps)
        setFormatedPropsList(options, selectedProps)   
    }

    const calculateTotals = () => {
        let optionsTotal = 0;
        let baseModel = formatedProps?.['baseModel']?.[0] || {};
        
        if(JSON.stringify(formatedProps) !== "{}" || formatedProps !== undefined) {
            Object.keys(formatedProps || {}).forEach((prop) => {
                if(prop !== "baseModel" && prop !== 'colors') {
                    if(Array.isArray(formatedProps[prop])) {
                        formatedProps[prop].forEach((element) => {
                            if(element['priceAddon'] === 'perLinearFt') {
                                optionsTotal += ( element['price'] >= 0 ? element['price'] * (baseModel.large ? baseModel.large : 0) : 0) || 0;
                            }else if(element['priceAddon'] === 'each') {
                                optionsTotal += ( element['price'] >= 0 ? +element['price'] * +element['value'] : 0) || 0;
                            }else {
                                optionsTotal += ( element['price'] >= 0 ? element['price'] : 0) || 0;
                            }
                        })
                        
                    } else {
                        Object.keys(formatedProps[prop]).forEach((subProp) => {
                            formatedProps[prop][subProp].forEach((element) => {
                                if(element['priceAddon'] === 'perLinearFt') {
                                    optionsTotal += ( element['price'] >= 0 ? element['price'] * (baseModel.large ? baseModel.large : 0) : 0) || 0;
                                }else if(element['priceAddon'] === 'each') {
                                    optionsTotal += ( element['price'] >= 0 ? +element['price'] * +element['value'] : 0) || 0;
                                }else {
                                    optionsTotal += ( element['price'] >= 0 ? element['price'] : 0) || 0;
                                }
                            });
                        });  
                    }
                }
    
            })    
        }
        
        setTotals({subtotal:baseModel.price || 0, options:optionsTotal, total: (baseModel.price || 0) + optionsTotal})
    }

    const showRequestModelDialog = () => {
        setShowDialog(true);
        getBase64Pdf((data) => setBase64pdf(data) );
    }

    useEffect(() => { calculateTotals(); generatePDFBody(); }, [formatedProps]);

    useEffect(() => {
        setTotals({subtotal:0, options:0, total:0});
        setSelectedProps({});
        setFormatedProps({});
        setSelectedBaseModel({});
    }, [])


    useEffect(() => {
        if(product !== undefined || JSON.stringify(product) !== "{}") {
            convertWebpImageToPng()
        }
    }, [product]);
    //#region view
    return (
        <ConfiguratorContext.Provider value={{
            selectedProps,configParams,totals,product,
            formatedProps,selectedBaseModel,
            setContextAndCalculate,setProductInContext,getBase64Pdf,
            initContext,downloadPDF,isColorAndBaseModelEmpty,showRequestModelDialog
        }}>
            {children}
            <RequestModelDialog 
                showModal={isShowingDialog} 
                product={product} 
                pdf={base64pdf}
                dispose={() => {setShowDialog(false); setBase64pdf(undefined)}}
            />
        </ConfiguratorContext.Provider>
    );
};

export default ConfiguratorCContext;

export const useConfiguratorContext = () => useContext(ConfiguratorContext);