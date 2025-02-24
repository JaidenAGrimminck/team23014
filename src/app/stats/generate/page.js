"use client";

import { useState } from 'react';

import styles from './generate.module.css';


    /*
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
    */

export default function Form() {
    //const router = useRouter();
    const [teamNumber, setTeamNumber] = useState('');
    const [teamName, setTeamName] = useState('');
    const [canDoSpec, setCanDoSpec] = useState(false);
    const [canDoSample, setCanDoSample] = useState(false);
    const [autoSpecimen, setAutoSpecimen] = useState(0);
    const [autoSpecimenPark, setAutoSpecimenPark] = useState(false);
    const [autoSample, setAutoSample] = useState(0);
    const [autoSamplePark, setAutoSamplePark] = useState(false);
    const [teleSpecimen, setTeleSpecimen] = useState(0);
    const [teleSample, setTeleSample] = useState(0);
    const [egHang, setEgHang] = useState('None');
    const [preference, setPreference] = useState('None');

    const handleSubmit = (e) => {
        e.preventDefault();
        const qs = new URLSearchParams({
            teamNumber, 
            teamName: encodeURIComponent(teamName), 
            canDoSpecimen: canDoSpec, 
            canDoSample, 
            autoSpecimen, 
            autoSpecimenPark, 
            autoSample, 
            autoSamplePark, 
            teleSpecimen, 
            teleSample, 
            endgame: egHang, 
            preference
        }).toString();
        //router.push(`/stats?${qs}`);

        // go to /stats page with query string
        window.location.href = `/stats?${qs}`;
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 flex flex-col justify-center items-center">
            <h3 className={`text-xl md:text-3xl`}>Generate your Quick Stats page!</h3>
            <div className='flex space-x-4'>
                <div>
                    <label className="block">Team Number</label>
                    <input type="number" className={`border p-1 ${styles["input"]}`} value={teamNumber} onChange={e => setTeamNumber(e.target.value)} />
                </div>
                <div>
                    <label className="block">Team Name</label>
                    <input type="text" className={`border p-1 ${styles["input"]}`} value={teamName} onChange={e => setTeamName(e.target.value)} />
                </div>
            </div>
            <div className='flex space-x-4'>
                <div className='flex flex-row'>
                    <label className="block">Can do Specimen?</label>
                    <input type="checkbox" className={`ml-[5px] mr-2 ${styles["checkbox"]}`} checked={canDoSpec} onChange={e => setCanDoSpec(e.target.checked)} />
                </div>
                <div className='flex flex-row'>
                    <label className="block">Can do Sample?</label>
                    <input type="checkbox" className={`ml-[5px] mr-2 ${styles["checkbox"]}`} checked={canDoSample} onChange={e => setCanDoSample(e.target.checked)} />
                </div>
            </div>
            <div className='flex space-x-4'>
                <div>
                    <label className="block">Autonomous Specimen</label>
                    <div className='flex flex-col'>
                    <input type="number" className={"border p-1 mr-2 " + styles["input"]} value={autoSpecimen} onChange={e => setAutoSpecimen(e.target.value)} />
                    <label className="inline-flex items-center">
                        <input type="checkbox" className={`mr-1 ${styles["checkbox"]}`} checked={autoSpecimenPark} onChange={e => setAutoSpecimenPark(e.target.checked)} />
                        Park?
                    </label>
                    </div>
                </div>
                <div>
                    <label className="block">Autonomous Sample</label>
                    <div className='flex flex-col'>
                        <input type="number" className={"border p-1 mr-2 " + styles["input"]} value={autoSample} onChange={e => setAutoSample(e.target.value)} />
                        <label className="inline-flex items-center">
                            <input type="checkbox" className={`mr-1 ${styles["checkbox"]}`} checked={autoSamplePark} onChange={e => setAutoSamplePark(e.target.checked)} />
                            Park?
                        </label>
                    </div>
                </div>
            </div>
            <p>Assume that you're only doing the following for the entire TeleOp... how many can you score in high basket/rung?</p>
            <p><i>Exclude any elements scored in Autonomous.</i></p>

            <div className='flex space-x-4'>
                <div>
                    <label className="block">TeleOp Specimen</label>
                    <input type="number" className={`border p-1 ${styles["input"]}`} value={teleSpecimen} onChange={e => setTeleSpecimen(e.target.value)} />
                </div>
                <div>
                    <label className="block">Tele Sample</label>
                    <input type="number" className={`border p-1 ${styles["input"]}`} value={teleSample} onChange={e => setTeleSample(e.target.value)} />
                </div>
            </div>
            <div className='flex space-x-4'>
                <label className="block">Endgame Hang</label>
                <select className={`border p-1 ${styles["input"]}`} value={egHang} onChange={e => setEgHang(e.target.value)}>
                    <option>None</option>
                    <option>L1</option>
                    <option>L2</option>
                    <option>L3</option>
                </select>
            </div>
            <div className='flex space-x-4'>
                <label className="block">Preference</label>
                <select className={`border p-1 ${styles["input"]}`} value={preference} onChange={e => setPreference(e.target.value)}>
                    <option>None</option>
                    <option>Specimen</option>
                    <option>Sample</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-700 text-white px-3 py-1 rounded">Submit</button>
        </form>
    );
}