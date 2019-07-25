import React from 'react';
import './Form.scss';

const Form = ({ children, signup, onSubmit, id, isSubmitting }) => {
  return (
    <form id={id} onSubmit={onSubmit} className={`form ${isSubmitting && ''}`}>
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
