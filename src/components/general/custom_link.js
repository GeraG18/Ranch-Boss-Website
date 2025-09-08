import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomLink = ({href, children, onClick = () => {}, ...props}) => {
    
    const router = useRouter()

    const handleClickedLink = () => {
        onClick();
        // router.push(href)
        router.refresh();
    }
    
    return (
        <Link href={href} onClick={() => handleClickedLink()} {...props}>
            {children}
        </Link>
    )
}

export default CustomLink;