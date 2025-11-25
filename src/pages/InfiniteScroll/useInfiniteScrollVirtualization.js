import { useEffect, useRef, useState } from "react";

export const useInfiniteScrollVirtualization = (itemHeight, bufferSize)=>{
        var [items, setItems] = useState([]);
        var [isLoading, setIsLoading] = useState(false)
        var containerRef = useRef(null)
        var [visiblePoints, setVisiblePoints] = useState([0,0]);
        var loaderRef = useRef(null);
        useEffect(()=>{
            fetchItems()
        },[])
    
        function fetchItems(){
            if(isLoading){
                return;
            }
            setIsLoading(true)
            setTimeout(() => {
            setItems((prev) => {
                let prevLength = prev.length;
                let newItems = Array.from(
                { length: 10 },
                (_, index) => `item ${index + 1 + prevLength}`
                );
                return [...prev, ...newItems];
            });
            setIsLoading(false);
            }, 300);
        }   
        
        function updateVisiblePoints(){
            if (!containerRef.current) return; 
            let start = Math.max(0, Math.floor(containerRef.current.scrollTop / itemHeight)-bufferSize)
            let endIndex = Math.min(items.length, start + Math.ceil(containerRef.current.clientHeight/itemHeight) + bufferSize)
            setVisiblePoints([start, endIndex])
        }
        useEffect(()=>{
            updateVisiblePoints()
        },[items])

        function handleScroll(){
            updateVisiblePoints()
        }
    
        useEffect(()=>{
            if(!loaderRef.current || !containerRef.current) return;
            let observer = new IntersectionObserver((entries)=>{
                if(entries[0].isIntersecting){
                    fetchItems()
                }
            }, {
                threshold:1,
                root:containerRef.current
            })
            observer.observe(loaderRef.current)
            return ()=>observer.disconnect()
        },[loaderRef.current, containerRef.current]);

    return {
        items, visiblePoints, containerRef, isLoading, loaderRef, handleScroll
    }
}