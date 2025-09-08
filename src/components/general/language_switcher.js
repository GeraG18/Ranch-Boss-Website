import { setInsecureCookie } from "@/services/cookie-service";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LanguageSwitcher = () => {

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    let langRef = useRef(null);
    let dictionary = ['en', 'es']

    const [isOpen, setOpen] = useState(false);

    /* For localPrefix: Never in middleware */
    const handleLocalChange = (localeCode) => {
        // document.cookie = `NEXT_LOCALE=${localeCode}; path=/; max-age=31536000; SameSite=Lax`;
        setInsecureCookie('NEXT_LOCALE',localeCode, 365);
        router.refresh();
    }

    /* For localPrefix: Always in middleware */
    // const handleLocalChange = (localeCode) => {
    //     let p = pathname.replace(`/${locale}`, `/${localeCode}`)
    //     startTransition(() => {
    //         router.replace(
    //             `${p}${params.size > 0 ? '?' : ''}${params.toString()}`,
    //         );
    //         router.refresh()
    //     })
    // }

    useEffect(() => {
        function handleClickOutside(event) {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [langRef]);

    return (
        <div className="relative flex" ref={langRef} onClick={() => setOpen(prev => !prev)}>
            <div className="motion-safe:transition-all motion-reduce:transition-none will-change-auto text-white min-w-10 flex items-center justify-center gap-2 font-['Montserrat']
                text-[1rem] cursor-pointer group" aria-label="Find your nearest dealer"
                onClick={() => {}}>
                <img 
                    width={27} 
                    height={20} 
                    alt="language flag indicator" 
                    src={`/Images/languages/${locale}.png`}
                    className="rounded-[10px] border border-gray-400 group-hover:border-primary-light-color" 
                />
                <span className="group-hover:text-primary-light-color hidden lg:block w-6 uppercase">{locale}</span>
            </div>       
            <div style={{opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none'}}
                className="bg-white absolute w-40 min-h-[6] top-[1.6rem] right-0 z-50 py-3 px-2 flex flex-col items-start rounded-[10px] border border-[#e5e7eb]
                shadow-['0px_4px_4px_0px_rgba(0,0,0,0.25)'] max-h-[30vh] overflow-y-auto overflow-x-hidden font-['Montserrat'] text-[1rem] font-normal">
                {
                    dictionary.map((lang, index) => (
                        <div key={index+'_'+lang} className={`w-full flex-none flex flex-row gap-1 items-center justify-start text-[#4d4d4d] rounded-[10px] relative 
                            py-1 px-2.5 uppercase text-[1rem] lg:hover:bg-[rgb(220,220,220)] cursor-pointer font-bold
                            ${locale === lang ? "bg-[rgb(243,243,243)] before:content-[''] before:absolute before:left-0 before:w-[8px] before:h-[8px] before:rounded-full before:bg-primary-light-color" : ""}`} 
                            onClick={() => handleLocalChange(lang)}>
                            <img 
                                width={27} 
                                height={20} 
                                alt="language flag indicator" 
                                src={`/Images/languages/${lang}.png`}
                                className="rounded-[10px] border border-gray-400 group-hover:border-primary-light-color" 
                            />
                            <span style={{letterSpacing:'1px', color:'black', opacity:0.6, display:'flex', gap:'0.5rem', alignItems:'center'}}>
                                {lang}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LanguageSwitcher;