import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Input } from '../Input';
import { Button } from '../Button';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  Boddy,
  ButtonClose,
  ItemsLeft,
  ItemsRight,
  Container,
  Header,
  IconAlert,
  IconClose,
  Overlay,
  Span,
  Title,
  SubTitle,
  Text,
  Content,
  ButtonContainer
} from './styles';

interface EditFieldModalProps {
  name: string;
  phone: string;
  visible?: boolean;
  onClose?: () => void;
  email: string;
  car?: {
    brand: string;
    licensePlate: string;
    color: string;
    model: string;
  };
  lat?: string;
  log?: string;
  finished_lat?: string;
  finished_log?: string;
  buttonSOSPolicia?: () => void;
  buttonEncerra?: () => void;
  buttonFecha?: () => void;
}

export function AlerModal({
  name,
  phone,
  visible,
  email,
  buttonEncerra,
  buttonFecha,
  buttonSOSPolicia,
  car,
  finished_lat,
  finished_log,
  lat,
  log,
  onClose
}: EditFieldModalProps) {
  if(visible === false) return null;

  return (

      <Overlay>
        <Container>
          <Header>
            <ItemsLeft>
              <IconAlert name='alert-triangle' />
              <Span>
                {name} te enviou um SOS
              </Span>
            </ItemsLeft>
            <ItemsRight>
              <ButtonClose onPress={onClose}>
                <IconClose name='close' />
              </ButtonClose>
            </ItemsRight>
          </Header>
          <Boddy>
            <Content>
              <ItemsLeft>
                <Title>Dados do usuário:</Title>
              </ItemsLeft>
              <ItemsLeft>
                <SubTitle>Nome:</SubTitle>
                <Text>{name}</Text>
              </ItemsLeft>
              <ItemsLeft>
                <SubTitle>Número:</SubTitle>
                <Text>{phone}</Text>
              </ItemsLeft>
              <ItemsLeft>
                <SubTitle>Email:</SubTitle>
                <Text>{email}</Text>
              </ItemsLeft>
            </Content>
            <Content>
              <ItemsLeft>
                <Title>Dados do veículo:</Title>
              </ItemsLeft>
              {car ? (
                <>
                  <ItemsLeft>
                    <SubTitle>Marca:</SubTitle>
                    <Text>{car.brand}</Text>
                  </ItemsLeft>
                  <ItemsLeft>
                    <SubTitle>Modelo:</SubTitle>
                    <Text>{car.model}</Text>
                  </ItemsLeft>
                  <ItemsLeft>
                    <SubTitle>Cor:</SubTitle>
                    <Text>{car.color}</Text>
                  </ItemsLeft>
                  <ItemsLeft>
                    <SubTitle>Placa:</SubTitle>
                    <Text>{car.licensePlate}</Text>
                  </ItemsLeft>
                </>
              ) : (
                <ItemsLeft>
                  <Text>Dados do veículo não disponíveis</Text>
                </ItemsLeft>
              )}
            </Content>
            <Content>
              <ItemsLeft>
                <Title>Localização:</Title>
              </ItemsLeft>
              {lat && log ? (
                <MapView
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: parseFloat(lat),
                    longitude: parseFloat(log),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: parseFloat(lat),
                      longitude: parseFloat(log),
                    }}
                    title="Localização inicial"
                  />
                  {finished_lat && finished_log && (
                    <Marker
                      coordinate={{
                        latitude: parseFloat(finished_lat),
                        longitude: parseFloat(finished_log),
                      }}
                      title="Localização final"
                      pinColor="blue"
                    />
                  )}
                </MapView>
              ) : (
                <Text>Localização não disponível</Text>
              )}
            </Content>
          </Boddy>
          <ButtonContainer>
            <Button title="SOS Polícia" onPress={buttonSOSPolicia} />
            <Button title="Encerrar" onPress={buttonEncerra} />
          </ButtonContainer>
        </Container>
      </Overlay>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 200,
    width: '100%',
    marginVertical: 10,
  },
});
