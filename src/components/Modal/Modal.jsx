import React, {useEffect, useState} from 'react';
import './Modal.css';
import {ic_close_twotone} from 'react-icons-kit/md/ic_close_twotone'
import Icon from 'react-icons-kit';
import {user} from 'react-icons-kit/fa/user';
import { getComments } from '../../services/actions';
import { mapTime } from '../../helper/utils';
import { getDomain } from '../../helper/index.js';
import '../News/News.css';

const CommentView = ({commentId}) => {  
    const [commentData,setCommentData]=useState(null);

    useEffect(() => {
        getComments(commentId).then(response => { 
            setCommentData(response?.data)
        });
    },[commentId])

    return (
       <>
       <div className='prose'>
        <article
          dangerouslySetInnerHTML={{
            __html: commentData?.text || '',
          }}
          />
          <div className='commentDetails'>
            <p>{mapTime(commentData?.time)} -</p>
            <p>
                <a href='#' className='commentUser'>&nbsp;{commentData?.by}</a>
            </p>
          </div>          
        </div>
       </>
    )
}
const Modal = ({record, open, onClose, commentId}) => {
    
    if(!open) return null

  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            <Icon icon={ic_close_twotone} size={40} style={{color: "#d2d6dc"}} />
          </p>
          <div className='content'>
            <p className='newsHeader'>{record?.title}</p>
            <p><a href={record?.url} className='newsUrl' target='_blank'>{getDomain(record?.url || '')}</a></p>
            <div className="newsDetails">
                <p className="newsTime">{mapTime(record?.time)} ago &middot;&nbsp;</p>
                <Icon className="user" icon={user} size={25}></Icon>
                <p className="newsAuthor">{record?.by}</p>
            </div>
          </div>
          {record.kids?.map(commentId => 
            <CommentView commentId={commentId}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal