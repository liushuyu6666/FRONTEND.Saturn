import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Accordion, Button, Card} from "react-bootstrap";
import {resetServer} from "../Redux/server/actionCreator";
import {useHistory} from "react-router";
import {sadFaceUrl} from "../global";
import {deleteProfile} from "../Redux/user/actionCreator";

/********* auxiliary widgets pages **************/

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

const RouteCard = (props) => {
    return(
        <div className="route-card">
            <div className="route-card-content">
                <a href={props.link}>{props.sectionName}</a>
            </div>
        </div>
    )
}

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
                        <a href={props.content} target="_blank">{props.content}</a>
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

const LanguageCard = (props) => {

    return(
        <div className={"language-card-container"}>
            <div className="language-card-keyword">
                <label>{props.keywords}</label>
            </div>
            <div className="language-card-name">
                <label>{props.createBy}</label>
            </div>
            <div className="language-card-content">
                <label>{props.content}</label>
            </div>
        </div>
    )
}

/***** button *******/
const DropDownButton = (props) => {
    const button = useRef();
    const [isOpen, setIsOpen] = useState("");
    const [top, setTop] = useState("");
    const [left, setLeft] = useState("");
    const winWidth = window.innerWidth;

    const toggle = (event) => {
        event.preventDefault();
        const {offsetTop, offsetLeft, offsetHeight} = button.current;

        setTop((offsetHeight).toString() + "px");
        setLeft((0).toString() + "px");
        if(isOpen === "") setIsOpen("show");
        else setIsOpen("")
    }

    return(
        <div ref={button}
             className={"dropdown"}>
            <button id="dropdownMenuLink"
                    className="btn btn-secondary btn-sm dropdown-toggle"
                    onClick={toggle}>
                {props.name}
            </button>
            <div
                id={props.id}
                className={`dropdown-menu dropdown-menu-right ${isOpen}`}
                style={{position:"absolute",
                    top: top, left: left}} >
                <button
                    className="dropdown-item"
                    onClick={(event) => {
                    }}
                    value={props.label}
                    disabled
                >
                    {props.label}
                </button>
                {
                    props.items.map(item => (
                        <button
                            name={props.id}
                            className="dropdown-item"
                            style={{cursor:"pointer"}}
                            onClick={(event) => {
                                props.click(event);
                                toggle(event)
                            }}
                            value={item}>
                            {item}
                        </button>
                    ))
                }

            </div>
        </div>
    )
}

const CheckboxButton = (props) => {

    const activeClassName = props.option?"btn btn-primary active":"btn btn-primary";
    const label = props.option?"true":"false";
    const checked = props.option;

    return (
        <div className={"form-group"}>
            <label
                style={{color:"#00635a"}}>
                {props.label}
            </label>
            <div className="btn-group-toggle" data-toggle="buttons">
                <label
                    className={activeClassName}>
                    <input
                        name={props.name}
                        type="checkbox" checked={checked}
                        onClick={(event) => {
                            props.click(props.name); // don't input event
                        }}
                    />
                    {label}
                </label>
            </div>
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
    DropDownButton,
    CheckboxButton,
    LanguageCard,
    RouteCard,
};