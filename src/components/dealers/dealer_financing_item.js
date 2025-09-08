import React from "react";
import Link from "next/link"

function DealerFinancingItem({image, firstText, secondText, title, alt}) {

    //#region styles
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            display: "flex",
            flexDirection: 'column',
            alignItems:'center',
            justifyContent: 'center',
            backgroundColor: "black",
            padding: "1rem 0%",
            margin: "3% 0% 3% 0%",
            position: 'relative',
            overflow: 'hidden',
            
        },
        imageBackground: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            filter: "contrast(1.4) brightness(0.5)" 
        },
        childContainer: {
            height: '100%',
            display:'flex',
            flexDirection: 'column',
            alignItems:'center',
            justifyContent: 'end',
            zIndex: "50",
            gap: '4rem',
            margin:'1rem 2rem',
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                gap: '20px',
                margin:'1rem 6rem',
            }
        },
        title: {
            fontFamily: "Bebas Neue",
            fontStyle: "bold",
            fontSize: "40px",
            color: "white",
            zIndex: "10",
        },
        subtitle:{
            fontFamily: "Montserrat",
            fontStyle: "Italic",
            fontSize: "14px",
            color: "white",
            zIndex: "10"
        },
        button: {
            cursor: "pointer",
            color: "white",
            border: "none",
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontSize: "15px",
            WebkitUserSelect: 'none',
            MsUserSelect: 'none',
            UserSelect: 'none',
            backgroundColor: "#6897d8",
            height: "50px",
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            padding: '0rem 2rem',
            borderRadius: '8px',
            translate:'0.4s all',
            /*tablet and bigger screens*/
            "@media (min-width: 1024px)": {
                width:'auto',
                padding: '0rem 3rem',
                ":hover": {
                    backgroundColor:'orange'
                }
            }
        }
    });
    //#endregion

    //#region view
    return (
        <div className={css(styles.container)}>
            <img alt={alt} src={image} className={css(styles.imageBackground)}></img>
            <div className={css(styles.childContainer)}>
                <span className={css(styles.title)}>{firstText}</span>
                <span className={css(styles.subtitle)}>{secondText}</span>
                <Link href="/link" className={css(styles.button)}>{title}</Link>
            </div>
        </div>
    );
    //#endregion
}

export default DealerFinancingItem