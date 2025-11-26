import React from 'react'
import "./NestedComments.css"
import { useCommentHook } from './useCommentHook';
import {initialData} from "./commentsData"
import { useNestedComments } from './useNestedComments';
const NestedComments = () => {
    var {commentsData, addNewComment, updateSelection} = useNestedComments(initialData);

  return (
    <div className='page'>
        <div className='commentsComponent'>
            <CommentsSection data={commentsData} addNewComment={addNewComment} updateSelection={updateSelection}/>
        </div>
    </div>
  )
}

export default NestedComments


const CommentsSection = ({data, addNewComment, updateSelection}) => {
    if(!data.length) return;
    return (
        <ul className='comments-list'>
            {
                data.map((comment)=>{
                    return <Comment commentData={comment} key={comment.id} addNewComment={addNewComment} updateSelection={updateSelection}/>
                })
            }
        </ul>
    )
}

const Comment = ({commentData, addNewComment, updateSelection}) => {
    var { handleKeyDown, isExpanded, isChecked, setIsExpanded, isReplying, text, 
        inputRef, setText, setIsReplying, comment, replies, handleCheckboxChange } = useCommentHook(commentData, addNewComment, updateSelection);
    return (
        <div className='comment'>
            <div className='comment-detail'>
                <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/>
                <span onClick={()=>setIsExpanded(!isExpanded)} className='toggle'>{isExpanded ? "🔽" : "⏭️"}</span>
                <span>{comment}</span>
            </div>
            {isReplying ? 
                <textarea type='text' placeholder='Enter your reply' 
                    value={text} 
                    ref={inputRef} 
                    onChange={(e)=>setText(e.target.value)}
                    onBlur={(e)=>e.target.value.trim().length==0 && setIsReplying(false)}
                    onKeyDown={handleKeyDown}
                    /> 
                : <div className='reply' onClick={()=>setIsReplying(true)}>Reply</div>}
            
            {isExpanded && <CommentsSection data={replies || []} addNewComment={addNewComment} updateSelection={updateSelection}/>}
        </div>
    )
}