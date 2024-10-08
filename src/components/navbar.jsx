import { motion } from "framer-motion";
export default function Navbar(props){
    const icon = {
      hidden: {
        opacity: 0,
        pathLength: 0,
        fill: "rgba(255, 255, 255, 0)"
      },
      visible: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(255, 255, 255, 1)"
      }
    };

    const navMotion = {
        hidden: {y: 20, opacity: 0},
        visible: {y: 0, opacity: 1}
    }
    return(
        <motion.nav variants={navMotion} initial="hidden" animate="visible" transition={{duration: 1}} className={`${props.className} flex justify-center items-center text-white mx-24 pt-20`}>
            <ul className="w-1/6">
                <li>
                    <div className="container">
                        <motion.svg className="item stroke-white" width="70" height="70" viewBox="0 0.001 60.345 60.338" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                variants={icon}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    default: { duration: 2, ease: "easeInOut" },
                                    fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                                }} 
                                d="M30.172 14.319h24.793a1.53 1.53 0 0 1 1.33.767 30.3 30.3 0 0 1 3.098 7.538 1.6 1.6 0 0 1-.266 1.33 1.64 1.64 0 0 1-1.217.593H30.172a5.636 5.636 0 0 0-5.625 5.625 1.534 1.534 0 0 1-1.534 1.534h-7.16a1.534 1.534 0 0 1-1.534-1.534A15.867 15.867 0 0 1 30.172 14.32"/>
                            <motion.path
                                variants={icon}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    default: { duration: 2, ease: "easeInOut" },
                                    fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                                }} 
                                d="M30.172 46.026H5.38a1.53 1.53 0 0 1-1.33-.768A30.3 30.3 0 0 1 .951 37.72a1.5 1.5 0 0 1 .123-1.084 1.54 1.54 0 0 1 1.36-.838h27.738a5.636 5.636 0 0 0 5.626-5.626 1.534 1.534 0 0 1 1.534-1.534h7.16a1.534 1.534 0 0 1 1.534 1.534 15.867 15.867 0 0 1-15.854 15.854M1.534 31.706A1.534 1.534 0 0 1 0 30.172 30.16 30.16 0 0 1 50.106 7.538a1.58 1.58 0 0 1 .522 1.289 1.555 1.555 0 0 1-1.534 1.4H30.172a19.97 19.97 0 0 0-19.944 19.945 1.534 1.534 0 0 1-1.534 1.534Z"/>
                            <motion.path
                                variants={icon}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    default: { duration: 2, ease: "easeInOut" },
                                    fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                                }} 
                                d="M60.345 30.172c.078 25.784-30.852 39.747-50.107 22.635a1.544 1.544 0 0 1-.204-2.087 1.53 1.53 0 0 1 1.217-.603h18.921a19.97 19.97 0 0 0 19.945-19.945 1.534 1.534 0 0 1 1.534-1.534h7.16a1.534 1.534 0 0 1 1.534 1.534"/>
                        </motion.svg>
                    </div>
                </li>
            </ul>
            <hr className="text-white w-full" />
            <ul className="w-1/2 flex justify-end">
                <li className="flex gap-10">
                    <button className="btn bg-none rounded-lg epilogue-regular transition-all duration-300 px-4 py-2">Works</button>
                    <button className="btn bg-none rounded-lg epilogue-regular transition-all duration-300 px-4 py-2">Resume</button>
                    <button className="btn bg-none rounded-lg epilogue-regular transition-all duration-300 px-4 py-2">Contact</button>
                </li>
            </ul>
        </motion.nav>
    )
}