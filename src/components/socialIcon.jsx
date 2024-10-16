import { useState } from "react";

export default function SocialIcon(){
    const [iconPos, setIconPos] = useState({top: 0, left: 0});
    const [mousePos, setMousePos] = useState({clientX: 0, clientY: 0});
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const socialLinks = [
        { href: "https://www.linkedin.com/in/ayan-ali-developer/", icon: "fa-brands fa-linkedin-in" },
        { href: "https://www.instagram.com/design_ninja_07/", icon: "fa-brands fa-instagram" },
        { href: "https://github.com/Git-hit", icon: "fa-brands fa-github" },
        { href: "https://www.reddit.com/user/Ayanali98/", icon: "fa-brands fa-reddit" },
        { href: "https://stackoverflow.com/users/26530136/ayan-ali", icon: "fa-brands fa-stack-overflow" }
    ];
    
    function handleMouseEnter(e, index){
        setIsHovered(true);
        setMousePos({
            clientX: e.clientX,
            clientY: e.clientY
        })
        setHoveredIndex(index);
    }

    function handleMouseMove(e){
        if(isHovered){
            setIconPos({
                top: Math.max(-10, Math.min(10, e.clientY - mousePos.clientY)),
                left: Math.max(-10, Math.min(10, e.clientX - mousePos.clientX))
            })
        }
    }

    function handleMouseLeave(){
        setIconPos({
            top: 0,
            left: 0
        })
    }
    return(
        <div className="fixed bottom-3 left-3 flex flex-col gap-3">
            {socialLinks.map(({ href, icon }, index) => (
                <a
                    key={index}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={(e) => handleMouseEnter(e, index)}
                    style={{ position: 'relative', top: `${hoveredIndex === index ? iconPos.top : '0'}px`, left: `${hoveredIndex === index ? iconPos.left : '0'}px` }}
                    href={href}
                >
                    <i className={`text-white border border-white hover:text-black hover:bg-white transition-all duration-300 rounded-full p-3 ${icon}`}></i>
                </a>
            ))}
        </div>
    )
}