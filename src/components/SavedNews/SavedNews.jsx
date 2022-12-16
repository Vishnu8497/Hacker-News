import React, { useState } from 'react';
import { mapTime } from '../../helper/utils';
import {Icon} from 'react-icons-kit';
import {ic_mode_comment_outline} from 'react-icons-kit/md/ic_mode_comment_outline';
import {arrowForward} from 'react-icons-kit/typicons/arrowForward'
import '../Navbar/Navbar.css';
import '../News/News.css';
import { getDomain } from '../../helper/index.js';
import Modal from '../Modal/Modal';

const SavedNews = ({ savedNews, setSavedNews }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
    {savedNews.map((record) => {
        return <div className="news"> 
        <div className="newsNo"><Icon icon={arrowForward} size={25} /></div>
        <div className="newsInfo">
            <span className="newsHeader">{record?.title}</span>
            <p><a href={record?.url} className='newsUrl' target='_blank'>{getDomain(record?.url || '')}</a></p>
            <div className="newsDetails">
                <p className="newsTime">{mapTime(record?.time)} ago - by</p>
                <p className="newsAuthor">{record?.by}</p>
            </div>
            <div className='commentsDetails' onClick={() => setOpenModal(true)}>
                <Icon className="commentsLogo" icon={ic_mode_comment_outline} size={30} />
                <span className="commentsNo">{record?.descendants} comments</span>
            </div>
        </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)} record={record}/>
    </div>
    })}
    </>
  );
};

export default SavedNews;