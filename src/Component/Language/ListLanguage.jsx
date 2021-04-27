import React, {Component} from "react/";
import {loadPage} from "../../Support/supportFunctions";
import {listLanguage} from "../../Services/language";
import {resetServer} from "../../Redux/server/actionCreator";
import {deleteProfile} from "../../Redux/user/actionCreator";
import {recordPageNumberInHomePage} from "../../Redux/career/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import HeaderAndDrawer from "../HeaderAndDrawer";
import {LanguageCard} from "../Widgets";
import {languageAddEndPoint} from "../../EndPoint/Language";


class ListLanguage extends Component{

    constructor(props) {
        super(props);
    }

    mainContent = () => {

        return(
            <div className={"language-list-container"}>
                <div className="language-list-card-area">
                    {
                        this.props.server.mainContent.map(item => (
                            <LanguageCard
                                keywords={item.keywords}
                                createBy={item.createBy}
                                content={item.content}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }

    buttonSeries = () => {
        let buttonArray = []
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("languageWrite")){
            buttonArray.push(
                <button
                    key={"add"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {
                        this.props.resetServer();
                        this.props.history.push(languageAddEndPoint)}
                    }>
                    add info
                </button>
            )
        }
        return buttonArray;
    }

    render(){
        return(
            <div>
                <HeaderAndDrawer
                    mainContent={this.mainContent()}
                    buttonSeries={this.buttonSeries()}
                />
            </div>
        )
    }


    componentDidMount(){
        const jwt = localStorage.getItem("Authorization");
        loadPage(listLanguage(jwt));
    }
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
        currentUser: state.user.profile,
        // language: state.language,
    }
}

const mapDispatchToProps = {
    resetServer,
    deleteProfile,
    recordPageNumberInHomePage,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(ListLanguage));