import React, { useEffect, useMemo, useState } from 'react'

var totalProducts = 190; //saw it from api
export const usePagination = () => {
     var [products, setProducts] = useState([]);
      var [pageSize, setPageSize] = useState(10);
      var [currentPage, setCurrentPage] = useState(0);
      var [cache, setCache] = useState({});
      useEffect(() => {
        fetchProducts();
      }, [currentPage]);
    
      useEffect(() => {
        setCurrentPage(0);
      }, [pageSize]);
    
      async function fetchProducts() {
        let key = `${pageSize}-${currentPage}`;
        if (cache[key]) {
          setProducts(cache[key]);
          return;
        }
        try {
          var response = await fetch(
            `https://dummyjson.com/products?limit=${pageSize}&skip=${
              currentPage * pageSize
            }`
          );
          var { products } = await response.json();
          setProducts(products);
          setCache((prev) => ({ ...prev, [key]: products }));
        } catch (err) {
          console.log(err);
        }
      }
      const totalPages = useMemo(() => {
        return Math.floor(totalProducts / pageSize);
      }, [pageSize]);
  return {
    products, pageSize, currentPage, setPageSize, totalPages, setCurrentPage
  }
}
