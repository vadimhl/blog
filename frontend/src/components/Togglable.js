import React, { useState, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'

const Togglable =  React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideThenVisible = { display: visible ? 'none' : '' }
  const showThenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => { setVisible(!visible) }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  return (
    <div>
      <div style={hideThenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showThenVisible}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  )

})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable