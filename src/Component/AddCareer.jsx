import HeaderAndDrawer from "./HeaderAndDrawer";
import React, {Component} from "react";
import {FormGroupText, FormGroup, LoadingDataPage, NoPermissionPage} from "./Widgets";
import {resetServer} from "../Redux/server/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createCareer} from "../Services/career";


class AddCareer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                companyName: "", content: "", city: "", position: "",
                link: "", start: "", deadline: "",
            },
            errors: {
                img: {isValid: false, message: ""},
                submitError: {isValid: false, message: ""},
            }
        }
    }

    save = () => {
        console.log(this.state.formValue);
        const jwt = localStorage.getItem("Authorization");
        createCareer(jwt, this.state.formValue)
            .then(res => {
                if(res.result !== null){
                    window.alert("成功添加\nadd the career successfully");
                }
                else{
                    window.alert("添加失败\nOops, something wrong!");
                    console.log(res.msg);
                }
            })
            .catch(err => {
                window.alert("服务器出错\nerrors from server");
            })
    }

    buttonSeries = () => {
        let buttonArray = []
        buttonArray.push(
            <button
                key={"back"}
                className={"btn btn-primary btn-sm active"}
                onClick={() => {
                    this.props.resetServer();
                    this.props.history.push("/")}}>
                返回
            </button>
        )
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("careerWrite")){
            buttonArray.push(
                <button
                    key={"save"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {this.save()}}>
                    保存
                </button>
            )
        }
        return buttonArray;
    }

    mainContent = () => {
        return (
            <div className="login-register-container">
                <form className="login-register-content">
                    <FormGroup
                        key={"companyName"}
                        id={"companyName"}
                        inputValue={this.state.formValue["companyName"]}
                        show={"公司名称"}
                        type={"text"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    [event.target.id]: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroup
                        key={"city"}
                        id={"city"}
                        inputValue={this.state.formValue["city"]}
                        show={"城市"}
                        type={"text"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    [event.target.id]: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroup
                        key={"position"}
                        id={"position"}
                        inputValue={this.state.formValue["position"]}
                        show={"职位"}
                        type={"text"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    [event.target.id]: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroup
                        key={"start"}
                        id={"start"}
                        inputValue={this.state.formValue["start"]}
                        show={"开启日期"}
                        type={"date"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    [event.target.id]: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroup
                        key={"deadline"}
                        id={"deadline"}
                        inputValue={this.state.formValue["deadline"]}
                        show={"截止日期"}
                        type={"date"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    [event.target.id]: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroup
                        key={"link"}
                        id={"link"}
                        inputValue={this.state.formValue["link"]}
                        show={"链接"}
                        type={"text"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    [event.target.id]: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroupText
                        key={"content"}
                        id={"content"}
                        inputValue={this.state.formValue["content"]}
                        show={"职位需求或介绍"}
                        type={"textarea"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    [event.target.id]: event.target.value,
                                }
                            })
                        }}
                    />

                </form>
            </div>
        )
    }


    render() {
        return(
            <div>
                <HeaderAndDrawer
                    mainContent={this.mainContent()}
                    buttonSeries={this.buttonSeries()}/>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
}

const mapStateToProps = (state) => (
    {
        server: state.server,
        currentUser: state.user.profile
    }
)

const mapDispatchToProps = {
    resetServer,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(AddCareer));