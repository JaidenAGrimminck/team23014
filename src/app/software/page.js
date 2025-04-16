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

function LoremIpsum() {
    return (
        <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
    );
}

function OpenButton({ title, href }) {
    return (
        <Link href={href} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Open {title}
        </Link>
    )
}

export default function SoftwarePage() {
    return (
        <>
        <div className="flex flex-col items-center w-full mt-[30px] mb-[30px]">
            <h1 className={"text-4xl " + rubikMonoOne.className}>Software Tools</h1>
            <h2 className={"text-2xl " + rubikMonoOne.className}>Team 23014</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-[100%] pl-[30px] pr-[30px]">
            <div className="mb-[30px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JPather</h2>
                <p className="mt-[10px]">One of our largest projects this season was creating an autonomous path visualizer from scratch that further enabled the modification of paths on the fly. The website also enables the sharing of paths between teams, thereby promoting advanced pathing within the FTC community. The visual overlay on the game field and the intuitive path creation tools make JPather an invaluable asset for both rookie and veteran teams aiming to optimize their autonomous routines, with over 100 teams having used the site.</p>
                <div className="w-100 flex flex-col items-center justify-center">
                    <Image style={{
                        boxShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)",
                        marginTop: "20px",
                        marginBottom: "25px"
                    }} src="/software/jpather.png" width={500} height={1148 / 2188 * 500} alt="jpather"></Image>
                    <OpenButton title="JPather" href="http://jpather.team23014.org/"></OpenButton>
                </div>
            </div>
            <div className="mb-[30px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JScout</h2>
                <p className="mt-[10px]">As part of our scouting, we made a platform based on Statbotics that allowed us to rank opponents using an ELO system, predict how many points an alliance will score, and ultimately predict win chances for matches. This became a key tool in strategy, allowing us to create scouting reports of every team, enabling us to make informed choices for alliance selection. The algorithm boasts a more than 70% accuracy rate for the Benelux region, with a ~90% accuracy rate for our team.</p>
                <div className="w-100 flex flex-col items-center justify-center">
                    <Image style={{
                        boxShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)",
                        marginTop: "20px",
                        marginBottom: "25px"
                    }} src="/software/jscout.png" width={500} height={1254 / 2654 * 500} alt="jscout"></Image>
                    <OpenButton title="JScout" href="https://jscout.jaiden.hackclub.app/"></OpenButton>
                </div>
            </div>
            <div className="mb-[30px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JSim</h2>
                <p className="mt-[10px]">For better match analysis, we developed a 3D simulation software for FTC called JSim. JSim reconstructs full match trajectories in a fully navigable environment. Equipped with camera controls and a dynamic playback system, it acts as an intuitive and reliable way of post-match analysis, allowing teams to quickly understand how to improve their points scored and their strategies. Through this, we've been able to optimize our paths.</p>
                <div className="w-100 flex flex-col items-center justify-center">
                    <Image style={{
                        boxShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)",
                        marginTop: "20px",
                        marginBottom: "25px"
                    }} src="/software/jsim.png" width={500} height={1254 / 2654 * 500} alt=""></Image>
                    <OpenButton title="JSim" href="http://team23014.org/jsim"></OpenButton>
                </div>
            </div>
            <div className="mb-[30px]">
                <h2 className={"text-2xl " + rubikMonoOne.className}>JCoach</h2>
                <p className="mt-[10px]">In order to optimize our cycle efficiency during the TeleOp period, we constructed a real time cycle tracking tool for our drive coach in order to support decisions with live comparisons to historical match data in order to maximize points scored. While still a work in progress, we plan to release it for general use in the near future.</p>
                {/* <div className="w-100 flex flex-col items-center justify-center">
                    <Image style={{
                        boxShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)",
                        marginTop: "20px",
                        marginBottom: "25px"
                    }} src="/software/.png" width={500} height={1254 / 2654 * 500} alt=""></Image>
                </div> */}
            </div>
        </div>
        </>
    );
}