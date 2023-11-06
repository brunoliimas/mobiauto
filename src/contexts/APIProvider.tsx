import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface APIProviderPorps {
    children: ReactNode
}

interface Option {
    value: string;
    label: string;
}

interface CarsProps {
    codigo: string;
    nome: string;
}

interface APIContextType {
    marcas: Option[];
    modelos: Option[];
    anos: Option[];
    preco: string;
    setMarca: (marca: string) => void;
    setModelo: (modelo: string) => void;
    setAno: (ano: string) => void;
    handleConsultarPreco: () => void;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export const useAPI = (): APIContextType => {
    const context = useContext(APIContext);
    if (!context) {
        throw new Error("useAPI deve ser usado dentro de um Provider de APIContext");
    }
    return context;
};

export const APIProvider = ({ children }: APIProviderPorps) => {
    const [marca, setMarca] = useState<string>("");
    const [modelo, setModelo] = useState<string>("");
    const [ano, setAno] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [marcas, setMarcas] = useState<Option[]>([]);
    const [modelos, setModelos] = useState<Option[]>([]);
    const [anos, setAnos] = useState<Option[]>([]);

    useEffect(() => {
        axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas")
            .then((response) => {
                const marcasData = response.data.map((marca: CarsProps) => ({
                    value: marca.codigo,
                    label: marca.nome,
                }));
                setMarcas(marcasData);
            })
            .catch((error) => {
                console.error("Erro ao buscar marcas: ", error);
            });
    }, []);

    useEffect(() => {
        if (marca) {
            axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos`)
                .then((response) => {
                    const modelosData = response.data.modelos.map((modelo: CarsProps) => ({
                        value: modelo.codigo,
                        label: modelo.nome,
                    }));
                    setModelos(modelosData);
                })
                .catch((error) => {
                    console.error("Erro ao buscar modelos: ", error);
                });
        }
    }, [marca]);

    useEffect(() => {
        if (marca && modelo) {
            axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos`)
                .then((response) => {
                    const anosData = response.data.map((ano: CarsProps) => ({
                        value: ano.codigo,
                        label: ano.nome,
                    }));
                    setAnos(anosData);
                })
                .catch((error) => {
                    console.error("Erro ao buscar anos: ", error);
                });
        }
    }, [marca, modelo]);

    const handleConsultarPreco = () => {
        const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos/${ano}`;
        axios.get(url)
            .then((response) => {
                setPreco(response.data.Valor);
                setMarca("");
                setModelo("");
                setAno("");
            })
            .catch((error) => {
                console.error("Erro ao buscar preço: ", error);
            });
    };

    return (
        <APIContext.Provider value={{ marcas, modelos, anos, preco, setMarca, setModelo, setAno, handleConsultarPreco }}>
            {children}
        </APIContext.Provider>
    );
};
