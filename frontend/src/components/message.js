import React from 'react'

const Message = ({ message, setMessage }) => {
    const { text, color, time } = message;
    if (text) {
        const style = {
            color: color,
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        }
        if (time) {
            setTimeout(() => { setMessage({ text: '', color: 'gray', time: 0 }) }, time)
        }
        return (
            <div style={style}>
                {text}
            </div>
        )
    }
    return null;
}
export default Message;