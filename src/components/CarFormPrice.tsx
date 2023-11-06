"use client"
import { useAPI } from "@/contexts/APIProvider";
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import PriceDisplay from "./PriceDisplay";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 500px;
    margin: 0 auto;
    background-color: #ffffff; 
    padding: 30px 40px;
`;

const FormControlStyled = styled(FormControl)`
    width: 100%;
`
const ButtonForm = styled(Button)`
    background-color: #5D00BF;
`

export default function CarPriceForm() {
    const {
        marcas,
        modelos,
        anos,
        preco,
        setMarca,
        setModelo,
        setAno,
        handleConsultarPreco,
    } = useAPI();


    const [marcaSelecionada, setMarcaSelecionada] = useState<string>("");
    const [modeloSelecionado, setModeloSelecionado] = useState<string>("");
    const [anoSelecionado, setAnoSelecionado] = useState<string>("");


    const selectedMarcaLabel = marcas.find((opcao) => opcao.value === marcaSelecionada)?.label || '';
    const selectedModeloLabel = modelos.find((opcao) => opcao.value === modeloSelecionado)?.label || '';
    const selectedAnoLabel = anos.find((opcao) => opcao.value === anoSelecionado)?.label || '';


    return (
        <Container>
            <StyledForm>
                <FormControlStyled variant="outlined">
                    <InputLabel>Marca</InputLabel>
                    <Select
                        value={marcaSelecionada}
                        onChange={(e) => {
                            setMarca(e.target.value as string);
                            setMarcaSelecionada(e.target.value);
                        }}
                        label="Marca"
                    >
                        {marcas.map((opcao) => (
                            <MenuItem key={opcao.value} value={opcao.value}>
                                {opcao.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControlStyled>

                <FormControlStyled variant="outlined">
                    <InputLabel>Modelo</InputLabel>
                    <Select
                        value={modeloSelecionado}
                        onChange={(e) => {
                            setModelo(e.target.value as string),
                                setModeloSelecionado(e.target.value)
                        }}
                        label="Modelo"
                    >
                        {modelos.map((opcao) => (
                            <MenuItem key={opcao.value} value={opcao.value}>
                                {opcao.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControlStyled>

                {modeloSelecionado && (
                    <FormControlStyled variant="outlined">
                        <InputLabel>Ano</InputLabel>
                        <Select
                            value={anoSelecionado}
                            onChange={(e) => {
                                setAno(e.target.value as string);
                                setAnoSelecionado(e.target.value);
                            }}
                            label="Ano"
                        >
                            {anos.map((opcao) => (
                                <MenuItem key={opcao.value} value={opcao.value}>
                                    {opcao.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControlStyled>
                )}

                <ButtonForm variant="contained" color="primary" onClick={handleConsultarPreco}>
                    Consultar Preço
                </ButtonForm>

            </StyledForm>
            <PriceDisplay
                marca={selectedMarcaLabel}
                modelo={selectedModeloLabel}
                ano={selectedAnoLabel}
                preco={preco}
            />
        </Container>
    );
}
