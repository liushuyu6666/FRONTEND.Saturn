import React, {Component} from "react/";
import {withRouter} from "react-router-dom";
import {RouteCard} from "../Component/Widgets";

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            sectionName: ["languages", "careers"],
        }
    }

    render() {
        return(
            <div className={"homepage-container"}>
                {
                    this.state.sectionName.map(item => (
                        <RouteCard
                            sectionName={item}
                            link={`/${item}`}
                        />
                    ))
                }
            </div>
        )
    }

    componentDidMount() {

    }

}
export default withRouter(Home);