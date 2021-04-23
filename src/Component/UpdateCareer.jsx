import HeaderAndDrawer from "./HeaderAndDrawer";
import React, {Component} from "react";
import {FormGroupText, FormGroup, LoadingDataPage, NoPermissionPage, CheckboxButton} from "./Widgets";
import {resetServer} from "../Redux/server/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {updateCareer, retrieveCareer} from "../Services/career";
import {loadPage} from "../Support/supportFunctions";


class AddCareer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                companyName: "", content: "", city: "", position: "",
                link: "", start: "", deadline: "", active: null, applied: null,
            },
            errors: {
                img: {isValid: false, message: ""},
                submitError: {isValid: false, message: ""},
            }
        }
    }

    save = () => {
        const jwt = localStorage.getItem("Authorization");
        updateCareer(this.props.match.params.careerId, jwt, this.state.formValue)
            .then(res => {
                if(res.result !== null){
                    window.alert("成功更新\nupdate the career successfully");
                    this.props.resetServer();
                    this.props.history.push("/");
                }
                else{
                    window.alert("更新失败\nOops, something wrong!");
                    console.log(res.msg);
                }
            })
            .catch(err => {
                window.alert("服务器出错\nerrors from server");
            })
    }

    clickCheckbox = (name) => {
        if(this.state.formValue[name] !== true){
            this.setState({
                formValue:{
                    ...this.state.formValue,
                    [name]: true,
                }
            })
        }
        else{
            this.setState({
                formValue:{
                    ...this.state.formValue,
                    [name]: false,
                }
            })
        }
    }

    buttonSeries = () => {
        let buttonArray = []
        buttonArray.push(
            <button
                key={"back"}
                className={"btn btn-primary btn-sm active"}
                onClick={() => {
                    let confirm = window.confirm("你还未保存，要返回吗?\n your change yet saved, go back?");
                    if(confirm){
                        this.props.resetServer();
                        this.props.history.push("/");
                    }}}>
                返回
            </button>
        )
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("careerWrite")){
            buttonArray.push(
                <button
                    key={"save"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {
                        this.save();
                    }}>
                    更改
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
                    <CheckboxButton
                        name={"active"}
                        label={"active state"}
                        option={this.state.formValue["active"]}
                        click={this.clickCheckbox}
                    />
                    <CheckboxButton
                        name={"applied"}
                        label={"application state"}
                        option={this.state.formValue["applied"]}
                        click={this.clickCheckbox}
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
        if(prevProps.server.mainContent !== this.props.server.mainContent){
            let startDate = null, deadline = null;
            if(this.props.server.mainContent.start != null){
                startDate = this.props.server.mainContent.start.substring(0, 10);
            }
            if(this.props.server.mainContent.deadline != null){
                deadline = this.props.server.mainContent.deadline.substring(0, 10);
            }
            this.setState({
                formValue: {
                    companyName: this.props.server.mainContent.companyName,
                    content: this.props.server.mainContent.content,
                    city: this.props.server.mainContent.city,
                    position: this.props.server.mainContent.position,
                    link: this.props.server.mainContent.link,
                    start: startDate,
                    deadline: deadline,
                    active: this.props.server.mainContent.active,
                    applied: this.props.server.mainContent.applied,
                },
            });
        }
    }

    componentDidMount() {
        let jwt = localStorage.getItem("Authorization");
        let careerId = this.props.match.params.careerId;
        loadPage(retrieveCareer(careerId, jwt));
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