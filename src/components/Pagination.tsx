import React from 'react';

interface PaginationProps {
  allData: any;
  dataPerPage?: number;
  handleClick: any;
}

interface PaginationState {
  data: any;
  currentPage: number;
  dataPerPage: number;
  pageNumbers: Array<number>;
  currentData: Array<any>;
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  constructor(props: PaginationProps) {
    super(props);
    this.state = {
      data: props.allData,
      currentPage: 1,
      dataPerPage: props.dataPerPage || 10,
      pageNumbers: [],
      currentData: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderPageNumbers = this.renderPageNumbers.bind(this);
  }

  renderPageNumbers() {
    const { data, dataPerPage } = this.state;

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
      pageNumbers.push(
        <li className='page-item' key={i} id={i.toString()}>
          <a
            href='_'
            className='page-link pagination-number-link'
            id={i.toString()}
            onClick={this.handleClick}>
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  }

  shouldComponentUpdate(nextProps: PaginationProps) {
    if (this.state.data.length !== nextProps.allData.length) {
      this.setState({ data: nextProps.allData });

      const { dataPerPage } = this.state;
      const indexOfLast = 1 * dataPerPage;
      const indexOfFirst = indexOfLast - dataPerPage;
      const currentDataCalculated = nextProps.allData.slice(
        indexOfFirst,
        indexOfLast
      );
      this.setState({
        currentPage: Number(1),
        currentData: currentDataCalculated,
      });
      this.props.handleClick(currentDataCalculated);

      return true;
    }
    return false;
  }

  handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const { dataPerPage, data } = this.state;
    const page = Number(event.currentTarget.id);
    const indexOfLast = Number(page) * dataPerPage;
    const indexOfFirst = indexOfLast - dataPerPage;

    const currentDataCalculated = data.slice(indexOfFirst, indexOfLast);
    this.setState({
      currentPage: Number(page),
      currentData: currentDataCalculated,
    });

    this.props.handleClick(currentDataCalculated);
  }

  render() {
    return (
      this.state.data &&
      this.state.data.length > this.state.dataPerPage && (
        <ul className='pagination justify-content-center'>
          {this.renderPageNumbers()}
        </ul>
      )
    );
  }
}

export default Pagination;
