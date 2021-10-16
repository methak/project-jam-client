import React, {useState, useContext} from 'react'
import Context from '../../context';
import { useClient } from '../../client' 
import { CREATE_ITEM_MUTATION } from '../../graphql'

import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import { Stack, Chip } from '@mui/material';
import { Box } from '@mui/system';

function Items() {
    const { state, dispatch } = useContext(Context);
    const client = useClient();
    const [itemValue, setItemValue] = useState(null);

    const store = state.currentStore
    const filter = createFilterOptions();

   
    const handleClick = async (item) => {
        const variables = { storeId: store._id, name: item };
        const { createItem } = await client.request(
            CREATE_ITEM_MUTATION,
            variables
        );
        dispatch({ type: "MODIFY_ITEM", payload: createItem });
    }

    return (
        <div>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <h2>Shopping Items</h2>
                <Autocomplete
                    value={itemValue}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setItemValue(
                                newValue
                            );
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setItemValue(
                                newValue.inputValue
                            );
                        } else {
                            setItemValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option);
                        if (inputValue !== '' && !isExisting) {
                            filtered.push(
                                inputValue,
                                // `Add "${inputValue}"`
                            );
                        }
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={itemsArray}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        // Regular option
                        return option.title;
                    }}
                    renderOption={(props, option) => <li {...props}>{option}</li>}
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Items" />
                    )}
                />
            
            &nbsp;
            {itemValue && (
            <Stack direction="row" spacing={1}>
                <Chip label= "Add Item" variant="outlined" onClick={() => {handleClick(itemValue)}} />    
            </Stack>
            )}
            &nbsp;&nbsp;
                <Box sx={{ bt: 2 }}>
                    <Stack direction="row" spacing={1} 
                        sx={{ display: 'flex',flexWrap: 'wrap',
                            p: 1, m: 1, bgcolor: 'background.paper', maxWidth: 500 , }}>
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
"Oranges","Apples","Bananas","Lettuce","Tomatoes","Squash","Celery","Cucumber","Mushrooms",
"Milk" ,"Cheese","Eggs","Cottage cheese","Sour cream","Yogurt","Beef","Poultry",
"Ham","Seafood","Lunch meat","Soda","Juice","Coffee","Tea","Water","Noodles","Rice","Canned",
"Dry mix","Bread","Bagels","Muffins","Cake","Potato chips","Pretzels","Ice cream","Cookies",
"Paper plates","Napkins","Garbage bags","Detergent",]

export default Items
