import { Button, useToast, VStack} from "native-base";
import { CaretRight } from "phosphor-react-native";
import React from "react";
import { openApp } from "react-native-send-intent";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
// import verificationPassSecurity from "../utils/verificationPassSecurity";
import { getIcon } from "react-native-change-icon";
import Animated, { withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import { BackHandler } from 'react-native';

export default function Verification() {
  const [password, setPassword] = React.useState("");
  const { setSecurityMode, authData } = useAuth();
  const toast = useToast();
  const { api } = useAxios();

  const handleContinue = async () => {
    setPassword(password.trim())

    if (password == '') {
      toast.show({
        title: "Preencha o campo senha",
        bgColor: "red.500",
        duration: 3000,
        placement: "top",
      });
    }
    async function openBank() {
      const response = await getIcon();
      let packageName
      if (response === 'bb') {
        packageName = 'br.com.bb.android';
      } else if (response === 'nubank') {
        packageName = 'com.nu.production';
      } else if (response === 'abc_brasil') {
        packageName = 'br.com.abcbrasil.bancoabcbrasil';
      } else if (response === 'abn_amro') {
        packageName = 'com.abnamro.nl.mobile.payments';
      } else if (response === 'agibank') {
        packageName = 'br.com.agipag.app';
      } else if (response === 'alfa') {
        packageName = 'com.base.bankalfalah';
      } else if (response === 'arbi') {
        packageName = 'com.kemelapp.bancoarbi';
      } else if (response === 'ativa') {
        packageName = 'io.ativainvestimentos.ativainvest';
      } else if (response === 'avista') {
        packageName = 'com.ifactorinc.android.avista';
      } else if (response === 'banco_amazonia') {
        packageName = 'la.foton.basa.mybankmobile';
      } else if (response === 'banco_bv') {
        packageName = 'com.votorantim.bvpd';
      } else if (response === 'banco_da_china') {
        packageName = 'com.boc.bocsoft.bocmbovsa.buss';
      } else if (response === 'banco_do_nordeste') {
        packageName = 'br.gov.bnb.nelmobile';
      } else if (response === 'banco_guanabara') {
        packageName = 'com.bancoguanabara';
      } else if (response === 'banco_industrial') {
        packageName = 'br.com.bancoindustrial.ib';
      } else if (response === 'banco_inter') {
        packageName = 'br.com.intermedium';
      } else if (response === 'banco_modal') {
        packageName = 'br.com.modalmais';
      } else if (response === 'banco_pan') {
        packageName = 'br.com.bancopan.cartoes';
      } else if (response === 'banrisul') {
        packageName = 'br.com.banrisul';
      } else if (response === 'bmg') {
        packageName = 'br.com.bancobmg.bancodigital';
      } else if (response === 'bocom_bbm') {
        packageName = 'br.com.bocombbm.ib';
      }else if (response === 'bradesco') {
        packageName = 'com.bradesco';
      } else if (response === 'bs2') {
        packageName = 'com.bs2.empresas';
      } else if (response === 'btg_pactual') {
        packageName = 'com.btg.pactual.banking';
      } else if (response === 'c6') {
        packageName = 'com.c6bank.app';
      } else if (response === 'cef') {
        packageName = 'br.com.gabba.Caixa';
      } else if (response === 'cetelem') {
        packageName = 'br.com.cetelem.mobilebank';
      } else if (response === 'citibank') {
        packageName = 'com.citi.mobile.ccc';
      } else if (response === 'credit_agricole') {
        packageName = 'com.CA.Push';
      } else if (response === 'credit_suisse') {
        packageName = 'com.csg.cs.dnmb';
      } else if (response === 'crefisa') {
        packageName = 'br.com.crefisa.crefisamais';
      } else if (response === 'daycoval') {
        packageName = 'br.com.daycoval.dayconnect';
      } else if (response === 'digimais') {
        packageName = 'br.com.digimais.conta.app';
      } else if (response === 'inbursa') {
        packageName = 'com.inbursa.icasabolsa';
      } else if (response === 'itau') {
        packageName = 'com.itau';
      } else if (response === 'kdb_bank') {
        packageName = 'co.kr.kdb.android.smartkdb';
      } else if (response === 'keb_hana') {
        packageName = 'com.totvs.ib.mobile.keb.pf';
      } else if (response === 'luso_brasileiro') {
        packageName = 'br.com.react.token.bancoLusoBrasileiro';
      } else if (response === 'mercado_pago') {
        packageName = 'com.mercadopago.wallet';
      } else if (response === 'mercantil_do_brasil') {
        packageName = 'com.mercantil';
      } else if (response === 'mizuho') {
        packageName = 'jp.co.mizuhobank.mizuhoapp';
      } else if (response === 'morgan_stanley') {
        packageName = 'com.morganstanley.clientmobile.prod';
      } else if (response === 'mufg') {
        packageName = 'com.jpm.sig.android';
      } else if (response === 'neon') {
        packageName = 'br.com.neon';
      } else if (response === 'next') {
        packageName = 'com.react.token.next';
      } else if (response === 'original') {
        packageName = 'br.com.original.bank';
      } else if (response === 'pagbank') {
        packageName = 'br.com.meupag';
      } else if (response === 'picpay') {
        packageName = 'com.picpay';
      } else if (response === 'safra') {
        packageName = 'br.livetouch.safra.net';
      } else if (response === 'santander') {
        packageName = 'com.santander.app';
      } else if (response === 'sicredi') {
        packageName = 'br.com.sicredimobi.smart';
      } else if (response === 'stone_pagamentos') {
        packageName = 'co.stone.banking.mobile.flagship';
      } else if (response === 'superdigital') {
        packageName = 'com.superdigital';
      } else if (response === 'todos_os_Bancos_v17') {
        packageName = 'br.com.abac.mps.bancosapp.android';
      } else if (response === 'topazio') {
        packageName = 'stf.topazio.Topazio';
      } else if (response === 'willbank') {
        packageName = 'br.com.willbank';
      } else if (response === 'z1') {
        packageName = 'app.z1.mobile'
      } else {
        console.log('Pacote não definido para a resposta:', response);
        return;
      }

      openApp(packageName, {}).then((isOpened) => {
        console.log(isOpened); // imprima se o aplicativo foi aberto ou não
      });
    }

    if (password == authData?.passwordBank) {
      openBank()
    } else if (password == authData?.passwordApp) {

      setSecurityMode(false);

      setPassword("");
    } else if (password == authData?.passwordEmergecy) {
      api.post('alert/create')
        .then(() => {
          openBank()
        })

    } else if(password == authData?.passwordDevice){
      BackHandler.exitApp();
    }else if(password == authData?.passwordDeviceEmergency){
      api.post('alert/create')
      .then(() => {
        BackHandler.exitApp();
      })
    } else {

      toast.show({
        title: "Senha incorreta",
        bgColor: "red.500",
        duration: 3000,
        placement: "top",
      });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSequence(withTiming(0), withTiming(1, { duration: 500 }))
    }
  })

  return (
    <VStack flex={1} safeArea px={5} justifyContent={"center"} >

      <Animated.View
        style={[{
          flexDirection: 'row',
          width: '100%'
        },
          animatedStyle
        ]}
      >
        <Input
          mt={5}
          placeholder="Senha de segurança"
          type="password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          w="100%"
        />
        <Button
          onPress={handleContinue}
          mt={5}
          bg={"gray.700"}
          _text={{ color: "white" }}
          w={50}
          h={50}
          rounded="full"
          position="absolute"
          right={2}
          top={2}
        >
          <CaretRight size={32} weight="regular" color="white" />
        </Button>
      </Animated.View>

    </VStack>
  );
}
