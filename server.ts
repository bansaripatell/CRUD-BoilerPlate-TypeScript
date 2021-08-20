import 'dotenv/config';
import App from './app';
import CategoryRoute from './routes/category.route';

const app = new App([new CategoryRoute()]);

app.listen();