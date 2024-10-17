import { forwardRef } from "react";

const CursorCircle = forwardRef((props, ref) => {
    return(
        <div ref={ref} style={{transform: 'translate(-50%, -50%)', top: '0', left: '0'}} className="z-[1] fixed pointer-events-none cursorCircle transition-all duration-200 bg-[#6bd490] rounded-full h-5 w-5 stroke-black stroke-2"></div>
    )
});

CursorCircle.displayName = "";

export default CursorCircle;