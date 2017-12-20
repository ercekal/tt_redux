import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Titles from './Titles'
import Article from '../components/Article'
import Revision from '../components/Revision'

const Main = () => (
  <main className='main'>
    <Switch>
      <Route exact path='/' component={Titles}/>
      <Route path='/articles/:articleTitle' component={Article}/>
      <Route path='/:articleTitle/revisions/:revisionNo' component={Revision}/> */}
    </Switch>
  </main>
)

export default Main
