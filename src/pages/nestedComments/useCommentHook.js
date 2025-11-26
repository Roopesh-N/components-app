import { useEffect, useRef, useState } from "react";

export const useCommentHook=(commentData, addNewComment, updateSelection)=>{
        var {id, comment, replies, isChecked} = commentData
        var [isExpanded, setIsExpanded] = useState(false)
        var [isReplying, setIsReplying] = useState(false);
        var [text, setText] = useState("")
        var inputRef = useRef(null);
        useEffect(()=>{
            if(isReplying && inputRef.current){
                inputRef.current.focus()
            }
        }, [isReplying])
        function handleKeyDown(e){
            let newComment = text.trim()
            if(e.key=="Enter" && newComment.length>0){
                e.preventDefault()
                addNewComment(id, newComment);
                setText("")
                setIsReplying(false);
                setIsExpanded(true);
            }
        }
        function handleCheckboxChange(){
            updateSelection(id)
        }
        return {
            handleKeyDown, 
            text,
            inputRef,
            setText,
            isChecked,
            handleCheckboxChange,
            isExpanded, setIsExpanded, isReplying, setIsReplying, comment, replies
        }
}