"use client";


import React, {useState, useEffect} from "react";
import { Krona_One, Rubik_Mono_One } from "next/font/google";
import { Split } from "../page";
import Image from "next/image";


const kronaOne = Krona_One({
    variable: "--font-krona-one",
    subsets: ["latin"],
    weight: "400",
    display: "swap",
});

const rubikMonoOne = Rubik_Mono_One({
    variable: "--font-rubik-mono-one",
    subsets: ["latin"],
    weight: "400",
    display: "swap",
});


export default function Stats() {
    const [domLoaded, setDomLoaded] = useState(false);
    const [stats, setStats] = useState({
        teamNumber: 0,
        teamName: "n/a"
    });

    useEffect(() => {
        //setDomLoaded(true);
        assignReload();
    }, []);

    const sld = 0.2;

    const assignReload = async () => {
        //get query params
        const urlParams = new URLSearchParams(window.location.search);

        let newStats = {
            autoSpecimen: urlParams.get('autoSpecimen') || 0,
            autoSpecimenPark: urlParams.get('autoSpecimenPark') || false,
            autoSample: urlParams.get('autoSample') || 0,
            autoSamplePark: urlParams.get('autoSamplePark') || false,
            teleSpecimen: urlParams.get('teleSpecimen') || 0,
            teleSample: urlParams.get('teleSample') || 0,
            endgame: urlParams.get('endgame') || 0,
            canDoSpecimen: urlParams.get('canDoSpecimen') || false,
            canDoSample: urlParams.get('canDoSample') || false,
            egHang: urlParams.get('hang') || "None", // [None, L1, L2, L3]
            teamNumber: urlParams.get('teamNumber') || 0, //Number
            teamName: urlParams.get('teamName') || "Unknown", //String
            preference: urlParams.get('preference') || "None", //[Specimen, Sample, None]
        }

        newStats.teamNumber = parseInt(newStats.teamNumber);

        if (newStats.teamNumber == 23014 || newStats.teamNumber == 0) {
            newStats = Object.assign(newStats, {
                teamName: "The Flying Dutchman",
                teamNumber: 23014,
            })
        } else {
            newStats.teamName = decodeURIComponent(newStats.teamName);
        }

        // parseInts:
        ["autoSpecimen", "autoSample", "teleSpecimen", "teleSample"].forEach((key) => {
            newStats[key] = parseInt(newStats[key]);
        });

        ["canDoSpecimen", "canDoSample", "autoSpecimenPark", "autoSamplePark"].forEach((key) => {
            newStats[key] = newStats[key] === "true";
        });

        //update the page
        setDomLoaded(true);
        setStats(newStats);
    }


    return (
        <>
        {domLoaded && (
            <div>
            <div className={`container mx-auto scroll-smooth`}>
                <div className={`flex flex-col ${stats.teamNumber !== 23014 ? "" : "md:"}h-screen mt-[50px]`}>
                    <div className="text-center align-middle justify-center flex flex-col">
                        <h1 className={`text-4xl md:text-6xl text-white ${rubikMonoOne.className}`}>{stats.teamName.toUpperCase()}</h1>
                        <h2 className={`text-2xl md:text-4xl text-white mt-[10px] ${rubikMonoOne.className}`}>TEAM {stats.teamNumber}</h2>
                    </div>
                    
                    { stats.teamNumber === 23014 &&
                        <Split
                        left={
                            <div className="flex flex-col items-center">
                                <Image src={"/robot/robot2.jpg"} width={1365 * sld} height={2048 * sld} alt="robot 2"></Image>
                                <h3 className={`mt-[20px] ${kronaOne.className}`}>Our robot, "Delta."</h3>
                            </div>
                        }
                        right={
                            <div className="md:w-3/4">
                                <h3 className={`text-white ${kronaOne.className} mt-[10px] text-xl md:text-3xl`}>Quick Stats</h3>
                                <ul className={`text-white mt-[10px] list-disc text-md md:text-lg ${kronaOne.className}`}>
                                    <li>Both Specimen and Samples</li>
                                    <li><b>6 + 0</b> Specimen Auto (123 pts)</li>
                                    <li><b>0 + 7</b> Sample Auto (112 pts)</li>
                                    <li><b>10</b> Specimen TeleOp (100 pts)</li>
                                    <li><b>12</b> Sample TeleOp (96 pts)</li>
                                    <li><b>L3</b> Endgame (30 pts)</li>
                                    <li>MAX EPA: <b>253 SOLO</b></li>
                                    <li><i>We prefer to do Specimen!</i></li>
                                </ul>
                            </div>
                        }
                        />
                    }

                    {
                        stats.teamNumber !== 23014 &&
                        <div style={{
                            border: "1px solid white",
                            borderRadius: "10px",
                        }} className="md:w-full flex flex-col items-center mt-[20px] p-[20px]">
                            <h3 className={`text-white ${kronaOne.className} mt-[10px] text-xl md:text-3xl`}>Quick Stats</h3>
                            <ul className={`text-white mt-[10px] list-disc text-md md:text-lg ${kronaOne.className}`}>
                                {stats.canDoSample && stats.canDoSpecimen && <li>Both Specimen and Samples</li>}
                                {stats.canDoSample && !stats.canDoSpecimen && <li>Only Samples</li>}
                                {!stats.canDoSample && stats.canDoSpecimen && <li>Only Specimen</li>}
                                <li><b>{stats.autoSpecimen} + 0</b> Specimen Auto ({(stats.autoSpecimen * 20) + (stats.autoSpecimenPark ? 3 : 0)} pts)</li>
                                <li><b>0 + {stats.autoSample}</b> Sample Auto ({(stats.autoSample * 16) + (stats.autoSamplePark ? 3 : 0)} pts)</li>
                                {stats.canDoSpecimen && <li><b>{stats.teleSpecimen}</b> Specimen TeleOp ({stats.teleSpecimen * 10} pts)</li>}
                                {stats.canDoSample && <li><b>{stats.teleSample}</b> Sample TeleOp ({stats.teleSample * 8} pts)</li>}
                                {stats.egHang != "None" && <li><b>{stats.egHang}</b> Endgame ({stats.egHang == "L1" ? 3 : (stats.egHang == "L2" ? 15 : 30)} pts)</li>}
                                <li>MAX EPA: <b>{
                                    (
                                        stats.autoSpecimen * 20 > stats.autoSample * 16 ?
                                        stats.autoSpecimen * 20 + (stats.autoSpecimenPark ? 3 : 0) :
                                        stats.autoSample * 16 + (stats.autoSamplePark ? 3 : 0)
                                    )
                                    +
                                    (
                                        stats.teleSpecimen * 10 > stats.teleSample * 8 ?
                                        stats.teleSpecimen * 10 :
                                        stats.teleSample * 8
                                    )
                                    +
                                    (
                                        stats.egHang == "L1" ? 3 :
                                        stats.egHang == "L2" ? 15 :
                                        stats.egHang == "L3" ? 30 : 0
                                    )
                                    } SOLO</b></li>
                                <li>
                                    {stats.preference == "Specimen" && <i>We prefer to do Specimen!</i>}
                                    {stats.preference == "Sample" && <i>We prefer to do Samples!</i>}
                                    {stats.preference == "None" && <i>We have no preference!</i>}
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <button className={`bg-blue-700 text-white p-3 rounded-md`} onClick={() => window.location.href = "/stats/generate"}>
                    Generate your own page!
                </button>
            </div>
            <footer className="mt-10 text-white text-center pb-5 pt-5 bg-zinc-900 w-full">
                The Flying Dutchman © 2025 • Made by <a style={{
                    textDecoration: "underline"
                }} href="https://github.com/JaidenAGrimminck">Jaiden</a>
            </footer>
            </div>
        )}
        </>
    )
}