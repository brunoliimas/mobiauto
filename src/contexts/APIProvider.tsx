import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface APIProviderProps {
    children: ReactNode
}

interface Option {
    value: string;
    label: string;
}

interface CarsProps {
    code: string;
    name: string;
}

interface APIContextType {
    brands: Option[];
    models: Option[];
    years: Option[];
    price: string;
    setBrand: (brand: string) => void;
    setModel: (model: string) => void;
    setYear: (year: string) => void;
    handleConsultPrice: () => void;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export const useAPI = (): APIContextType => {
    const context = useContext(APIContext);
    if (!context) {
        throw new Error("useAPI must be used within an APIContext Provider");
    }
    return context;
};

export const APIProvider = ({ children }: APIProviderProps) => {
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [brands, setBrands] = useState<Option[]>([]);
    const [models, setModels] = useState<Option[]>([]);
    const [years, setYears] = useState<Option[]>([]);

    useEffect(() => {
        axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas")
            .then((response) => {
                const brandsData = response.data.map((brand: CarsProps) => ({
                    value: brand.code,
                    label: brand.name,
                }));
                setBrands(brandsData);
            })
            .catch((error) => {
                console.error("Error fetching brands: ", error);
            });
    }, []);

    useEffect(() => {
        if (brand) {
            axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos`)
                .then((response) => {
                    const modelsData = response.data.modelos.map((model: CarsProps) => ({
                        value: model.code,
                        label: model.name,
                    }));
                    setModels(modelsData);
                })
                .catch((error) => {
                    console.error("Error fetching models: ", error);
                });
        }
    }, [brand]);

    useEffect(() => {
        if (brand && model) {
            axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos`)
                .then((response) => {
                    const yearsData = response.data.map((year: CarsProps) => ({
                        value: year.code,
                        label: year.name,
                    }));
                    setYears(yearsData);
                })
                .catch((error) => {
                    console.error("Error fetching years: ", error);
                });
        }
    }, [brand, model]);

    const handleConsultPrice = () => {
        const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos/${year}`;
        axios.get(url)
            .then((response) => {
                setPrice(response.data.Valor);
                setBrand("");
                setModel("");
                setYear("");
            })
            .catch((error) => {
                console.error("Error fetching price: ", error);
            });
    };

    return (
        <APIContext.Provider value={{ brands, models, years, price, setBrand, setModel, setYear, handleConsultPrice }}>
            {children}
        </APIContext.Provider>
    );
};
