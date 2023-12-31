import React, { useState } from 'react'
import style from './PrivateChat.module.css'
import Messages from './Messages'
import Input from './Input'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFlagByCode } from '../../../utils/getFlagByCode'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';


const Chat = () => {
  const user = useSelector(state => state.users.userChat)
  const language = useSelector(state => state.users.language)
  const languageRead = useSelector(state => state.users.languageRead)
  const isVip = useSelector(state => state.users.isVip)
  const [languageChecked, setLanguageChecked] = useState(localStorage.getItem('languageChecked') === 'true' ? true : false);


  const handleChangeSwitch = () => {
    setLanguageChecked(!languageChecked);
    localStorage.setItem('languageChecked', !languageChecked);
  }

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 63,
    height: 30,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(2px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(32px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#042c54',
      border: '2px solid #3c70a3',
      borderRadius: '50%',
      width: 24,
      height: 24,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));


  return (
    <div className={style.chat}>
      <div className={style.chatInfoDiv}>
        <Link to={`/profile/${user.uid}`}>
          <span className={style.chatInfo}>{user.user}</span>
        </Link>
      </div>
      <div className={style.messagesDiv}>
      {!isVip && (
        <div className={style.switchDiv}>
          <div>{getFlagByCode(language)}</div>
          <MaterialUISwitch checked={languageChecked} onChange={handleChangeSwitch} className={style.switchClass} />
          <div>{getFlagByCode(languageRead)}</div>
        </div>
      )}
        <Messages languageChecked={languageChecked} setLanguageChecked={setLanguageChecked} handleChangeSwitch={handleChangeSwitch} />
      <div className={style.inputDiv}>
        <Input />
      </div>
      </div>
    </div>
  )
}

export default Chat