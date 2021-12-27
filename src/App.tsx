import styles from "./App.module.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import Menu from "./components/Menu";
import { LabelProvider } from "./utils/LabelContext";

function App() {
  return (
    <LabelProvider>
      <div className={styles.app}>
        <div className={styles.leftMenu}>
          <Menu />
          <Editor />
        </div>
        <SideBar />
      </div>
    </LabelProvider>
  );
}

export default App;
