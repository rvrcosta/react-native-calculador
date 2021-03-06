import React, {Component} from 'react'
import { Platform, StyleSheet,Text,View } from 'react-native'

import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0
}

export default class App extends Component {

  state = { ...initialState }

  addDigit = n => {
    
    //Armazena no clearDisplay se o que está no display é 0 (retorna true) caso contrario retorna false
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay


    //Se já houver ponto no display e não for limpar o display, não faz nada
    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')){
      return
    }

    //Define o valor anterior do display com base na variavel clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue

    //Gera a variavel display value com a informação que já está no display e o que foi digitado
    const displayValue = currentValue + n

    //Seta no estado atual o display value e seta o clearDisplay como falso
    this.setState({displayValue, clearDisplay: false})

    //Registro dos dados no values do state, caso o valor digitado não seja um ponto
    if(n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
    this.setState({...initialState})
  }

  setOperation = operation =>{

    if(this.state.current ===0){
      this.setState({operation, current: 1, clearDisplay: true})
    } else {
      const equals = operation ==='='
      const values = [...this.state.values]
      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)

      } catch(e){
        values[0] = this.state.values[0]
      }

      values[1] = 0

      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })

    }

  }

  render(){
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button triple label='AC' onClick={this.clearMemory} />
          <Button operation label='/' onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit}/>
          <Button label='8' onClick={this.addDigit}/>
          <Button label='9' onClick={this.addDigit}/>
          <Button operation label='*' onClick={this.setOperation}/>
          <Button label='4' onClick={this.addDigit}/>
          <Button label='5' onClick={this.addDigit}/>
          <Button label='6' onClick={this.addDigit}/>
          <Button operation label='-' onClick={this.setOperation}/>
          <Button label='1' onClick={this.addDigit}/>
          <Button label='2' onClick={this.addDigit}/>
          <Button label='3' onClick={this.addDigit}/>
          <Button operation label='+' onClick={this.setOperation}/>
          <Button double label='0' onClick={this.addDigit}/>
          <Button label='.' onClick={this.addDigit}/>
          <Button operation label='=' onClick={this.setOperation}/>
        </View>
      </View>    
      );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap'

  }
})