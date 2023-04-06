import React from 'react'
import { Box,Image ,Text,  } from "@chakra-ui/react"
import img from "../assets/1.jpg"
import {motion} from "framer-motion"

const Home = () => {
  return (
    <Box w={"full"} bgColor={"black"}  h={"80vh"}  >
      <motion.div style={{
        height:"70vh"
      }}
      animate={{
        translateY:"20px"
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:'reverse'
      }}
      >
      <Image  w={"full"} h={"full"} objectFit={"contain"} src={img}  filter={"grayscale(1)"}  />
      </motion.div>
      <Text  
      pos={"absolute"}
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={'thin'}
        mt={"-10"}
        left={"50%"}
        transform={"translateX(-50%)"}
        color={"whiteAlpha.700"}
      >
          Xcrypto
      </Text>
    </Box>
  )
}

export default Home