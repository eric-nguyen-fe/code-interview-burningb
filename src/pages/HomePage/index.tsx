/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import Search from 'components/molecules/AppSearch';
import CartProduct from 'components/molecules/CardProduct';
import { PRODUCT_ENDPOINT } from 'enums/endpoint';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ProductItem } from 'shared/interfaces/product';

type GetProductType = 'search' | 'all-product'

const HomePage: React.FC = () => {

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangesSearch, setIsChangesSearch] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const lastProductRef = useRef(null);
  const hasScrollRef = useRef<boolean>(true);


  const [page, setPage] = useState<number>(0);
  const limit = 20;
  const [searchValue, setSearchValue] = useState<string>('');
  const searchValueDebounce = useDebounce(searchValue, 200);

  const fetchDataProducts = async (type: GetProductType,) => {
    try {
      const fetching = await axios.get(`https://dummyjson.com${searchValueDebounce
        ? PRODUCT_ENDPOINT.SEARCH_PRODUCT
        : PRODUCT_ENDPOINT.ALL_PRODUCT
        }?limit=${limit}&skip=${page * limit}${searchValueDebounce && `&q=${searchValueDebounce}`
        }`);

      if (fetching.data?.products?.length === 0) {
        hasScrollRef.current = false;
        setIsLoading(false);
        if (isChangesSearch) {
          setProducts(fetching.data?.products);
          setIsChangesSearch(false);
        }
      } else {
        if (isChangesSearch) {
          setProducts(fetching.data?.products);
          setIsChangesSearch(false);
          setPage((prev) => prev + 1);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...fetching.data?.products as ProductItem[]]);
          setPage((prev) => prev + 1);
        }
        setIsLoading(false);
        hasScrollRef.current = true;
      }
    } catch (error) {
      console.error('error', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchDataProducts('all-product');
  }, []);


  const handleObserver = (entries: any) => {
    if (entries[0].isIntersecting && hasScrollRef.current) {
      fetchDataProducts('all-product');
    }
  };

  const handleOnChangeSearch = (value: string) => {
    setSearchValue(value);
    setIsChangesSearch(true);
    setPage(0);
  };

  const handleSearch = () => {
    setIsChangesSearch(true);
    fetchDataProducts('search');
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    if (observer && lastProductRef.current) {
      observer.observe(lastProductRef.current);
    }

    return () => {
      if (lastProductRef.current) {
        observer.disconnect();
      }
    };
  }, [products]);

  const renderProduct = products.map((product, index) => {
    if (products.length === index + 1) {
      return (
        <div
          className="col col-6  col-xl-3 col-lg-4"
          key={product.id}
          ref={lastProductRef}
        >
          <CartProduct product={product} />
        </div>
      );
    } else {
      return (
        <div className="col col-6  col-xl-3 col-lg-4" key={product.id}>
          <CartProduct product={product} />
        </div>
      );
    }
  });

  return (
    <div className="p-home_page">
      <div className="p-home_page_wrapper">
        <div
          className="p-home_page_header"
          style={{ top: 0, zIndex: 1 }}
        >
          <Search
            value={searchValue}
            onChange={handleOnChangeSearch}
            handleClickSearch={handleSearch}
          />
        </div>
        <div className="p-home_page_products">
          {products.length > 0 ? (
            renderProduct
          ) : (
            <h3 className="text-center">No data</h3>
          )}
        </div>
        {isLoading && (
          <div className="col col-12 text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        )}

        {isError && !isLoading && (
          <div className="col col-12 text-center">Opps...</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
