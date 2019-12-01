import React, { useEffect } from 'react';
import Registration from './Registration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { setAuthenticated } from 'Redux/Action';
import { withRouter } from 'react-router';

const EnterLogin = props => {
  useEffect(() => {
    const isAuthenticated = props.state.isAuthenticated
    if (isAuthenticated) {
      props.history.push('/')
    }
  }, [props.history, props.state.isAuthenticated])

  return (
    <div className='login__enter'>
      <div className='login__enter--content'>
        <div className='login__enter--signup'>
          <h1 className='signup__header'>The wind blow</h1>
          <div className='signup__content'>
            <h2 className='signup__content--description'>
              Sign up to see photos and videos from your friends.
            </h2>
            <div className='signup__content--loginFB'>
              <button type='button' className='loginFB__submit'>
                <FontAwesomeIcon icon={faFacebookSquare} />
                <span> Log in with Facebook</span>
              </button>
            </div>
            <div className='signup__content--divide'>
              <div className='divide__line' />
              <div className='divide__text'>or</div>
              <div className='divide__line' />
            </div>
            <Registration />
          </div>
        </div>
        <div className='login__enter--login'>
          <p className='login__text'>
            Have a account?
            <button onClick={props.onLoginClick}>Log in</button>
          </p>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    state
  }
};
const mapDispactToProps = dispatch => {
  return {
    onLoginClick: e => {
      dispatch(setAuthenticated(true))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispactToProps
)(withRouter(EnterLogin))
