import React from "react";
import { useAPI } from "@/contexts/APIProvider";
import styled from "styled-components";
import { Container } from "@mui/material";
import { Title } from "@/app/page";
interface PriceDisplayProps {
    marca: string;
    modelo: string;
    ano: string;
    preco: string
}

const PriceBox = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #DCF5F2;
    padding: 30px 40px;
    margin: 20px 0;

`
const Price = styled.span`
    margin: 20px 0;
    font-size: 1.2rem;
    background-color: #00A38C;
    color: #fff;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 50px;
`

export default function PriceDisplay({ marca, modelo, ano, preco }: PriceDisplayProps) {

    if (!preco) {
        return null;
    }

    return (
        <PriceBox>
            <Title>Tabela Fipe: Preço {marca} {modelo} {ano}</Title>
            <Price>{preco}</Price>
            <small>Este é o preço da compra do veículo</small>
        </PriceBox>
    );
}
