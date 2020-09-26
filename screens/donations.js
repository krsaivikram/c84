import React ,{Component} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity, Alert,FlatList,Text,Modal,ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import Myheader from '../components/myheader'
import {ListItem} from 'react-native-elements'

export default class Donations extends Component{
    static navigationOptions = {header:null}
    constructor(){
        super()
        this.state={
            emailid:firebase.auth().currentUser.email,
            alldonations:[],
        }
        this.requestref=null;
    }
    getalldonations=()=>{
        this.requestref=db.collection("donations").where("donorid","==",this.state.emailid).onSnapshot((snapshot)=>{
            var donations = snapshot.docs.map(document=>document.data())
            this.setState({alldonations:donations})
        })
    }
    keyExtractor=(item,index)=>index.toString();
    renderItem = ({item,i})=>(<ListItem key = {i}
    title={item.bookname}
    subtitle={"Requested by"+item.requestedby+"status:"+item.requeststatus}
    leftElement={<Icon name="Book" type="font-awesome" color="green"/>}
    titleStyle={{color:"black",fontSize:14,fontWeight:"bold"}}
    rightElement={<TouchableOpacity><Text>Send book </Text></TouchableOpacity>}
    />)

     componentDidMount(){
         this.getalldonations();
     }

    componentWillUnmount(){
        this.requestref();
    }
    
    render(){
        return(
            <View style={{flex:1}}>
              <Myheader navigation={this.props.navigation} title="donations" />
              <View style={{flex:1}}>
                  {this.state.alldonations.length==0?(<View><Text>List off all book donations</Text></View>):(<FlatList keyExtractor={this.keyExtractor}
                  data={this.state.alldonations}
                  renderItem={this.renderItem}
                  />)}
              </View>
            </View>
        )
    }
}