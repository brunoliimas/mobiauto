"use client"
import CarPriceForm from "@/components/CarFormPrice";
import { APIProvider } from "@/contexts/APIProvider";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 4em 2rem;
  background: #f3f3f3;
  min-height: 100vh;
`;
const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`
export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
`;


export default function Home() {
  return (
    <APIProvider>
      <Main>
        <Header>
          <Title>Tabela Fipe</Title>
          <Subtitle>Consulte o valor de um veículo de forma gratuita</Subtitle>
        </Header>
        <CarPriceForm />
      </Main>
    </APIProvider>
  );
}
