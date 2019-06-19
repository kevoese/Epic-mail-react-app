import React from 'react';
import './Form';

const Form = ({ children, signup }) => {
  return (
    <form className="form">
      <div className="formcenter">
        <h2>{signup ? 'Sign up' : 'Sign In'}</h2>
        {/* <div className="mobilebtn">
          <p>{signup ? 'Already a member?' : "Don't have an account?"}</p>
          <span className="mobilelog">{signup ? 'Login here' : 'Register here'}</span>
        </div> */}
        {children}
      </div>
    </form>
  );
};

export default Form;
