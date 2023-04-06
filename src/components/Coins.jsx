import {
  Container,
  Image,
  Text,
  HStack,
  VStack,
  Button,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';

const Coins = () => {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [value, setValue] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setcurrency] = useState('inr');

  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';


    const changepage = page => {
      setPage(page);
      setLoader(true);
    };
    const btns = new Array(132).fill(1);
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setValue(data);
        setLoader(false);
      } catch (e) {
        setLoader(false);
        setError(true);
      }
    };

    getdata();
  }, [currency, page]);
  if (error) {
    return <ErrorComponent message={'Error While Fetching Coins'} />;
  }

  return (
    <Container maxW={'container.xl'}>
      {loader ? (
        <Loader />
      ) : (<>
      <RadioGroup value={currency}  onChange={setcurrency} p={"8"}  >
        <HStack spacing={"4"}>
          <Radio value={'inr'}>INR</Radio>
          <Radio value={'usd'}>USD</Radio>
          <Radio value={'eur'}>EUR</Radio>
        </HStack>
      </RadioGroup>
        <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
          {value.map((e, i) => {
            return (
              <CoinsCard
                key={i}
                name={e.name}
                img={e.image}
                id={e.id}
                price={e.current_price}
                symbol={e.symbol}
                currencySymbol={currencySymbol}
              />
            );
          })}
        </HStack>
        </>
      )}
      <HStack w={"full"}
        overflowX={"auto"}
        p={"8"}
      >
        {
          btns.map((e, i) => {
            return(
          <Button
            key={i}
            onClick={() => changepage(i + 1)}
            bgColor={'blackAlpha.900'}
            color={'white'}
            >
            {i + 1}
          </Button>)
        })}
      </HStack>
    </Container>
  );
};



const CoinsCard = ({ name, img, id, symbol, price, currencySymbol = '₹' }) => {
  return (
    <Link to={`/coins/${id}`}>
      <VStack 
        h={['22vh', '26vh']}
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
          {symbol}
        </Text>
        <Text size={'md'} noOfLines={'1'}>
          {name}
        </Text>
        <Text size={'md'} noOfLines={'1'}>
          {price ? `${currencySymbol}${price}` : 'NA'}
        </Text>
      </VStack>
    </Link>
  );
};

export default Coins;
