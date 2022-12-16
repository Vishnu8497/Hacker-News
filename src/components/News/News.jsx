import { useState, useEffect } from "react";
import './News.css';
import {Icon} from 'react-icons-kit';
import {ic_mode_comment_outline} from 'react-icons-kit/md/ic_mode_comment_outline';
import {user} from 'react-icons-kit/fa/user';
import {arrowForward} from 'react-icons-kit/typicons/arrowForward'
import { mapTime } from '../../helper/utils';
import Modal from "../Modal/Modal";
import { getComments } from "../../services/actions";
import { getDomain } from "../../helper/index.js";
import save from "../../assets/save.png";
import unsave from "../../assets/unsave.png";

const News = ({record, handleClick, story, newsInfo}) => {
  const [number, setNumber] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [active, setActive] = useState(true);

  const handleChangeActive = () => {
    setActive((previousStar) => {
      return !previousStar;
    });
  };

  const increment = () => {
    setNumber(number + 1);
  }

  useEffect(() => {
    comments.forEach(record => {
      getComments(record).then(response => {
        setComments(prevState => [...prevState, response?.data])
      })
    })
  })

  return (
    <>
    <div className="news"> 
        <div className="newsNo" onLoad={increment}><Icon icon={arrowForward} size={25} /></div>
        <div className="newsInfo">
            <span className="newsHeader">{record?.title}</span>
            <p><a href={record?.url} className='newsUrl' target='_blank'>{getDomain(record?.url || '')}</a></p>
            <div className="newsDetails">
                <p className="newsTime">{mapTime(record?.time)} ago &middot;&nbsp;</p>
                <Icon className="user" icon={user} size={25}></Icon>
                <p className="newsAuthor">{record?.by}</p>
            </div>
            <div className="commentsDetails" onClick={() => setOpenModal(true)}>
              <Icon className="commentsLogo" icon={ic_mode_comment_outline} size={30} />
              <span className="commentsNo">{record?.descendants} comments</span>
              <Modal open={openModal} onClose={() => setOpenModal(false)} record={record}/>
            </div>
            <div onClick={() => handleClick(record)} style={{position: "relative"}}>
              {active? (
                <img className="bookmark" src={save} alt="yellow star" onClick={() => handleChangeActive()} />
              ) : (
                <img className="bookmark" src={unsave} alt="black and white star" onClick={() => handleChangeActive()} />
             )}
             </div>
        </div>
    </div>
    </>
  );
}

export default News;
