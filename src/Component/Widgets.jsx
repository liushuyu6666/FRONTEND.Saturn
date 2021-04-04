import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Accordion, Button, Card} from "react-bootstrap";
import {resetServer} from "../Redux/server/actionCreator";
import {useHistory} from "react-router";
import {sadFaceUrl} from "../global";
import {deleteProfile} from "../Redux/user/actionCreator";

/********* auxiliary widgets **************/

const NoPermissionPage = (props) => {
    return(
        <div className={"d-flex justify-content-around"}>
            <div className={"d-flex flex-column align-items-center"}>
                <img
                    src={sadFaceUrl}
                    style={{width: 200, height: 200}}
                    alt="you can't access to this page"
                />
                <div className="alert alert-warning" role="alert">
                    {props.message}
                </div>
            </div>
        </div>
    )
}

const LoadingDataPage = (props) => {
    return(
        <div className={"d-flex justify-content-around"}>
            <div className={"d-flex flex-column align-items-center"}>
                <i className={"fa fa-refresh"}></i>
                <div className="alert alert-warning" role="alert">
                    {props.message}
                </div>
            </div>
        </div>
    )
}

const ErrorFromServer = (props) => {
    return(
        <p className={"text-center"} style={{color:props.color}}>
            {props.value}
        </p>
    )
}

/******* small widgets *************/

const Show = (props) => {

    return(
        <div className={"form-group"}>
            <label style={{color:"#00635a"}}>
                {props.show}
            </label>
            {
                (props.show !== "link")?(
                    <p>
                        {props.content}
                    </p>
                ):(
                    <p>
                        <a href={props.content}>{props.content}</a>
                    </p>
                )
            }
        </div>
    )
}

const FormGroup = (props) => {

    let className = "", promptClassname = "", type = props.type;

    if(props.isValid === false){
        className = "is-invalid";
        promptClassname = "invalid-feedback";
    }
    else if(props.isValid === true){
        className = "is-valid";
        promptClassname = "valid-feedback";
    }

    if(props.id === "password" || props.id === "confirm"){
        type = "password";
    }

    return(
        <div className={"form-group"}>
            <label htmlFor={props.id}
                   style={{color:"#00635a"}}>
                {props.show}
            </label>
            <input
                value={props.inputValue}
                className={`form-control ${className}`}
                type={type}
                id={props.id}
                name={props.id} // to pair label
                onChange={props.change}
            />
            <div className={promptClassname}>
                {props.errorMessage}
            </div>
        </div>
    )
}

const FormGroupText = (props) => {

    return(
        <div className={"form-group"}>
            <label htmlFor={props.id}
                   style={{color:"#00635a"}}>
                {props.show}
            </label>
            <br/>
            <textarea
                value={props.inputValue}
                id={props.id}
                name={props.id} // to pair label
                rows={15}
                cols={90}
                onChange={props.change}
            />
        </div>
    )
}

const SmallArrayTags = (props) => {
    return(
        <div>
            <label htmlFor={props.id} style={{color:"#00635a"}}>{props.show}</label>
            <div  className={"homepage-tags-container"}
                  style={{margin: "0 0 0 3px", fontSize:"15px"}}>
                {(props.arrayValues || ["no role"]).map((item, i) => (
                    <div
                        key={i}
                        style={{backgroundColor:"#00635a",
                            padding: "0 2px",
                            color:"white", textAlign: "center"}}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

const AlertText = (props) => {
    let colorName = (props.isValid) ? "green" : "red";
    return (
        <div>
            <p style={{color:colorName}}>{props.message}</p>
        </div>
    )
}


export {
    NoPermissionPage,
    LoadingDataPage,
    ErrorFromServer,
    Show,
    FormGroup,
    FormGroupText,
    SmallArrayTags,
    AlertText,
};