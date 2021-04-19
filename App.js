import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddToDo from './components/addTodo';
import Sandbox from './components/sandbox';

export default function App() {
  const[todos,setTodos]=useState([
    {text:"Buy Coffee", key:'1'},
    {text:"Create an app", key:'2'},
    {text:"Play on the switch", key:'3'},
  ]);

  const pressHandler = (key)=>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = (text)=>{

    if(text !== ''){
      setTodos((prevTodos)=>{
        return [
          {text:text, key:Math.random().toString() },
          ...prevTodos
        ];
      })
    }else{
      Alert.alert('OOPPPSS!', 'You forget writing something...')
    }
  }
    return (
      //<Sandbox/>
      <TouchableWithoutFeedback onPress={()=> {
        Keyboard.dismiss();
      }} >
          <View style={styles.container}>
            <Header/>
          <View style={styles.content}>
            <AddToDo submitHandler={submitHandler} />
            <View style={styles.list}>
                <FlatList
                data={todos} 
                renderItem={({ item })=>(
                  <TodoItem item={item} pressHandler={pressHandler}/>
                )}
                />
            </View>
          </View>
          </View>
      </TouchableWithoutFeedback>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    padding:40,
    flex:1
  },
  list:{
    marginTop:20,
    flex:1
  }
});
