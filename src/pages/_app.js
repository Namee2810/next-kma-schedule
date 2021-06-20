import 'antd/dist/antd.css';
import moment from 'moment';
import { Provider } from "react-redux";
import store from "store";
import "styles/calendar.css";
import "styles/styles.scss";

moment.locale('vi');

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )

}

export default MyApp
