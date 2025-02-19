"use client";

import React from "react";
import { Geist, Geist_Mono, Krona_One, Rubik_Mono_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import styles from "./home.modules.css"
import Slideshow from "@/modules/Slideshow";
import ImageHover from "@/modules/ImageHover";

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
        }} className={`text-4xl ${noRightMargin ? "" : `${last ? "md:" : ""}mr-[10px]`} bg-white p-2 text-black ${rubikMonoOne.className} flex flex-col w-px-46.6 overflow-hidden`}>
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

function Split({ left, right, flipOnMobile }) {
    return (
        <div className={`flex flex-col md:flex-row justify-center items-center mt-10 split`}>
            <div className={`md:w-1/2 ${flipOnMobile ? `md:block` : "flex"}  ${flipOnMobile ? "hidden" : ""} flex-col justify-center items-center md:mr-10`}>
                {left}
            </div>
            <div className="md:w-1/2 flex flex-col justify-center items-center mt-10 md:mt-0">
                {right}
            </div>
            { flipOnMobile &&
                <div className={`md:w-1/2 md:hidden flex flex-col justify-center items-center md:mr-10 mt-[20px] md:mt-0`}>
                    {left}
                </div>
            }
        </div>
    )
}


export default function Home() {
    const sld = 1 / 4;

    //on scroll
    const onScroll = () => {
        const robotBg = document.getElementById("team-robot-bg");

        //check if it's on screen
        if (!robotBg) return;
        //console.log(robotBg.getBoundingClientRect().top + robotBg.getBoundingClientRect().height)
        if (robotBg.getBoundingClientRect().top + robotBg.getBoundingClientRect().height > 0) {
            const scroll = window.scrollY;
            robotBg.style.transform = `translateY(${-22 + (scroll * 0.18)}px)`;
        }
    }
    
    React.useEffect(() => {
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    })

    return (
        <>
        <div className="container mx-auto scroll-smooth">
            {/* big image in the background */}
            <Image priority={true} className="absolute hidden md:block select-none pointer-events-none scroll-smooth" style={{
                top: "-22px",
                left: "-260px"
            }} width={1340} height={873} src="/robot.png" id={"team-robot-bg"} alt="Team Robot">
                
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
                    We are <b>The Flying Dutchman</b>, proudly representing The American School of The Hague in our second year of competing in the First Tech Challenge. Our team consists of 15 talented members from diverse countries, each specializing in building, programming, and operations, all working together to achieve success.
                </p>
                <p className="mt-[20px] text-white text-center w-3/4 md:w-1/2">
                    We are dedicated to growing our team and inspiring the next generation to get involved in FIRST competitions within our community. To achieve this, we actively participate in school and local events, engaging with the community and sharing our passion for robotics.
                </p>
            </div>

            <div className="block mt-[0px] flex flex-col justify-center items-center">
                {/* <h2 className={`${rubikMonoOne.className} text-3xl md:text-5xl md:mt-[10px] text-white text-center`}>OUR ROBOT</h2> */}
                <div className="mt-[50px]">
                    <h2 className={`${rubikMonoOne.className} text-xl md:text-3xl md:mt-[10px] text-white text-center`}>PRESENTING</h2>
                    <div className="mt-[30px] flex flex-col justify-center items-center">
                        <h1 className={`${rubikMonoOne.className} text-4xl md:text-6xl text-white text-center]`}>DELTA</h1>
                        <div className="text-5xl md:text-7xl relative top-[-2.5rem] md:top-[-3.75rem]">
                            <span style={{
                                display: "inline-block",
                                transform: "rotate(2.4deg) translateX(0px) translateY(-3px)",
                            }}><span>「</span><span className="opacity-0 md:mr-[15px] md:ml-[15px]">DELTA</span><span>」</span></span>
                        </div>
                    </div>
                </div>
                    
                <div>
                    <Slideshow maxWidth={1365 * sld} xpadding={20}>
                        <Image src={"/robot/robot1.jpg"} width={1365 * sld} height={2048 * sld} alt="robot 1"></Image>
                        <Image src={"/robot/robot2.jpg"} width={1365 * sld} height={2048 * sld} alt="robot 2"></Image>
                        <Image src={"/robot/robot3.jpg"} width={1365 * sld} height={2048 * sld} alt="robot 3"></Image>
                        <Image src={"/robot/robot4.jpg"} width={1365 * sld} height={2048 * sld} alt="robot 4"></Image>
                        <Image src={"/robot/robot5.jpg"} width={1365 * sld} height={2048 * sld} alt="robot 5"></Image>
                        <Image src={"/robot/robot6.jpg"} width={1365 * sld} height={2048 * sld} alt="robot 6"></Image>
                    </Slideshow>
                </div>
                <div className={`mt-[10px] ${kronaOne.className} text-xs`}>
                    <p>"<i>Delta</i>," our robot for <i>Into The Deep</i></p>
                </div>
                {/* sponosrs */}
                <div className="w-[100%]">
                    <h1 className={`${rubikMonoOne.className} text-xl md:text-3xl mt-[40px] text-white text-center`}>
                        SPONSORS AND PARTNERS
                    </h1>
                    <div className="mt-[20px] text-white text-center flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-center items-center mt-[20px]">
                            <a href="https://www.ash.nl/" target="_blank">
                                <Image src={"/sponsors/ash_logo.png"} width={435} height={129} alt="American School of The Hague"></Image>
                            </a>
                        </div>
                        <div className="flex flex-col md:flex-row mt-[20px] w-3/4 justify-around items-center">
                            <a href="https://www.slideshare.net/" target="_blank">
                                <Image src={"/sponsors/slideshare_logo.png"} width={1200 / 4} height={301 / 4} alt="Slideshare"></Image>
                            </a>
                            <a href="https://touchcast.com/" target="_blank">
                                <Image src={"/sponsors/touchcast_logo.webp"} width={690 / 4} height={362 / 4} alt="Touchcast"></Image>
                            </a>
                        </div>
                        <div className="flex flex-col md:flex-row md:mt-[50px] w-3/4 justify-around items-center">
                            <a href="https://www.esa.int/" target="_blank">
                                <Image src={"/sponsors/esa_logo.png"} className="md:mt-[20px]" width={2060 / 10 * 0.75} height={800 / 10 * 0.75} alt="ESA"></Image>
                            </a>
                            <a href="https://www.gobilda.com/" target="_blank">
                                <Image src={"/sponsors/gobilda_logo.png"} className="mt-[20px]" width={900 / 5 * 0.75} height={385 / 5 * 0.75} alt="GoBIDLA"></Image>
                            </a>
                            <a href="https://www.autodesk.com/" target="_blank">
                                <Image src={"/sponsors/autodesk_logo.png"} className="mt-[20px]" width={2560 / 10 * 0.75} height={282 / 10 * 0.75} alt="Autodesk"></Image>
                            </a>
                        </div>
                        <div className="flex flex-col md:flex-row mt-[30px] md:mt-[50px] w-3/4 justify-around items-center">
                            <a href="https://ascentsecure.com/" target="_blank">
                                <Image src={"/sponsors/ascent_secure.webp"} className="md:mt-[20px]" width={2503 / 10 * 0.75} height={371 / 10 * 0.75} alt="ESA"></Image>
                            </a>
                            <a href="https://www.leidos.com/" target="_blank">
                                <Image src={"/sponsors/leidos_logo.png"} className="mt-[20px]" width={2560 / 10 * 0.6} height={619 / 10 * 0.6} alt="GoBIDLA"></Image>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="block mt-[50px] flex flex-col justify-center items-center">
                <div className="mt-[0px]">
                    <h1 className={`${rubikMonoOne.className} text-xl md:text-3xl md:mt-[10px] text-white text-center`}>
                        OUTREACH
                    </h1>
                </div>
                <Split
                    left={
                        <div className="w-5/6">
                            <h2 className={
                                `${rubikMonoOne.className} text-2xl md:text-4xl text-white text-center mb-[10px]`
                            }>After School Robotics</h2>
                            <p>
                            We designed and launched an engaging after-school robotics program for 14 kids from age 7-11 in our school. In the ten-week program, students delved into different aspects of robotics, no matter their prior experience:
                            </p>
                        </div>
                    }

                    right={
                        <div className="flex flex-col justify-center items-center">
                            <Image src="/outreach/as_robotics.jpeg" width={1024 / 2 * 0.8} height={1024 / 2 * 0.8} alt="After School Robotics"></Image>
                        </div>
                    }

                    height={2000 / 6}
                />

                <Split
                    left={
                        <div className="flex flex-col justify-center items-center">
                            <Image src="/outreach/next.jpg" width={1499 / 6} height={2000 / 6} alt="After School Robotics"></Image>
                        </div>
                    }

                    right={
                        <div className="w-5/6">
                            <h2 className={
                                `${rubikMonoOne.className} text-2xl md:text-4xl text-white text-center mb-[10px]`
                            }>Expeditie NEXT</h2>
                            <p>
                            At the Expeditie NEXT Science Fair in Zutphen, we showcased our robot at the FIRST Tech Challenge booth to 1,200+ attendees. We gave young visitors the chance to control our robot on the FTC field. After the event, we joined fellow FTC and FRC teams for dinner, building relationships and exchanging ideas within the community.
                            </p>
                        </div>
                    }

                    height={2000 / 6}

                    flipOnMobile={true}
                />

                <Split
                    left={
                        <div className="w-5/6">
                            <h2 className={
                                `${rubikMonoOne.className} text-2xl md:text-4xl text-white text-center mb-[10px]`
                            }>Nepal</h2>
                            <p>
                            In Nagarkot, Nepal, we spent a week at the Sanjeewani School teaching STEM concepts to kids aged 4–12. We engaged the students with fun, interactive activities such as exploring biology in nature and learning math through block games. These hands-on experiences introduced them to a new way of learning beyond textbooks. Our goal was to inspire the children with the spirit of STEM and education, enabling their curiosity and excitement for learning.
                            </p>
                        </div>
                    }

                    right={
                        <Image src="/outreach/nepal.png" width={1382 / 3.5} height={790 / 3.5} alt="After School Robotics"></Image>
                    }

                    height={2000 / 6}
                />

                <Split
                    left={
                        <div className="flex flex-col justify-center items-center">
                            <Image src="/outreach/delft.jpg" width={1024 / 2 * 0.8} height={1024 / 2* 0.8} alt="After School Robotics"></Image>
                        </div>
                    }

                    right={
                        <div className="w-5/6">
                            <h2 className={
                                `${rubikMonoOne.className} text-2xl md:text-4xl text-white text-center mb-[10px]`
                            }>Technische Universiteit Delft</h2>
                            <p>
                            We partook in the Delft Innovation Day, allowing kids to drive the robot in Minecraft along the game field. This was an amazing experience and invitation by TU Delft and was a great way to show off FIRST and FTC to the younger generations. 
                            </p>
                        </div>
                    }

                    height={2000 / 6}

                    flipOnMobile={true}
                />
                
            </div>

            <div className="block mt-[50px] flex flex-col justify-center items-center">
                <div className="mt-[0px]">
                    <h1 className={`${rubikMonoOne.className} text-xl md:text-3xl md:mt-[10px] text-white text-center`}>
                        OUR SOFTWARE
                    </h1>
                </div>
                <Split
                    left={
                        <div className="w-5/6">
                            <h2 className={
                                `${rubikMonoOne.className} text-2xl md:text-4xl text-white text-center mb-[10px]`
                            }>jpather</h2>
                            <p>
                                One of our largest projects this season was creating an autonomous path visualizer from scratch that further enabled the modification of paths on the fly. The website also enables the sharing of paths between teams, thereby promoting advanced pathing within the FTC community. The visual overlay on the game field and the intuitive path creation tools make JPather an invaluable asset for both rookie and veteran teams aiming to optimize their autonomous routines.
                            </p>
                        </div>
                    }

                    right={
                        <div className="flex flex-col justify-center items-center">
                            <ImageHover href="https://jpather.autos" width={2188 / 4} height={1148 / 4}>
                                <Image style={{
                                    boxShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)"
                                }} src="/software/jpather.png" width={2188 / 4} height={1148 / 4} alt="jpather"></Image>
                            </ImageHover>
                        </div>
                    }
                ></Split>

                <Split
                    left={
                        <div className="flex flex-col justify-center items-center">
                            <ImageHover href="http://jscout.jaiden.hackclub.app" width={2654 / 4} height={1254 / 4}>
                                <Image style={{
                                    boxShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)"
                                }} src="/software/jscout.png" width={2654 / 4} height={1254 / 4} alt="jscout"></Image>
                            </ImageHover>
                        </div>
                    }

                    right={
                        <div className="w-5/6">
                            <h2 className={
                                `${rubikMonoOne.className} text-2xl md:text-4xl text-white text-center mb-[10px]`
                            }>jscout</h2>
                            <p>
                                As part of our scouting, we made a platform that allowed us to rank opponents using an ELO system, predict how many points an alliance will score, and ultimately predict win chances for matches. This became a key tool in strategy, allowing us to create scouting reports of every team, enabling us to make informed choices for alliance selection. The algorithm boasts a more than 70% accuracy rate for the Benelux region, with a ~90% accuracy rate for our team in our regional.
                            </p>
                        </div>
                    }

                    flipOnMobile={true}
                ></Split>
            </div>
                
            
            <div className="block mt-[75px] flex flex-row justify-center items-center">
                
                <Image className="mr-10" src="/team-logo.png" width={1024 / 4 * 0.75} height={1024 / 4 * 0.75} alt="Team Logo"></Image>
                <Image className="ml-10" src="/season-logo.png" width={2502 / 10 * 0.75} height={2884 / 10 * 0.75} alt="Into The Deep"></Image>
            </div>
            <div className="mt-[30px] flex flex-row justify-center items-center">
                <a href="https://www.instagram.com/team23014/" target="_blank">
                    <Image className="" src="/icons/instagram.svg" width={32} height={32} alt="Instagram"></Image>
                </a>
            </div>
        </div>
        <footer className="mt-10 text-white text-center pb-5 pt-5 bg-zinc-900 w-full">
            The Flying Dutchman © 2025 • Made by <a style={{
                textDecoration: "underline"
            }} href="https://github.com/JaidenAGrimminck">Jaiden</a>
        </footer>
        </>
    );
}
