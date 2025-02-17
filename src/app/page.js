"use client";

import React from "react";
import { Geist, Geist_Mono, Krona_One, Rubik_Mono_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const kronaOne = Krona_One({
    variable: "--font-krona-one",
    subsets: ["latin"],
    weight: "400",
});

const rubikMonoOne = Rubik_Mono_One({
    variable: "--font-rubik-mono-one",
    subsets: ["latin"],
    weight: "400",
});

function Counter({ num, last, reverse, noRightMargin }) {
    const ref = React.useRef(null);
    
    const digitHeight = 52; // matches the actual height of each span
    const translateY = (reverse ? -(10 - num) : -num) * digitHeight; // move up by 'digit' spans

    React.useEffect(() => {
        ref.current.querySelector("div").style.transform = `translateY(${translateY}px)`;
    })

    return (
        <div ref={ref} style={{
            height: "52px",
        }} className={`text-4xl ${noRightMargin ? "" : `${last ? "md:" : ""}mr-4`} bg-white p-2 text-black ${rubikMonoOne.className} flex flex-col w-px-46.6 overflow-hidden`}>
            <div
                className="transition-transform duration-1000"
                style={{ transform: `` }}
            >   
                {!reverse ? (
                    <>
                    <span className="block h-[52px]">0</span>
                    <span className="block h-[52px]">1</span>
                    <span className="block h-[52px]">2</span>
                    <span className="block h-[52px]">3</span>
                    <span className="block h-[52px]">4</span>
                    <span className="block h-[52px]">5</span>
                    <span className="block h-[52px]">6</span>
                    <span className="block h-[52px]">7</span>
                    <span className="block h-[52px]">8</span>
                    <span className="block h-[52px]">9</span>
                    <span className="block h-[52px]">0</span>
                    </>
                ) : (
                    <>
                    <span className="block h-[52px]">0</span>
                    <span className="block h-[52px]">9</span>
                    <span className="block h-[52px]">8</span>
                    <span className="block h-[52px]">7</span>
                    <span className="block h-[52px]">6</span>
                    <span className="block h-[52px]">5</span>
                    <span className="block h-[52px]">4</span>
                    <span className="block h-[52px]">3</span>
                    <span className="block h-[52px]">2</span>
                    <span className="block h-[52px]">1</span>
                    <span className="block h-[52px]">0</span>
                    </>
                )}
                
            </div>
        </div>
    )
}


export default function Home() {
    return (
        <>
        <div className="container mx-auto">
            {/* big image in the background */}
            <Image priority={true} className="absolute hidden md:block select-none pointer-events-none" style={{
                top: "-22px",
                left: "-260px"
            }} width={1340} height={873} src="/robot.png" alt="Team Robot">
                
            </Image>
            <div className="flex flex-col md:flex-row md:h-screen">
                <div className="md:w-1/2"></div>
                {/* max height */}
                <div className="md:w-1/2 flex flex-col justify-center items-center pt-10 md:pt-0 md:h-screen">
                    <div className="flex flex-row justify-center items-center mb-10">
                        <Image className="mr-10" src="/team-logo.png" width={1024 / 8} height={1024 / 8} alt="Team Logo"></Image>
                        <Image className="ml-10" src="/season-logo.png" width={2502 / 20} height={2884 / 20} alt="Into The Deep"></Image>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <div className="flex flex-row justify-center items-center">
                            <div className={`text-2xl text-white ${kronaOne.className} mr-4`}>
                                #
                            </div>
                            <div className="flex flex-row justify-center items-center md:mr-2">
                                <Counter num={1} last={true} reverse={true} />
                            </div>
                        </div>
                        <div className={`text-2xl mt-3 md:mt-0 text-white ${kronaOne.className}`}>
                            in the Netherlands
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center mt-8">
                        <div className={`text-2xl text-white ${kronaOne.className} text-center w-1/2 md:w-3/4`}>
                            Benelux Championship Winners
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center mt-8">
                        <div className={`text-2xl text-white ${kronaOne.className} text-center w-1/2 md:w-3/4`}>
                            2x INSPIRE Award Winners
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center mt-8">
                        <div className="flex flex-row justify-center items-center md:mr-2">
                            <Counter num={2} noRightMargin={true} />
                            <Counter num={6} last={true} />
                        </div>
                        <div className={`text-2xl mt-3 md:mt-0 text-white ${kronaOne.className}`}>
                            outreach events
                        </div>
                    </div>
                    <div className="mt-[20px] md:mt-[0px] md:hidden md:w-1/2 flex-col justify-center items-center flex">
                        <Image className="md:hidden select-none pointer-events-none" src="/robot-cent.png" width={1340 * 0.9} height={873 * 0.9} alt="Team Robot Small">

                        </Image>
                    </div>
                </div>
            </div>
            <div className="block mt-[100px] md:mt-[250px] flex flex-col justify-center items-center">
                <h1 className={`${rubikMonoOne.className} text-4xl md:text-6xl text-white text-center`}>THE FLYING DUTCHMAN</h1>
                <h2 className={`${rubikMonoOne.className} text-2xl md:text-4xl md:mt-[10px] text-white text-center`}>TEAM 23014</h2>
                <p className="mt-[20px] text-white text-center w-3/4 md:w-1/2">
                    We are The Flying Dutchman, proudly representing The American School of The Hague in our second year of competing in the First Tech Challenge. Our team consists of 15 talented members from diverse countries, each specializing in building, programming, and operations, all working together to achieve success.
                </p>
                <p className="mt-[20px] text-white text-center w-3/4 md:w-1/2">
                We are dedicated to growing our team and inspiring the next generation to get involved in FIRST competitions within our community. To achieve this, we actively participate in school and local events, engaging with the community and sharing our passion for robotics.
                </p>

            </div>
        </div>
        <footer className="mt-10 text-white text-center pb-5 pt-5 bg-zinc-900 w-full">
            The Flying Dutchman © 2025
        </footer>
        </>
    );
}
