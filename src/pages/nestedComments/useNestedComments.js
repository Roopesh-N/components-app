import { useState } from "react";

export const useNestedComments=(initialData)=>{
        var [commentsData, setCommentsData] = useState(initialData);
        function addNewComment(parentId, cmt){
            let newComment = {
                id:Date.now(),
                comment:cmt,
                isChecked:false,
                replies:[]
            }
            setCommentsData((prev)=>updateComment(prev, parentId, newComment))
        }
    
        function updateComment(data, parentId, newComment){
            return data.map(({id, comment,isChecked,  replies})=>{
                if(parentId==id){
                    return {id, comment, isChecked, replies:[...replies, newComment]}
                }else{
                    return {id, comment, isChecked, replies:updateComment(replies, parentId, newComment)}
                }
            })
        }
        function updateSelection(id){
            setCommentsData((prev)=>helper(prev, id))
            function helper(data, cmntId){
                return data.map(({id, comment,isChecked,  replies})=>{
                    if(cmntId==id){
                        return {id, comment, isChecked:!isChecked, replies:ApplyToAll(replies, !isChecked)}
                    }else{
                        return {id, comment, isChecked, replies:helper(replies,cmntId)}
                    }
                })
            }
            function ApplyToAll(data, status){
                return data.map((item)=>({
                    ...item,
                    isChecked:status,
                    replies:ApplyToAll(item.replies || [], status)
                }))
            }
        }
    return {
        commentsData, addNewComment, updateComment, updateSelection
    }
}