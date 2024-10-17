import { useState, useRef } from "react";

export default function SocialIcon({ cursorCircle }){
    const iconRef = useRef([]);
    const animationFrameId = useRef(null);

    const socialLinks = [
        { href: "https://www.linkedin.com/in/ayan-ali-developer/", icon: "fa-brands fa-linkedin-in" },
        { href: "https://www.instagram.com/design_ninja_07/", icon: "fa-brands fa-instagram" },
        { href: "https://github.com/Git-hit", icon: "fa-brands fa-github" },
        { href: "https://www.reddit.com/user/Ayanali98/", icon: "fa-brands fa-reddit" },
        { href: "https://stackoverflow.com/users/26530136/ayan-ali", icon: "fa-brands fa-stack-overflow" }
    ];
    
    function handleMouseMove(e, index){
        cursorCircle.current.style.width = '40px';
        cursorCircle.current.style.height = '40px';
        // if(animationFrameId.current){
        //     cancelAnimationFrame(animationFrameId.current)
        // }
        iconRef.current[index].style.left = `${Math.max(0, Math.min(60, e.clientX))}px`;
        iconRef.current[index].style.top = `${Math.max(350 + (index * 60), Math.min((index * 60) + 400, e.clientY))}px`;
        // console.log(e.clientY, 350 + (index * 60), 440 + (index * 40), Math.max(350 + (index * 60), Math.min((index * 60) + 400, e.clientY)), index)
        // animationFrameId.current = requestAnimationFrame(() => {
        // })
    }
    function handleMouseLeave(index){
        // if(animationFrameId.current){
        //     cancelAnimationFrame(animationFrameId.current);
        // }
        iconRef.current[index].style.left = `30px`;
        iconRef.current[index].style.top = `unset`;
        cursorCircle.current.style.width = '20px';
        cursorCircle.current.style.height = '20px';
    }
    return(
        <div>
            {socialLinks.map(({href, icon}, index) => (
                <a key={index} ref={(el) => iconRef.current[index] = el} href={href}  onMouseMove={(e) => handleMouseMove(e, index)} onMouseLeave={() => handleMouseLeave(index)} className="flex justify-center items-center z-[2] fixed left-[30px]" style={{bottom: `${(socialLinks.length - index + 1) * 60}px`}}>
                    <i className={`absolute text-white hover:text-black ${icon}`}></i>
                </a>
            ))}
        </div>
    )
}