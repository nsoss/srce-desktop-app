import React, { Component } from 'react';
import {
    startOfMonth,
    getDaysInMonth,
    getDay,
    format,
    addMonths,
    subMonths,
    addDays,
    setMonth,
    setDate,
    setYear,
    startOfWeek,
    lastDayOfWeek,
    lastDayOfMonth,
    endOfMonth,
    subYears
} from 'date-fns';

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Avg',
    'Sep',
    'Okt',
    'Nov',
    'Dec'
];

const numberOfPastYears = 20;

class Calendar extends Component {
    state = {
        selectedDate: new Date()
    };

    componentDidMount() {
        this.props.onDateSelect(this.state.selectedDate);
    }

    handleOnDateClickCurrentMonth = event => {
        const clickedDay = event.target.textContent;

        const { selectedDate } = this.state;

        const newSelectedDate = addDays(
            selectedDate,
            clickedDay - selectedDate.getDate()
        );
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    handleOnDateClickPreviousMonth = event => {
        const clickedDay = event.target.textContent;

        const { selectedDate } = this.state;

        const newSelectedDate = setDate(subMonths(selectedDate, 1), clickedDay);
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    handleOnDateClickNextMonth = event => {
        const clickedDay = event.target.textContent;

        const { selectedDate } = this.state;

        const newSelectedDate = setDate(addMonths(selectedDate, 1), clickedDay);
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    handleMonthForward = event => {
        const { selectedDate } = this.state;
        const newSelectedDate = addMonths(selectedDate, 1);
        this.setState({ selectedDate: newSelectedDate });
        this.props.onDateSelect(newSelectedDate);
    };

    handleMonthBackward = event => {
        const { selectedDate } = this.state;
        const newSelectedDate = subMonths(selectedDate, 1);
        this.setState({ selectedDate: newSelectedDate });
        this.props.onDateSelect(newSelectedDate);
    };

    handleChangeInputMonth = event => {
        const { selectedDate } = this.state;
        const newSelectedMonth = event.target.textContent;

        const newSelectedDate = setMonth(
            selectedDate,
            months.indexOf(newSelectedMonth)
        );
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    handleChangeInputYear = event => {
        const { selectedDate } = this.state;
        const newSelectedYear = event.target.textContent;

        const newSelectedDate = setYear(selectedDate, newSelectedYear);
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    render() {
        const { selectedDate } = this.state;
        const numberOfDays = getDaysInMonth(selectedDate);
        const startDay = getDay(startOfMonth(selectedDate));
        const endDay = getDay(endOfMonth(selectedDate));

        const startOfFirstWeek = startOfWeek(startOfMonth(selectedDate), {
            weekStartsOn: 1
        }).getDate();
        const numberOfDaysInPrevouosMonth = getDaysInMonth(
            subMonths(selectedDate, 1)
        );
        const startOfLastWeek = lastDayOfWeek(lastDayOfMonth(selectedDate), {
            weekStartsOn: 1
        }).getDate();

        let prevMonthDays = [];
        let days = [];
        let nextMonthDays = [];

        // Previous
        for (
            let i = startOfFirstWeek;
            i <= numberOfDaysInPrevouosMonth && startDay !== 1;
            i++
        ) {
            prevMonthDays.push(
                <td
                    key={i + 'p'}
                    onClick={this.handleOnDateClickPreviousMonth}
                    className="text-center text-secondary"
                >
                    {i}
                </td>
            );
        }
        // Actual
        const selectedDay = selectedDate.getDate();
        for (let i = 1; i <= numberOfDays; i++) {
            if (i === selectedDay) {
                days.push(
                    <td
                        key={i + 'd'}
                        onClick={this.handleOnDateClickCurrentMonth}
                        className="text-center btn-success"
                    >
                        {i}
                    </td>
                );
            } else {
                days.push(
                    <td
                        key={i + 'd'}
                        onClick={this.handleOnDateClickCurrentMonth}
                        className="text-center"
                    >
                        {i}
                    </td>
                );
            }
        }
        // Next
        for (let i = 1; i <= startOfLastWeek && endDay > 0; i++) {
            nextMonthDays.push(
                <td
                    key={i + 'n'}
                    onClick={this.handleOnDateClickNextMonth}
                    className="text-center text-secondary"
                >
                    {i}
                </td>
            );
        }

        const total = [...prevMonthDays, ...days, ...nextMonthDays];

        let rows = [];

        for (let i = 0; i < total.length; i += 7) {
            rows.push(total.slice(i, i + 7));
        }

        const daysInMonth = rows.map((d, i) => {
            return <tr key={d + i}>{d}</tr>;
        });

        let years = [];
        const currentYear = new Date();
        for (
            let y = currentYear;
            y >= subYears(currentYear, numberOfPastYears);
            y = subYears(y, 1)
        ) {
            years.push(y);
        }

        return (
            <table className="table-condensed table-bordered table-striped">
                <thead>
                    <tr>
                        <td className="text-center" colSpan="7">
                            {format(selectedDate, 'dd')}

                            <div className="btn-group">
                                <button
                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {format(selectedDate, 'MMM')}
                                </button>
                                <div className="dropdown-menu">
                                    {months.map((m, i) => {
                                        return (
                                            <button
                                                key={m + i}
                                                onClick={
                                                    this.handleChangeInputMonth
                                                }
                                                className="dropdown-item"
                                                type="button"
                                            >
                                                {m}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="btn-group">
                                <button
                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {format(selectedDate, 'yyyy')}
                                </button>
                                <div className="dropdown-menu">
                                    {years.map((y, i) => {
                                        return (
                                            <button
                                                key={y + i}
                                                onClick={
                                                    this.handleChangeInputYear
                                                }
                                                className="dropdown-item"
                                                type="button"
                                            >
                                                {y.getFullYear()}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="text-center"
                            colSpan="4"
                            onClick={this.handleMonthBackward}
                        >
                            -
                        </td>
                        <td
                            className="text-center"
                            colSpan="3"
                            onClick={this.handleMonthForward}
                        >
                            +
                        </td>
                    </tr>
                    <tr>
                        <th>PON</th>
                        <th>UTO</th>
                        <th>SRE</th>
                        <th>ČET</th>
                        <th>PET</th>
                        <th>SUB</th>
                        <th>NED</th>
                    </tr>
                </thead>
                <tbody>{daysInMonth}</tbody>
            </table>
        );
    }
}

export default Calendar;
