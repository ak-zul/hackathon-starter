import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        // debugger;
        axios.get("/api/venueList")
            .then(res => {
                console.log(res);
                const   posts = res.data.venueList;
                this.setState({ posts:posts});
            });
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


                    {/*{this.state.posts.map((venue, i) =>  <ThirdComponent key={i} data={venue}/>)}*/}
                    {/*{*/}
                        {/*this.state.posts.map(function (venue, i) {*/}
                            {/*return React.createElement(*/}
                                {/*ThirdComponent,*/}
                                {/*{data:venue,key:i, i:i},*/}
                                {/*React.createElement(TableRow, { key: i, data: venue })*/}
                            {/*);*/}
                        {/*})*/}
                    {/*}*/}

                    {this.state.posts.map((venue, i) => <TableRow key = {i} data = {venue} />)}
                    </tbody>
                </table>

            </div>
        );
    }
}



class TableRow extends React.Component {
    render() {
        return (
                        <tr>
                            <td>
                            {this.props.data.name}
                            </td>

                            <td>
                            {this.props.data.address}
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

export default App;