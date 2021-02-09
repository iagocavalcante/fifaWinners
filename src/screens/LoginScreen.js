import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { requestLogin } from '../api';
import Loading from '../components/Loading';
import { useState } from 'react';

const LoginScreen = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await requestLogin(data);
      console.log(response.data);
      await signIn(response.data.Token);
    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  return loading ? (
    <Loading loadingText="Aguarde, estamos verificando seus dados!" />
  ) : (
    <View style={styles.formLogin}>
      <Input
        label={'Insira seu email'}
        placeholder="placeholder@teste.com"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        onChangeText={(text) => {
          setValue('email', text);
        }}
      />

      <Input
        label={'Insira sua senha'}
        placeholder="teste1234"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        secureTextEntry={true}
        onChangeText={(text) => {
          setValue('password', text);
        }}
      />

      <Button
        title="Entrar"
        type="outline"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={styles.buttonLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonLogin: {
    width: 150,
  },
});

export default LoginScreen;
