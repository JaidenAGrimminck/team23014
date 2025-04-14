"use client";

import React from "react"
import { Geist, Geist_Mono, Krona_One, Rubik_Mono_One } from "next/font/google";

import styles from "./callibrate.module.css";

const connect = true;

const rubikMonoOne = Rubik_Mono_One({
    variable: "--font-rubik-mono-one",
    subsets: ["latin"],
    weight: "400",
});

const kronaOne = Krona_One({
    variable: "--font-krona-one",
    subsets: ["latin"],
    weight: "400",
});

export default function Calibrate() {
    React.useEffect(() => {
        
        if (!connect) {
            return;
        }

        const ws = new WebSocket("ws://192.168.43.1:23014");

        ws.addEventListener("open", () => {
            console.log("Connected to WebSocket!");

            ws.send(JSON.stringify({
                type: "list",
                device: "servo"
            }))

            setTimeout(() => {
                ws.send(JSON.stringify({
                    type: "subscribe",
                    device: "servo"
                }))
            }, 500)
        })

        ws.addEventListener("close", (event) => {
            console.log("Closed websocket.")
        })

        ws.addEventListener("error", (event) => {
            console.log(event)
        })

        ws.addEventListener("message", (event) => {
            if (event.data[0] == 0x00) {
                return;
            }

            const payload = JSON.parse(event.data);

            if (payload.type == "list") {
                //add new Servo 
                for (let name of payload.names) {
                    const servo = document.createElement("div");
                    servo.className = styles["servo"];
                    
                    const servoName = document.createElement("h2");
                    servoName.innerText = name;
                    servo.appendChild(servoName);
                    const servoPosition = document.createElement("input");
                    servoPosition.type = "number";
                    servoPosition.min = 0;
                    servoPosition.max = 1;
                    servoPosition.step = 0.001;
                    servoPosition.value = 0.5;

                    const servoPositionValue = document.createElement("p");
                    servoPositionValue.innerText = "0.5";
                    servoPositionValue.className = styles["servo-position-value"];
                    servo.appendChild(servoPositionValue);
                    
                    servoPosition.addEventListener("input", (event) => {
                        if (window.toChange) {
                            let found = false;

                            for (let n of window.toChange) {
                                if (n.name == name) {
                                    n.value = parseFloat(event.target.value);
                                    found = true;
                                }
                            }
                            
                            if (!found) {
                                window.toChange.push({
                                    name,
                                    value: parseFloat(event.target.value)
                                })
                            }
                        } else {
                            window.toChange = [{
                                name,
                                value: parseFloat(event.target.value)
                            }]
                        }

                        console.log("added", name, "to", event.target.value)
                    });

                    servoPosition.id = "servo-" + name;

                    servo.appendChild(servoPosition);

                    document.querySelector(`.${styles["servo-list"]}`).appendChild(servo);
                }
            } else if (payload.type == "update") {
                for (let key of Object.keys(payload.values)) {
                    if (key == "slides") {
                        document.querySelector("#slides-position").value = payload.values[key];
                        continue;
                    }

                    const servo = document.querySelector(`#servo-${key}`).parentElement;
                    const servoPositionValue = servo.querySelector(`.${styles["servo-position-value"]}`);
                    servoPositionValue.innerText = payload.values[key];
                }
            }
        })

        window.ws = ws;
    })

    const update = async () => {
        for (let servo of window.toChange) {
            console.log("sending", servo.name, "w", servo.value)
            window.ws.send(JSON.stringify({
                type: "set",
                device: "servo",
                name: servo.name,
                value: servo.value
            }))
        }

        window.toChange = null;
    }

    const updateArmServos = async () => {
        const v = document.querySelector("#arm-position").value;

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "leftArmRotation",
            value: v
        }));

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "rightArmRotation",
            value: 1 - v
        }));
    }

    const updateFlipperServos = async () => {
        const v = document.querySelector("#flipper-position").value;

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "leftFlipper",
            value: v
        }));

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "rightFlipper",
            value: 1 - v
        }));
    }

    const updateClawRotation = async () => {
        const v = document.querySelector("#claw-rotation").value;

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "outtakeClawRotation",
            value: v
        }));
    }

    const updateClawPosition = async () => {
        const v = document.querySelector("#claw-position").value;

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "outtakeClaw",
            value: v
        }));
    }

    const updateDiffyServos = async () => {
        const left = document.querySelector("#left-diffy-position").value;
        const right = document.querySelector("#right-diffy-position").value;

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "leftDiffy",
            value: left
        }));

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "rightDiffy",
            value: right
        }));
    }

    const updateIntakeClaw = async () => {
        const v = document.querySelector("#intake-claw-position").value;

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "intakeClaw",
            value: v
        }));
    }

    const updateLinkagePosition = async () => {
        const v = document.querySelector("#linkages-position-left").value;
        //const v2 = document.querySelector("#linkages-position-right").value;

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "leftLinkage",
            value: v
        }));

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "rightLinkage",
            value: (1 - v) + 0.03
        }));
    };

    const updateSpinPosition = async () => {
        const v = document.querySelector("#outtake-claw-spin").value;

        window.ws.send(JSON.stringify({
            type: "set",
            device: "servo",
            name: "outtakeClawSpin",
            value: v
        }));
    }

    return (
        <div className="flex flex-col items-center w-full mt-[30px] mb-[30px]">
            <div className="flex flex-col w-full">
                <div>
                    <div className="flex flex-col items-center w-full">
                        <h1 className={"text-3xl " + rubikMonoOne.className}>Outtake Claw</h1>
                    </div>
                    <div className="flex flex-row justify-around w-full mt-[10px]">
                        <div className="flex flex-col items-center w-full">
                            <h2>Arm Position (left / 1 - right)</h2>
                            <div className="flex flex-row space-x-2 mt-[10px]">
                                <input id="arm-position" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                <button onClick={updateArmServos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-full">
                            <h2>(Outtake) Claw Rotation</h2>
                            <div className="flex flex-row space-x-2 mt-[10px]">
                                <input id="claw-rotation" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                <button onClick={updateClawRotation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-full">
                            <h2>Spin Position</h2>
                            <div className="flex flex-row space-x-2 mt-[10px]">
                                <input id="outtake-claw-spin" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                <button onClick={updateSpinPosition} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-full">
                            <h2>(Outtake) Claw</h2>
                            <div className="flex flex-row space-x-2 mt-[10px]">
                                <input id="claw-position" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                <button onClick={updateClawPosition} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-full mt-[40px]">
                        <h1 className={"text-3xl " + rubikMonoOne.className}>Intake Claw</h1>
                    </div>
                    <div className="flex flex-row justify-around w-full mt-[10px]">
                        <div className="flex flex-col items-center w-full">
                            <h2>Flipper Position (left / 1 - right)</h2>
                            <div className="flex flex-row space-x-2 mt-[10px]">
                                <input id="flipper-position" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                <button onClick={updateFlipperServos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-full">
                            <h2>Diffy Position (left, right)</h2>
                            <div className="flex flex-row space-x-2 mt-[10px]">
                                <input id="left-diffy-position" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                <input id="right-diffy-position" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                <button onClick={updateDiffyServos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-full">
                            <h2>(Intake) Claw</h2>
                            <div className="flex flex-row space-x-2 mt-[10px]">
                                <input id="intake-claw-position" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                <button onClick={updateIntakeClaw} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-full mt-[40px]">
                        <h1 className={"text-3xl " + rubikMonoOne.className}>Linkages</h1>
                    </div>
                    <div className="flex flex-row justify-around w-full mt-[10px]">
                        <div className="flex flex-col items-center w-full">
                                <h2>Linkage Position (left / right)</h2>
                                <div className="flex flex-row space-x-2 mt-[10px]">
                                    <input id="linkages-position-left" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} />
                                    {/* <input id="linkages-position-right" className="w-[100px] text-black text-center" type="number" min="0" max="1" step="0.001" defaultValue={0.5} /> */}
                                    <button onClick={updateLinkagePosition} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-full mt-[40px]">
                        <h1 className={"text-3xl " + rubikMonoOne.className}>Slides <span id="slides-position">0</span></h1>
                    </div>
                    
                </div>
            </div>
            <hr style={{
                border: "1px solid #fff",
                width: "100%",
                marginTop: "40px",
            }}/>
            <div>
                <div className={styles["servo-list"]}></div>
                <div className="mt-[30px]">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={update}>Update Servos</button>
                </div>
            </div>
        </div>
    )
}