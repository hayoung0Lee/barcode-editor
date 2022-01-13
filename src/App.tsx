import styles from "./App.module.css";
import Editor from "./components/Editor";
import SideBar from "./components/sidebar";
import Menu from "./components/menu";
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
