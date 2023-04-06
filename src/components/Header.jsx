import React from 'react'
import { Link } from 'react-router-dom'
import {Box, HStack} from "@chakra-ui/react"

const Header = () => {
  return (

    <HStack w={"100%"} h={"10vh"} bgColor={"blackAlpha.900"} p={"10"} color={"white"} >
        <Box pr={"5"}>
        <Link to={"/"}  >Home</Link>
        </Box>
        <Box pr={"5"}>
        <Link to={"/exchanges"}  >Exhanges</Link>
        </Box>
        <Box pr={"5"}>
        <Link to={"/coins"}  >Coins</Link>
        </Box>
    
    
    
    </HStack>
   
  )
}

export default Header