import HeaderAndDrawer from "../HeaderAndDrawer";
import React, {Component} from "react";
import {FormGroupText, FormGroup} from "../Widgets";
import {resetServer} from "../../Redux/server/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {languageListEndPoint} from "../../EndPoint/Language";
import {createLanguage} from "../../Services/language";


class AddLanguage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                keywords: "", content: "",
            },
        }
    }

    save = () => {
        // // console.log(this.state.formValue);
        const jwt = localStorage.getItem("Authorization");
        createLanguage(jwt, this.state.formValue)
            .then(res => {
                if(res.result !== null){
                    window.alert("成功添加\nadd the career successfully");
                    this.props.resetServer();
                    this.props.history.push(languageListEndPoint);
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
                    this.props.history.push(languageListEndPoint)}}>
                back
            </button>
        )
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("languageWrite")){
            buttonArray.push(
                <button
                    key={"save"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {this.save()}}>
                    save
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
                        key={"keywords"}
                        id={"keywords"}
                        inputValue={this.state.formValue["keywords"]}
                        show={"keywords"}
                        type={"text"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    keywords: event.target.value,
                                }
                            })
                        }}
                    />
                    <FormGroupText
                        key={"content"}
                        id={"content"}
                        inputValue={this.state.formValue["content"]}
                        show={"content"}
                        type={"textarea"}
                        change={(event) => {
                            this.setState({
                                formValue:{
                                    ...this.state.formValue,
                                    content: event.target.value,
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
)(withRouter(AddLanguage));