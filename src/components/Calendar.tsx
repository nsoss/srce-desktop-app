import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getDay,
  getDaysInMonth,
  lastDayOfMonth,
  lastDayOfWeek,
  setDate,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from 'date-fns';
import React, { Component } from 'react';
import Dropdown from './Dropdown';
import Icons from './Icons';

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
  'Dec',
];

const numberOfPastYears = 20;

class Calendar extends Component<any, any> {
  state = {
    selectedDate: new Date(),
    location: '/',
  } as any;

  componentDidMount() {
    this.props.onDateSelect(this.state.selectedDate);
  }

  handleOnDateClickCurrentMonth = (event: any) => {
    const clickedDay = event.target.textContent;

    const { selectedDate } = this.state;

    const newSelectedDate = addDays(
      selectedDate,
      clickedDay - selectedDate.getDate()
    );
    this.setState({
      selectedDate: newSelectedDate,
    });
    this.props.onDateSelect(newSelectedDate);
  };

  handleOnDateClickPreviousMonth = (event: any) => {
    const clickedDay = event.target.textContent;

    const { selectedDate } = this.state;

    const newSelectedDate = setDate(subMonths(selectedDate, 1), clickedDay);
    this.setState({
      selectedDate: newSelectedDate,
    });
    this.props.onDateSelect(newSelectedDate);
  };

  handleOnDateClickNextMonth = (event: any) => {
    const clickedDay = event.target.textContent;

    const { selectedDate } = this.state;

    const newSelectedDate = setDate(addMonths(selectedDate, 1), clickedDay);
    this.setState({
      selectedDate: newSelectedDate,
    });
    this.props.onDateSelect(newSelectedDate);
  };

  handleMonthForward = (event: any) => {
    const { selectedDate } = this.state;
    const newSelectedDate = addMonths(selectedDate, 1);
    this.setState({ selectedDate: newSelectedDate });
    this.props.onDateSelect(newSelectedDate);
  };

  handleMonthBackward = (event: any) => {
    const { selectedDate } = this.state;
    const newSelectedDate = subMonths(selectedDate, 1);
    this.setState({ selectedDate: newSelectedDate });
    this.props.onDateSelect(newSelectedDate);
  };

  handleChangeInputMonth: any = (data: any, event: any) => {
    const { selectedDate } = this.state;
    const newSelectedMonth = event;

    const newSelectedDate = setMonth(
      selectedDate,
      months.indexOf(newSelectedMonth)
    );
    this.setState({
      selectedDate: newSelectedDate,
    });
    this.props.onDateSelect(newSelectedDate);
  };

  handleChangeInputYear: any = (data: any, event: any) => {
    const { selectedDate } = this.state;
    const newSelectedYear = event;

    const newSelectedDate = setYear(selectedDate, newSelectedYear);
    this.setState({
      selectedDate: newSelectedDate,
    });
    this.props.onDateSelect(newSelectedDate);
  };

  render() {
    const { selectedDate } = this.state;
    const numberOfDays = getDaysInMonth(selectedDate);
    const startDay = getDay(startOfMonth(selectedDate));
    const endDay = getDay(endOfMonth(selectedDate));

    const startOfFirstWeek = startOfWeek(startOfMonth(selectedDate), {
      weekStartsOn: 1,
    }).getDate();
    const numberOfDaysInPrevouosMonth = getDaysInMonth(
      subMonths(selectedDate, 1)
    );
    const startOfLastWeek = lastDayOfWeek(lastDayOfMonth(selectedDate), {
      weekStartsOn: 1,
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
          className='text-center text-secondary'>
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
            className='text-center selected-date'>
            {i}
          </td>
        );
      } else {
        days.push(
          <td
            key={i + 'd'}
            onClick={this.handleOnDateClickCurrentMonth}
            className='text-center'>
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
          className='text-center text-secondary'>
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
      return (
        <tr key={i} style={{ width: '50px' }}>
          {d}
        </tr>
      );
    });

    let years = [];
    const currentYear = new Date();
    for (
      let y = currentYear;
      y >= subYears(currentYear, numberOfPastYears);
      y = subYears(y, 1)
    ) {
      years.push(y.getFullYear());
    }
    return (
      <>
        <div className='calendar-srce'>
          <table className=''>
            <thead>
              <tr>
                <td onClick={this.handleMonthBackward} className='text-center'>
                  <Icons.Back />
                </td>
                <td className='text-center justify-content-center' colSpan={5}>
                  <form>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <Dropdown
                        items={months}
                        itemToLabel={(month) => month}
                        onSelect={this.handleChangeInputMonth}
                        value={format(this.state.selectedDate, 'MMM')}
                      />
                      <Dropdown
                        items={years}
                        itemToLabel={(year) => year.toString()}
                        onSelect={this.handleChangeInputYear}
                        value={this.state.selectedDate.getFullYear()}
                      />
                    </div>
                  </form>
                </td>
                <td onClick={this.handleMonthForward} className='text-center'>
                  <Icons.Forward />
                </td>
              </tr>
              <tr className='text-center'>
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
        </div>
      </>
    );
  }
}

export default Calendar;
