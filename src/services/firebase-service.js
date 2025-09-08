import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, get, getDatabase, onValue, push, ref, refFromURL, set } from "firebase/database";
import { connectStorageEmulator, deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable, uploadString,
} from "firebase/storage";
import { encodeStringToURI } from "./utils-service";
import CryptoJS, {AES} from "crypto-js";
import { setCookie } from "./cookie-service";

// let {setUserVar} = useBlogUserContext()

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
if (process.env.NEXT_PUBLIC_ENABLE_EMULATORS === '1') {
    // Point to the RTDB emulator running on localhost.
    let outputColor = "color:#F9A825; background-color:black;"
    console.log('%cALERT: Running in emulation mode', outputColor)
    connectDatabaseEmulator(database, "127.0.0.1", 9000);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
} 
  

//#region miscellaneous
const convertToArray= (object, keyName = 'key') => (
    Object.entries(object).length > 0 ?
    Object.entries(object).map((arr) => ({...arr[1], [keyName]: arr[0]}))
    : []
);

const translateToValidJSON = (object) => (JSON.parse(JSON.stringify(object).replaceAll("@", ".").replaceAll("^", "/")));
//#endregion

//#region storage
export const uploadToStorage = (route = "blogImages", filename, base64, returnValue = (progress, url, error) => {}) => {
    
    let bucketRef = storageRef(storage, `${route}/${filename}`)
    let uploadTask = uploadBytesResumable(bucketRef, base64)

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        returnValue(progress, null, null)
    }, (error) => {
        returnValue(null, null, error.code);
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            returnValue(100, downloadURL, null)
        });
    });
}
export const uploadToStoragePromise = (route = "blogImages", filename, base64, progress = () => {}) => {
    return new Promise((resolve, reject) => {
        let bucketRef = storageRef(storage, `${route}/${filename}`)
        let uploadTask = uploadBytesResumable(bucketRef, base64)
    
        uploadTask.on('state_changed', (snapshot) => {
            progress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, (error) => {
            reject(error.code);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
            });
        });

    });
}

export const deleteFromStorage = (url) => {
    // let bucketRef = storageRef(storage, url);
    let bucketRef = refFromURL(url)
    
    
    deleteObject(bucketRef).then(() => {
        return true;
    }).catch((error) => {
        return false;
    });
}

export const deleteFromStoragePromise = (url) => {
    
    
    return new Promise((resolve, reject) => {
        const urlParts = url.split('/o/');
        const filePath = decodeURIComponent(urlParts[1].split('?')[0]);

        let bucketRef = storageRef(storage, filePath)
        
        deleteObject(bucketRef).then(() => {
            resolve(true);
        }).catch((error) => {
            reject(error.code)
        });
        
    });
}

export const deleteBlog = (slug) => {
    return new Promise((resolve) => {
        let dbRef = ref(database, `blogs/${slug}`);
        resolve(
            set(dbRef, null)
        )
        resolve(true)
    });
}

export const addVisitorToBlog = (slug) => {
    
    
    let dbRef = ref(database, `blogs/${slug}/views`);
    onValue(dbRef, (response) => {
        // 
        let counter = response.exists() ? response.val() : 0;
        counter += 1;
        set(dbRef, counter);
    }, { onlyOnce:true });
}
//#endregion

//#region database
// export const getBlogsDemo = () => {
//     return new Promise((resolve, reject) => {
//         resolve(convertToArray({...blogDemoData}, 'slug'))
//     });
// }

// export const getBlogInfoDemo = (blogId) => {
//     return new Promise((resolve, reject) => {
//         resolve(convertToArray({...blogDemoData}, 'slug').find((item) => item.slug === blogId))
//     });
// }
export const loginToEditorBlog = (userName, userPswd) => {
    return new Promise((resolve, reject) => {
        let dbRef = ref(database, `blogUsers/${encodeStringToURI(userName)}`);
        onValue(dbRef, async (response) => {
            
            
            if(response.exists()) {
                let result = response.val();
                let decryptedPswd = (AES.decrypt(result.pswd, process.env.NEXT_PUBLIC_CRYPTOJS_SECRET)).toString(CryptoJS.enc.Utf8);

                
                if(userPswd === decryptedPswd) {
                    await setCookie('lgSn', {...result, userName})
                    resolve({logged:{...result, userName}, error:undefined})
                } else {
                    resolve({logged:false, error:'invalid_params'})
                }
            } else {
                resolve({logged:false, error:'invalid_params'})
            }
        }, { onlyOnce:true }); 
    })
};

export const getBlogs = () => {
    return new Promise((resolve, reject) => {
        let dbRef = ref(database, 'blogs/');
        // console.log('works', dbRef);
        
        try {
            onValue(dbRef, (response) => {
                // console.log('response', response.val());
                
                if(response.exists()) {
                    resolve(convertToArray(response.val(), "slug"))
                } else {
                    resolve([])
                }
            }, { onlyOnce:true });
        } catch (error) {
            // console.log('err', error);
            
        }
    });
}

export const setBlog = ({title, author, authorImg, slug, headerImg, body, date, tags, seo}) => {
    return new Promise((resolve) => {
        let dbRef = ref(database, `blogs/${slug}`);
        resolve(
            set(dbRef, {author, body, date, headerImg, authorImg, title, tags, seo})
        )
        resolve(true)
    });
}

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        let dbRef = ref(database, 'products/');
        onValue(dbRef, (response) => {
            if(response.exists()) {
                resolve(translateToValidJSON(response.val()))
            } else {
                reject(new Error('Not found'))
            }
        }, { onlyOnce:true });
    });
};

export const pushDealersApplication = (dealerAppl) => {
    return new Promise((resolve, reject) => {
       let dbRef = ref(database, "dealersApplication/");
       resolve(push(dbRef, {...dealerAppl, dateOfSended: (new Date().getTime()) }));
    });
};

export const pushErrorTicket = (errorObject) => {
    return new Promise((resolve, reject) => {
       let dbRef = ref(database, "errorTickets/");
       const ticketRef = push(dbRef, {...errorObject, ocurredAt: (new Date().getTime()) });
        // Get the new part's unique key
        const ticketId = ticketRef.key;
       resolve(ticketId);
    });
};
export const pushWallpaperApplication = (content) => {
    return new Promise((resolve, reject) => {
       let dbRef = ref(database, "wallpaperApplication/");
       const wallpaperRef = push(dbRef, {...content, used: false});
        // Get the new part's unique key
        const wallpaperId = wallpaperRef.key;
       resolve(wallpaperId);
    });
};
export const getWallpaperApplication = (token) => {
    return new Promise(async (resolve, reject) => {
       let dbRef = ref(database, `wallpaperApplication/${token}`);
       const wallpapersSnapshot = await get(dbRef);
        // Get the new part's unique key
        if(!wallpapersSnapshot.exists()) resolve(false); 
       resolve(wallpapersSnapshot.val());
    });
};
export const setUsedWallpaperApplication = (applicationId) => {
    return new Promise((resolve, reject) => {
       let dbRef = ref(database, `wallpaperApplication/${applicationId}/used`);
       set(dbRef, true);
       resolve(true);
    });
};
   
export const pushContactDealer = (contactForm) => {
    return new Promise((resolve, reject) => {
       let dbRef = ref(database, "contactDealer/");
       resolve(push(dbRef, {...contactForm, dateOfSended: (new Date().getTime())}));
    });
};
   
export const pushContactForm = (contactForm) => {
    return new Promise((resolve, reject) => {
       let dbRef = ref(database, "contactForm/");
       resolve(push(dbRef, {...contactForm, dateOfSended: (new Date().getTime())}));
    });
};

export const fetchRequestModel = async (data, callback = (res, err) => {}) => {
    let endpoint = process.env.REACT_APP_REQUEST_MODEL_FUNCTION_URL;
    
    try {
        const request = await fetch(endpoint, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        
        if (request.ok) {
            callback(true, null);
        } else {
            callback(null, true)
        }
    } catch (error) {
        callback(null, true)
    }
}
//#endregion