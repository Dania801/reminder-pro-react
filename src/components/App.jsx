import React from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminder } from '../actions';
import PropTypes from 'prop-types';
import moment from 'moment'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    renderReminder() {
        const { reminder } = this.props;
        return (
            <ul className="list-group">
                {
                    reminder.map(reminder => {
                        console.log('reminder--> ', reminder)
                        return (
                            <li key={reminder.id} className="list-group-item">
                                    <div className="list-item">
                                        <div>{reminder.text}</div>
                                        <div className="dateTime">{moment(new Date(reminder.dueDate)).fromNow()}</div>
                                    </div>
                                    <div 
                                        className = "list-item delete-button"
                                        onClick = {() => this.deleteReminder(reminder.id) }>&#x2715;</div>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    render(){
        return (
            <div className="App">
                <div className="title">
                    Reminder Pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="I have to ..."
                            onChange={event => this.setState({text: event.target.value})} />
                        <input 
                            type="datetime-local"
                            className="form-control"
                            onChange={event => this.setState({ dueDate: event.target.value })} />
                    </div>
                    <button 
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.addReminder()}>
                        Add Reminder
                    </button>
                    <br/>
                    { this.renderReminder() }
                    <div className="btn btn-danger"
                        onClick={() => this.props.clearReminder()}>
                    Clear reminders </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reminder: state
    }
}

App.propTypes = {
    addReminder: PropTypes.func.isRequired,
    reminder: PropTypes.arrayOf({
        text: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired,
    clearReminder: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminder })(App);