import { AndroidLogo } from "phosphor-react-native";
import BB from "../assets/bb.svg";
import Nu from "../assets/nubank.svg";
import ABCBrasil from "../assets/Bancos/ABC Brasil.svg";
import ABNAMRO from "../assets/Bancos/ABN AMRO.svg";
import Agibank from "../assets/Bancos/Agibank.svg";
import Alfa from "../assets/Bancos/Alfa.svg";
import Arbi from "../assets/Bancos/Arbi.svg";
import Ativa from "../assets/Bancos/Ativa.svg";
import Avista from "../assets/Bancos/Avista.svg";
import BancoAmazonia from "../assets/Bancos/Banco Amazonia.svg";
import BV from "../assets/Bancos/Banco BV.svg";
import Bancochina from "../assets/Bancos/Banco da China.svg";
import BancoNordeste from "../assets/Bancos/Banco do Nordeste.svg";
import BancoGuanabara from "../assets/Bancos/Banco Guanabara.svg";
import BancoIndustrial from "../assets/Bancos/Banco Industrial.svg";
import BancoInter from "../assets/Bancos/Banco Inter.svg";
import BancoModal from "../assets/Bancos/Banco Modal.svg";
import Pan from "../assets/Bancos/Banco Pan.svg";
import Barisul from "../assets/Bancos/Banrisul.svg";
import BMG from "../assets/Bancos/BMG.svg";
import BBM from "../assets/Bancos/BOCOM BBM.svg";
import Bradesco from "../assets/Bancos/Bradesco.svg";
import Bs2 from "../assets/Bancos/Bs2.svg";
import BTG from "../assets/Bancos/BTG Pactual.svg";
import C6 from "../assets/Bancos/C6.svg";
import CEF from "../assets/Bancos/CEF.svg";
import CETELEM from "../assets/Bancos/CETELEM.svg";
import Citibank from "../assets/Bancos/Citibank.svg";
import Agricole from "../assets/Bancos/Crédit Agricole.svg";
import Suisse from "../assets/Bancos/Crédit Suisse.svg";
import Crefisa from "../assets/Bancos/Crefisa.svg";
import Daycoval from "../assets/Bancos/Daycoval.svg";
import Digimais from "../assets/Bancos/Digimais.svg";
import Inbursa from "../assets/Bancos/Inbursa.svg";
import Itau from "../assets/Bancos/Itau.svg";
import KDB from "../assets/Bancos/KDB Bank.svg";
import KEB from "../assets/Bancos/KEB Hana.svg";
import LusoBrasileiro from "../assets/Bancos/Luso Brasileiro.svg";
import MercadoPago from "../assets/Bancos/Mercado Pago.svg";
import Mercantil from "../assets/Bancos/Mercantil do Brasil.svg";
import Mizuho from "../assets/Bancos/Mizuho.svg";
import MorganStanley from "../assets/Bancos/Morgan Stanley.svg";
import MUFG from "../assets/Bancos/MUFG.svg";
import Neon from "../assets/Bancos/Neon.svg";
import Next from "../assets/Bancos/Next.svg";
import Original from "../assets/Bancos/Original.svg";
import Pagbank from "../assets/Bancos/PagBank.svg";
import PICPAY from "../assets/Bancos/PICPAY.svg";
import Safra from "../assets/Bancos/Safra.svg";
import Santander from "../assets/Bancos/Santander.svg";
import Sicredi from "../assets/Bancos/Sicredi.svg";
import Stone from "../assets/Bancos/Stone Pagamentos.svg";
import Superdigital from "../assets/Bancos/Superdigital.svg";
import V17 from "../assets/Bancos/Todos os Bancos V17.svg";
import Topazio from "../assets/Bancos/Topazio.svg";
import WillBank from "../assets/Bancos/WillBank.svg";
import Z1 from "../assets/Bancos/Z1.svg"

export interface IDataAppsProps {
  nameApp: string;
  colorIcon: string;
  icon: React.ReactNode;
  iconName: string;
  lengthApp: string;
}

export const dataApps: IDataAppsProps[] = [
  {
    icon: <AndroidLogo />,
    iconName: "pppix",
    lengthApp: "252",
    nameApp: "PPPIX",
    colorIcon: "green",
  },
  {
    icon: <BB width={40} height={40} />,
    iconName: "bb",
    lengthApp: "252",
    nameApp: "BB",
    colorIcon: "green",
  },
  {
    icon: <Nu width={40} height={40} />,
    iconName: "nubank",
    lengthApp: "252",
    nameApp: "Nubank",
    colorIcon: "green",
  },
  {
    icon: <ABCBrasil width={40} height={40} />,
    iconName: "abc_brasil",
    lengthApp: "252",
    nameApp: "ABC Brasil",
    colorIcon: "green",
  },
  {
    icon: <ABNAMRO width={40} height={40} />,
    iconName: "abn_amro",
    lengthApp: "252",
    nameApp: "ABN AMRO",
    colorIcon: "green",
  },
  {
    icon: <Agibank width={40} height={40} />,
    iconName: "agibank",
    lengthApp: "252",
    nameApp: "Agibank",
    colorIcon: "green",
  },
  {
    icon: <Alfa width={40} height={40} />,
    iconName: "alfa",
    lengthApp: "252",
    nameApp: "Alfa",
    colorIcon: "green",
  },
  {
    icon: <Arbi width={40} height={40} />,
    iconName: "arbi",
    lengthApp: "252",
    nameApp: "Arbi",
    colorIcon: "green",
  },
  {
    icon: <Ativa width={40} height={40} />,
    iconName: "ativa",
    lengthApp: "252",
    nameApp: "Ativa",
    colorIcon: "green",
  },
  {
    icon: <Avista width={40} height={40} />,
    iconName: "avista",
    lengthApp: "252",
    nameApp: "Avista",
    colorIcon: "green",
  },
  {
    icon: <BancoAmazonia width={40} height={40} />,
    iconName: "banco_amazonia",
    lengthApp: "252",
    nameApp: "Banco Amazonia",
    colorIcon: "green",
  },
  {
    icon: <BV width={40} height={40} />,
    iconName: "banco_bv",
    lengthApp: "252",
    nameApp: "Banco BV",
    colorIcon: "green",
  },
  {
    icon: <Bancochina width={40} height={40} />,
    iconName: "banco_da_china",
    lengthApp: "252",
    nameApp: "Banco da China",
    colorIcon: "green",
  },
  {
    icon: <BancoNordeste width={40} height={40} />,
    iconName: "banco_do_nordeste",
    lengthApp: "252",
    nameApp: "Banco do Nordeste",
    colorIcon: "green",
  },
  {
    icon: <BancoGuanabara width={40} height={40} />,
    iconName: "banco_guanabara",
    lengthApp: "252",
    nameApp: "Banco Guanabara",
    colorIcon: "green",
  },
  {
    icon: <BancoIndustrial width={40} height={40} />,
    iconName: "banco_industrial",
    lengthApp: "252",
    nameApp: "Banco Industrial",
    colorIcon: "green",
  },
  {
    icon: <BancoInter width={40} height={40} />,
    iconName: "banco_inter",
    lengthApp: "252",
    nameApp: "Banco Inter",
    colorIcon: "green",
  },
  {
    icon: <BancoModal width={40} height={40} />,
    iconName: "banco_modal",
    lengthApp: "252",
    nameApp: "Banco Modal",
    colorIcon: "green",
  },
  {
    icon: <Pan width={40} height={40} />,
    iconName: "banco_pan",
    lengthApp: "252",
    nameApp: "Banco Pan",
    colorIcon: "green",
  },
  {
    icon: <Barisul width={40} height={40} />,
    iconName: "banrisul",
    lengthApp: "252",
    nameApp: "Banrisul",
    colorIcon: "green",
  },
  {
    icon: <BMG width={40} height={40} />,
    iconName: "bmg",
    lengthApp: "252",
    nameApp: "BMG",
    colorIcon: "green",
  },
  {
    icon: <BBM width={40} height={40} />,
    iconName: "bocom_bbm",
    lengthApp: "252",
    nameApp: "BOCOM BBM",
    colorIcon: "green",
  },
  {
    icon: <Bradesco width={40} height={40} />,
    iconName: "bradesco",
    lengthApp: "252",
    nameApp: "Bradesco",
    colorIcon: "green",
  },
  {
    icon: <Bs2 width={40} height={40} />,
    iconName: "bs2",
    lengthApp: "252",
    nameApp: "Bs2",
    colorIcon: "green",
  },
  {
    icon: <BTG width={40} height={40} />,
    iconName: "btg_pactual",
    lengthApp: "252",
    nameApp: "BTG Pactual",
    colorIcon: "green",
  },
  {
    icon: <C6 width={40} height={40} />,
    iconName: "c6",
    lengthApp: "252",
    nameApp: "C6",
    colorIcon: "green",
  },
  {
    icon: <CEF width={40} height={40} />,
    iconName: "cef",
    lengthApp: "252",
    nameApp: "CEF",
    colorIcon: "green",
  },
  {
    icon: <CETELEM width={40} height={40} />,
    iconName: "cetelem",
    lengthApp: "252",
    nameApp: "CETELEM",
    colorIcon: "green",
  },
  {
    icon: <Citibank width={40} height={40} />,
    iconName: "citibank",
    lengthApp: "252",
    nameApp: "Citibank",
    colorIcon: "green",
  },
  {
    icon: <Agricole width={40} height={40} />,
    iconName: "credit_agricole",
    lengthApp: "252",
    nameApp: "Crédit Agricole",
    colorIcon: "green",
  },
  {
    icon: <Suisse width={40} height={40} />,
    iconName: "credit_suisse",
    lengthApp: "252",
    nameApp: "Crédit Suisse",
    colorIcon: "green",
  },
  {
    icon: <Crefisa width={40} height={40} />,
    iconName: "crefisa",
    lengthApp: "252",
    nameApp: "Crefisa",
    colorIcon: "green",
  },
  {
    icon: <Daycoval width={40} height={40} />,
    iconName: "daycoval",
    lengthApp: "252",
    nameApp: "Daycoval",
    colorIcon: "green",
  },
  {
    icon: <Digimais width={40} height={40} />,
    iconName: "digimais",
    lengthApp: "252",
    nameApp: "Digimais",
    colorIcon: "green",
  },
  {
    icon: <Inbursa width={40} height={40} />,
    iconName: "inbursa",
    lengthApp: "252",
    nameApp: "Inbursa",
    colorIcon: "green",
  },
  {
    icon: <Itau width={40} height={40} />,
    iconName: "itau",
    lengthApp: "252",
    nameApp: "Itau",
    colorIcon: "green",
  },
  {
    icon: <KDB width={40} height={40} />,
    iconName: "kdb_bank",
    lengthApp: "252",
    nameApp: "KDB Bank",
    colorIcon: "green",
  },
  {
    icon: <KEB width={40} height={40} />,
    iconName: "keb_hana",
    lengthApp: "252",
    nameApp: "KEB Hana",
    colorIcon: "green",
  },
  {
    icon: <LusoBrasileiro width={40} height={40} />,
    iconName: "luso_brasileiro",
    lengthApp: "252",
    nameApp: "Luso Brasileiro",
    colorIcon: "green",
  },
  {
    icon: <MercadoPago width={40} height={40} />,
    iconName: "mercado_pago",
    lengthApp: "252",
    nameApp: "Mercado Pago",
    colorIcon: "green",
  },
  {
    icon: <Mercantil width={40} height={40} />,
    iconName: "mercantil_do_brasil",
    lengthApp: "252",
    nameApp: "Mercantil do Brasil",
    colorIcon: "green",
  },
  {
    icon: <Mizuho width={40} height={40} />,
    iconName: "mizuho",
    lengthApp: "252",
    nameApp: "Mizuho",
    colorIcon: "green",
  },
  {
    icon: <MorganStanley width={40} height={40} />,
    iconName: "morgan_stanley",
    lengthApp: "252",
    nameApp: "Morgan Stanley",
    colorIcon: "green",
  },
  {
    icon: <MUFG width={40} height={40} />,
    iconName: "mufg",
    lengthApp: "252",
    nameApp: "MUFG",
    colorIcon: "green",
  },
  {
    icon: <Neon width={40} height={40} />,
    iconName: "neon",
    lengthApp: "252",
    nameApp: "Neon",
    colorIcon: "green",
  },
  {
    icon: <Next width={40} height={40} />,
    iconName: "next",
    lengthApp: "252",
    nameApp: "Next",
    colorIcon: "green",
  },
  {
    icon: <Original width={40} height={40} />,
    iconName: "original",
    lengthApp: "252",
    nameApp: "Original",
    colorIcon: "green",
  },
  {
    icon: <Pagbank width={40} height={40} />,
    iconName: "pagbank",
    lengthApp: "252",
    nameApp: "PagBank",
    colorIcon: "green",
  },
  {
    icon: <PICPAY width={40} height={40} />,
    iconName: "picpay",
    lengthApp: "252",
    nameApp: "PICPAY",
    colorIcon: "green",
  },
  {
    icon: <Safra width={40} height={40} />,
    iconName: "safra",
    lengthApp: "252",
    nameApp: "Safra",
    colorIcon: "green",
  },
  {
    icon: <Santander width={40} height={40} />,
    iconName: "santander",
    lengthApp: "252",
    nameApp: "Santander",
    colorIcon: "green",
  },
  {
    icon: <Sicredi width={40} height={40} />,
    iconName: "sicredi",
    lengthApp: "252",
    nameApp: "Sicredi",
    colorIcon: "green",
  },
  {
    icon: <Stone width={40} height={40} />,
    iconName: "stone_pagamentos",
    lengthApp: "252",
    nameApp: "Stone Pagamentos",
    colorIcon: "green",
  },
  {
    icon: <Superdigital width={40} height={40} />,
    iconName: "superdigital",
    lengthApp: "252",
    nameApp: "Superdigital",
    colorIcon: "green",
  },
  {
    icon: <V17 width={40} height={40} />,
    iconName: "todos_os_Bancos_v17",
    lengthApp: "252",
    nameApp: "Todos os Bancos V17",
    colorIcon: "green",
  },
  {
    icon: <Topazio width={40} height={40} />,
    iconName: "topazio",
    lengthApp: "252",
    nameApp: "Topazio",
    colorIcon: "green",
  },
  {
    icon: <WillBank width={40} height={40} />,
    iconName: "willbank",
    lengthApp: "252",
    nameApp: "WillBank",
    colorIcon: "green",
  },
  {
    icon: <Z1 width={40} height={40} />,
    iconName: "z1",
    lengthApp: "252",
    nameApp: "Z1",
    colorIcon: "green",
  },
]