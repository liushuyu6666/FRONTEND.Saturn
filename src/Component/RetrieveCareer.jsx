import HeaderAndDrawer from "./HeaderAndDrawer";
import React, {Component} from "react";
import {Show, LoadingDataPage, NoPermissionPage} from "./Widgets";
import {resetServer} from "../Redux/server/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createCareer, retrieveCareer} from "../Services/career";
import {loadPage} from "../Support/supportFunctions";


class RetrieveCareer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                companyName: "", content: "", city: "", position: "", link: ""
            },
            errors: {
                img: {isValid: false, message: ""},
                submitError: {isValid: false, message: ""},
            }
        }
    }

    buttonSeries = () => {
        let buttonArray = []
        buttonArray.push(
            <button
                key={"back"}
                className={"btn btn-primary btn-sm active"}
                onClick={() => {
                    this.props.resetServer();
                    this.props.history.push("/");
                }}>
                返回
            </button>
        )
        return buttonArray;
    }

    mainContent = () => {
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("careerRead")){
            return (
                <div className="login-register-container">
                    <form className="login-register-content">
                        {
                            ["id", "companyName", "start", "deadline", "city", "position",
                                "content", "link", "createBy", "lastModify", "createAt", "modifiedAt",
                                "active", "applied"].map(item => (
                                <Show
                                    show={item}
                                    content={this.props.server.mainContent[item]}
                                />
                            ))
                        }

                    </form>
                </div>
            )
        }
        else{
            return(
                <NoPermissionPage
                    message={"you have no permission to check the detail" +
                    "\n你无法查看详情"}/>
            )
        }


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

    componentDidMount() {
        let jwt = localStorage.getItem("Authorization");
        let careerId = this.props.match.params.careerId;
        loadPage(retrieveCareer(careerId, jwt));
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
)(withRouter(RetrieveCareer));