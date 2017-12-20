import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Titles from './titles'
import Article from '../components/article'
import Revision from '../components/revision'

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
