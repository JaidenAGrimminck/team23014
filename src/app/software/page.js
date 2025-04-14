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

function LoremIpsum() {
    return (
        <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
    );
}

export default function SoftwarePage() {
    return (
        <>
        <div className="flex flex-col items-center w-full mt-[30px] mb-[30px]">
            <h1 className={"text-4xl " + rubikMonoOne.className}>Software</h1>
            <h2 className={"text-2xl " + rubikMonoOne.className}>Team 23014</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-[100%] pl-[30px] pr-[30px]">
            <div className="mb-[30px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JPather</h2>
                <LoremIpsum />
            </div>
            <div className="mb-[30px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JScout</h2>
                <LoremIpsum />
            </div>
            <div className="mb-[30px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JSim</h2>
                <LoremIpsum />
            </div>
            <div className="mb-[30px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JCoach</h2>
                <LoremIpsum />
            </div>
        </div>
        </>
    );
}