import React from "react";
import { Geist, Geist_Mono, Krona_One, Rubik_Mono_One } from "next/font/google";


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

export default function SoftwarePage() {
    return (
        <>
        <div className="flex flex-col items-center w-full mt-[30px] mb-[30px]">
            <h1 className={"text-4xl " + rubikMonoOne.className}>Software</h1>
        </div>
        <div className="flex flex-col items-center w-full">
            <div className="mb-[10px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JPather</h2>
            </div>
            <div className="mb-[10px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JScout</h2>
            </div>
            <div className="mb-[10px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JSim</h2>
            </div>
        </div>
        </>
    );
}