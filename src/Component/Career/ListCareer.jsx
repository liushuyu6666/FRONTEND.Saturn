import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadPage, loadAuxiliaryInfo} from "../../Support/supportFunctions";
import HeaderAndDrawer from "../HeaderAndDrawer";
import {resetServer} from "../../Redux/server/actionCreator";
import {deleteProfile} from "../../Redux/user/actionCreator";
import {recordPageNumberInHomePage} from "../../Redux/career/actionCreator";
import {listCareer, countFilteredCareer} from "../../Services/career";
import {DropDownButton} from "../Widgets";
import {careerAddEndPoint, careerRetrieveEndPoint, careerUpdateEndPoint} from "../../EndPoint/Career";

class ListCareer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            size: 10,
            filter:{
                isActive: null,
                isApplied: null,
            }
        }
    }

    changePage = (event) => {
        this.props.recordPageNumberInHomePage(event.target.id - 1);
    }

    prevPage = (event) => {
        if(this.props.career.page >= 1){
            this.props.recordPageNumberInHomePage(this.props.career.page - 1);
        }
    }

    nextPage = (event) => {
        let pages = Math.ceil(this.props.server.auxiliaryContent.totalEntries / this.state.size);
        pages = (isNaN(pages))?0:pages;
        if(this.props.career.page < pages - 1){
            this.props.recordPageNumberInHomePage(this.props.career.page + 1);
        }
    }

    pagination = () => {
        let pages = Math.ceil(this.props.server.auxiliaryContent.totalEntries / this.state.size);
        pages = (isNaN(pages))?0:pages;
        let pageNum = [];
        for(let i = 0; i < pages; i++){
            pageNum.push(i + 1);
        }
        return (
            <div className="career-list-pageSelectorB">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#"
                                onClick={this.prevPage}
                            >
                                &laquo;
                            </a>
                        </li>
                        {
                            pageNum.map(item => (
                                    (this.props.career.page === item - 1) ?
                                        (
                                            <li className="page-item"
                                                style={{color: "black"}}>
                                                <a className="page-link"
                                                   id={item}
                                                   style={{color: "black"}}
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        ):(
                                            <li className="page-item">
                                                <a className="page-link" href="#"
                                                   id={item}
                                                   onClick={this.changePage}
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        )
                                ))
                        }
                        <li className="page-item">
                            <a className="page-link" href="#"
                               onClick={this.nextPage}
                            >
                                &raquo;
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    filterCriteria = (event) => {
        event.preventDefault();
        const name = event.target.name;
        let value = event.target.value;
        (value === "true")? value = true: value =false;
        this.setState({
            filter:{
                ...this.state.filter,
                [name]: value,
            }
        })
    }

    filterCareer = (event) => {
        event.preventDefault();
        const jwt = localStorage.getItem("Authorization");
        let isActive = (this.state.filter.isActive === null)?(true):(this.state.filter.isActive);
        let isApplied = (this.state.filter.isApplied === null)?(false):(this.state.filter.isApplied);
        loadPage(listCareer(jwt, this.props.career.page,
            this.state.size, isActive, isApplied));
        loadAuxiliaryInfo(countFilteredCareer(isActive, isApplied), "totalEntries");
    }

    stateFilter = () => {
        return(
            <div className="career-list-pageSelectorA">
                <div className="career-list-pageSelectorA-item3">
                    <DropDownButton
                        id={"isActive"}
                        label={"active state"}
                        name={(this.state.filter.isActive === null)?
                            ("active state"):(this.state.filter.isActive.toString())}
                        items={["true", "false"]}
                        click={this.filterCriteria}
                    />
                </div>
                <div className="career-list-pageSelectorA-item4">
                    <DropDownButton
                        id={"isApplied"}
                        label={"applied state"}
                        name={(this.state.filter.isApplied === null)?
                            ("applied state"):(this.state.filter.isApplied.toString())}
                        items={["true", "false"]}
                        click={this.filterCriteria}
                    />
                </div>
                <div className="career-list-pageSelectorA-item5">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={this.filterCareer}
                    >
                        Filter
                    </button>
                </div>
            </div>

        )
    }

    mainContent = () => {
        if(true){
            return(
                <div className="career-list-layout">
                    {this.stateFilter()}
                    <div className={"career-list-container"}>
                        <table className="table table-striped career-list-content">
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
                                            <th scope="row">{this.props.career.page * this.state.size + index + 1}</th>
                                            <td>{item.companyName}</td>
                                            <td>
                                                {(item.link == null)?(item.position):
                                                    (<a href={item.link}
                                                        style={{color: "blue", cursor: "pointer"}}
                                                        target={"_blank"}
                                                    >
                                                        {item.position}
                                                    </a>)
                                                }
                                            </td>
                                            <td>{item.city}</td>
                                            <td>{(item.deadline !== null)?item.deadline.substring(0, 10):""}</td>
                                            <td>{(item.active)?(<span style={{color:"green"}}>√</span>):(<span style={{color:"red"}}>×</span>)}</td>
                                            <td>{(item.applied)?(<span style={{color:"green"}}>√</span>):(<span style={{color:"red"}}>×</span>)}</td>
                                            <td style={{color: "blue", cursor: "pointer"}}
                                                id={item.id}
                                                onClick={(event) => {
                                                    this.props.resetServer();
                                                    this.props.history.push(`${careerRetrieveEndPoint}/${event.target.id}`)
                                                }}
                                            >
                                                详情
                                            </td>
                                            {
                                                (JSON.stringify(this.props.currentUser) !== "{}"
                                                    &&this.props.currentUser.roles.includes("careerWrite"))?
                                                    (<td style={{color: "blue", cursor: "pointer"}}
                                                         id={item.id}
                                                         onClick={(event) => {
                                                             this.props.resetServer();
                                                             this.props.history.push(`${careerUpdateEndPoint}/${event.target.id}`)
                                                         }}>
                                                        更新
                                                    </td>):
                                                    (<></>)
                                            }
                                        </tr>
                                    )))
                            }
                            </tbody>
                        </table>
                    </div>
                    {this.pagination()}
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
                        this.props.history.push(careerAddEndPoint)}
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
        loadPage(listCareer(jwt, this.props.career.page, this.state.size));
        loadAuxiliaryInfo(countFilteredCareer(), "totalEntries");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.career.page !== prevProps.career.page){
            const jwt = localStorage.getItem("Authorization");
            loadPage(listCareer(jwt, this.props.career.page, this.state.size));
            loadAuxiliaryInfo(countFilteredCareer(), "totalEntries");
        }
    }
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
        currentUser: state.user.profile,
        career: state.career,
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
)(withRouter(ListCareer));
// export default withRouter(ListCareer);