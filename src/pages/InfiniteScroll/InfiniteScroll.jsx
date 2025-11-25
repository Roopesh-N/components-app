import "./InfiniteScroll.css"
import { useInfiniteScrollVirtualization } from './useInfiniteScrollVirtualization'

var itemHeight=50
var bufferSize = 3
const InfiniteScroll = () => {

    let {items, containerRef,loaderRef, visiblePoints, handleScroll} = useInfiniteScrollVirtualization(itemHeight, bufferSize);
    if(items.length==0){
        return <div>Loading</div>
    }
  return (
    <div className='page'>
        <h3>Infinite Scroll</h3>
        <div className='infiniteScroll-holder' ref={containerRef} onScroll={handleScroll}>
            <div className='temp' style={{height:`${items.length*itemHeight}px`}}></div>
            {
                items.slice(visiblePoints[0], visiblePoints[1]).map((item, index)=>{
                    return <div key={index} style={{top:`${(visiblePoints[0]+index)*itemHeight}px`}} className='item'>{item}</div>
                })
            }
            <div className="item" style={{top:`${(items.length)*itemHeight}px`}} ref={loaderRef}>Loading...</div>
        </div>
    </div>
  )
}

export default InfiniteScroll