import React, { useContext } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
 
import Check from '@mui/icons-material/Check';
import DeleteForever from '@mui/icons-material/DeleteForever';

import { styled } from '@mui/material/styles';

import { CombatantContext } from '../../contextProviders/combatant';

const NewCombatantContainer = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  textAlign: 'center'
}));

const CharacterInputField = styled(TextField)(({theme}) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  textAlign: 'center'
}));

const InteractionButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  marginRight: theme.spacing(1)
}));

const NewCombatant = ({newCombatant}) => {

  const {
    editCombatant,
    commitCombatant,
    deleteCombatant
  } = useContext(CombatantContext);

  const keyPress = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') commitCombatant(newCombatant);
  }
  return (
    <Box component={NewCombatantContainer} onKeyPress={keyPress}>
      <Stack direction="row" justifyContent="space-between">
        <CharacterInputField
          id="newCombatant.name"
          label="Name"
          variant="standard"
          value={newCombatant.name}
          onChange={e => editCombatant({ ...newCombatant, name: e.target.value })}
          autoFocus
        />
        <CharacterInputField
          id="newCombatant.maxHitPoints"
          label="HP"
          variant="standard"
          type="number"
          value={newCombatant.maxHitPoints}
          onChange={e => editCombatant({ ...newCombatant, maxHitPoints: e.target.value, currentHitPoints: e.target.value })}
        />
        <CharacterInputField
          id="newCombatant.actionPoints"
          label="AP"
          variant="standard"
          type="number"
          value={newCombatant.maxActionPoints}
          onChange={e => editCombatant(
            { ...newCombatant, maxActionPoints: e.target.value, currentActionPoints: e.target.value }
          )}
        />
        <CharacterInputField
          id="newCombatant.initiativeRating"
          label="IR"
          variant="standard"
          type="number"
          value={newCombatant.initiativeRating}
          onChange={e => editCombatant({ ...newCombatant, initiativeRating: e.target.value })}
        />
        <CharacterInputField
          id="newCombatant.luckBonus"
          label="LB"
          variant="standard"
          type="number"
          value={newCombatant.luckBonus}
          onChange={e => editCombatant(
            { ...newCombatant, luckBonus: e.target.value, currentLuckPoints: e.target.value }
          )}
        />
        <InteractionButtonGroup>
          <Button onClick={() => deleteCombatant({ id: newCombatant.id })}><DeleteForever /></Button>
          <Button onClick={() => commitCombatant({ id: newCombatant.id })}><Check /></Button>
        </InteractionButtonGroup>
      </Stack>
    </Box>
  )
};

export default NewCombatant;