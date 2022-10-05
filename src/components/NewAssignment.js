import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../constants.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class NewAssignment extends React.Component {
    // constructor(props) {
    //     super(props);
    // }


    handleSubmit = () => {
        const token = Cookies.get('XSRF-TOKEN');
        let regex = /^\d{4}-\d{2}-\d{2}$/
        const dateVal = document.getElementById("assignmentDueDate").value

        fetch(`${SERVER_URL}/assignment/new`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',
                       'X-XSRF-TOKEN': token }, 
            body: JSON.stringify({assignmentName: document.getElementById("assignmentName").value, 
            dueDate: document.getElementById("assignmentDueDate").value, courseId: document.getElementById("courseId").value})
        })
        .then(res => {
            if (res.ok && dateVal.match(regex)) {
                toast.success("Assignment Successfully Added", {
                position: toast.POSITION.BOTTOM_LEFT
                });
              } else {
                if(!dateVal.match(regex)) {
                    toast.error("Enter the correct date format", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                } 
                else {
                    toast.error("Assignment Could Not Be Added", {
                    position: toast.POSITION.BOTTOM_LEFT
                })};
                console.error('Put http status =' + res.status);
          }})
            .catch(err => {
              toast.error("Assignment Add failed", {
                position: toast.POSITION.BOTTOM_LEFT
              });
              console.error(err);
            });
    };

    render() {

        return (
            <div>
                <br/>

                <div class="row">
                    <div class="col">
                        <label for="assName">Enter Assignment Name:</label>
                        <input name="assName" id="assignmentName" type="text" class="form-control" placeholder="Assignment Name" aria-label="Assignment Name"/>
                    </div>
                        <div class="col">
                        <label for="dueDate">Enter Due Date (yyyy-mm-dd):</label>
                        <input name="dueDate" id="assignmentDueDate" type="input" class="form-control" placeholder="yyyy-mm-dd" aria-label="Assignment Due Date"/>
                    </div>
                        <div class="col">
                        <label for="dueDate">Enter Course Id</label>
                        <input name="course" id="courseId" type="text" class="form-control" placeholder="Course ID" aria-label="Course ID" required/>
                    </div>
                </div>

                <br/>

                <Button id="Submit" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleSubmit}> Add New Assignment </Button>
                <ToastContainer autoClose={1500} /> 
                
          </div>
        );
    
    };
}

export default NewAssignment;