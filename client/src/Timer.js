import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            startDate: new Date()
        }
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    };


    render() {
        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    monthsShown={1}
                    inline
                    title='Deadline'
                    placeholderText='Deadline'
                />
            </div>
        )
    }
}

export default Timer;