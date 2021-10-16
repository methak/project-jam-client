import React, {useState, useContext} from 'react'
import Context from '../../context';
import { useClient } from '../../client' 
import { CREATE_ITEM_MUTATION } from '../../graphql'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack, Chip } from '@mui/material';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';

function Items() {
    const { state, dispatch } = useContext(Context);
    const client = useClient();
    const [itemValue, setItemValue] = useState("");
    const [inputValue, setInputValue] = React.useState("");

    const store = state.currentStore
    // let catchItems = ""
    //Test seedind item data
    // const itemSeed = ["Mango","kiwi","Apple","Banana","Orange"]

    const handleClick = async (seed) => {

        const variables = { storeId: store._id, name: seed };
        const { createItem } = await client.request(
            CREATE_ITEM_MUTATION,
            variables
        );
        dispatch({ type: "MODIFY_ITEM", payload: createItem });
        
    };

    return (
        <div>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <h2>New Item Form</h2>
            <Autocomplete
                value={itemValue}
                onChange={(event, newValue) => {
                    setItemValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={itemsArray}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Items" />} 
            /> &nbsp;
            {itemValue && (
            <Stack direction="row" spacing={1}>
                <Chip label= "Add Item" variant="outlined" onClick={() => {handleClick(itemValue)}} />    
            </Stack>
            )}
            &nbsp;&nbsp;
            
                <Box sx={{ bt: 2 }}>

                    <Stack direction="row" spacing={1} sx={{ display: 'flex',flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          maxWidth: 500 , }}>
                        {itemsArray.map((item, index) => (
                            <Chip key={index} label={item} variant="outlined" onClick={() => { handleClick(item) }} />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </div>
        
    )
}
const itemsArray = ["Strawberry", "Blueberry", "Mango", "Raspberry",
"Oranges",
"Apples",
"Bananas",
"Lettuce",
"Tomatoes",
"Squash",
"Celery",
"Cucumber",
"Mushrooms",
"Milk" ,
"Cheese",
"Eggs",
"Cottage cheese",
"Sour cream",
"Yogurt",
"Beef",
"Poultry",
"Ham",
"Seafood",
"Lunch meat",
"Soda",
"Juice",
"Coffee",
"Tea",
"Water",
"Noodles",
"Rice",
"Canned",
"Dry mix",
"Bread",
"Bagels",
"Muffins",
"Cake",
"Potato chips",
"Pretzels",
"Ice cream",
"Cookies",
"Paper plates",
"Napkins",
"Garbage bags",
"Detergent",]


export default Items
