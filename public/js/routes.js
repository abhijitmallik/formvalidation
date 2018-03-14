import Home from './home/home.js';
import Success from './success/success.js';
import { BrowserRouter, Route } from 'react-router-dom';

const routes =  (
  <BrowserRouter>
    <div>
        <Route path="/success" component={Success}/>
        <Route path="/" component={Home}/>
    </div>
  </BrowserRouter>
);

export default routes;