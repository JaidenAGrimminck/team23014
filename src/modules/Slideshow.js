import { useState, useEffect } from 'react';

function Slideshow({ children, maxWidth, xpadding }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const numSlides = Array.isArray(children) ? children.length : 1;

    // Assuming each slide takes up the full "maxWidth" container.
    const slideWidth = maxWidth;
    const offset = -currentIndex * (slideWidth);

    const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % numSlides);
    };

    const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + numSlides) % numSlides);
    };

    useEffect(() => {
        let timeout = setTimeout(goNext, 5000);
        return () => clearTimeout(timeout);
    })

    return (
        <div className="relative flex">
            {/* Slide viewport */}
            <div
            style={{ 
                width: `${maxWidth + xpadding * 2}px`,
                // inner box shadow
                zIndex: 10
            }}
            className="overflow-hidden mx-auto"
            >
                {/* Slides container */}
                <div
                    style={{
                        transform: `translateX(${offset}px)`,
                        transition: 'transform 0.5s ease', paddingLeft: `${xpadding}px`, paddingRight: `${xpadding}px`
                    }}
                    className="flex"
                >
                    {Array.isArray(children)
                    ? children.map((child, index) => (
                        <div key={index} style={{ 
                            flex: '0 0 auto', 
                            width: `${slideWidth}px`, 
                            paddingLeft: `${xpadding}px`, 
                            paddingRight: `${xpadding}px`,
                            zIndex: 5
                        }}>
                            {child}
                        </div>
                        ))
                    : (
                        <div style={{ flex: '0 0 auto', width: `${slideWidth}px`, paddingLeft: `${xpadding}px`, paddingRight: `${xpadding}px` }}>
                            {children}
                        </div>
                        )
                    }
                </div>
            </div>
            <div style={{
                width: `100%`,
                top: `50%`,
            }} className='flex justify-center absolute inset-x-0 bottom-0 text-4xl'>
                {/* Left arrow button */}
                <button
                onClick={goPrev}
                style={{
                    position: 'absolute',
                    left: '-50px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
                >
                &#8592;
                </button>

                 {/* Right arrow button */}
                <button
                onClick={goNext}
                className="ml-[200px]"
                style={{
                    position: 'absolute',
                    right: '-50px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
                >
                &#8594;
                </button>
            </div>
            {/*box shadow over */}
            <div style={{
                width: `${maxWidth + xpadding * 2}px`,
                zIndex: 10,
                boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.9)',
                height: '100%',
            }} className="absolute inset-0 mx-auto"></div>
        </div>
    );
}

export default Slideshow;
