import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { useEffect } from 'react';
import { winners } from '../api';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const { signOut } = useAuth();
  const [winnersList, setWinnersList] = useState([]);
  useEffect(() => {
    winners()
      .then((response) => {
        setWinnersList(response.data.winners);
      })
      .catch(async (error) => {
        Alert.alert(error);
        await signOut();
      });
  }, [signOut]);

  return (
    <>
      {winnersList &&
        winnersList.map((winner, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{winner.country}</ListItem.Title>
              <ListItem.Subtitle>{winner.year}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      {!winnersList && <Text>Não existe nenhum time campeão</Text>}
    </>
  );
};

export default HomeScreen;
