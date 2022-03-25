import React, { useRef } from 'react';
import './Support.css';
import emailjs from '@emailjs/browser';

export default function Support() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_3he2gyt', 'template_ctrcn3b', form.current, '7pBNhZJLJQJfY9Jcn')
      .then((result) => {
          console.log(result.text);
          e.target.reset()
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="absolute-height">
    <div className="blob-container">

      <svg className="blb1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#41d9a4" d="M24,-29C30.9,-22.7,36.2,-15,36.2,-7.5C36.2,0,30.8,7.3,28.9,22.4C27,37.4,28.6,60.2,22.2,63.6C15.8,67.1,1.4,51.3,-11.5,42C-24.4,32.8,-35.9,30.1,-42.8,22.5C-49.8,15,-52.3,2.7,-54.4,-13.7C-56.4,-30.2,-58.1,-50.6,-48.9,-56.5C-39.8,-62.3,-19.9,-53.4,-5.7,-46.7C8.5,-39.9,17,-35.2,24,-29Z" transform="translate(100 100)" />
      </svg>
      <svg className="blb2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#59f0bb" d="M49.8,-67.9C63.8,-58.3,74,-42.8,75.4,-27.1C76.9,-11.4,69.7,4.4,61.7,17.2C53.7,30,44.8,39.8,34.4,43.7C24,47.6,12,45.7,2.7,42C-6.6,38.3,-13.2,32.8,-23.1,28.7C-33,24.6,-46.2,21.9,-49.9,15.1C-53.5,8.3,-47.6,-2.6,-47.3,-19C-47,-35.4,-52.2,-57.2,-45.2,-69C-38.3,-80.9,-19.1,-82.8,-0.6,-82C17.9,-81.1,35.7,-77.5,49.8,-67.9Z" transform="translate(100 100)" />
      </svg>
      <svg className="blb3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#74cc72" d="M56.2,-49C64.7,-34,58.1,-11.1,51.6,9.6C45.1,30.3,38.8,48.9,23.8,60.3C8.7,71.8,-15,76.1,-27.3,66.4C-39.5,56.8,-40.3,33.1,-39.3,15.3C-38.3,-2.5,-35.6,-14.3,-28.7,-28.9C-21.9,-43.5,-10.9,-60.8,6.4,-66C23.8,-71.1,47.6,-64,56.2,-49Z" transform="translate(100 100)" />
      </svg>
      <svg className="blb4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#45c942" d="M49.8,-67.9C63.8,-58.3,74,-42.8,75.4,-27.1C76.9,-11.4,69.7,4.4,61.7,17.2C53.7,30,44.8,39.8,34.4,43.7C24,47.6,12,45.7,2.7,42C-6.6,38.3,-13.2,32.8,-23.1,28.7C-33,24.6,-46.2,21.9,-49.9,15.1C-53.5,8.3,-47.6,-2.6,-47.3,-19C-47,-35.4,-52.2,-57.2,-45.2,-69C-38.3,-80.9,-19.1,-82.8,-0.6,-82C17.9,-81.1,35.7,-77.5,49.8,-67.9Z" transform="translate(100 100)" />
      </svg>

    </div>
    <div className="glass-background"></div>
    <div className="glass-container" >
      <form className="glass-form" ref={form}>
      <h4 className="bug-header">Find a bug or have a feature request?</h4>
      <h6>Shoot our development team a message!</h6>

        <label className="profile-label">name*</label>
        <input className="settings-input" type="text" name="user_name" />
        <label className="profile-label">email*</label>
        <input className="settings-input"type="email" name="user_email" />
        <label className="profile-label" >message*</label>
        <textarea  className="settings-input bio" name="message" />
        <button className="support-send" onClick={sendEmail}>Send Support Message</button>
      </form>
    </div>
    </div>
  );
};
