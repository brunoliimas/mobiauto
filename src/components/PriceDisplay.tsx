import { Title } from "@/app/page";
import { Container } from "@mui/material";
import styled from "styled-components";

interface PriceDisplayProps {
    brand: string;
    model: string;
    year: string;
    price: string;
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

export default function PriceDisplay({ brand, model, year, price }: PriceDisplayProps) {

    if (!price) {
        return null;
    }

    return (
        <PriceBox>
            <Title>Fipe Table: Price {brand} {model} {year}</Title>
            <Price>{price}</Price>
            <small>This is the vehicle purchase price</small>
        </PriceBox>
    );
}
