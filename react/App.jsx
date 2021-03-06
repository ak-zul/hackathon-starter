import React from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
// import { browserHistory } from 'react-router'
import PropTypes from "prop-types";



class App extends React.Component {

    render() {
        return (

            <div>
                <Header />
                <Main />
            </div>

        );
    }
}
class Header extends  React.Component {
    render(){
        return(
            <header>
                <nav>
                    <ul>
                        <li><Link to=''>Home</Link></li>
                        <li><Link to="/create">Create</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editvenue:{},
            venueShow:{}
        };

        // this.history = browserHistory
        this.updateVenueID= this.updateVenueID.bind(this);
        this.venueShow = this.venueShow.bind(this);
    }
    updateVenueID(venue){
        // console.log(venue)
        this.setState({editvenue:venue})

    }
    venueShow(data){
        // console.log(data)
        this.setState({venueShow:data})
    }
    // updateVenueID(venue){
    //     venue=this.state.editvenue;
    //     console.log("=========");
    //     console.log(venue);
    //     this.setState({editvenue:venue},function(){
    //         console.log(this.state.editvenue._id) //popop
    //     })
    // }
    render(){
        //console.log(editvenue);
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={() => (<VenuesData updateVenue={this.updateVenueID} venueShow={this.venueShow}/>)} />
                    <Route path='/create'  render={(props) =><CreateVenue/>}/>
                    <Route path='/editvenue/:id' render={(props) =><EditVenue updateVenue={this.state.editvenue} />} />
                    <Route path='/venueshow/:id' render={(props) =><VenueShow  venueShow={this.state.venueShow}    />} />
                </Switch>


            </main>
        )
    }

}

class VenuesData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
          editvenue:{},
          showvenue:{}
        };

         this.updateVenueLists = this.updateVenueLists.bind(this);
         this.updateVenueID = this.updateVenueID.bind(this);
        this.deleteVenue = this.deleteVenue.bind(this);
        this.venueShow = this.venueShow.bind(this);
    }

    componentDidMount() {
        // debugger;
       this.updateVenueLists();
    }
    updateVenueID(venue){
        // console.log(venue)
        this.props.updateVenue(venue);
        this.setState({editvenue:venue},function(){
            // console.log(this.state.editvenue._id) //popop
        })
    }
    updateVenueLists(){
        axios.get("/api/venueList")
            .then(res => {
                // console.log(res);
                const   posts = res.data.venueList;
                this.setState({ posts:posts});
            });
    }
    deleteVenue(id){
        // console.log(id);
        axios.post("/api/venueDelete/"+id)
            .then(res => {
                // console.log(res);
                this.updateVenueLists();
            });
    }
    venueShow(id){
        // console.log(id)

        axios.post("/api/venueShow/"+id)
            .then(res =>{
                 // console.log(res.data.venue);
                this.props.venueShow(res.data.venue);
            })
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
                    {this.state.posts.map((venue, i) => <TableRow key = {i} data = {venue} updateVenueID={this.updateVenueID} deleteVenue={this.deleteVenue} venueShow={this.venueShow}/>)}
                    </tbody>
                </table>

            </div>

        );
    }
}

class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.updateVenueID=this.updateVenueID.bind(this);
        this.deleteVenue=this.deleteVenue.bind(this);
        this.venueShow=this.venueShow.bind(this)
    }

    updateVenueID(){
        this.props.updateVenueID(this.props.data)

    }
    deleteVenue(){
        this.props.deleteVenue(this.props.data._id);
    }
    venueShow(){
        this.props.venueShow(this.props.data._id);
    }
    render() {
        return (
                        <tr>
                            <td>
                            {/*{this.props.data.email}*/}
                                {this.props.data._id}

                            </td>
                            <td>
                                <Link to={`venueshow/${this.props.data._id}`} onClick={this.venueShow}> {this.props.data.email} </Link>
                            </td>
                            <td>
                            {/*{this.props.data.address}*/}
                                <Link to={`editvenue/${this.props.data._id}`} onClick={this.updateVenueID}> Edit </Link>
                            </td>
                            <td>
                                <Button id="deleteBtn"  onClick={this.deleteVenue}> Delete</Button>
                            </td>
                        </tr>
        );
    }
}

class CreateVenue extends React.Component{
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props, context) {
        super(props,context);

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
    createvenue(){
        axios.post('api/createVenue',{email:this.state.email})
            .then(res=>{
            console.log(res);

            // this.props.updateVenueLists();
            //     this.props.browserRedirect.history.push('/');
                this.context.router.history.push("/");
                // console.log(this.props)

        })
    }
    render() {
        return (
            <div>
                <input type = "text" name="email" onChange = {this.updateEmail} />
                <Button type="submit" onClick={this.createvenue} >ADD </Button>
            </div>
        );
    }

}

class EditVenue extends React.Component{
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props, context) {
        super(props,context);
        this.state = {};


        this.updateVenue = this.updateVenue.bind(this);
        this.updateForm = this.updateForm.bind(this)
    }

    updateForm(e){
        var obj ={};
        obj[e.target.name] = e.target.value;
        this.setState(obj, function(){
            // console.log(this.state);
        })
    }

    componentDidMount(){
        this.setState(this.props.updateVenue,function(){
             // console.log(this.state._id)
            // debugger;
            // window.m = this.state
            // window.mp = this.props
        })


    }

    componentWillReceiveProps(nextProps){
        // var venue = this.props.venue;
        // debugger;
        this.setState(nextProps.updateVenue,function(){
            // console.log(this.state._id)//pip
            // window.p= this.state
            // window.pp = nextProps
        });
        //this.props.updateVenueLists
    }

    updateVenue(){
        // console.log(this.state);
        axios.post('api/venueEdit/'+this.state._id,{name:this.state.name,email:this.state.email,address:this.state.address})
            .then(res=>{
                // console.log(res);
                // this.props.updateVenueLists();
                this.context.router.history.push("/");
                // console.log(res);
            })
    }
    render(){
        return(
            <div>

                <TextField
                    name="email"
                    value={this.state.email}
                    helperText="Enter New email"
                    onChange={this.updateForm}
                />
                <TextField
                    name="name"
                    value={this.state.name}
                    helperText="Enter New name"
                    onChange={this.updateForm}
                />
                <TextField
                    name="address"
                    value={this.state.address}
                    helperText="Enter New address"
                    onChange={this.updateForm}
                />

                {/*<TextField  name="name" defaultValue={this.state.name} onChange={this.updateForm}/><br/>*/}
            <Button  onClick={this.updateVenue} >Edit</Button>
            </div>
        );
    }
}

class VenueShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
            return(
            <div>
                <h2>this is Details of particular venue</h2>
                <p>{this.props.venueShow.name}</p>
                <p>{this.props.venueShow.address}</p>
                <p>{this.props.venueShow.email}</p>
            </div>
        )
    }
}

export default App;