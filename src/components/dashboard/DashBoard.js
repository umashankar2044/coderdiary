import React, { useState } from "react";
import { Col, Container,Row} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutIntiate } from "../../redux/actions/loginRegisterActions";
import { Calender } from "./Calender";
import { LeaderBoard } from "./LeaderBoard";
import { PerformanceChart } from "./PerformanceChart";
import { Heatmap } from '../heatmap/Heatmap.js';
import { TotalSubmission } from "./TotalSubmission";


export const DashBoard = () => {
  const dispatch = useDispatch();
  
  const handleLogout=()=>{
    // console.log("in handle logout");
    dispatch(logoutIntiate());
  }
  const styling={
    'background-color':'#e3f2fd'
  }
  return (
    <div align="center">
      <nav className="navbar navbar-light justify-content-between" style={styling}>
        <a className="navbar-brand">Coder's Diary</a>
          <button type="button" className="btn btn-outline-danger" onClick={()=>handleLogout()}>Logout</button>
      </nav>
      <br/>
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <div className="alert alert-success" role="alert">
              <b>Total number of questions submitted :<TotalSubmission/></b>
            </div>
          </Col>
        </Row>
          <Row>
              <Col xs={12} md={{ span: 4, offset:0}}><Calender/></Col>
              <Col xs={12} md={{ span: 8, offset: 0}}><LeaderBoard/></Col>
          </Row>
          <br/>
          <br/>
          <Row>
            <Col md={{span:12, offset:0}}>
                <PerformanceChart/>
            </Col>
          </Row>
          <br/>
          <br/>
          <Row>
            <Col md={12} xs={12}>
              <Heatmap/>
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              <hr/>
            </Col>
          </Row>
      </Container>
      
    </div>
  );

}
