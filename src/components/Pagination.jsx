import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.allData,
            currentPage: 1,
            dataPerPage: props.dataPerPage,
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
                <li className="page-item" key={i} id={i}>
                    <a
                        href="_"
                        className="page-link pagination-number-link"
                        id={i}
                        onClick={this.handleClick}
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return pageNumbers;
    }

    shouldComponentUpdate(nextProps) {
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

    handleClick(event) {
        event.preventDefault();
        const { dataPerPage, data } = this.state;
        const indexOfLast = event.target.id * dataPerPage;
        const indexOfFirst = indexOfLast - dataPerPage;

        const currentDataCalculated = data.slice(indexOfFirst, indexOfLast);
        this.setState({
            currentPage: Number(event.target.id),
            currentData: currentDataCalculated,
        });

        this.props.handleClick(currentDataCalculated);
    }

    render() {
        return (
            this.state.data &&
            this.state.data.length > this.state.dataPerPage && (
                <ul className="pagination justify-content-center">
                    {this.renderPageNumbers()}
                </ul>
            )
        );
    }
}

export default Pagination;
