import { HStack, Spinner, View } from 'native-base';
import React from 'react';


export default function CenterSpinner(){
    return(
        <HStack space={2} justifyContent='center'>
            <Spinner size='lg'/>
        </HStack>
    )
}