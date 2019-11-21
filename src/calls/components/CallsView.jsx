import React, { Component } from "react";

class CallsView extends Component {

   state = {
        products:
        [{id: 1, time: "12/11/2201", duration: 51, person: "Joca", type: "Potrebna pomoc", risk: "veliki", volonter: "Stojkovic"},
        {id: 2, time: "12/11/2051", duration: 33, person: "Ceca", type: "Potrebna pomoc", risk: "mali", volonter: "Marko"},
        {id: 3, time: "12/11/2011", duration: 35, person: "Naca", type: "Hitan slucaj", risk: "srednji", volonter: "Ljilja"},
        {id: 3, time: "12/11/2031", duration: 35, person: "Zaca", type: "Hitan slucaj", risk: "srednji", volonter: "Ljilja"},
        {id: 3, time: "12/11/2001", duration: 35, person: "Kaca", type: "Hitan slucaj", risk: "srednji", volonter: "Ljilja"},
        ]
   };
   renderTableData() {
          return this.state.products.map((product, index) => {
             const { id, time, duration, person, type, risk, volonter } = product //destructuring
             return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{time}</td>
                  <td>{duration}</td>
                  <td>{person}</td>
                  <td>{type}</td>
                  <td>{risk}</td>
                  <td>{volonter} </td>
                </tr>
             )
          })
       }
  
  render() {
    return (
      <div class="container-fluid col-lg-12">

        <div class="col-lg-2 d-inline-block button-group">
          <button type="button" class="btn btn-primary d-inline-block btn-sm">Add</button> 
          <button type="button" class="btn btn-danger d-inline-block btn-sm">Delete</button> 
          <button type="button" class="btn btn-success d-inline-block btn-sm">Details</button>
        </div>


        <div class="col-lg-6 d-inline-block callendarSpace">
      
          <span>Kalendar</span>
        </div>

        <div class="col-lg-12 placeHold tableFixHead">
        <table class="table tableCalls table-striped header-fixed">
        <thead>
            <tr>
              <th scope="col"> ID </th>
              <th scope="col">Vreme</th>
              <th scope="col">Trajanje</th>
              <th scope="col">Pozivar</th>
              <th scope="col">Vrsta poziva</th>
              <th scope="col">Suic. rizik</th>
              <th scope="col">Volonter</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
          </table>
        </div>
      </div>

    );
  }
}
export default CallsView;