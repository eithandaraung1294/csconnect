import { createContext, useEffect, useState, use, useContext } from "react";
import axios from "@/api/axios";
const getE = '/website/navbar/e';
const getM = '/website/navbar/m';

const NavdataContext = createContext();
const NavdataContextE = createContext();
const NavdataContextM = createContext();

export function useNavData() {
    return useContext(NavdataContext);
}

export function useNavDataE() {
    return useContext(NavdataContextE);
}

export function useNavDataM() {
    return useContext(NavdataContextM);
}

export function NavdataProvider({ children }){
    const [data, setData] = useState();
    const [dataE, setDataE] = useState();
    const [dataM, setDataM] = useState();
    const [language, setLanguage] = useState("En");

    useEffect(() =>  {
        const fetchData = async () => {
            try {
                const [de, dm] = await Promise.all([axios.get(getE), axios.get(getM)]);
                setDataE(de.data);
                setDataM(dm.data);
                setData(de.data);
            } catch(err){
                console.log(err);
            }
        };
        
        fetchData();
    }, []);

    const changeE = () => {
        setLanguage("En");
        setData(dataE);
    };
    const changeM = () => {
        setLanguage("My");
        setData(dataM);
    };

    return (
        <NavdataContext.Provider value={{data, language}}>
            <NavdataContextE.Provider value={changeE}>
                <NavdataContextM.Provider value={changeM}>
                    { children }
                </NavdataContextM.Provider>
            </NavdataContextE.Provider>
        </NavdataContext.Provider>
    );
}