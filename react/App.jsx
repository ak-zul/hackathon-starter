import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            editvenueid:""
        };

         this.updateVenueLists = this.updateVenueLists.bind(this);
         this.updateVenueID = this.updateVenueID.bind(this);
    }

    componentDidMount() {
        // debugger;
       this.updateVenueLists();
    }

    updateVenueID(id){
        this.setState({editvenueid:id},function(){
            console.log(this.state)
        })
    }


    updateVenueLists(){
        axios.get("/api/venueList")
            .then(res => {
                console.log(res);
                const   posts = res.data.venueList;
                this.setState({ posts:posts});
            });
    }
    editVenue(id){
        console.log(id);
    }

    render() {
        return (

            <div>
                <table>
                    <thead>
                    <tr>
                        <th className="DottedBox"> name</th>
                        <th>description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.posts.map((venue, i) => <TableRow key = {i} data = {venue} updateVenueID={this.updateVenueID}/>)}
                    </tbody>
                </table>
                <CreateVenue updateVenueLists={this.updateVenueLists}/>
                <EditVenue venueid={this.state.editvenueid}/>
            </div>

        );
    }
}



class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.updateVenueID=this.updateVenueID.bind(this)
    }

    updateVenueID(){
        this.props.updateVenueID(this.props.data._id)

    }

    render() {
        return (
                        <tr>
                            <td>
                            {/*{this.props.data.email}*/}
                                {this.props.data._id}

                            </td>

                            <td>
                            {/*{this.props.data.address}*/}
                            <button id="editBtn"  onClick={this.updateVenueID}> Edit</button>
                            </td>
                        </tr>
        );
    }
}
// class ThirdComponent extends React.Component {
//     render() {
//         return (
//             <li>
//             <TableRow x = {this.props.data} />
//             </li>
//         );
//     }
// }

class CreateVenue extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: ""
        }
        this.updateEmail =this.updateEmail.bind(this);
        this.createvenue = this.createvenue.bind(this)
    }
    updateEmail(e){
        this.setState({email:e.target.value});
        console.log(e.target.value);

    }
    componentDidMount() {

    }
    createvenue(){
        axios.post('api/createVenue',{email:this.state.email})
            .then(res=>{
            console.log(res);

            this.props.updateVenueLists();

        })
    }
    render() {
        return (
            <div>
                <input type = "text" name="email" onChange = {this.updateEmail} />
                <input type="submit" onClick={this.createvenue} />
                <input type="submit" onClick={this.props.updateVenueLists} />
            </div>
        );
    }


}

class EditVenue extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        };

        this.updateVenue = this.updateVenue.bind(this)
    }

    updateVenue(){


        console.log(this.props)
    }
    render(){
        return(
            <div>


            <input type="submit" onClick={this.updateVenue} />
            </div>
        );
    }
}
export default App;