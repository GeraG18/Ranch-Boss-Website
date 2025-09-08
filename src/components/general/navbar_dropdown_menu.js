import React, { useEffect, useState} from "react"
import Link from "next/link"

function NavbarDropDown({menu, isShowing, xPos, yPos}) {
    //Logic
    const [isMenuStatic, setMenuStatic] = useState(false);
    const [submenuOpened, setOpenedSubmenu] = useState('');
    const [submenuItems, setSubmenuItems] = useState([]);
    const [hoveredItem, setHoveredItem] = useState('');

    const [dumpAnimation, setDumpAnimation] = useState(false)
    const [rolloffAnimation, setRollofAnimation] = useState(false)
    const [equipmentAnimation, setEquipmentAnimation] = useState(false)
    const [gooseneckAnimation, setGooseneckAnimation] = useState(false)


    const handleRightMouseEnter = () => {
      setMenuStatic(true);
    };
        
    const handleRightMouseLeave = () => {
        setMenuStatic(false);
    };
    const handleOnWheel = () => {
        setMenuStatic(false);
        setOpenedSubmenu('')
    }
    
    const handleMouseEnter = (name, childs,state) => {
        let newName = childs ? name : '';
        setOpenedSubmenu(newName); 
        setHoveredItem(name)
        if(state != undefined)
            state(true)
    }
    const handleMouseLeave = ( method)=> {
        if(method != undefined)
            method(false)
    }
    useEffect(() => {
        setOpenedSubmenu('');
    },[isShowing])

    useEffect(() => {
        let items = getChildsOfItem();
        setSubmenuItems(items)
    },[submenuOpened])
    

    const getChildsOfItem = () => {
        let item = [];
        
        if(submenuOpened !== '') {
            item = menu.find((item) => item.name === submenuOpened)
        }

        return item ? (item.childs ? item.childs : []) : [];
    }

    
    //Css
    const containerFatherStyle={
        width: 'fit-content',
        position: "fixed",
        display: isShowing || isMenuStatic ? 'flex' : 'none',
        flexDirection:'row',
        alignItems:'start',
        justifyContent:'center',
        left:xPos,
        top:80,
        zIndex: "40",
    }
    
    const containerStyle ={
        backgroundColor: "rgba(255, 255, 255, 1)",
        backdropFilter:'blur(12px)',
        transition:'all 0.3s',
        willChange: "transform, box-shadow, z-index",
        fontFamily: "bebas neue",
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        color: "gray",
        alignItems: "start",
        justifyContent:'center',
        padding:'0.8rem 1.5rem',
        zIndex:90,
        boxShadow:'0 25px 50px -12px rgb(0 0 0 / 0.25)'
    }

    const secondContainerStyle ={
        fontFamily: "Montserrat",
        height: "100%",
        color: "gray",
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.25rem",
        cursor:'pointer',
        padding:submenuItems.length > 0 ? '0.8rem 1.5rem' : '0px',
        backgroundColor: "rgba(240, 239, 236, 1)",
        zIndex:90,
        boxShadow:'0 25px 50px -12px rgb(0 0 0 / 0.25)'
    }

    const childsContainerStyle ={
        width:'22rem', 
        height:'auto', 
        flex:'none', 
        display:'flex', 
        flexDirection:'column',
        alignItems:'baseline', 
        justifyContent:'start',
        borderRadius: '10px',
        padding:'2rem',
        transition: '.3s all',
        willChange: "transform, box-shadow, z-index",
        color:'black'
    }

    const titleStyle = {
        fontFamily:'Anton', 
        fontSize: '2rem', 
        padding:'1rem 0px',
        color:'black',
        opacity:0.6,
        letterSpacing:'1px'
    }
    const mainProductsStyle = {
        width:'22rem', 
        height: '6rem',
        flex:'none', 
        display:'flex', 
        flexDirection:'column',
        alignItems:'baseline', 
        justifyContent:'start',
        borderRadius: '10px',
        padding: '2rem',
        fontSize:'2rem',
    }
    const mainImageMovmentStyle = {
        maxWidth: '60%',
        maxHeight: '60%',
        display: 'block',
        alignSelf: 'center',
        transition: '.3s all',
        willChange: "transform, box-shadow, z-index",
        
    }

    const backgroundColorChange = (type) => {

        switch (type) {
            case "DUMPS":
                return {
                    ...mainProductsStyle,
                    backgroundColor : dumpAnimation ? 'rgb(220,220,220)': '',
                };
            case "ROLL OFF":
                return {
                    ...mainProductsStyle,
                    backgroundColor : rolloffAnimation ? 'rgb(220,220,220)': '',
                };
            case "EQUIPMENT":
                return {
                    ...mainProductsStyle,
                    backgroundColor : equipmentAnimation ? 'rgb(220,220,220)': '',
                };
            case "GOOSENECK":
                return {
                    ...mainProductsStyle,
                    backgroundColor : gooseneckAnimation ? 'rgb(220,220,220)': '',
                };
        
            default:
                return {
                    ...mainProductsStyle, 
                    fontSize:'1rem',
                    fontFamily:'Montserrat',
                    width:'12rem', 
                    height:'3rem',
                    padding:'0.5rem 1rem', 
                    display:'flex', 
                    alignItems:'start', 
                    justifyContent:'center',
                    backgroundColor : hoveredItem === type ? 'rgb(220,220,220)': '',
                };
        }
    }

    const imageMovement = {
        "DUMPS": {
            ...mainImageMovmentStyle,
            padding: dumpAnimation ? '1rem 0 1rem 2rem': '1rem',
        },
        "ROLL OFF": {
            ...mainImageMovmentStyle,
            padding: rolloffAnimation ? '1rem 0 1rem 2rem': '1rem',
        },
        "EQUIPMENT": {
            ...mainImageMovmentStyle,
            padding: equipmentAnimation ? '1rem 0 1rem 2rem': '1rem',
        },
        "GOOSENECK": {
            ...mainImageMovmentStyle,
            padding: gooseneckAnimation ? '1rem 0 1rem 2rem': '1rem',
        },
        
    }
    const productState = {
        "DUMPS": setDumpAnimation,
        "ROLL OFF": setRollofAnimation,
        "EQUIPMENT": setEquipmentAnimation,
        "GOOSENECK": setGooseneckAnimation
    }
        
    //Display
    return (
        <div style={containerFatherStyle} 
            onMouseEnter={handleRightMouseEnter} 
            onMouseLeave={handleRightMouseLeave}
            >
            <div style={containerStyle}>
                {menu.map(({name, url, imgUrl, childs}) => (
                    <Link href={`${url}`} className={name} 
                        onMouseEnter={(event) => handleMouseEnter(name, childs, productState[name])}
                        onMouseLeave={(event)=> {handleMouseLeave(productState[name]); setHoveredItem('')}}
                        key={name}
                        style={backgroundColorChange(name)}>
                        <span style={{letterSpacing:'1px', color:'black', opacity:0.6, display:'flex', gap:'0.5rem', alignItems:'center'}}>
                            {name}
                            {
                                childs &&
                                <span className="material-symbols-outlined notranslate " style={{color:'black', opacity:0.6}}>
                                    chevron_right
                                </span>
                            }
                        </span>
                        <img style={imageMovement[name]} src={imgUrl} alt="horizon trailers img"/>
                    </Link>
                ))}
            </div>
            <div style={secondContainerStyle} onMouseEnter={handleRightMouseEnter} onMouseLeave={handleRightMouseLeave}>
                {
                    submenuItems.length > 0 &&
                    <>
                        <span style={titleStyle}>{submenuOpened}</span>
                        <div style={{backgroundColor:"rgba(0,0,0,0.6)", height:'1px', width:'100%'}}></div>
                    </>
                }
                {submenuItems.map(({name, url}) => (
                    <Link href={`${url}`} className={name} onMouseEnter={(e) => {handleRightMouseEnter(e); setHoveredItem(e.target.className)}}  key={name}
                        onMouseLeave={(e) => setHoveredItem('')}
                        style={{...childsContainerStyle, ...backgroundColorChange(name)}}>
                        <span style={{fontSize:'1rem', letterSpacing:'1px', color:'black', opacity:0.6,}}>{name}</span> 
                    </Link>
                ))}
            </div>
        </div>
        
    )
}

export default NavbarDropDown;