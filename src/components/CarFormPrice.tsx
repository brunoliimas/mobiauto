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

const StyledFormControl = styled(FormControl)`
    width: 100%;
`;

const StyledButton = styled(Button)`
    background-color: #5D00BF;
`;

export default function CarPriceForm() {
    const {
        brands,
        models,
        years,
        price,
        setBrand,
        setModel,
        setYear,
        handleConsultPrice,
    } = useAPI();

    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const selectedBrandLabel = brands.find((option) => option.value === selectedBrand)?.label || "";
    const selectedModelLabel = models.find((option) => option.value === selectedModel)?.label || "";
    const selectedYearLabel = years.find((option) => option.value === selectedYear)?.label || "";

    return (
        <Container>
            <StyledForm>
                <StyledFormControl variant="outlined">
                    <InputLabel>Brand</InputLabel>
                    <Select
                        value={selectedBrand}
                        onChange={(e) => {
                            setBrand(e.target.value as string);
                            setSelectedBrand(e.target.value);
                        }}
                        label="Brand"
                    >
                        {brands.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>

                <StyledFormControl variant="outlined">
                    <InputLabel>Model</InputLabel>
                    <Select
                        value={selectedModel}
                        onChange={(e) => {
                            setModel(e.target.value as string);
                            setSelectedModel(e.target.value);
                        }}
                        label="Model"
                    >
                        {models.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>

                {selectedModel && (
                    <StyledFormControl variant="outlined">
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={selectedYear}
                            onChange={(e) => {
                                setYear(e.target.value as string);
                                setSelectedYear(e.target.value);
                            }}
                            label="Year"
                        >
                            {years.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </StyledFormControl>
                )}

                <StyledButton variant="contained" color="primary" onClick={handleConsultPrice}>
                    Consult Price
                </StyledButton>
            </StyledForm>
            <PriceDisplay
                brand={selectedBrandLabel}
                model={selectedModelLabel}
                year={selectedYearLabel}
                price={price}
            />
        </Container>
    );
}
