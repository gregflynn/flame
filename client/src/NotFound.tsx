import { Link } from 'react-router-dom';

import { Container } from './components/UI';
import classes from './NotFound.module.css';

const NotFound = () => (
  <Container>
    <h1 className={classes.Title}>404 - Not Found!</h1>
    <Link to="/">Return to homepage</Link>
  </Container>
);

export default NotFound;