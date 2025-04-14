'use client';

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

import styles from "./overlay.module.css";

const bounds = 1.900;

const centerToEdgeDistance = 72.5 / 39.37; // 72.5 inches to meters

const conversion = bounds / centerToEdgeDistance;
// units / meters

const loadFilesFromRobot = async (ip) => {
    if (ip == "ignore") return;

    const req = await fetch(`http://${ip}:23014/list`);
    const text = await req.text();
    const files = text.split('\n');

    if (files[0].includes("No logs found.")) {
        return [];
    }

    return files;
}

const getFileFromRobot = async (ip, file) => {
    if (ip == "ignore") return;
    
    const req = await fetch(`http://${ip}:23014/get/${encodeURIComponent(file)}`);
    const text = await req.text();
    
    //convert every char to its utf-8 value
    const bytes = text.split('').map(c => c.charCodeAt(0));
    const buffSplit = [];
    for (let i = 0; i < bytes.length; i += 32) {
        buffSplit.push(bytes.slice(i, i + 32));
    }

    const datapoint = [];

    for (let buff of buffSplit) {
        // first 8 bytes is a long (int64)
        // second 8 bytes is a double (float64)
        // third 8 bytes is a double (float64)
        // fourth 8 bytes is a double (float64)

        let timestamp = Buffer.alloc(8);
        timestamp.writeBigUInt64BE(buff.slice(0, 8));

        let x = Buffer.alloc(8);
        x.writeDoubleBE(buff.slice(8, 16));

        let y = Buffer.alloc(8);
        y.writeDoubleBE(buff.slice(16, 24));

        let heading = Buffer.alloc(8);
        heading.writeDoubleBE(buff.slice(24, 32));

        datapoint.push({
            timestamp,
            x,
            y,
            heading
        });
    }

    return text;
}


const calculateCoordinates = (x, y) => {
    return {
        x: x / conversion,
        y: y / conversion
    }
}

const calculateCoordinatesInches = (x, y) => {
    if (typeof x === 'object') {
        y = x.y;
        x = x.x;
    }

    // convert x and y to meters
    return calculateCoordinates(
        x / 39.37,
        y / 39.37
    )
}

const ftcCoordinates = (x, y) => {
    return {
        x: x - 72.5,
        y: y - 72.5
    }
}

const ThreeScene = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            containerRef.current.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;
    
            camera.position.y = 5;
            //angle downwards
            camera.rotation.x = -0.5 * Math.PI;

            // origin

            const originCube = new THREE.Mesh(
                new THREE.SphereGeometry(0.05, 32, 16),
                new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            );
            
            scene.add(originCube);

            // corners

            const corner = new THREE.Mesh(
                new THREE.SphereGeometry(0.02, 32, 16),
                new THREE.MeshBasicMaterial({ color: 0xff0000 })
            );

            const conv = ftcCoordinates(72.5 * 2, 72.5 * 2);

            const pos = calculateCoordinatesInches(conv.y, conv.x);

            corner.position.x = pos.x;
            corner.position.z = pos.y;
            corner.position.y = 0.1;
            
            scene.add(corner);

            const pos2 = calculateCoordinatesInches(ftcCoordinates(0,0));

            const corner2 = new THREE.Mesh(
                new THREE.SphereGeometry(0.02, 32, 16),
                new THREE.MeshBasicMaterial({ color: 0x0000ff })
            );

            corner2.position.x = pos2.x;
            corner2.position.z = pos2.y;
            corner2.position.y = 0.1;

            scene.add(corner2);

            // robot
            let robotDim = calculateCoordinatesInches(15, 15);

            const robotCube = new THREE.Mesh(
                new THREE.BoxGeometry(robotDim.x, 0.2, robotDim.y),
                new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true })
            );

            

            let robot_pos = calculateCoordinatesInches(ftcCoordinates(24.173258337393154, 72.15837725319987));
            robotCube.position.x = robot_pos.x;
            robotCube.position.z = robot_pos.y;

            robotCube.position.y = 0.11;
            scene.add(robotCube);

            fetch("path/path.json").then((data) => data.json()).then((data) => {
                const paths = data.paths;
                
                for (let path of paths) {
                    let generatedPoints = path.bezierCurvePoints;
                    let points = [];
                    
                    // cut down the number of generated points
                    for (let i = 0; i < generatedPoints.length; i += 1) {
                        let point = generatedPoints[i];
                        let pos = calculateCoordinatesInches(point.x - 72.5, -point.y + 72.5);
                        points.push(pos.x, 0.1, pos.y);
                    }

                    const geometry = new LineGeometry();
                    geometry.setPositions(points);

                    const color = new THREE.Color(path.color);

                    const material = new LineMaterial({ 
                        color, 
                        linewidth: 4,
                        dashed: true,
                        dashSize: 0.1,
                        gapSize: 0.1,
                        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)
                    });

                    const line = new Line2(geometry, material);
                    scene.add(line);
                    line.geometry.computeBoundingBox();
                    line.position.y = 0.1;

                    // Update material resolution when window is resized
                    window.addEventListener('resize', function() {
                        material.resolution.set(window.innerWidth, window.innerHeight);
                    });
                }
            });


            // field

            var field = null;
            
            var loader = new ThreeMFLoader();
            loader.load('models/INTO_THE_DEEP_TH.3mf', function (object) {
                field = object;
                scene.add(object);
                document.getElementById("text").innerHTML = "Replay - " + object.name;
            });

            const light = new THREE.AmbientLight(0xffffff);
            scene.add(light);

            const renderLoad = () => {
                // render a loading screen
                renderer.setClearColor(0x000000, 1);
                renderer.clear();
            }

            const renderScene = () => {
                requestAnimationFrame(renderScene);
                if (field == null) {
                    renderLoad();
                    //renderer.render(scene, camera);
                    return;
                }

                controls.update();

                renderer.render(scene, camera);
            };

            const handleResize = () => {
                if (typeof window !== 'undefined') {
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    renderer.setSize(width, height);
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                }
            }
    
            window.addEventListener('resize', handleResize);
            
            // Call the renderScene function to start the animation loop
            renderScene();

            return () => {
                window.removeEventListener('resize', handleResize);
            }
        }
    }, []);

    return <div ref={containerRef} />;
}

function FileMenu() {
    const [files, setFiles] = React.useState([]);
    
    React.useEffect(() => {
        //try and load ip from local storage
        let ip = localStorage.getItem("ip");
        if (ip == null) {
            const newIp = prompt("Enter the IP address of the robot");
            if (newIp) {
                localStorage.setItem("ip", newIp);
            }
            ip = newIp;
        }

        loadFilesFromRobot(ip).then((files) => {
            setFiles(files);
        });
    });

    const editIp = () => {
        const newIp = prompt("Enter the IP address of the robot");
        if (newIp) {
            localStorage.setItem("ip", newIp);
        }
    };

    return (
        <div className="fixed w-full h-full top-0 left-0 pointer-events-none select-none flex flex-col justify-center items-center z-10 bg-neutral-700 bg-opacity-50" id="file-menu">
            {/* in the center */}
            <div className='flex flex-col justify-center items-center w-[500px] h-[500px] bg-white rounded-lg shadow-lg text-neutral-900 pointer-events-auto select-auto'>
                <div className='flex flex-col justify-center items-center w-full h-full'>
                    <div className='flex flex-row justify-around items-center w-full h-[70px] bg-neutral-300 rounded-t-lg'>
                        <h1 className='text-2xl font-bold'>Select a file</h1>
                        <button className='text-neutral-900 bg-cyan-500 hover:bg-cyan-600 rounded-lg px-4 py-2' onClick={editIp}>Change IP</button>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full h-full'>
                        <div className='flex flex-col justify-center items-center w-full h-full'>
                            {files.length > 0 && files.map((file, index) => {
                                return (
                                    <div key={index} className='flex flex-row justify-between items-center w-full h-[50px] px-4 border-b border-neutral-300'>
                                        <h1 className='text-lg font-bold'>{file}</h1>
                                        <button className='text-neutral-900 bg-cyan-500 hover:bg-cyan-600 rounded-lg px-4 py-2' onClick={() => getFileFromRobot(localStorage.getItem("ip"), file)}>Load</button>
                                    </div>
                                )
                            })}
                            {files.length == 0 && <div className='flex flex-col justify-center items-center w-full h-full'>
                                <h1 className='text-xl font-bold'>No files found</h1>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ReplayPage() {

    const togglePlay = () => {
        const playSvg = document.getElementById("play-svg");
        const pauseSvg = document.getElementById("pause-svg");

        if (playSvg.style.display === 'none') {
            playSvg.style.display = 'block';
            pauseSvg.style.display = 'none';
        } else {
            playSvg.style.display = 'none';
            pauseSvg.style.display = 'block';
        }
    }

    const sliderAdj = () => {
        const playSvg = document.getElementById("play-svg");
        const pauseSvg = document.getElementById("pause-svg");

        playSvg.style.display = 'block';
        pauseSvg.style.display = 'none';
    }

    const openFileMenu = () => {
        const fileMenu = document.getElementById("file-menu");
        fileMenu.style.display = 'block';
    }

    return (
        <>
        <FileMenu />
        <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            color: '#000000'
        }}>
            <h1 id="text">Replay</h1>
            <ThreeScene />
            <div className={styles["overlay"]}>
                <div className={styles["overlay-content"]}>
                    <div className={styles["playback-controls"]}>
                        <div className={styles["svg-button"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-left</title><path d="M14,7L9,12L14,17V7Z" /></svg>
                        </div>
                        <div className={styles["svg-button"]} onClick={togglePlay}>
                            <div id="play-svg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>
                            </div>
                            <div id="pause-svg" style={{
                                display: 'none'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>
                            </div>
                        </div>
                        <div className={styles["svg-button"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-right</title><path d="M10,17L15,12L10,7V17Z" /></svg>
                        </div>
                    </div>
                    <input className={styles["playback-range"]} type='range' onChange={sliderAdj} onClick={sliderAdj}></input>
                    <div className={styles["svg-button"]} onClick={openFileMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>upload-circle-outline</title><path d="M8 17V15H16V17H8M16 10L12 6L8 10H10.5V14H13.5V10H16M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" /></svg>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}