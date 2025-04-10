
import styles from "./imagehover.modules.css";

export default function ImageHover({ children, href, width, height }) {
    return (
        <div>
            <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-0 hover:bg-opacity-50 transition duration-300 image-hover" onClick={() => window.open(href, '_blank')}>
                {children}
                {
                // <div style={{
                //     width: `${width}px`,
                //     height: `${height}px`,
                //     //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                // }} className={`text-white text-2xl absolute flex justify-center items-center top-0 left-0 font-bold w-[${width}px] h-[${height}px]`}>
                //     <span>Click Me</span>
                // </div>
                }
            </div>
        </div>
    );
}