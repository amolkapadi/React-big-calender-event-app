import React, { useState, useEffect } from 'react';
import './Sidebar.css'; // Import your CSS file for styling
import moment from 'moment';

const Sidebar = ({ show, onHide, onAddEvent, onEditEvent, onDeleteEvent, selectedEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || '');
      setDate(selectedEvent.start || '');
      setStartTime(selectedEvent.start ? moment(selectedEvent.start).format('HH:mm') : '');
      setEndTime(selectedEvent.end ? moment(selectedEvent.end).format('HH:mm') : '');
    } else {
      setTitle('');
      setDate('');
      setStartTime('');
      setEndTime('');
    }
  }, [selectedEvent]);

  const handleSubmit = () => {
    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        title,
        start: moment(date).set({ hour: startTime.split(':')[0], minute: startTime.split(':')[1] }).toDate(),
        end: moment(date).set({ hour: endTime.split(':')[0], minute: endTime.split(':')[1] }).toDate(),
      };
      onEditEvent(updatedEvent);
    } else {
      const newEvent = {
        id: Math.random(),
        title,
        start: moment(date).set({ hour: startTime.split(':')[0], minute: startTime.split(':')[1] }).toDate(),
        end: moment(date).set({ hour: endTime.split(':')[0], minute: endTime.split(':')[1] }).toDate(),
      };
      onAddEvent(newEvent);
    }
  };

  // Function to handle date change and disable past dates
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    
    // Only update date state if selected date is not in the past
    if (selectedDate >= today) {
      setDate(selectedDate);
    }
  };

  const handleDelete = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id);
    }
  };

  return (
    <div className={`sidebar ${show ? 'show' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3>{selectedEvent ? 'Edit Event' : 'Add Event'}</h3>
          <button className="close-btn" onClick={onHide}>Close</button>
        </div>
        <div className="sidebar-body">
          <label>Title</label>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Date</label>
          <input
            type="date"
            value={moment(date).format('YYYY-MM-DD')}
            onChange={handleDateChange}
          />
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>{selectedEvent ? 'Update' : 'Submit'}</button>
          {selectedEvent && <button className="btn btn-danger" onClick={handleDelete}>Delete</button>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
