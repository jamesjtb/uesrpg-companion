import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import DraggableViewBase from '../../components/DraggableViewBase/DraggableViewBase';
import StatTable from './StatTable/StatTable';
import NpcRuleList from './NpcRuleList/NpcRuleList';

const NpcEditor = () => {
    const { npcId, parentId } = useParams();

    const [name, setName] = useState('');
    const [flavorText, setFlavorText] = useState('');
    const [race, setRace] = useState('');
    const [type, setType] = useState('');
    const [threatRating, setThreatRating] = useState('');
    const [soulEnergy, setSoulEnergy] = useState('');
    const [stats, setStats] = useState({
        strength: 0,
        endurance: 0,
        agility: 0,
        intelligence: 0,
        willpower: 0,
        perception: 0,
        personality: 0,
        luck: 0,
        hitPoints: 0,
        woundThreshold: 0,
        magicka: 0,
        stamina: 0,
        initiative: 0,
        actionPoints: 0,
        speed: 0,
        size: 'Standard',
        combat: 0,
        magic: 0,
        evade: 0,
        observe: 0,
        stealth: 0,
        knowledge: 0,
        social: 0,
        physical: 0,
    });
    const [equipment, setEquipment] = useState([]);
    const [specialAbilities, setSpecialAbilities] = useState([]);
    const [traits, setTraits] = useState([]);
    const [spells, setSpells] = useState([]);
    const [unconventionalSkills, setUnconventionalSkills] = useState([]);
    // const [specialHitCharts, setSpecialHitCharts] = useState([]);
    const [encounteringText, setEncounteringText] = useState('');
    const [loot, setLoot] = useState([]);
    const [customNotes, setCustomNotes] = useState([]);

    const [isVariant, setIsVariant] = useState(null);
    const [parentIdState, setParentIdState] = useState(parentId);

    const onSave = async () => {
        const npc = {
            name,
            flavorText,
            race,
            type,
            threatRating,
            soulEnergy,
            stats,
            equipment,
            specialAbilities,
            traits,
            spells,
            unconventionalSkills,
            encounteringText,
            loot,
            customNotes,
            isVariant: isVariant || false,
            parentId: parentIdState,
        };
        if (npcId) npc._id = npcId;
        try {
            await window.bestiary.write(npc);
        } catch (e) {
            console.error(e);
        }
        window.close();
    };

    useEffect(() => {
        (async () => {
            if (npcId || parentId) {
                const npc = await window.bestiary.getOne(npcId || parentId);

                setName(parentId ? `${npc.name} (variant)` : npc.name);
                setFlavorText(npc.flavorText);
                setRace(npc.race);
                setType(npc.type);
                setThreatRating(npc.threatRating);
                setSoulEnergy(npc.soulEnergy);
                setStats({ ...npc.stats });
                setEquipment([...npc.equipment]);
                setSpecialAbilities([...npc.specialAbilities]);
                setTraits([...npc.traits]);
                setSpells([...npc.spells]);
                setUnconventionalSkills([...npc.unconventionalSkills]);
                setEncounteringText(npc.encounteringText);
                setLoot([...npc.loot]);
                setCustomNotes([...npc.customNotes]);

                setIsVariant(parentId || npc.parentId ? true : false);
                setParentIdState(parentId || npc.parentId);
            }
        })();
    }, [npcId, parentId]);

    return (
        <DraggableViewBase title={`NPC Editor ${npcId ? `(${name})` : parentId ? ('(New Variant)') : '(New)'}`}>
            <Box sx={{ ml: 5, mr: 5, mt: 3, mb: 3 }}>
                <Grid container sx={{ mb: 1 }} rowSpacing={1} columnSpacing={2}>
                    <Grid xs={6}>
                        <TextField
                            variant="standard"
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={6} />
                    <Grid xs={12}>
                        <TextField
                            label="Flavor Text"
                            multiline
                            variant="standard"
                            fullWidth
                            maxRows={100}
                            value={flavorText}
                            onChange={e => setFlavorText(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="standard"
                            label="Race / Subtype"
                            fullWidth
                            value={race}
                            onChange={e => setRace(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="standard"
                            label="Type"
                            fullWidth
                            value={type}
                            onChange={e => setType(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="standard"
                            label="Threat Rating"
                            fullWidth
                            value={threatRating}
                            onChange={e => setThreatRating(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="standard"
                            label="Soul Energy / Type"
                            fullWidth
                            value={soulEnergy}
                            onChange={e => setSoulEnergy(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <StatTable stats={stats} setStats={setStats} />
                <Divider sx={{ mt: 3, mb: 1 }}>Rules Fields</Divider>
                <Stack>
                    <NpcRuleList
                        type="standard"
                        name="Weapons and Armor"
                        rules={equipment}
                        setRules={setEquipment}
                    />
                    <NpcRuleList
                        type="standard"
                        name="Special Abilities"
                        rules={specialAbilities}
                        setRules={setSpecialAbilities}
                    />
                    <NpcRuleList
                        type="standard"
                        name="Traits"
                        rules={traits}
                        setRules={setTraits}
                    />
                    <NpcRuleList
                        type="single"
                        name="Spells"
                        rules={spells}
                        setRules={setSpells}
                    />
                    <NpcRuleList
                        type="skill"
                        name="Unconventional Skills"
                        rules={unconventionalSkills}
                        setRules={setUnconventionalSkills}
                    />
                    {/* <Box>
                        <Typography variant="h5" color="primary" textAlign="center">
                            Special Hit Charts
                            <IconButton onClick={addSpecialHitChart}>
                                <Add fontSize="inherit" />
                            </IconButton>
                        </Typography>
                    </Box> */}
                    <Divider sx={{ mt: 1, mb: 1 }}>Descriptive Fields</Divider>
                    <Box textAlign="center">
                        <Typography variant="h5" color="primary" textAlign="center">
                            Encountering This NPC
                        </Typography>
                        <TextField
                            sx={{ width: '80%' }}
                            placeholder="What to expect in combat against this NPC"
                            multiline              
                            maxRows={100}
                            variant="standard"
                            value={encounteringText}
                            onChange={e => setEncounteringText(e.target.value)}
                        />
                    </Box>
                    <NpcRuleList type="single" name="Loot" rules={loot} setRules={setLoot} />
                    <NpcRuleList
                        type="single"
                        name="Custom Notes"
                        rules={customNotes}
                        setRules={setCustomNotes}
                    />
                </Stack>
            </Box>
            <Divider />
            <Grid container alignItems="right" justifyContent="right">
                <Grid sx={{ margin: 3 }}>
                    <Button sx={{ mr: 2 }} variant="outlined" onClick={() => window.close()}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={onSave}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </DraggableViewBase>
    );
};

export default NpcEditor;
