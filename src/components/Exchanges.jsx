import {
  Container,
  Image,
  Text,
  HStack,
  VStack,
  
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';




const Exchanges = () => {
  
  const [loader,setLoader]=useState(true);
  const [error,setError]=useState(false);
  const [value, setValue] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await axios.get(
          'https://api.coingecko.com/api/v3/exchanges'
        );
        setValue(data);
        setLoader(false);
      } catch (e) {
        setError(true);
      }
    };

    getdata();
  }, []);
  if(error){
    return <ErrorComponent message={"Error while fetching exchanges"}  />
  }

  return (
    <Container maxW={'container.xl'}>
      {
        loader?<Loader/>:

      <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
        {value.map((e, i) => {
          return (
            <ExchangeCard
              key={i}
              name={e.name}
              img={e.image}
              id={e.trust_score_rank}
              url={e.url}
            />
          );
        })}
      </HStack>
}
    </Container>
  );
};

const ExchangeCard = ({ name, img, id, url }) => {
  return (
    <a href={url} target={'blank'}>
      <VStack
        h={'22vh'}
        w={'52'}
        shadow={'lg'}
        p={'4'}
        borderRadius={'10px'}
        transition={'all 0.3s'}
        m={'4'}
        css={{
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        <Image src={img} h={'10'} w={'10'} />
        <Text size={'md'} noOfLines={'1'}>
          {id}
        </Text>
        <Text size={'md'} noOfLines={'1'}>
          {name}
        </Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
