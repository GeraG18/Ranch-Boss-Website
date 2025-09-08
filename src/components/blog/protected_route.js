import { useBlogUserContext } from "@/context/blog_user_context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({children}) => {
    
    const { user } = useBlogUserContext();
    const router = useRouter();

    useEffect(() => {
        if(user === false) router.push("/blog/editor/enter")
    }, [user])
    
    return(
        <>
        {children}
        </>
    )
}

export default ProtectedRoute;