import { useCallback, useEffect, useRef, useState } from "react";

var delay = 300;
export const useAutoComplete = ()=>{
  var [searchText, setSearchText] = useState("")
  var [suggestions, setSuggestions] = useState([]);
  var timerRef = useRef(null);
  var [isLoading, setIsLoading] = useState(false);
  var controllerRef = useRef(null);
  var debouncedRef = useRef(null);
  var [cache, setCache] = useState({})

    const debounce = useCallback((fn, delay)=>{
        return function(...args){
            let context=this
            if(timerRef.current){
                clearTimeout(timerRef.current)
            }
            timerRef.current=setTimeout(()=>{
                fn.call(context, ...args)
            },delay)
        }
    }, [])

    const fetchSuggestions = useCallback(async (query)=>{
        if(cache[query]){
            setSuggestions(cache[query]);
            return;
        }
        try{
            if(controllerRef.current) controllerRef.current.abort()
            var controller = new AbortController()
            controllerRef.current=controller;
            setIsLoading(true)
            var response = await fetch(`https://api.datamuse.com/sug?s=${query}`, {signal:controller.signal})
            if(!response.ok){
                throw new Error("API Failure")
            }
            var data = await response.json()
            setSuggestions(data);
            setCache((prev)=>({...prev, [query]:data}))
        }catch(err){
            console.error(err)
        }
        finally{
            setIsLoading(false)
        }
    }, [cache])

    useEffect(()=>{
        debouncedRef.current = debounce(fetchSuggestions, delay)
    }, [debounce, fetchSuggestions])


    useEffect(()=>{
        let query = searchText.trim()
        if(query.length==0) {
          setSuggestions([]);
          return;
        };
        if(debouncedRef.current) debouncedRef.current(query)
    },[searchText])

    // for cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if(controllerRef.current) controllerRef.current.abort();
        }
    }, []);

    return {searchText, setSearchText, suggestions, isLoading}
}