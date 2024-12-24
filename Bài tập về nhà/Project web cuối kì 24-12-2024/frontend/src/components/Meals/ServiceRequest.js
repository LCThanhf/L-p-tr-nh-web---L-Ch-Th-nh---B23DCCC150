import { useState } from 'react';
import Modal from '../UI/Modal';
import classes from './ServiceRequest.module.css';

const ServiceRequest = ({ onClose }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [request, setRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!request.trim() || !tableNumber.trim()) {
      return;
    }

    setIsSubmitting(true);
    await fetch('http://localhost:5000/api/requests', {
      method: 'POST',
      body: JSON.stringify({
        tableNumber: tableNumber,
        notes: request,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const tableNumberChangeHandler = (event) => {
    setTableNumber(event.target.value);
  };

  const requestChangeHandler = (event) => {
    setRequest(event.target.value);
  };

  const modalContent = (
    <form className={classes.form} onSubmit={submitHandler}>
      <h2 className={classes.h2}>Ask for service</h2>
      <p className={classes.p}>How can we help?</p>
      <input
        type="text"
        className={classes.input}
        value={tableNumber}
        onChange={tableNumberChangeHandler}
        placeholder="Enter your table number"
        required
      />
      <textarea
        className={classes.textarea}
        value={request}
        onChange={requestChangeHandler}
        required
      />
      <div className={classes.actions}>
        <button type="button" className={classes['button--alt']} onClick={onClose}>
          Close
        </button>
        <button className={classes.button} type="submit">
          Send request
        </button>
      </div>
    </form>
  );

  const submittingContent = <p>Sending request...</p>;
  const submittedContent = (
    <div>
      <p>Successfully sent your request <i className="fas fa-check" style={{ color: 'green' }}></i> </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <Modal onClose={onClose}>
      {!isSubmitting && !submitted && modalContent}
      {isSubmitting && submittingContent}
      {!isSubmitting && submitted && submittedContent}
    </Modal>
  );
};

export default ServiceRequest;