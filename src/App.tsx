import styles from "./App.module.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { LabelProvider } from "./utils/LabelContext";

function App() {
  return (
    <LabelProvider>
      <div className={styles.app}>
        <div className={styles.main}>
          <div className={styles.leftMenu}>
            <Menu />
            <Editor />
          </div>
          <SideBar />
        </div>
        <Footer />
      </div>
    </LabelProvider>
  );
}

export default App;
