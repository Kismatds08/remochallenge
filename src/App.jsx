import React from 'react'
import Auth from "./components/Auth";
import {Switch, Route, Router} from 'react-router-dom'
import {auth, createUserProfileDocument} from './services/firebase/firebase'
import {connect} from 'react-redux'
import {setCurrentUser} from './reducers/gameDataReducer'
import './App.scss'
import Theater from 'components/Theater';



class App extends React.Component {
 

  unsubscribeFromAuth = null

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }


  render(){
    return (
      <div>
        <Router>
          <Switch>
              <Route exact path='/' component={Auth} />
              <Route path='/shop' component={Theater} />
          </Switch>
       </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
  
    setCurrentUser : function (user){
      
      dispatch(setCurrentUser(user))
    }
  }
)

const mapStateToProps = ({user}) => (
    {
        currentUser : user.currentUser
    }
  )

export default connect(mapStateToProps,mapDispatchToProps)(App);


