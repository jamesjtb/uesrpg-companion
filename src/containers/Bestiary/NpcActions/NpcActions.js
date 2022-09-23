import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Clear from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';

import { QuillInk } from '../../../components/rpg-awesome/inventory';

import { openChildWindow } from '../../../util/utils';

const NpcActions = ({ npc }) => {
    const deleteNpc = () => {
        window.bestiary.delete(npc._id);
    };

    const openNpcEditor = () => {
        openChildWindow(`/views/npceditor/${npc._id}`, {
            modal: true,
        });
    };

    const addNpcToEncounter = () => {
        
    };

    return (
        <>
            <Tooltip
                title={"Add to encounter"}
                enterNextDelay={200}
                leaveDelay={200}
                disableInteractive
            >
                <IconButton color="primary" size="small" onClick={addNpcToEncounter}>
                    <Add fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit" enterNextDelay={200} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={openNpcEditor}>
                    <QuillInk fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete" enterNextDelay={200} leaveDelay={200} disableInteractive>
                <IconButton color="primary" size="small" onClick={deleteNpc}>
                    <Clear fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default NpcActions;