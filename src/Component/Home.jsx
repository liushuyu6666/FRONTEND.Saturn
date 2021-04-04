import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadPage} from "../Support/supportFunctions";
import {
    OrderManageCollapse,
    // CheckTokenInFirstLoad,
    NoPermissionPage,
    LoadingDataPage, ShopCard, DishManageCollapse,
} from "./Widgets";
import HeaderAndDrawer from "./HeaderAndDrawer";
import {resetServer} from "../Redux/server/actionCreator";
import {deleteProfile} from "../Redux/user/actionCreator";
import {listCareer} from "../Services/career";

class Home extends Component{

    constructor(props) {
        super(props);
    }

    mainContent = () => {
        if(true){
            return(
                <div className={"home-page-container"}>
                    <table className="table table-striped home-page-content">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">company name</th>
                            <th scope="col">position(职位)</th>
                            <th scope="col">city(城市)</th>
                            <th scope="col">deadline(截至)</th>
                            <th scope="col">active</th>
                            <th scope="col">applied</th>
                            <th scope="col">detail</th>
                            {
                                (JSON.stringify(this.props.currentUser) !== "{}"
                                    &&this.props.currentUser.roles.includes("careerWrite"))?
                                    (<th scope="col">update</th>):
                                    (<></>)
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (this.props.server.mainContent!==null
                                &&this.props.server.mainContent.map((item, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.companyName}</td>
                                    <td>
                                        <a href={item.link} style={{color: "blue", cursor: "pointer"}}>
                                            {item.position}
                                        </a>
                                    </td>
                                    <td>{item.city}</td>
                                    <td>{(item.deadline !== null)?item.deadline.substring(0, 10):""}</td>
                                    <td>{(item.active)?(<span style={{color:"green"}}>√</span>):(<span style={{color:"red"}}>×</span>)}</td>
                                    <td>{(item.applied)?(<span style={{color:"green"}}>√</span>):(<span style={{color:"red"}}>×</span>)}</td>
                                    <td style={{color: "blue", cursor: "pointer"}}
                                        id={item.id}
                                        onClick={(event) => {
                                            this.props.resetServer();
                                            this.props.history.push(`/retrieve/${event.target.id}`)
                                        }}
                                    >
                                        详情
                                    </td>
                                    {
                                        (JSON.stringify(this.props.currentUser) !== "{}"
                                            &&this.props.currentUser.roles.includes("careerWrite"))?
                                            (<td>更新</td>):
                                            (<></>)
                                    }
                                </tr>
                            )))
                        }
                        </tbody>
                    </table>
                </div>
            )
        }
        else{
            return(
                <div>
                    sorry you don't have read permission.
                </div>
            )
        }
    }

    buttonSeries = () => {
        let buttonArray = []
        if(JSON.stringify(this.props.currentUser) !== "{}"
            && this.props.currentUser.roles.includes("careerWrite")){
            buttonArray.push(
                <button
                    key={"add"}
                    className={"btn btn-primary btn-sm active"}
                    onClick={() => {
                        this.props.resetServer();
                        this.props.history.push("/add")}
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
        loadPage(listCareer(jwt));
    }
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
        currentUser: state.user.profile,
    }
}

const mapDispatchToProps = {
    resetServer,
    deleteProfile,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Home));
// export default withRouter(Home);