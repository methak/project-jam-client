import React from 'react'

import { Box } from '@mui/system'
import CreateStore from './CreateStore'
import StoreList from './StoreList'

function StoreIndex() {
    return (
        <Box sx={{ bgcolor: '#faf0e7', height: 800 }}>
            <CreateStore />
            <StoreList />
        </Box>
    )
}

export default StoreIndex
